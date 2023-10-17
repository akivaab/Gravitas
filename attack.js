import { Endpoint } from "./endpoint.js";

export class Attack {
    /**
     * @param {Endpoint} endpoint1 
     * @param {Endpoint} endpoint2
     */
    constructor(endpoint1, endpoint2, stageInterval) {
        this.endpoint1 = endpoint1;
        this.endpoint2 = endpoint2;
        this.flareSize = 20;
        this.flareColor = 'rgba(255, 90, 0, 0.7)';
        this.stageNumber = 1;
        this.totalStages = 2;
        this.stageInterval = stageInterval;
        this.stageTimer = 0;
        this.completed = false;
    }
    update(deltaTime) {
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
}