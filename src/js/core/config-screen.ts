import { item_data } from '../data/item-data';
import {
    get_color_class,
    get_image_path,
    get_template_elements,
} from '../helper';
import { ErrorManager } from '../managers/error-manager';
import { ConfigData } from '../types/config-data';
import { FillLevel } from '../types/fill-level';
import { Cost } from '../types/item-cost';
import type { ManuData } from '../types/manu-data';
import { Priority } from '../types/priority';

import {
    DomRegistry,
    type ConfigManualInput,
    type ConfigRegistry,
} from './dom-registry';
import { ManuScreen } from './manu-screen';

let config_data: ConfigData;
let config_registry: ConfigRegistry;
let manual_input_registry: ConfigManualInput;
let error_manager: ErrorManager;

/**
 * As inputs are hinted, but not enforced, we need to double check
 * to make sure that everything is a-OK!
 *
 * - Name has to be one of the item's name.
 * - Priority has to be one of the possible value.
 * - Amount must be integer > 0.
 *
 * [TODO]: Create responses based on the sanitization result
 */
function sanitize_input() {
    const name = manual_input_registry.item_name.value;
    const raw_priority = manual_input_registry.item_priority.value;
    const raw_amount = manual_input_registry.item_amount.value;

    if (name === null) {
        error_manager.show('Item name cannot be empty!');
        return;
    }

    if (raw_amount === null) {
        error_manager.show('Item amount cannot be empty!');
        return;
    }

    const amount = parseInt(raw_amount);

    if (amount <= 0 || isNaN(amount)) {
        error_manager.show('Item amount is not a number!');
        return;
    }

    let itemID;

    for (let id = 0; id < item_data.length; id++) {
        const item = item_data[id];

        if (item.name === name) {
            itemID = id;
            break;
        }
    }

    if (itemID === undefined) {
        error_manager.show(
            'Cannot find the item in the item definition list. Maybe a bug?'
        );
        return;
    }

    const priority = Priority.to_priority(raw_priority);

    manual_input_registry.item_name.value = '';
    manual_input_registry.item_amount.value = '';

    ConfigScreen.add_item(itemID, priority, amount, FillLevel.CUSTOM, -1);
}

/**
 * Rebuild the UI showing all the item to manufacture.
 *
 * We clear the entire thing and rebuild from scratch.
 */
function refresh_view() {
    const data_registry = config_registry.data_view;
    const card_template_ref = data_registry.item_card_template;
    const section_template_ref = data_registry.item_section_template;

    data_registry.root_element.innerHTML = '';

    FillLevel.get_iterator().forEach((fill_level) => {
        const data = config_data.get_data(fill_level);

        if (data.length == 0) return;

        const section_template = section_template_ref.cloneNode(
            true
        ) as HTMLTemplateElement;
        const section_template_elements = get_template_elements(
            section_template,
            ['item-section', 'item-section-title', 'item-section-cards']
        );

        section_template_elements['item-section-title'].textContent =
            FillLevel.to_string(fill_level);

        data.forEach((item_ref) => {
            const card_template = card_template_ref.cloneNode(
                true
            ) as HTMLTemplateElement;
            const card_template_elements = get_template_elements(
                card_template,
                [
                    'item-card',
                    'item-name',
                    'item-image',
                    'item-amount',
                    'item-cost',
                    'item-priority',
                    'remove-card',
                ]
            );
            const item = item_data[item_ref.id];

            card_template_elements['item-name'].textContent = item.name;
            (card_template_elements['item-image'] as HTMLImageElement).src =
                get_image_path(item.type);

            card_template_elements['item-amount'].textContent =
                item_ref.amount.toString();
            card_template_elements['item-cost'].textContent =
                Cost.make_cost_string(item.cost);
            card_template_elements['item-priority'].textContent =
                Priority.to_string(item_ref.priority);
            card_template_elements['remove-card'].addEventListener(
                'click',
                () => {
                    config_data.remove_item(item_ref.id, item_ref.fill_level);
                    card_template_elements['item-card'].remove();
                }
            );
            card_template_elements['item-card'].className +=
                ' ' + get_color_class(item.type);
            section_template_elements['item-section-cards'].appendChild(
                card_template.content
            );
        });

        data_registry.root_element.appendChild(section_template.content);
    });
}

export namespace ConfigScreen {
    /**
     * Initialize the component.
     *
     * Must be called on DOM initialization, otherwise calls might fail.
     */
    export function init() {
        config_data = new ConfigData();

        config_registry = DomRegistry.get_config_registry();

        manual_input_registry = config_registry.manual_input;
        manual_input_registry.submit_button.addEventListener('click', () => {
            error_manager.reset();
            sanitize_input();
        });

        // Populate item name input with possible options
        for (const item of item_data.values()) {
            const item_name = document.createElement('option');
            item_name.value = item.name;
            manual_input_registry.item_datalist.appendChild(item_name);
        }

        config_registry.start_manu.addEventListener('click', () => {
            config_registry.start_manu.className = 'hidden';
            config_registry.root_element.className = 'hidden';
            ManuScreen.show(config_data);
        });

        error_manager = new ErrorManager(
            config_registry.manual_input.error_info
        );
    }

    /**
     * Change the current screen to Config Screen.
     */
    export function show() {
        config_registry.root_element.className = '';
        config_registry.start_manu.className = 'accent';
        DomRegistry.get_title().innerText = 'Config';

        refresh_view();
    }

    export function update(manu_data: ManuData) {
        config_data.update(manu_data);
    }

    /**
     * Add an item to the to-manu list.
     *
     * If the item already exist in the list, overwrite it.
     *
     * @param id The item's internal ID
     * @param priority The item's priority
     * @param amount The amount to manu
     * @param fill_level The fill level reported by LogiHub; User-submission always has fill level CUSTOM.
     * @param fill_amount How much of the item is filled right now; Value is undefined for CUSTOM level
     */
    export function add_item(
        id: number,
        priority: Priority,
        amount: number,
        fill_level: FillLevel,
        fill_amount: number
    ) {
        const item_type = item_data[id].type;
        if (item_type === undefined) return;

        config_data.add_item(id, amount, priority, fill_level, fill_amount);
        refresh_view();
    }
}
