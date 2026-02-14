import { Cost } from './item-cost';

export type ExportData = { version: number; data: string };
export const CURRENT_VERSION = 2;
export function make_empty_user_data(): UserDataV2 {
    return {
        crate_crafted: 0,
        material_consumed: new Cost(),
        item_crafted: [],
        time_spent: 0,
        war_snapshot: {
            crate_crafted: 0,
            material_consumed: new Cost(),
            time_spent: 0,
        },
    };
}

export type UserDataV2 = {
    crate_crafted: number;
    material_consumed: Cost;
    item_crafted: ItemCraftedEntry[];
    time_spent: number;
    war_snapshot: {
        crate_crafted: number;
        material_consumed: Cost;
        time_spent: number;
    };
};

export type UserDataV1 = {
    crate_crafted: number;
    material_consumed: Cost;
    item_crafted: ItemCraftedEntry[];
    time_spent: number;
};

export type ItemCraftedEntry = {
    id: number;
    amount: number;
};
