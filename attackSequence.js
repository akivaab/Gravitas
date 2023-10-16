import { Endpoint } from "./endpoint.js";
import { Attack } from "./attack.js";

export class AttackSequence {
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
        this.attackSequence = [
            new Attack(this.topEndpoints[1], this.bottomEndpoints[1]),
        ];
        this.currentAttack = 0;
    }
    update(deltaTime) {
        this.attackSequence[this.currentAttack].update(deltaTime);
    }
    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        this.attackSequence[this.currentAttack].draw(context);
    }
}