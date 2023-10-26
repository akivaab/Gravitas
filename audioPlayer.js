import { Game } from "./main.js";

export class AudioPlayer {
    /**
     * @constructor
     * @param {Game} game 
     */
    constructor(game) {
        this.game = game;
        this.laserWarningSound = new Audio();
        this.laserSound = new Audio();
        this.gravityInvertSound = new Audio();
    }
    playLaserWarning() {
        this.laserWarningSound = new Audio('assets/laserWarning.mp3');
        this.laserWarningSound.play();
    }
    playLaser() {
        this.laserSound = new Audio('assets/laser.ogg');
        this.laserSound.play();
    }
    /**
     * @param {boolean} on - is the gravity inverted
     */
    playGravityInvert(on) {
        this.gravityInvertSound.pause();
        this.gravityInvertSound = new Audio('assets/gravityInvert' + (on ? 'On' : 'Off') + '.ogg');
        this.gravityInvertSound.play();
    }
}