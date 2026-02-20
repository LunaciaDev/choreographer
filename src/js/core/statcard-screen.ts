import { DomRegistry, type StatcardRegistry } from './dom-registry';
import type { UserData } from '../types/user-data';
import { StatScreen } from './stat-screen';
import { duration_to_string, number_formatter } from '../helper';
import { item_data } from '../data/item-data';
import { Cost } from '../types/item-cost';
import { ItemType } from '../types/item-type';

type TextMeasurement = {
    width: number;
    height: number;
};

let statcard_registry: StatcardRegistry;
let user_data: UserData;
// Offscreen Canvas is not used due to 94% support - The draw ops are not too intensive anyway
let canvas_name: HTMLCanvasElement;
let canvas_avatar: HTMLCanvasElement;
let canvas_stats: HTMLCanvasElement;
let canvas_composite: HTMLCanvasElement;
// User-input elements
let user_avatar: HTMLImageElement | null = null;
let user_name: string = 'Unknown Manufacturer';
let user_clantag: string = 'FMAT';

// Color Configuration
const text_color = '#cdd6f4';
const text_unit = '#bac2de';
const text_accent = '#a6adc8';
const background_color = '#1e1e2e';
const accent_color = '#9399b2';
const bmat_color = '#f5b994';
const emat_color = '#fdcc9b';
const hemat_color = '#f9dea6';
const rmat_color = '#bdc3d8';
const get_item_color = (item_type: ItemType): string => {
    switch (item_type) {
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
};

function load_file(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
        const image = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            image.onload = () => {
                resolve(image);
            };

            image.src = e.target?.result as string;
        };

        reader.readAsDataURL(file);
    });
}

function measure_text(
    text: string,
    context: CanvasRenderingContext2D
): TextMeasurement {
    const metric = context.measureText(text);
    return {
        width:
            Math.abs(metric.actualBoundingBoxLeft) +
            Math.abs(metric.actualBoundingBoxRight),
        height:
            Math.abs(metric.actualBoundingBoxAscent) +
            Math.abs(metric.actualBoundingBoxDescent),
    };
}

/*
 * Perform naive text-breaking to achieve the target_width.
 * This only break on space, so if a block is too long without spaces, it will not break.
 */
function break_up_text(
    context: CanvasRenderingContext2D,
    text: string,
    target_width: number
): string[] {
    const components = text.split(' ');

    let line = components[0];
    const result: string[] = [];

    for (const part of components.slice(1)) {
        if (measure_text(line + ' ' + part, context).width < target_width) {
            line += ' ' + part;
            continue;
        }

        result.push(line);
        line = part;
    }

    result.push(line);
    return result;
}

function draw_composite_canvas() {
    const context = canvas_composite.getContext('2d');

    if (context !== null) {
        context.save();
        // Clear the canvas
        context.clearRect(
            0,
            0,
            canvas_composite.width,
            canvas_composite.height
        );

        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas_composite.width, canvas_composite.height);

        context.drawImage(canvas_name, 0, 0);
        context.translate(0, 150);
        context.drawImage(canvas_stats, 0, 0);
        context.restore();
    }
}

function draw_avatar() {
    const context = canvas_avatar.getContext('2d');

    if (context !== null) {
        context.save();
        context.clearRect(0, 0, canvas_avatar.width, canvas_avatar.height);

        if (user_avatar !== null) {
            context.drawImage(
                user_avatar,
                0,
                0,
                canvas_avatar.width,
                canvas_avatar.height
            );
        } else {
            context.fillStyle = accent_color;
            context.fillRect(0, 0, canvas_avatar.width, canvas_avatar.height);
        }

        // Clip the context to a circle
        context.fillStyle = '#fff';
        context.globalCompositeOperation = 'destination-in';
        context.beginPath();
        context.arc(
            canvas_avatar.width / 2,
            canvas_avatar.width / 2,
            canvas_avatar.width / 2,
            0,
            Math.PI * 2
        );
        context.closePath();
        context.fill();

        context.restore();
    }
}

