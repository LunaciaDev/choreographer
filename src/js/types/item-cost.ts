/**
 * The helper Cost class!
 *
 * It makes adding/subtracting Cost struct a lot more simpler, with built-in
 * toString as well.
 */
export class Cost {
    bmat: number;
    emat: number;
    hemat: number;
    rmat: number;

    constructor() {
        this.bmat = 0;
        this.emat = 0;
        this.hemat = 0;
        this.rmat = 0;
    }

    add(cost: { bmat: number; emat: number; hemat: number; rmat: number }) {
        this.bmat += cost.bmat * 4;
        this.emat += cost.emat * 4;
        this.hemat += cost.hemat * 4;
        this.rmat += cost.rmat * 4;
    }

    add_multiple(
        amount: number,
        cost: { bmat: number; emat: number; hemat: number; rmat: number }
    ) {
        this.bmat += cost.bmat * amount;
        this.emat += cost.emat * amount;
        this.hemat += cost.hemat * amount;
        this.rmat += cost.rmat * amount;
    }

    subtract(cost: {
        bmat: number;
        emat: number;
        hemat: number;
        rmat: number;
    }) {
        this.bmat -= cost.bmat;
        this.emat -= cost.emat;
        this.hemat -= cost.hemat;
        this.rmat -= cost.rmat;
    }

    subtract_multiple(
        amount: number,
        cost: {
            bmat: number;
            emat: number;
            hemat: number;
            rmat: number;
        }
    ) {
        this.bmat -= cost.bmat * amount;
        this.emat -= cost.emat * amount;
        this.hemat -= cost.hemat * amount;
        this.rmat -= cost.rmat * amount;
    }

    reset() {
        this.bmat = 0;
        this.emat = 0;
        this.hemat = 0;
        this.rmat = 0;
    }

    /**
     * Get the amount of slots needed to carry the cost.
     */
    get_cost_in_slots(): number {
        return (
            Math.ceil(this.bmat / 100) +
            Math.ceil(this.emat / 100) +
            Math.ceil(this.rmat / 100) +
            Math.ceil(this.hemat / 100)
        );
    }

    /**
     * If we add this cost, how many slots is needed to carry?
     *
     * The cost is not modified.
     */
    get_theoretical_cost_in_slots(cost: {
        bmat: number;
        emat: number;
        hemat: number;
        rmat: number;
    }): number {
        return (
            Math.ceil((this.bmat + cost.bmat * 4) / 100) +
            Math.ceil((this.emat + cost.emat * 4) / 100) +
            Math.ceil((this.rmat + cost.rmat * 4) / 100) +
            Math.ceil((this.hemat + cost.hemat * 4) / 100)
        );
    }

    /**
     * Convert the cost to the string representation.
     */
    to_string(): string {
        const component: string[] = [];

        component.push(`${this.bmat}b`);

        if (this.emat !== 0) {
            component.push(`${this.emat}e`);
        }

        if (this.rmat !== 0) {
            component.push(`${this.rmat}r`);
        }

        if (this.hemat !== 0) {
            component.push(`${this.hemat}he`);
        }

        return component.join(', ');
    }

    /**
     * Convert ANY cost struct to it's string representation.
     */
    static make_cost_string(cost: {
        bmat: number;
        emat: number;
        hemat: number;
        rmat: number;
    }) {
        const component: string[] = [];

        if (cost.bmat !== 0) {
            component.push(`${cost.bmat}b`);
        }

        if (cost.emat !== 0) {
            component.push(`${cost.emat}e`);
        }

        if (cost.rmat !== 0) {
            component.push(`${cost.rmat}r`);
        }

        if (cost.hemat !== 0) {
            component.push(`${cost.hemat}he`);
        }

        return component.join(', ');
    }
}
