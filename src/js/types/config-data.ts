import { item_data } from '../data/item-data';
import { FillLevel } from './fill-level';
import type { Item } from './item';
import type { ManuData } from './manu-data';
import { Priority } from './priority';

type ConfigItem = {
    amount: number;
    priority: Priority;
};

export class ConfigData {
    data: ConfigItem[][] = [];

    constructor() {
        this.data = FillLevel.get_iterator().map((): ConfigItem[] => {
            return item_data.map((): ConfigItem => {
                return {
                    amount: -1,
                    priority: Priority.NO_PRIORITY,
                };
            });
        });
    }

    add_manual_item(
        id: number,
        amount: number,
        priority: Priority,
        fill_level: FillLevel
    ) {
        this.data[fill_level][id].amount = amount;
        this.data[fill_level][id].priority = priority;
    }

    add_item(
        id: number,
        amount: number,
        priority: Priority,
        fill_level: FillLevel,
        fill_amount: number
    ) {
        switch (fill_level) {
            case FillLevel.CRITICAL: {
                const crate_limit = Math.ceil(amount / (1 - fill_amount));

                // craft up to 25% of the limit set by LogiHub
                const crit_sec_limit = Math.ceil(crate_limit * 0.25);

                this.data[fill_level][id].amount =
                    crit_sec_limit - (crate_limit - amount);
                this.data[fill_level][id].priority = priority;

                this.add_item(
                    id,
                    amount - this.data[fill_level][id].amount,
                    priority,
                    FillLevel.LOW,
                    0.25
                );
                break;
            }
            case FillLevel.LOW: {
                const crate_limit = Math.ceil(amount / (1 - fill_amount));

                // craft up to 75% of limit set by LogiHub
                const low_sec_limit = Math.ceil(crate_limit * 0.75);

                this.data[fill_level][id].amount =
                    low_sec_limit - (crate_limit - amount);
                this.data[fill_level][id].priority = priority;

                this.add_item(
                    id,
                    amount - this.data[fill_level][id].amount,
                    priority,
                    FillLevel.OK,
                    0.75
                );
                break;
            }
            case FillLevel.OK: {
                this.data[fill_level][id].amount = amount;
                this.data[fill_level][id].priority = priority;
                break;
            }
        }
    }

    remove_item(id: number, fill_level: FillLevel) {
        this.data[fill_level][id].amount = -1;
    }

    get_data(fill_level: FillLevel): Item[] {
        return this.data[fill_level]
            .map((item, index): Item => {
                return {
                    id: index,
                    amount: item.amount,
                    crafted_amount: 0,
                    priority: item.priority,
                    fill_level: fill_level,
                };
            })
            .filter((value): boolean => {
                return value.amount > 0;
            })
            .sort((a, b) => {
                // First sort by priority, then by amount.
                if (a.priority == b.priority) {
                    return b.amount - a.amount;
                }

                return b.priority - a.priority;
            });
    }

    update(manu_data: ManuData) {
        this.data = FillLevel.get_iterator().map(() => {
            return item_data.map((): ConfigItem => {
                return {
                    amount: 0,
                    priority: Priority.NO_PRIORITY,
                };
            });
        });

        manu_data.data.forEach((value) => {
            value.forEach((item) => {
                this.data[item.fill_level][item.id].amount =
                    item.amount - item.crafted_amount;
                this.data[item.fill_level][item.id].priority = item.priority;
            });
        });
    }
}
