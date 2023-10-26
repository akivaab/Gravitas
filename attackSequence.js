import { Game } from "./main.js";
import { Attack } from "./attack.js";

export class AttackSequence {
    /**
     * @constructor
     * @param {Game} game
     * @param {Endpoint[][]} attackEndpointList - list of pairs of endpoints
     * @param {number} numAttacksAtOnce - how many attacks fire at a time
     * @param {number} attackSpeed - how long each stage of the attack lasts in milliseconds
     */
    constructor(game, attackEndpointList, numAttacksAtOnce, attackSpeed) {
        this.game = game;
        this.attackEndpointList = attackEndpointList;
        this.numAttacksAtOnce = numAttacksAtOnce;
        this.attackSpeed = attackSpeed;
        this.attackSequence = []; 
        this.attackEndpointList.forEach(endpointPair => {
            this.attackSequence.push(new Attack(this.game, endpointPair[0], endpointPair[1], this.attackSpeed));
        });
        this.currentAttack = 0;
        this.completed = false;
    }
    /**
     * @param {number} deltaTime 
     */
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
            this.game.audioPlayer.playLaserWarning(); //for next set of attacks
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