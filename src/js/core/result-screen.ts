import { achievement_data } from '../data/achievement-data';
import { item_data } from '../data/item-data';
import {
    get_color_class,
    get_image_path,
    get_template_elements,
    number_formatter,
} from '../helper';
import { Cost } from '../types/item-cost';
import type { ManuData } from '../types/manu-data';
import type { ItemCraftedEntry } from '../types/user-data';
import { DomRegistry, type ResultRegistry } from './dom-registry';
import { StatScreen } from './stat-screen';

let result_registry: ResultRegistry;

export namespace ResultScreen {
    /**
     * Initialize the component.
     *
     * Must be called on DOM initialization, otherwise calls might fail.
     */
    export function init() {
        result_registry = DomRegistry.get_result_registry();

        result_registry.return_button.addEventListener('click', () => {
            result_registry.root_element.className = 'hidden';
            result_registry.return_button.className = 'hidden';
            StatScreen.show();
        });
    }

    /**
     * Switch to the result screen.
     *
     * @param queued_item The to-manu list
     * @param time Time spent manuing
     */
    export function show(manu_data: ManuData, time: string) {
        result_registry.item_crafted.innerHTML = '';
        result_registry.time_spent.innerText = time;
        result_registry.root_element.className = '';
        result_registry.return_button.className = 'accent';
        DomRegistry.get_title().innerText = 'Result';

        const amount_crafted = manu_data.crate_crafted;
        const total_cost = new Cost();
        const shockbot_output: ItemCraftedEntry[] = [];

        manu_data.data.forEach((row) => {
            row.filter((item) => item.crafted_amount !== 0).forEach((item) => {
                total_cost.add_multiple(
                    item.crafted_amount,
                    item_data[item.id].cost
                );
                add_line(item.id, item.crafted_amount);
                shockbot_output.push({
                    id: item_data[item.id].shockbot_id,
                    amount: item.crafted_amount,
                });
            });
        });

        result_registry.crate_crafted.innerText = amount_crafted.toString();
        result_registry.bmat_used.innerText = number_formatter.format(
            total_cost.bmat
        );
        result_registry.emat_used.innerText = number_formatter.format(
            total_cost.emat
        );
        result_registry.hemat_used.innerText = number_formatter.format(
            total_cost.hemat
        );
        result_registry.rmat_used.innerText = number_formatter.format(
            total_cost.rmat
        );

        if (amount_crafted > 720) {
            result_registry.carrier_equivalent.innerText = (
                amount_crafted / 720
            )
                .toFixed(1)
                .toString()
                .concat(' trains');
        } else if (amount_crafted > 300) {
            result_registry.carrier_equivalent.innerText = (
                amount_crafted / 300
            )
                .toFixed(1)
                .toString()
                .concat(' freighters');
        } else if (amount_crafted > 60) {
            result_registry.carrier_equivalent.innerText = (amount_crafted / 60)
                .toFixed(1)
                .toString()
                .concat(' flatbeds');
        } else {
            result_registry.carrier_equivalent.innerText = (amount_crafted / 15)
                .toFixed(1)
                .toString()
                .concat(' trucks');
        }

        result_registry.achievement_unlocked.innerHTML = '';

        const unlocked_achivements = StatScreen.get_unlocked_achivements();

        if (unlocked_achivements.length === 0) {
            result_registry.achievement_unlocked.className = 'hidden';
            result_registry.achievement_header.className = 'hidden';
        } else {
            result_registry.achievement_unlocked.className = 'table';
            result_registry.achievement_header.className = 'result-hd';

            unlocked_achivements.forEach((entry) => {
                const achievement_card_template =
                    DomRegistry.get_achivement_card().cloneNode(
                        true
                    ) as HTMLTemplateElement;
                const card_elements = get_template_elements(
                    achievement_card_template,
                    [
                        'achievement-name',
                        'achievement-howto',
                        'achievement-fluff',
                    ]
                );
                const achievement =
                    achievement_data[entry.id].tiers[entry.tier];

                card_elements['achievement-name'].textContent =
                    achievement.name;
                card_elements['achievement-howto'].textContent =
                    achievement.condition_text;
                card_elements['achievement-fluff'].textContent =
                    achievement.deco_text;

                result_registry.achievement_unlocked.appendChild(
                    achievement_card_template.content
                );
            });
        }

        result_registry.shockbot_export.value = JSON.stringify(shockbot_output);

        function add_line(item_id: number, amount: number) {
            const item = item_data[item_id];
            if (item === undefined) return;

            const template = result_registry.item_card_template.cloneNode(
                true
            ) as HTMLTemplateElement;
            const template_elements = get_template_elements(template, [
                'item-card',
                'item-name',
                'item-image',
                'item-amount',
            ]);

            template_elements['item-name'].innerText = item.name;
            (template_elements['item-image'] as HTMLImageElement).src =
                get_image_path(item.type);
            template_elements['item-amount'].innerHTML = amount.toString();
            template_elements['item-card'].className +=
                ' ' + get_color_class(item.type);

            result_registry.item_crafted.appendChild(template.content);
        }
    }
}
