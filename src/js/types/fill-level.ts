export enum FillLevel {
    CRITICAL,
    LOW,
    OK,
}

export namespace FillLevel {
    /**
     * Get the iterator of the enum
     *
     * @returns Array of keys of the enum
     */
    export function get_iterator(): FillLevel[] {
        return Object.values(FillLevel).filter(
            (v) => typeof v === 'number'
        ) as FillLevel[];
    }

    export function to_string(fill_level: FillLevel): string {
        switch (fill_level) {
            case FillLevel.CRITICAL:
                return 'Critical';
            case FillLevel.LOW:
                return 'Low';
            case FillLevel.OK:
                return 'Okay-ish';
            default:
                throw new Error('Invalid FillLevel was passed in');
        }
    }

    export function to_self(fill_level: string): FillLevel {
        switch (fill_level) {
            case 'critical':
                return FillLevel.CRITICAL;
            case 'low':
                return FillLevel.LOW;
            case 'okayish':
                return FillLevel.OK;
            default:
                throw new Error('Invalid fill_level string');
        }
    }
}
