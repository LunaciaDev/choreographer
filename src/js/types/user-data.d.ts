import type { Cost } from './item-cost';

export type ExportData = { version: number; data: string };

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
