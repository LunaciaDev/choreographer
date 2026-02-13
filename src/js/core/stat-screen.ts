import { item_data } from '../data/item-data';
import { duration_to_string, number_formatter } from '../helper';
import { Cost } from '../types/item-cost';
import type { ManuData } from '../types/manu-data';
import type { ExportData, UserDataV1 } from '../types/user-data';
import { ConfigScreen } from './config-screen';
import { DomRegistry, type StatRegistry } from './dom-registry';

let stat_registry: StatRegistry;

let enable_local_storage: boolean;
let user_data: UserDataV1;

const CURRENT_VERSION = 1;
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
            user_data = JSON.parse(raw_user_data) as UserDataV1;

            // casting Object to Cost
            const cost = new Cost();
            cost.bmat = user_data.material_consumed.bmat;
            cost.emat = user_data.material_consumed.emat;
            cost.rmat = user_data.material_consumed.rmat;
            cost.hemat = user_data.material_consumed.hemat;
            user_data.material_consumed = cost;
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
                user_data = {
                    crate_crafted: 0,
                    material_consumed: new Cost(),
                    item_crafted: [],
                    time_spent: 0,
                };

                window.localStorage.setItem(
                    DATA_KEY,
                    JSON.stringify(user_data)
                );
                window.localStorage.setItem(
                    VERSION_KEY,
                    CURRENT_VERSION.toString()
                );
            } else {
                load_user_data(data, parseInt(version));
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
                    window.localStorage.setItem(
                        DATA_KEY,
                        JSON.stringify(user_data)
                    );
                    window.localStorage.setItem(
                        VERSION_KEY,
                        CURRENT_VERSION.toString()
                    );
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
        });

        stat_registry.reset_stat_button.addEventListener('click', () => {
            user_data = {
                crate_crafted: 0,
                material_consumed: new Cost(),
                item_crafted: [],
                time_spent: 0,
            };

            if (enable_local_storage) {
                const data_string = JSON.stringify(user_data);

                // Block unnecessary writes
                if (window.localStorage.getItem(DATA_KEY) !== data_string) {
                    window.localStorage.setItem(
                        DATA_KEY,
                        JSON.stringify(user_data)
                    );
                }
            }

            show();
        });
    }

    export function show(): void {
        DomRegistry.get_title().innerText = 'Home';

        stat_registry.start_config_button.className = 'accent';

        stat_registry.crate_count.innerText = number_formatter.format(
            user_data.crate_crafted
        );
        stat_registry.time_spent.innerText = duration_to_string(
            user_data.time_spent
        );
        stat_registry.time_to_hundred_crate.innerText = duration_to_string(
            user_data.time_spent / (user_data.crate_crafted / 100)
        );

        stat_registry.bmat_used.innerText = number_formatter.format(
            user_data.material_consumed.bmat
        );
        stat_registry.emat_used.innerText = number_formatter.format(
            user_data.material_consumed.emat
        );
        stat_registry.hemat_used.innerText = number_formatter.format(
            user_data.material_consumed.hemat
        );
        stat_registry.rmat_used.innerText = number_formatter.format(
            user_data.material_consumed.rmat
        );

        stat_registry.root_element.className = '';
    }

    /**
     * Update manufacture part of user data
     *
     * @param start_time The manufacturing start time for updating time spent
     * @param crafted_items Which item has been manufactured
     */
    export function update_manu_stat(
        start_time: number,
        manu_data: ManuData
    ): void {
        // Do not write any data if no crate was crafted
        if (manu_data.crate_crafted === 0) return;

        const end_time = Date.now();

        user_data.crate_crafted += manu_data.crate_crafted;

        manu_data.data.forEach((row) => {
            row.filter((item) => item.crafted_amount !== 0).forEach((item) => {
                user_data.material_consumed.multiply(
                    item.crafted_amount,
                    item_data[item.id].cost
                );

                const entry_index = user_data.item_crafted.findIndex(
                    (crafted_item) => crafted_item.id == item.id
                );

                if (entry_index == -1) {
                    user_data.item_crafted.push({
                        id: item.id,
                        amount: item.crafted_amount,
                    });
                } else {
                    user_data.item_crafted[entry_index].amount +=
                        item.crafted_amount;
                }
            });
        });

        user_data.time_spent += end_time - start_time;

        if (enable_local_storage) {
            window.localStorage.setItem(DATA_KEY, JSON.stringify(user_data));
        }
    }
}
