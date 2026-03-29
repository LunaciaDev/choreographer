import { achievement_data } from '../data/achievement-data';
import { item_data } from '../data/item-data';
import {
    duration_to_string,
    get_manu_speed,
    get_template_elements,
    number_formatter,
} from '../helper';
import { Cost } from '../types/item-cost';
import { ItemType } from '../types/item-type';
import type { ManuData } from '../types/manu-data';
import {
    CURRENT_VERSION,
    make_empty_user_data,
    type ExportData,
    type UserDataV1,
    type UserData,
    type AchievementEntry,
    type ItemCraftedEntry,
} from '../types/user-data';
import { ConfigScreen } from './config-screen';
import { DomRegistry, type StatRegistry } from './dom-registry';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

let stat_registry: StatRegistry;

let enable_local_storage: boolean;
let user_data: UserData;
let unlocked_achivements: AchievementEntry[] = [];
let item_crafted_chart: Chart;

const VERSION_KEY = 'saveversion';
const DATA_KEY = 'userdata';

function is_local_storage_available(): boolean {
    let storage_instance;

    try {
        storage_instance = window.localStorage;
        storage_instance.setItem('__test__', '__test__');
        storage_instance.removeItem('__test__');
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === 'QuotaExceededError' &&
            storage_instance !== undefined &&
            storage_instance.length === 0
        );
    }
}

function load_user_data(raw_user_data: string, version_data: number) {
    switch (version_data) {
        case 1: {
            const old_user_data = JSON.parse(raw_user_data) as UserDataV1;
            old_user_data.material_consumed = Object.assign(
                new Cost(),
                old_user_data.material_consumed
            );

            user_data = {
                crate_crafted: old_user_data.crate_crafted,
                item_crafted: old_user_data.item_crafted,
                material_consumed: old_user_data.material_consumed,
                // version 2 use second instead of ms precision
                time_spent: Math.ceil(old_user_data.time_spent / 1000),
                achievements: [],
                war_snapshot: {
                    crate_crafted: old_user_data.crate_crafted,
                    // Make sure to duplicate the array, funny thing might happen
                    item_crafted: Object.assign<
                        ItemCraftedEntry[],
                        ItemCraftedEntry[]
                    >([], old_user_data.item_crafted),
                    // Same here
                    material_consumed: Object.assign(
                        new Cost(),
                        old_user_data.material_consumed
                    ),
                    time_spent: Math.ceil(old_user_data.time_spent / 1000),
                },
            };
            break;
        }

        case 2: {
            user_data = JSON.parse(raw_user_data) as UserData;

            user_data.material_consumed = Object.assign(
                new Cost(),
                user_data.material_consumed
            );
            user_data.war_snapshot.material_consumed = Object.assign(
                new Cost(),
                user_data.war_snapshot.material_consumed
            );
            break;
        }

        default:
            throw new Error('Unexpected version number');
    }
}

