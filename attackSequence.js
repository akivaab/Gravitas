import { Game } from "./main.js";
import { Endpoint } from "./endpoint.js";
import { Attack } from "./attack.js";

export class AttackSequence {
    /**
     * @constructor
     * @param {Game} game
     * @param {Endpoint[]} endpoints - array of where attacks originate
     * @param {number[]} endpointDividers - indecies in the array demarcating the borders of the stage
     * @param {string[][]} attackList - list of pairs of strings representing endpoints
     * @param {number} numAttacksAtOnce - how many attacks fire at a time
     * @param {number} attackSpeed - how long each stage of the attack lasts in milliseconds
     */
    constructor(game, endpoints, endpointDividers, attackList, numAttacksAtOnce, attackSpeed) {
        this.game = game;
        this.endpoints = endpoints;
        this.endpointDividers = endpointDividers;
        this.topEndpoints = this.endpoints.slice(0, this.endpointDividers[0]);
        this.bottomEndpoints = this.endpoints.slice(this.endpointDividers[0], this.endpointDividers[1]);
        this.leftEndpoints = this.endpoints.slice(this.endpointDividers[1], this.endpointDividers[2]);
        this.rightEndpoints = this.endpoints.slice(this.endpointDividers[2], this.endpointDividers[3]);
        this.attackList = attackList;
        this.numAttacksAtOnce = numAttacksAtOnce;
        this.attackSpeed = attackSpeed;
        this.attackSequence = []; 
        this.decodeAttackList();
        this.currentAttack = 0;
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
    decodeAttackList() {
        this.attackList.forEach(encodedEndpointPair => {
            let /** @type {Endpoint[]} */ attackEndpoints = [];
            encodedEndpointPair.forEach(encodedEndpoint => {
                switch (encodedEndpoint[0]) {
                    case 't':
                        attackEndpoints.push(this.topEndpoints[encodedEndpoint[1]]);
                        break;
                    case 'b':
                        attackEndpoints.push(this.bottomEndpoints[encodedEndpoint[1]]);
                        break;
                    case 'r':
                        attackEndpoints.push(this.rightEndpoints[encodedEndpoint[1]]);
                        break;
                    case 'l':
                        attackEndpoints.push(this.leftEndpoints[encodedEndpoint[1]]);
                        break;
                }
            });
            this.attackSequence.push(new Attack(this.game, attackEndpoints[0], attackEndpoints[1], this.attackSpeed));
        });
    }
}
