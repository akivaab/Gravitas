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
            if (e.key === ' ') this.game.audioPlayer.playGravityInvert(true);
        });
        window.addEventListener('keyup', e => {
            if (    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === ' ') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            if (e.key === ' ') this.game.audioPlayer.playGravityInvert(false);
            if (e.key === 'n' || e.key === 'p') {
                if (!this.game.start && !this.game.gameOver) this.game.paused = !this.game.paused;
                const pauseButton = document.getElementById('pause-screen');
                pauseButton.style.display = this.game.paused ? 'flex' : 'none';
            }
        });
        document.getElementById('play-button').addEventListener('click', e => {
            document.getElementById('start-screen').style.display = 'none';
            this.game.start = false;
        });
    }
}