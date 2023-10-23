import { Game } from "./main.js";

export class UI {
    /**
     * @constructor
     * @param {Game} game 
     */
    constructor(game) {
        this.game = game;
        this.healthDepleter = document.getElementById('health-bar-depleter');
        this.timer = document.getElementById('timer');
    }
    update() {
        this.healthDepleter.style.height = (100 - this.game.player.health) + '%';
        const totalSeconds = Math.floor(this.game.time / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        this.timer.innerHTML = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    }
}