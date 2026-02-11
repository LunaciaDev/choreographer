import { item_data } from '../data/item-data';
import { ErrorManager } from '../managers/error-manager';
import { FillLevel } from '../types/fill-level';
import { Priority } from '../types/priority';
import { ConfigScreen } from './config-screen';
import { DomRegistry } from './dom-registry';

let logihub_input: HTMLTextAreaElement;
let error_manager: ErrorManager;

type LoghubItem = {
    name: string;
    amount: number;
    priority: string;
    percentage: number;
};

/**
 * Translate Logihub item name to internal name used in the app.
 *
 * Throws an Error if we cannot find an item with that name.
 *
 * @param name
 * @returns The internal id of the item
 */
function to_internal(name: string): number {
    for (let id = 0; id < item_data.length; id++) {
        const item = item_data[id];

        if (item.alt_names !== undefined) {
            if (item.alt_names.find((val) => val === name) !== undefined) {
                return id;
            }
        }

        if (item.name === name) {
            return id;
        }
    }

    error_manager.show(
        `Failed to translate ${name} to internal id; Most likely a bug!`
    );
    throw new Error(`Failed to translate ${name} to internal id`);
}

export namespace LogihubImporter {
    /**
     * Initialize the component.
     *
     * Must be called on DOM initialization, otherwise calls might fail.
     */
    export function init() {
        const logihub_registry =
            DomRegistry.get_config_registry().logihub_input;
        logihub_input = logihub_registry.input;
        logihub_registry.submit_button.addEventListener('click', () => {
            error_manager.reset();
            import_items();
        });

        logihub_registry.logihub_help.addEventListener('click', (event) => {
            if (event.target !== logihub_registry.logihub_help) {
                return;
            }

            logihub_registry.logihub_help.className = 'hidden';
        });
        logihub_registry.show_logihub_help.addEventListener('click', () => {
            logihub_registry.logihub_help.className = 'overlay';
        });

        error_manager = new ErrorManager(logihub_registry.error_info);
    }

    /**
     * Convert the Logihub export JSON to internal data.
     *
     * The export is already roughly what we wanted, except the name.
     * So we need to translate the name to what we use.
     */
    export function import_items() {
        const raw_data = logihub_input.value;
        if (raw_data === null) return;

        try {
            const items = JSON.parse(raw_data) as LoghubItem[];

            for (const item of items) {
                const id = to_internal(item.name);
                const priority = Priority.to_priority(item.priority);
                let fill_level: FillLevel;

                if (item.percentage <= 0.25) {
                    fill_level = FillLevel.CRITICAL;
                } else if (item.percentage <= 0.75) {
                    fill_level = FillLevel.LOW;
                } else {
                    fill_level = FillLevel.OK;
                }

                ConfigScreen.add_item(
                    id,
                    priority,
                    item.amount,
                    fill_level,
                    item.percentage
                );
            }

            logihub_input.value = '';
        } catch (e) {
            if (e instanceof SyntaxError) {
                error_manager.show(
                    'The export is malformed. Please check if you have copied everything.'
                );
                return;
            } else {
                error_manager.show(
                    'Something very wrong happened. Please send Lunacia the console log, if possible.'
                );
                throw e;
            }
        }
    }
}
