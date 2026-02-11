/**
 * Enumeration of all possible priority.
 */
export enum Priority {
    NO_PRIORITY,
    PRIORITY,
    HIGH_PRIORITY,
}

export namespace Priority {
    /**
     * Translate a priority string to a value of enum Priority
     *
     * @argument priority String of the priority value
     * @return Corresponding priority value, or undefined
     */
    export function to_self(priority: string): Priority {
        switch (priority) {
            case '-':
                return Priority.NO_PRIORITY;
            case 'Priority':
                return Priority.PRIORITY;
            case 'High Priority':
                return Priority.HIGH_PRIORITY;
            default:
                throw new Error('Invalid priority string');
        }
    }

    /**
     * Translate a Priority into string representation
     *
     * @argument priority
     * @return Corresponding string representation
     */
    export function to_string(priority: Priority): string {
        switch (priority) {
            case Priority.NO_PRIORITY:
                return '';
            case Priority.PRIORITY:
                return 'Priority';
            case Priority.HIGH_PRIORITY:
                return 'High Priority';
        }
    }
}