export namespace StatScreen {
    export function init(): void {
        enable_local_storage = is_local_storage_available();
        stat_registry = DomRegistry.get_stat_registry();

        if (enable_local_storage) {
            const version = window.localStorage.getItem(VERSION_KEY);
            const data = window.localStorage.getItem(DATA_KEY);

            if (version === null || data === null) {
                user_data = make_empty_user_data();

                window.localStorage.setItem(
                    DATA_KEY,
                    JSON.stringify(user_data)
                );
                window.localStorage.setItem(
                    VERSION_KEY,
                    CURRENT_VERSION.toString()
                );
            } else {
                const version_int = parseInt(version);
                load_user_data(data, version_int);

                if (version_int < CURRENT_VERSION) {
                    window.localStorage.setItem(
                        DATA_KEY,
                        JSON.stringify(user_data)
                    );
                    window.localStorage.setItem(
                        VERSION_KEY,
                        CURRENT_VERSION.toString()
                    );
                }
            }
        }

        stat_registry.start_config_button.addEventListener('click', () => {
            stat_registry.start_config_button.className = 'hidden';
            stat_registry.root_element.className = 'hidden';
            ConfigScreen.show();
        });

        stat_registry.stat_io.overlay_element.addEventListener(
            'click',
            (event) => {
                if (event.target !== stat_registry.stat_io.overlay_element) {
                    return;
                }

                stat_registry.stat_io.overlay_element.className = 'hidden';
            }
        );

        stat_registry.stat_io.input_confirm_button.addEventListener(
            'click',
            () => {
                try {
                    const raw_data = JSON.parse(
                        stat_registry.stat_io.data_input.value
                    ) as ExportData;
                    load_user_data(raw_data.data, raw_data.version);
                    if (enable_local_storage) {
                        window.localStorage.setItem(
                            DATA_KEY,
                            JSON.stringify(user_data)
                        );
                        window.localStorage.setItem(
                            VERSION_KEY,
                            CURRENT_VERSION.toString()
                        );
                    }
                    StatScreen.show();
                    stat_registry.stat_io.overlay_element.className = 'hidden';
                } catch {
                    stat_registry.stat_io.import_error.innerText =
                        'Something went wrong with your data...?';
                    stat_registry.stat_io.import_error.className =
                        'error-popup';
                }
            }
        );

        stat_registry.stat_io.show_statio.addEventListener('click', () => {
            stat_registry.stat_io.overlay_element.className = 'overlay';
            stat_registry.stat_io.import_error.className = 'hidden';
            stat_registry.stat_io.data_input.value = '';
            stat_registry.stat_io.data_output.value = JSON.stringify({
                version: CURRENT_VERSION,
                data: JSON.stringify(user_data),
            });
            stat_registry.stat_io.reset_data_output.value = JSON.stringify({
                version: CURRENT_VERSION,
                data: JSON.stringify(make_empty_user_data()),
            });
        });

        stat_registry.stat_current_war.reset_current_war.addEventListener(
            'click',
            () => {
                if (
                    user_data.crate_crafted ===
                    user_data.war_snapshot.crate_crafted
                ) {
                    // Reasonable that no changes happened. Do nothing.
                    return;
                }

                user_data.war_snapshot.crate_crafted = user_data.crate_crafted;
                user_data.war_snapshot.item_crafted = Object.assign<
                    ItemCraftedEntry[],
                    ItemCraftedEntry[]
                >([], user_data.item_crafted);
                user_data.war_snapshot.material_consumed = Object.assign(
                    new Cost(),
                    user_data.material_consumed
                );
                user_data.war_snapshot.time_spent = user_data.time_spent;

                if (enable_local_storage) {
                    window.localStorage.setItem(
                        DATA_KEY,
                        JSON.stringify(user_data)
                    );
                }

                StatScreen.show();
            }
        );

        // initialize charts
        Chart.register(ChartDataLabels);
        item_crafted_chart = new Chart(
            stat_registry.stat_current_war.chart_item_made,
            {
                type: 'doughnut',
                data: {
                    datasets: [
                        {
                            data: [],
                            custom_labels: [],
                            backgroundColor: [],
                            weight: 2,
                            borderWidth: 3,
                            borderRadius: 6,
                        } as any, // removing the error lint
                        {
                            data: [],
                            custom_labels: ItemType.get_iterator().map((v) =>
                                ItemType.to_string(v)
                            ),
                            backgroundColor: [
                                '#f9d27c',
                                '#f99454',
                                '#f25984',
                                '#7de273',
                                '#5795f9',
                                '#af74f7',
                            ],
                            weight: 1,
                            borderWidth: 3,
                            borderRadius: 6,
                        },
                    ],
                },
                options: {
                    cutout: '10%',
                    animation: false,
                    borderColor: '#1e1e2e',
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    const dataset = context.dataset as any;
                                    const index = context.dataIndex;
                                    const label = dataset.custom_labels[index];
                                    const value = dataset.data[index];
                                    return `${label}: ${value}`;
                                },
                            },
                        },
                        datalabels: {
                            color: '#000',
                            font: {
                                size: 13,
                            },
                            rotation: function (context: any) {
                                const arc = context.chart.getDatasetMeta(
                                    context.datasetIndex
                                ).data[context.dataIndex];
                                const center_angle =
                                    (arc.startAngle + arc.endAngle) / 2;
                                let angle_deg = (center_angle * 180) / Math.PI;

                                if (angle_deg > 90 && angle_deg < 270) {
                                    angle_deg -= 180;
                                }

                                return angle_deg;
                            },
                            formatter: function (value, context) {
                                const dataset = context.dataset as any;

                                if (value === 0) return '';

                                return dataset.custom_labels[context.dataIndex];
                            },
                            anchor: 'center',
                            align: 'center',
                        },
                        title: {
                            display: true,
                            text: 'Item Composition',
                            color: '#cdd6f4',
                            font: {
                                size: 18,
                                weight: 'bold',
                            },
                        },
                    },
                },
            }
        );
    }

    export function show(): void {
        DomRegistry.get_title().innerText = 'Home';

        stat_registry.start_config_button.className = 'accent';

        // Lifetime Stats
        stat_registry.crate_count.innerText = number_formatter.format(
            user_data.crate_crafted
        );
        stat_registry.time_spent.innerText = duration_to_string(
            user_data.time_spent
        );
        stat_registry.craft_speed.innerText = get_manu_speed(
            user_data.crate_crafted,
            user_data.time_spent
        ).toFixed(2);
        stat_registry.bmat_used.innerText = number_formatter
            .format(user_data.material_consumed.bmat)
            .toLowerCase();
        stat_registry.emat_used.innerText = number_formatter
            .format(user_data.material_consumed.emat)
            .toLowerCase();
        stat_registry.hemat_used.innerText = number_formatter
            .format(user_data.material_consumed.hemat)
            .toLowerCase();
        stat_registry.rmat_used.innerText = number_formatter
            .format(user_data.material_consumed.rmat)
            .toLowerCase();

        // Current War Stat
        // Delta between lifetime stat and the snapshot taken
        const current_war_registry = stat_registry.stat_current_war;
        const war_snapshot = user_data.war_snapshot;
        const war_cost = Object.assign(new Cost(), user_data.material_consumed);
        const war_crate = user_data.crate_crafted - war_snapshot.crate_crafted;
        const war_time = user_data.time_spent - war_snapshot.time_spent;
        war_cost.subtract(war_snapshot.material_consumed);

        current_war_registry.crate_count.innerText =
            number_formatter.format(war_crate);
        current_war_registry.time_spent.innerText =
            duration_to_string(war_time);
        current_war_registry.craft_speed.innerText = get_manu_speed(
            war_crate,
            war_time
        ).toFixed(2);
        current_war_registry.bmat_used.innerText = number_formatter
            .format(war_cost.bmat)
            .toLowerCase();
        current_war_registry.emat_used.innerText = number_formatter
            .format(war_cost.emat)
            .toLowerCase();
        current_war_registry.hemat_used.innerText = number_formatter
            .format(war_cost.hemat)
            .toLowerCase();
        current_war_registry.rmat_used.innerText = number_formatter
            .format(war_cost.rmat)
            .toLowerCase();

        stat_registry.achievement_owned.innerHTML = '';
        user_data.achievements.forEach((entry) => {
            const achievement_card_template =
                DomRegistry.get_achivement_card().cloneNode(
                    true
                ) as HTMLTemplateElement;
            const card_elements = get_template_elements(
                achievement_card_template,
                ['achievement-name', 'achievement-howto', 'achievement-fluff']
            );
            const achievement = achievement_data[entry.id].tiers[entry.tier];

            card_elements['achievement-name'].textContent = achievement.name;
            card_elements['achievement-howto'].textContent =
                achievement.condition_text;
            card_elements['achievement-fluff'].textContent =
                achievement.deco_text;

            stat_registry.achievement_owned.appendChild(
                achievement_card_template.content
            );
        });

        // Make the charts!
        // Firstly, find out what the user has crafted this war since we are tracking by delta.
        type ChartData = {
            name: string;
            type: ItemType;
            amount: number;
        };
        let war_item_crafted: ChartData[] = [];
        let other_items: ChartData[] = ItemType.get_iterator().map(
            (_, type: ItemType) => {
                return { name: 'Others', type: type, amount: 0 };
            }
        );
        user_data.item_crafted.forEach((item) => {
            let snapshot = user_data.war_snapshot.item_crafted.find(
                (v) => v.id == item.id
            );

            if (snapshot === undefined) {
                snapshot = { id: -1, amount: 0 };
            }

            if (item.amount - snapshot.amount > 0) {
                if ((item.amount - snapshot.amount) / war_crate < 0.017) {
                    other_items[item_data[item.id].type].amount +=
                        item.amount - snapshot.amount;
                    return;
                }

                war_item_crafted.push({
                    name: item_data[item.id].name,
                    type: item_data[item.id].type,
                    amount: item.amount - snapshot.amount,
                });
            }
        });
        other_items.forEach((v) => {
            if (v.amount > 0) {
                war_item_crafted.push(v);
            }
        });
        // Sort
        war_item_crafted
            .sort((a, b) => {
                if (a.name === 'Others') {
                    return 1;
                }
                if (b.name === 'Others') {
                    return -1;
                }

                return -a.amount + b.amount;
            })
            .sort((a, b) => a.type - b.type);

        // Then we map out the item types.
        const count_by_type = ItemType.get_iterator().map(() => 0);
        war_item_crafted.forEach((item) => {
            count_by_type[item.type] += item.amount;
        });

        // And update the data.
        item_crafted_chart.data.datasets[0].data = war_item_crafted.map(
            (v) => v.amount
        );
        (item_crafted_chart.data.datasets[0] as any).custom_labels =
            war_item_crafted.map((v) => v.name);
        item_crafted_chart.data.datasets[0].backgroundColor =
            war_item_crafted.map((v) => {
                switch (v.type) {
                    case ItemType.LIGHT_ARM:
                        return '#f9e2af';
                    case ItemType.HEAVY_ARM:
                        return '#fab387';
                    case ItemType.HEAVY_SHELL:
                        return '#f38ba8';
                    case ItemType.MEDICAL:
                        return '#a6e3a1';
                    case ItemType.UTILITIES:
                        return '#89b4fa';
                    case ItemType.UNIFORM:
                        return '#cba6f7';
                }
            });
        item_crafted_chart.data.datasets[1].data = count_by_type;

        item_crafted_chart.update('none');
        stat_registry.root_element.className = '';
    }

    /**
     * Update manufacture part of user data
     *
     * @param total_time The manufacturing time spent
     * @param crafted_items Which item has been manufactured
     */
    export function update_manu_stat(
        total_time: number,
        manu_data: ManuData
    ): void {
        unlocked_achivements = [];

        // Do not write any data if no crate was crafted
        if (manu_data.crate_crafted === 0) return;

        const session_data: UserDataV1 = {
            crate_crafted: 0,
            material_consumed: new Cost(),
            item_crafted: [],
            time_spent: 0,
        };

        user_data.crate_crafted += manu_data.crate_crafted;
        session_data.crate_crafted = manu_data.crate_crafted;
        session_data.item_crafted = manu_data.get_crafted_items();

        session_data.item_crafted.forEach((item) => {
            user_data.material_consumed.add_multiple(
                item.amount,
                item_data[item.id].cost
            );
            session_data.material_consumed.add_multiple(
                item.amount,
                item_data[item.id].cost
            );

            const entry_index = user_data.item_crafted.findIndex(
                (crafted_item) => crafted_item.id == item.id
            );

            if (entry_index == -1) {
                user_data.item_crafted.push({
                    id: item.id,
                    amount: item.amount,
                });
            } else {
                user_data.item_crafted[entry_index].amount += item.amount;
            }
        });

        user_data.time_spent += total_time;
        session_data.time_spent = total_time;

        // Unlock eligible achivements
        achievement_data.forEach((achievement, id) => {
            const entry = user_data.achievements.find(
                (entry) => entry.id === id
            );
            let current_tier = -1;
            let index = 0;

            if (entry !== undefined) {
                index = entry.tier + 1;
                current_tier = entry.tier;
            }

            while (index < achievement.tiers.length) {
                if (
                    !achievement.tiers[index].condition(session_data, user_data)
                ) {
                    break;
                }
                index++;
            }

            // Highest unlocked is tier index-1
            if (index - 1 > current_tier) {
                if (entry === undefined) {
                    user_data.achievements.push({
                        id: id,
                        tier: index - 1,
                    });
                } else {
                    entry.tier = index - 1;
                }

                unlocked_achivements.push({
                    id: id,
                    tier: index - 1,
                });
            }
        });

        if (enable_local_storage) {
            window.localStorage.setItem(DATA_KEY, JSON.stringify(user_data));
        }
    }

    export function get_unlocked_achivements(): AchievementEntry[] {
        return unlocked_achivements;
    }

    export function get_user_data(): UserData {
        return user_data;
    }
}
