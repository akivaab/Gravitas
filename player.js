import { Game } from "./main.js";

export class Player {
    /**
     * @constructor
     * @param {Game} game
     */
    constructor(game) {
        this.game = game;
        this.width = 49.0625; //68.125?
        this.height = 62; //87?
        this.x = 0;
        this.y = this.game.height - this.height;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.maxFrame = 16;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.speed = 10;
        this.normalGravity = true;
        this.verticalY = 0;
    }
    /**
     * @param {string[]} input 
     * @param {number} deltaTime 
     */
    update(input, deltaTime) {
        //horizontal movement
        if (input.includes('ArrowLeft')) this.x -= this.speed;
        else if (input.includes('ArrowRight')) this.x += this.speed;
        if (this.x < 0) this.x = 0;
        else if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        //vertical movement
        if (input.includes(' ')) {
            this.normalGravity = false;
            this.verticalY = -30;
        }
        else {
            this.normalGravity = true;
            this.verticalY = 30;
        }
        if (this.onGround()) this.verticalY = 0;
        this.y += this.verticalY;
        if (this.y < 0) this.y = 0;
        else if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;

        //frame change
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            this.frameX = (this.frameX + 1) % this.maxFrame;
        }
        else {
            this.frameTimer += deltaTime;
        }
    }
    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height,
            this.x, this.y, this.width, this.height);
    }
    onGround() {
        if (this.normalGravity) return this.y >= this.game.height - this.height;
        else return this.y <= 0;
    }
}