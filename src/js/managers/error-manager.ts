export class ErrorManager {
    location: HTMLElement;

    constructor(element: HTMLElement) {
        this.location = element;
    }

    reset() {
        this.location.innerText = '';
        this.location.className = 'hidden';
    }

    show(error: string) {
        this.location.innerText = error;
        this.location.className = 'error-popup';
    }
}