function draw_nameplate_canvas() {
    const context = canvas_name.getContext('2d');
    let width = canvas_name.width;
    let height = canvas_name.height;

    if (context !== null) {
        context.save();
        // Clear the canvas
        context.fillStyle = background_color;
        context.fillRect(0, 0, width, height);

        context.translate(20, 20);
        width -= 40;
        height -= 40;

        context.drawImage(canvas_avatar, 0, 0);

        context.textBaseline = 'top';
        context.fillStyle = text_accent;
        context.font = '20px monospace';
        const clantag_height = measure_text(
            '[' + user_clantag + ']',
            context
        ).height;
        context.fillText('[' + user_clantag + ']', height + 10, 23);

        context.fillStyle = text_color;
        context.font = '45px sans-serif';
        context.fillText(user_name, height + 10, 27 + clantag_height);

        // Draw Lifetime Stats, from the right
        context.translate(width, 0);
        context.textAlign = 'right';
        [
            [
                (user_data.crate_crafted / (user_data.time_spent / 60)).toFixed(
                    2
                ),
                'avg. crates/minute',
                '#f5e0dc',
            ],
            [duration_to_string(user_data.time_spent), 'spent', '#89dceb'],
            [
                number_formatter.format(user_data.crate_crafted),
                'crates',
                '#eba0ac',
            ],
        ].forEach((value, index, array) => {
            context.textBaseline = 'top';
            context.font = 'bold 45px sans-serif';
            const value_size = measure_text(value[0], context);
            context.textBaseline = 'ideographic';
            context.font = '18px sans-serif';
            const label_size = measure_text(value[1], context);
            const margin =
                (height - value_size.height - label_size.height - 10) / 2;

            context.fillStyle = value[2];
            context.textBaseline = 'top';
            context.font = 'bold 45px sans-serif';
            context.fillText(value[0], 0, margin);
            context.fillStyle = text_unit;
            context.textBaseline = 'ideographic';
            context.font = '18px sans-serif';
            context.fillText(value[1], 0, height - margin);

            if (index < array.length - 1) {
                const group_width = Math.ceil(
                    Math.max(value_size.width, label_size.width)
                );
                context.fillRect(
                    -group_width - 31,
                    margin,
                    1,
                    value_size.height + label_size.height + 10
                );
                context.translate(-group_width - 61, 0);
            }
        });

        context.restore();
    }
}

function draw_stats_canvas() {
    const context = canvas_stats.getContext('2d');
    let width = canvas_stats.width;
    let height = canvas_stats.height;

    if (context !== null) {
        context.fillStyle = background_color;
        context.fillRect(0, 0, canvas_stats.width, canvas_stats.height);

        context.translate(20, 20);
        width -= 40;
        height -= 40;

        context.font = '25px monospace';
        context.textBaseline = 'middle';
        const header_size = measure_text('War 132 Stats', context);
        const accent_length = (width - header_size.width - 40) / 2;

        context.fillStyle = accent_color;
        context.fillRect(0, (header_size.height - 1) / 2, accent_length, 1);
        context.fillRect(
            width - accent_length,
            (header_size.height - 1) / 2,
            accent_length,
            1
        );
        context.fillStyle = text_accent;
        context.fillText(
            'War 132 Stats',
            accent_length + 20,
            header_size.height / 2
        );

        context.translate(0, header_size.height);
        height -= header_size.height;

        let section_height = height / 2;
        context.save();
        const war_cost = Object.assign(new Cost(), user_data.material_consumed);
        war_cost.subtract(user_data.war_snapshot.material_consumed);
        const war_crate =
            user_data.crate_crafted - user_data.war_snapshot.crate_crafted;
        const war_time =
            user_data.time_spent - user_data.war_snapshot.time_spent;

        [
            [number_formatter.format(war_crate), 'crates', '#eba0ac'],
            [duration_to_string(war_time), 'spent', '#89dceb'],
            [
                (war_crate / (war_time / 60)).toFixed(2),
                'avg. crates/minute',
                '#f5e0dc',
            ],
            [
                number_formatter.format(war_cost.bmat).toLowerCase(),
                'bmat',
                bmat_color,
            ],
            [
                number_formatter.format(war_cost.emat).toLowerCase(),
                'emat',
                emat_color,
            ],
            [
                number_formatter.format(war_cost.hemat).toLowerCase(),
                'hemat',
                hemat_color,
            ],
            [
                number_formatter.format(war_cost.rmat).toLowerCase(),
                'rmat',
                rmat_color,
            ],
        ].forEach((value, index, array) => {
            const section_width = width / array.length;
            context.textBaseline = 'top';
            context.font = 'bold 40px sans-serif';
            const value_size = measure_text(value[0], context);
            context.textBaseline = 'ideographic';
            context.font = '18px sans-serif';
            const label_size = measure_text(value[1], context);
            const margin_y =
                (section_height - value_size.height - label_size.height - 5) /
                2;

            context.fillStyle = value[2];
            context.textBaseline = 'top';
            context.font = 'bold 40px sans-serif';
            context.fillText(
                value[0],
                (section_width - value_size.width) / 2,
                margin_y
            );
            context.fillStyle = text_unit;
            context.textBaseline = 'ideographic';
            context.font = '18px sans-serif';
            context.fillText(
                value[1],
                (section_width - label_size.width) / 2,
                section_height - margin_y
            );

            if (index < array.length - 1) {
                context.fillRect(
                    section_width,
                    margin_y,
                    1,
                    value_size.height + label_size.height + 10
                );
                context.translate(section_width, 0);
            }
        });

        context.restore();
        context.translate(0, section_height);
        {
            context.font = '20px monospace';
            context.textBaseline = 'middle';
            const header_size = measure_text('Most Crafted Items', context);
            const accent_length = (width - header_size.width - 40) / 2;

            context.fillStyle = accent_color;
            context.fillRect(0, (header_size.height - 1) / 2, accent_length, 1);
            context.fillRect(
                width - accent_length,
                (header_size.height - 1) / 2,
                accent_length,
                1
            );
            context.fillStyle = text_accent;
            context.fillText(
                'Most Crafted Items',
                accent_length + 20,
                header_size.height / 2
            );
        }
        context.translate(0, 40);
        section_height -= 20;
        context.textBaseline = 'top';

        const item_crafted = Array.from(user_data.item_crafted);
        item_crafted
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 5)
            .forEach((item, index, array) => {
                context.save();
                const card_width = width / array.length - 40;
                context.translate(20, 0);

                context.fillStyle = text_color;
                context.font = '20px sans-serif';
                const name_height = measure_text(
                    item_data[item.id].name,
                    context
                ).height;
                context.save();
                break_up_text(
                    context,
                    item_data[item.id].name,
                    card_width
                ).forEach((section) => {
                    context.fillText(section, 0, 0);
                    context.translate(0, name_height + 5);
                });
                context.restore();

                context.translate(0, section_height - 20);

                context.font = 'bold 35px sans-serif';
                context.fillStyle = get_item_color(item_data[item.id].type);
                context.textBaseline = 'ideographic';
                const amount = number_formatter.format(item.amount);
                context.fillText(amount, 0, 0);
                const amount_width = measure_text(amount, context).width;
                context.font = '18px sans-serif';
                context.textBaseline = 'bottom';
                context.fillStyle = text_unit;
                context.fillText(
                    'crates (' +
                        (
                            (item.amount /
                                (user_data.crate_crafted -
                                    user_data.war_snapshot.crate_crafted)) *
                            100
                        ).toFixed(2) +
                        '%)',
                    amount_width + 5,
                    0
                );
                context.restore();
                context.translate(card_width + 40, 0);
                if (index < array.length - 1) {
                    context.fillRect(0, 0, 1, section_height - 20);
                }
            });
    }
}

