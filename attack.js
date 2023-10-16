import { Endpoint } from "./endpoint.js";

export class Attack {
    /**
     * @param {Endpoint} endpoint1 
     * @param {Endpoint} endpoint2
     */
    constructor(endpoint1, endpoint2) {
        this.endpoint1 = endpoint1;
        this.endpoint2 = endpoint2;
        this.flares = document.querySelectorAll('.flare');
        this.stageNumber = 1;
        this.stageInterval = 500;
        this.stageTimer = 0;
    }
    update(deltaTime) {
        if (this.stageTimer > this.stageInterval) {
            this.stageTimer = 0;
            this.stageNumber++;
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
            this.flares[0].style.left = this.endpoint1.x + 'px';
            this.flares[0].style.top = this.endpoint1.y + 'px';
            this.flares[0].style.opacity = 1;
            this.flares[1].style.left = this.endpoint2.x + 'px';
            this.flares[1].style.top = this.endpoint2.y + 'px';
            this.flares[1].style.opacity = 1;
            setTimeout(() => {
                this.flares[0].style.opacity = 0;
                this.flares[1].style.opacity = 0;
            }, this.stageInterval)
        }
        else if (this.stageNumber === 2) {
            context.strokeStyle = 'red';
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(this.endpoint1.x, this.endpoint1.y);
            context.lineTo(this.endpoint2.x, this.endpoint2.y);
            context.stroke();
        }
    }
}