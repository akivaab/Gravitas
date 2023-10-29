import { Game } from "./main.js";

export class AudioPlayer {
    /**
     * @constructor
     * @param {Game} game 
     */
    constructor(game) {
        this.game = game;
        this.sfxVolume = document.getElementById('sfx-volume').value / 100;
        this.laserWarningSound = new Audio('assets/laserWarning.mp3');
        this.laserSound = new Audio('assets/laser.ogg');
        this.gravityInvertSound = new Audio('assets/gravityInvertOn.ogg');
    }
    playLaserWarning() {
        this.laserWarningSound = new Audio('assets/laserWarning.mp3');
        this.laserWarningSound.volume = this.sfxVolume;
        this.laserWarningSound.play();
    }
    playLaser() {
        this.laserSound = new Audio('assets/laser.ogg');
        this.laserSound.volume = this.sfxVolume;
        this.laserSound.play();
    }
    /**
     * @param {boolean} on - is the gravity inverted
     */
    playGravityInvert(on) {
        this.gravityInvertSound.pause();
        this.gravityInvertSound = new Audio('assets/gravityInvert' + (on ? 'On' : 'Off') + '.ogg');
        this.gravityInvertSound.volume = this.sfxVolume;
        this.gravityInvertSound.play();
    }
}