export namespace StatcardScreen {
    export function init() {
        statcard_registry = DomRegistry.get_statcard_registry();
        canvas_name = document.createElement('canvas');
        canvas_stats = document.createElement('canvas');
        canvas_avatar = document.createElement('canvas');
        canvas_composite = document.createElement('canvas');

        // configure sizes
        canvas_name.setAttribute('width', '1500');
        canvas_name.setAttribute('height', '150');
        canvas_avatar.setAttribute('width', '110');
        canvas_avatar.setAttribute('height', '110');
        canvas_stats.setAttribute('width', '1500');
        canvas_stats.setAttribute('height', '300');
        canvas_composite.setAttribute('width', '1500');
        canvas_composite.setAttribute('height', '450');

        // Add hooks
        statcard_registry.name_input.addEventListener('input', () => {
            user_name = statcard_registry.name_input.value;
            draw_nameplate_canvas();
            draw_composite_canvas();
            statcard_registry.image.src =
                canvas_composite.toDataURL('image/png');
        });

        statcard_registry.clantag_input.addEventListener('input', () => {
            user_clantag = statcard_registry.clantag_input.value;
            draw_nameplate_canvas();
            draw_composite_canvas();
            statcard_registry.image.src =
                canvas_composite.toDataURL('image/png');
        });

        statcard_registry.avatar_input.addEventListener('change', async () => {
            const file_array = statcard_registry.avatar_input.files;

            if (file_array !== null && file_array.length > 0) {
                const image_file = file_array[0];
                user_avatar = await load_file(image_file);

                draw_avatar();
                draw_nameplate_canvas();
                draw_composite_canvas();
                statcard_registry.image.src =
                    canvas_composite.toDataURL('image/png');
            }
        });

        statcard_registry.return_button.addEventListener('click', () => {
            statcard_registry.root_element.className = 'hidden';
            statcard_registry.return_button.className = 'hidden';
            StatScreen.show();
        });
    }

    export function show() {
        user_data = StatScreen.get_user_data();
        DomRegistry.get_title().innerText = 'Statcard';
        statcard_registry.return_button.className = 'accent';
        statcard_registry.name_input.value = user_name;
        statcard_registry.clantag_input.value = user_clantag;

        draw_avatar();
        draw_nameplate_canvas();
        draw_stats_canvas();
        draw_composite_canvas();

        statcard_registry.image.src = canvas_composite.toDataURL('image/png');
        statcard_registry.root_element.className = '';
    }
}
