import { item_data } from '../data/item-data';
import {
    duration_to_string,
    get_color_class,
    get_image_path,
    get_template_elements,
} from '../helper';
import type { ConfigData } from '../types/config-data';
import { ItemType } from '../types/item-type';
import { ManuData } from '../types/manu-data';
import { ConfigScreen } from './config-screen';
import { DomRegistry, type ManuRegistry } from './dom-registry';
import { ResultScreen } from './result-screen';
import { StatScreen } from './stat-screen';

let manu_registry: ManuRegistry;
let manu_data: ManuData;
let time_ref: number;
let start_time: number;
let anim_timeouts: number[];

/**
 * Given an itemType, add to the queue the current most-prioritized that has not been finished.
 *
 * If the truck is suspected to be full (material require more than 13 slots to carry), move
 * the item to a different queue, automatically pushed to the main queue when it's submitted.
 *
 * @param item_type
 */
function add_queue(item_type: ItemType) {
    // [TODO]: Create feedback for clicks
    const item_id = manu_data.add_queue(item_type);
    refresh_buttons();

    if (item_id !== null) {
        add_item_card(item_id);
    }
}

/**
 * Clear the main queue, finalize changes and push items from the
 * waiting queue to the main queue.
 *
 * Same rules apply as addQueue.
 */
function submit_items() {
    // [TODO]: Create clicks feedback
    manu_data.submit_items();
    refresh_item_cards();
    refresh_buttons();
}

/**
 * Add the item that has been moved to the main queue to the UI.
 *
 * User can remove it from the main queue (x button) or manually
 * push the item back to the waiting queue (- button).
 *
 * @param item_id The internal ID of the item
 */
function add_item_card(item_id: number) {
    const template = manu_registry.stat_label.item_card_template.cloneNode(
        true
    ) as HTMLTemplateElement;
    const template_elements = get_template_elements(template, [
        'manu-item-name',
        'manu-item-line',
        'item-image',
        'remove-line',
    ]);
    const item = item_data[item_id];

    template_elements['manu-item-name'].textContent = item.name;
    (template_elements['item-image'] as HTMLImageElement).src = get_image_path(
        item.type
    );
    template_elements['remove-line'].addEventListener('click', () => {
        manu_data.put_back_item(item_id);

        template_elements['manu-item-line'].remove();
        refresh_item_cards();
        refresh_buttons();
    });
    template_elements['manu-item-line'].className +=
        ' ' + get_color_class(item.type);

    manu_registry.stat_label.item_to_craft.appendChild(template.content);
    manu_registry.stat_label.cost_to_craft.textContent =
        manu_data.current_cost.to_string();
}

function refresh_item_cards() {
    manu_registry.stat_label.item_to_craft.innerHTML = '';
    manu_registry.stat_label.crate_crafted.innerText =
        manu_data.crate_crafted.toString();
    manu_registry.stat_label.cost_to_craft.innerText =
        manu_data.current_cost.to_string();
    manu_data.staged_crate.forEach((item_id) => add_item_card(item_id));
}

/**
 * Refresh the state of the buttons.
 *
 * All button used to add queue become inactive if all item of that type reaches the manu goal.
 *
 * The submit button become inactive if there are nothing to submit. (main queue empty)
 */
function refresh_buttons() {
    if (manu_registry.stat_label.item_to_craft.innerHTML === '') {
        manu_registry.control.submit_button.setAttribute(
            'disabled',
            'disabled'
        );
    } else {
        manu_registry.control.submit_button.removeAttribute('disabled');
    }

    ItemType.get_iterator().forEach((item_type) => {
        if (manu_data.is_queue_empty(item_type)) {
            switch (item_type) {
                case ItemType.LIGHT_ARM:
                    manu_registry.control.light_arm.setAttribute(
                        'disabled',
                        'disabled'
                    );
                    break;
                case ItemType.HEAVY_ARM:
                    manu_registry.control.heavy_arm.setAttribute(
                        'disabled',
                        'disabled'
                    );
                    break;
                case ItemType.HEAVY_SHELL:
                    manu_registry.control.heavy_shell.setAttribute(
                        'disabled',
                        'disabled'
                    );
                    break;
                case ItemType.MEDICAL:
                    manu_registry.control.medical.setAttribute(
                        'disabled',
                        'disabled'
                    );
                    break;
                case ItemType.UTILITIES:
                    manu_registry.control.utilities.setAttribute(
                        'disabled',
                        'disabled'
                    );
                    break;
                case ItemType.UNIFORM:
                    manu_registry.control.uniform.setAttribute(
                        'disabled',
                        'disabled'
                    );
                    break;
            }
        } else {
            switch (item_type) {
                case ItemType.LIGHT_ARM:
                    manu_registry.control.light_arm.removeAttribute('disabled');
                    break;
                case ItemType.HEAVY_ARM:
                    manu_registry.control.heavy_arm.removeAttribute('disabled');
                    break;
                case ItemType.HEAVY_SHELL:
                    manu_registry.control.heavy_shell.removeAttribute(
                        'disabled'
                    );
                    break;
                case ItemType.MEDICAL:
                    manu_registry.control.medical.removeAttribute('disabled');
                    break;
                case ItemType.UTILITIES:
                    manu_registry.control.utilities.removeAttribute('disabled');
                    break;
                case ItemType.UNIFORM:
                    manu_registry.control.uniform.removeAttribute('disabled');
                    break;
            }
        }
    });
}

