export class InputHandler {
    /**
     * @constructor
     */
    constructor() {
        this.keys = [];
        window.addEventListener('keydown', e => {
            if ((   e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === ' '
                ) && !this.keys.includes(e.key)) {
                this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup', e => {
            if (    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === ' ') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}