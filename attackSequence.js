import { Endpoint } from "./endpoint.js";
import { Attack } from "./attack.js";

class AttackSequence {
    /**
     * @param {Endpoint[]} endpoints 
     */
    constructor(endpoints, endpointDividers) {
        this.endpoints = endpoints;
        this.endpointDividers = endpointDividers;
        this.topEndpoints = this.endpoints.slice(0, this.endpointDividers[0]);
        this.bottomEndpoints = this.endpoints.slice(this.endpointDividers[0], this.endpointDividers[1]);
        this.leftEndpoints = this.endpoints.slice(this.endpointDividers[1], this.endpointDividers[2]);
        this.rightEndpoints = this.endpoints.slice(this.endpointDividers[2], this.endpointDividers[3]);
        this.currentAttack = 0;
        this.completed = false;
    }
    update(deltaTime) {
        this.attackSequence[this.currentAttack].update(deltaTime);
        if (this.attackSequence[this.currentAttack].completed) {
            this.currentAttack++;
            if (this.currentAttack >= this.attackSequence.length) {
                this.completed = true;
            }
        }
    }
    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        this.attackSequence[this.currentAttack].draw(context);
    }
}

export class VerticalLeftToRight extends AttackSequence {
    constructor(endpoints, endpointDividers) {
        super(endpoints, endpointDividers);
        this.attackSequence = [];
        for (let i = 1; i < this.topEndpoints.length / 2; i++) {
            this.attackSequence.push(new Attack(this.topEndpoints[i], this.bottomEndpoints[i], 200));
        }
    }
}