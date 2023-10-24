import { Game } from "./main.js";

export class InputHandler {
    /**
     * @constructor
     * @param {Game} game
     */
    constructor(game) {
        this.game = game;
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
            if (e.key === 'n' || e.key === 'p') {
                this.game.paused = !this.game.paused;
            }
        });
    }
}