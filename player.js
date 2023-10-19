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
        this.x = this.game.borderWidthMargin;
        this.y = this.game.height - this.height - this.game.borderHeightMargin;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.maxFrame = 16;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.horizontalSpeed = 10;
        this.verticalSpeed = 0;
        this.verticalMaxSpeed = 25;
        this.hitByAttack = false;
        this.health = 100;
        this.normalGravity = true;
    }
    /**
     * @param {string[]} input 
     * @param {number} deltaTime 
     */
    update(input, deltaTime) {
        //check collisions
        if (this.hitByAttack) {
            this.health--;
            if (this.health <= 0) {
                this.game.gameOver = true;
            }
        }

        //horizontal movement
        if (input.includes('ArrowLeft')) this.x -= this.horizontalSpeed;
        else if (input.includes('ArrowRight')) this.x += this.horizontalSpeed;
        if (this.x < this.game.borderWidthMargin) this.x = this.game.borderWidthMargin;
        else if (this.x > this.game.width - this.width - this.game.borderWidthMargin) this.x = this.game.width - this.width - this.game.borderWidthMargin;

        //vertical movement
        if (input.includes(' ')) {
            this.normalGravity = false;
            this.verticalSpeed = -this.verticalMaxSpeed;
        }
        else {
            this.normalGravity = true;
            this.verticalSpeed = this.verticalMaxSpeed;
        }
        if (this.onGround()) this.verticalSpeed = 0;
        this.y += this.verticalSpeed;
        if (this.y < this.game.borderHeightMargin) this.y = this.game.borderHeightMargin;
        else if (this.y > this.game.height - this.height - this.game.borderHeightMargin) this.y = this.game.height - this.height - this.game.borderHeightMargin;

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

        //indicate damage taken
        if (this.hitByAttack) {
            context.save();
            context.fillStyle = 'rgba(255, 0, 0, 0.8)';
            context.beginPath();
            context.arc(this.x + this.width / 2, this.y + this.height / 2 + 4, this.width / 2, 0, Math.PI * 2);
            context.fill();
            context.restore();
        }
    }
    onGround() {
        if (this.normalGravity) return this.y >= this.game.height - this.height - this.game.borderHeightMargin;
        else return this.y <= 0;
    }
}