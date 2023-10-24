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
        this.fontFamily = 'Orbitron';
    }
    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        this.healthDepleter.style.height = (100 - this.game.player.health) + '%';
        const totalSeconds = Math.floor(this.game.time / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        this.timer.innerHTML = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
        if (this.game.paused) {
            context.save();
            context.font = '100px ' + this.fontFamily;
            context.fillStyle = 'black';
            context.textAlign = 'center';
            context.fillText('PAUSED', 500, 300);
            context.restore();
        }
    }
}