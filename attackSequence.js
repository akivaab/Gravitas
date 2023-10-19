import { Game } from "./main.js";
import { Endpoint } from "./endpoint.js";
import { Attack } from "./attack.js";

class AttackSequence {
    /**
     * @constructor
     * @param {Game} game
     * @param {Endpoint[]} endpoints - array of where attacks originate
     * @param {number[]} endpointDividers - indecies in the array demarcating the borders of the stage
     * @param {number} numAttacksAtOnce - how many attacks fire at a time
     */
    constructor(game, endpoints, endpointDividers, numAttacksAtOnce) {
        this.game = game;
        this.endpoints = endpoints;
        this.endpointDividers = endpointDividers;
        this.topEndpoints = this.endpoints.slice(0, this.endpointDividers[0]);
        this.bottomEndpoints = this.endpoints.slice(this.endpointDividers[0], this.endpointDividers[1]);
        this.leftEndpoints = this.endpoints.slice(this.endpointDividers[1], this.endpointDividers[2]);
        this.rightEndpoints = this.endpoints.slice(this.endpointDividers[2], this.endpointDividers[3]);
        this.currentAttack = 0;
        this.numAttacksAtOnce = numAttacksAtOnce;
        this.completed = false;
    }
    update(deltaTime) {
        let /** @type {Attack[]} */ currentAttacks = this.attackSequence.slice(this.currentAttack, this.currentAttack + this.numAttacksAtOnce);
        let /** @type {boolean[]} */ hitPlayer = [];
        currentAttacks.forEach(attack => {
            attack.update(deltaTime);
            hitPlayer.push(attack.hitPlayer);
        });

        //check if sequence should move on to next set of attacks
        if (currentAttacks.filter(attack => attack.completed).length === this.numAttacksAtOnce) {
            this.currentAttack += this.numAttacksAtOnce;
            if (this.currentAttack >= this.attackSequence.length) {
                this.completed = true;
            }
        }

        //check if an attack hit the player
        if (hitPlayer.every(hit => !hit)) this.game.player.hitByAttack = false;
        else this.game.player.hitByAttack = true;
    }
    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        let /** @type {Attack[]} */ currentAttacks = this.attackSequence.slice(this.currentAttack, this.currentAttack + this.numAttacksAtOnce);
        currentAttacks.forEach(attack => attack.draw(context));
    }
}

export class VerticalLeftToRight extends AttackSequence {
    /**
     * @param {Game} game
     * @param {Endpoint[]} endpoints - array of where attacks originate
     * @param {number[]} endpointDividers - indecies in the array demarcating the borders of the stage
     * @param {number} numAttacksAtOnce - how many attacks fire at a time
     * @param {number} attackSpeed - how long each stage of the attack lasts in milliseconds
     */
    constructor(game, endpoints, endpointDividers, numAttacksAtOnce, attackSpeed) {
        super(game, endpoints, endpointDividers, numAttacksAtOnce);
        this.attackSequence = [];
        for (let i = 1; i < this.topEndpoints.length / 2; i++) {
            this.attackSequence.push(new Attack(this.game, this.topEndpoints[i], this.bottomEndpoints[i], attackSpeed));
        }
    }
}
export class VerticalRightToLeft extends AttackSequence {
    /**
     * @param {Game} game
     * @param {Endpoint[]} endpoints - array of where attacks originate
     * @param {number[]} endpointDividers - indecies in the array demarcating the borders of the stage
     * @param {number} numAttacksAtOnce - how many attacks fire at a time
     * @param {number} attackSpeed - how long each stage of the attack lasts in milliseconds
     */
    constructor(game, endpoints, endpointDividers, numAttacksAtOnce, attackSpeed) {
        super(game, endpoints, endpointDividers, numAttacksAtOnce);
        this.attackSequence = [];
        for (let i = this.topEndpoints.length - 2; i >= this.topEndpoints.length / 2; i--) {
            this.attackSequence.push(new Attack(this.game, this.topEndpoints[i], this.bottomEndpoints[i], attackSpeed));
        }
    }
}