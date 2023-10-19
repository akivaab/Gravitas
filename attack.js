import { Game } from "./main.js";
import { Endpoint } from "./endpoint.js";

export class Attack {
    /**
     * @constructor
     * @param {Game} game
     * @param {Endpoint} endpoint1
     * @param {Endpoint} endpoint2
     * @param {number} stageInterval - how long each stage of the attack lasts in milliseconds
     */
    constructor(game, endpoint1, endpoint2, stageInterval) {
        this.game = game;
        this.endpoint1 = endpoint1;
        this.endpoint2 = endpoint2;
        this.flareSize = 20;
        this.flareColor = 'rgba(255, 90, 0, 0.7)';
        this.stageNumber = 1;
        this.totalStages = 2;
        this.stageInterval = stageInterval;
        this.stageTimer = 0;
        this.hitPlayer = false;
        this.completed = false;
    }
    update(deltaTime) {
        if (this.stageNumber >= this.totalStages) this.checkHitPlayer();
        if (this.stageTimer > this.stageInterval) {
            this.stageTimer = 0;
            this.stageNumber++;
            if (this.stageNumber > this.totalStages) {
                this.completed = true;
            }
        }
        else {
            this.stageTimer += deltaTime;
        }
    }
    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        if (this.stageNumber === 1) {
            [this.endpoint1, this.endpoint2].forEach(endpoint => {
                //create a radial gradient to simulate the flare
                const gradient = context.createRadialGradient(endpoint.x, endpoint.y, 0, endpoint.x, endpoint.y, this.flareSize);
                gradient.addColorStop(0, 'transparent');
                gradient.addColorStop(0.5, this.flareColor);
                gradient.addColorStop(1, 'transparent');
                //draw the flare
                context.fillStyle = gradient;
                context.fillRect(endpoint.x - this.flareSize, endpoint.y - this.flareSize, this.flareSize * 2, this.flareSize * 2);
            })
        }
        else if (this.stageNumber === 2) {
            context.strokeStyle = 'rgba(255, 65, 0, 1)';
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(this.endpoint1.x, this.endpoint1.y);
            context.lineTo(this.endpoint2.x, this.endpoint2.y);
            context.stroke();
        }
    }
    checkHitPlayer() {
        // Calculate the direction vector of the line
        const dx = this.endpoint2.x - this.endpoint1.x;
        const dy = this.endpoint2.y - this.endpoint1.y;
    
        // Calculate the vector from the circle's center to the line's start
        const cx = this.game.player.x + this.game.player.width / 2 - this.endpoint1.x;
        const cy = this.game.player.y + this.game.player.height / 2 + 4 - this.endpoint1.y;
    
        // Calculate the length of the direction vector
        const lineLength = Math.sqrt(dx * dx + dy * dy);
    
        // Normalize the direction vector
        const directionX = dx / lineLength;
        const directionY = dy / lineLength;
    
        // Calculate the dot product of the vector from the circle's center to the line's start
        // and the normalized direction vector of the line
        const dotProduct = cx * directionX + cy * directionY;
    
        // Calculate the closest point on the line to the circle's center
        let closestX, closestY;
        if (dotProduct <= 0) {
            closestX = this.endpoint1.x;
            closestY = this.endpoint1.y;
        } 
        else if (dotProduct >= lineLength) {
            closestX = this.endpoint2.x;
            closestY = this.endpoint2.y;
        } 
        else {
            closestX = this.endpoint1.x + directionX * dotProduct;
            closestY = this.endpoint1.y + directionY * dotProduct;
        }
    
        // Calculate the distance from the circle's center to the closest point on the line
        const distance = Math.sqrt((this.game.player.x + this.game.player.width / 2 - closestX) ** 2 
            + (this.game.player.y + this.game.player.height / 2 + 4 - closestY) ** 2);
    
        // Check if the distance is less than or equal to the circle's radius
        this.hitPlayer = distance <= this.game.player.width / 2;
    }
}