function show_popup(popup_element: HTMLElement, item_type: ItemType) {
    if (anim_timeouts[item_type] == -1) {
        popup_element.innerText = '1';
        popup_element.className = 'manu-button-popup-show';

        anim_timeouts[item_type] = window.setTimeout(() => {
            popup_element.className = 'manu-button-popup-hidden';
            anim_timeouts[item_type] = -1;
        }, 3000);
    } else {
        popup_element.innerText = (
            parseInt(popup_element.innerText) + 1
        ).toString();
        window.clearTimeout(anim_timeouts[item_type]);
        anim_timeouts[item_type] = window.setTimeout(() => {
            popup_element.className = 'manu-button-popup-hidden';
            anim_timeouts[item_type] = -1;
        }, 3000);
    }
}

export namespace ManuScreen {
    /**
     * Initialize the component.
     *
     * Must be called on DOM initialization, otherwise calls might fail.
     */
    export function init() {
        manu_registry = DomRegistry.get_manu_registry();
        manu_data = new ManuData();
        anim_timeouts = ItemType.get_iterator().map(() => -1);

        manu_registry.control.light_arm.addEventListener('click', () => {
            add_queue(ItemType.LIGHT_ARM);
            show_popup(manu_registry.popup.light_arm, ItemType.LIGHT_ARM);
        });
        manu_registry.control.heavy_arm.addEventListener('click', () => {
            add_queue(ItemType.HEAVY_ARM);
            show_popup(manu_registry.popup.heavy_arm, ItemType.HEAVY_ARM);
        });
        manu_registry.control.heavy_shell.addEventListener('click', () => {
            add_queue(ItemType.HEAVY_SHELL);
            show_popup(manu_registry.popup.heavy_shell, ItemType.HEAVY_SHELL);
        });
        manu_registry.control.utilities.addEventListener('click', () => {
            add_queue(ItemType.UTILITIES);
            show_popup(manu_registry.popup.utilities, ItemType.UTILITIES);
        });
        manu_registry.control.medical.addEventListener('click', () => {
            add_queue(ItemType.MEDICAL);
            show_popup(manu_registry.popup.medical, ItemType.MEDICAL);
        });
        manu_registry.control.uniform.addEventListener('click', () => {
            add_queue(ItemType.UNIFORM);
            show_popup(manu_registry.popup.uniform, ItemType.UNIFORM);
        });
        manu_registry.control.submit_button.addEventListener(
            'click',
            submit_items
        );

        manu_registry.stop_manu_button.addEventListener('click', () => {
            manu_data.clear_staged_items();
            StatScreen.update_manu_stat(start_time, manu_data);
            ConfigScreen.update(manu_data);
            ResultScreen.show(
                manu_data,
                manu_registry.stat_label.time_spent.innerText
            );
            clearInterval(time_ref);
            manu_registry.stop_manu_button.className = 'hidden';
            manu_registry.root_element.className = 'hidden';
        });
    }

    /**
     * Switch the screen to manu screen.
     *
     * @param config_data The configuration data package
     */
    export function show(config_data: ConfigData) {
        manu_data.start_manu(config_data);
        DomRegistry.get_title().innerText = 'Manu';

        start_time = Date.now();
        time_ref = setInterval(() => {
            // create a timer that track how much time has passed since manu start
            const current_time = Date.now();
            manu_registry.stat_label.time_spent.innerText = duration_to_string(
                current_time - start_time
            );
        }, 1000);

        manu_registry.stat_label.time_spent.innerText = '0s';

        refresh_item_cards();
        refresh_buttons();

        manu_registry.stop_manu_button.className = 'accent';
        manu_registry.root_element.className = '';
    }
}
