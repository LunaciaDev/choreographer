import { ItemType } from './item-type';

export type ItemData = {
    name: string;
    alt_names?: string[];
    type: ItemType;
    cost: {
        bmat: number;
        emat: number;
        hemat: number;
        rmat: number;
    };
};
