import { ItemType } from './types/item-type';

import lightarm_img from '../images/smallarm.png';
import heavyarm_img from '../images/heavyarm.png';
import heavyshell_img from '../images/heavyammo.png';
import uniform_img from '../images/uniform.png';
import medical_img from '../images/medical.png';
import utilities_img from '../images/utility.png';

/**
 * When using template, we need to clone and get references
 * of various classes inside in order to write specific data
 * Which require constantly checking for whether if that
 * element query is null or not.
 *
 * This helper automatically do that, throw if any specified
 * classes cannot be found.
 *
 * The helper use generic, because for some reason Intellisense
 * generate hint for the class name when using generic.
 *
 * @example
 * const itemCardElemsRef = getNodeOrThrow(itemCardRef, ['item-name', 'item-amount', 'item-cost']);
 * // get a reference
 * itemCardElemsRef['item-name']
 *
 * @param root The root element to search from
 * @param class_names A list of class names, not prefixed
 * @returns A Record holding reference to the first instance
 * of the class found.
 */
export function get_template_elements<T extends string>(
    root: HTMLTemplateElement,
    class_names: T[]
): Record<T, HTMLElement> {
    const nodes = {} as Record<T, HTMLElement>;

    for (const class_name of class_names) {
        const node = root.content.querySelector(`.${class_name}`);

        if (!node) {
            throw new Error(`Cannot find class ${class_name}`);
        }

        nodes[class_name] = node as HTMLElement;
    }

    return nodes;
}

const data: [number, string][] = [
    [60, 's'],
    [60, 'm'],
    [24, 'h'],
    [30, 'd'],
    [12, 'm'],
    [1, 'y'],
];

/**
 * Convert a duration in millisecond to a human-readable string.
 *
 * @param duration The duration in millisecond
 * @return A human-readable string representation of the duration
 */
export function duration_to_string(duration: number): string {
    if (isNaN(duration)) {
        return '0s';
    }

    const result = [];

    for (const row of data) {
        result.push(`${duration % row[0]}${row[1]}`);
        duration = Math.floor(duration / row[0]);
        if (duration === 0) break;
    }

    return result.reverse().slice(0, 3).join(' ');
}

export function get_color_class(item_type: ItemType): string {
    switch (item_type) {
        case ItemType.LIGHT_ARM:
            return 'lightarm';
        case ItemType.HEAVY_ARM:
            return 'heavyarm';
        case ItemType.HEAVY_SHELL:
            return 'heavyshell';
        case ItemType.MEDICAL:
            return 'medical';
        case ItemType.UTILITIES:
            return 'utilities';
        case ItemType.UNIFORM:
            return 'uniform';
    }
}

export function get_image_path(item_type: ItemType): string {
    switch (item_type) {
        case ItemType.LIGHT_ARM:
            return lightarm_img;
        case ItemType.HEAVY_ARM:
            return heavyarm_img;
        case ItemType.HEAVY_SHELL:
            return heavyshell_img;
        case ItemType.MEDICAL:
            return medical_img;
        case ItemType.UTILITIES:
            return utilities_img;
        case ItemType.UNIFORM:
            return uniform_img;
    }
}

export const number_formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumSignificantDigits: 4,
});
