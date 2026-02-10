import { item_data } from '../data/item-data';
import { duration_to_string } from '../helper';
import { Cost } from '../types/item-cost';
import type { ManuData } from '../types/manu-data';
import type { UserDataV1 } from '../types/user-data';
import { ConfigScreen } from './config-screen';
import { DomRegistry } from './dom-registry';

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

function load_user_data() {
    const storage_instance = window.localStorage;
    const raw_user_data = storage_instance.getItem(DATA_KEY);
    const version_data = storage_instance.getItem(VERSION_KEY);

    if (version_data !== null) {
        // Load the data based on version key.
        // Right now only key is v1.0 so it's fine to not have specialists
        if (raw_user_data !== null) {
            user_data = JSON.parse(raw_user_data) as UserDataV1;

            // casting Object to Cost
            const cost = new Cost();
            cost.bmat = user_data.material_consumed.bmat;
            cost.emat = user_data.material_consumed.emat;
            cost.rmat = user_data.material_consumed.rmat;
            cost.hemat = user_data.material_consumed.hemat;
            user_data.material_consumed = cost;
        } else {
            user_data = {
                crate_crafted: 0,
                material_consumed: new Cost(),
                item_crafted: [],
                time_spent: 0,
            };
        }
    }
    // No version key detected; overwrite the save data with latest version
    else {
        user_data = {
            crate_crafted: 0,
            material_consumed: new Cost(),
            item_crafted: [],
            time_spent: 0,
        };

        storage_instance.setItem(DATA_KEY, JSON.stringify(user_data));
        storage_instance.setItem(VERSION_KEY, CURRENT_VERSION.toString());
    }
}

export namespace StatScreen {
    export function init(): void {
        enable_local_storage = is_local_storage_available();

        if (enable_local_storage) {
            load_user_data();
        }

        DomRegistry.get_stat_registry().start_config_button.addEventListener(
            'click',
            () => {
                DomRegistry.get_stat_registry().start_config_button.className =
                    'hidden';
                DomRegistry.get_stat_registry().root_element.className =
                    'hidden';
                ConfigScreen.show();
            }
        );

        DomRegistry.get_stat_registry().reset_stat_button.addEventListener(
            'click',
            () => {
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
            }
        );
    }

    export function show(): void {
        const screen_registry = DomRegistry.get_stat_registry();
        DomRegistry.get_title().innerText = 'Home';

        screen_registry.start_config_button.className = 'accent';

        screen_registry.crate_count.innerText =
            user_data.crate_crafted.toString();
        screen_registry.time_spent.innerText = duration_to_string(
            user_data.time_spent
        );
        screen_registry.time_to_hundred_crate.innerText = duration_to_string(
            user_data.time_spent / (user_data.crate_crafted / 100)
        );

        screen_registry.bmat_used.innerText =
            user_data.material_consumed.bmat.toString();
        screen_registry.emat_used.innerText =
            user_data.material_consumed.emat.toString();
        screen_registry.hemat_used.innerText =
            user_data.material_consumed.hemat.toString();
        screen_registry.rmat_used.innerText =
            user_data.material_consumed.rmat.toString();

        screen_registry.root_element.className = '';
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
