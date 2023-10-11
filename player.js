import { Game } from "./main.js";

export class Player {
    /**
     * @constructor
     * @param {Game} game
     */
    constructor(game) {
        this.game = game;
        this.width = 49.0625;
        this.height = 62;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.image = document.getElementById('player');
        this.frameX = 0;
    }
    update() {

    }
    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height,
            this.x, this.y, this.width, this.height);
    }
}