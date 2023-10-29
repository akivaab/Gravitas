import { Game } from "./main.js";
import { Endpoint } from "./endpoint.js";
import { AttackSequence } from "./attackSequence.js";

export class Stage {
    /**
     * @constructor
     * @param {Game} game 
     */
    constructor(game) {
        this.game = game;
        this.foregroundBorderWall = document.getElementById('one-light-wall');
        this.backgroundTopBottomWall = document.getElementById('two-light-wall');
        this.backgroundWall1 = document.getElementById('zero-light-wall');
        this.backgroundWall2 = document.getElementById('four-light-wall');
        this.wallWidth = 50;
        this.wallHeight = 50;
        this.numColumns = this.game.width / this.wallWidth;
        this.numRows = this.game.height / this.wallHeight;
        this.endpoints = [];
        this.endpointDividers = [];
        this.calculateEndpoints();
        this.topEndpoints = this.endpoints.slice(0, this.endpointDividers[0]);
        this.bottomEndpoints = this.endpoints.slice(this.endpointDividers[0], this.endpointDividers[1]);
        this.leftEndpoints = this.endpoints.slice(this.endpointDividers[1], this.endpointDividers[2]);
        this.rightEndpoints = this.endpoints.slice(this.endpointDividers[2], this.endpointDividers[3]);
        this.attackSequences = this.getAttackSequences();
        this.currentAttackSequence = 0;
        this.completed = false;
    }
    /**
     * @param {number} deltaTime 
     */
    update(deltaTime) {
        this.attackSequences[this.currentAttackSequence].update(deltaTime);
        if (this.attackSequences[this.currentAttackSequence].completed) {
            this.currentAttackSequence++;
            if (this.currentAttackSequence >= this.attackSequences.length) {
                this.completed = true;
            }
        }
    }
    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numColumns; j++) {
                let /** @type {HTMLImageElement} */ image;
                //foreground border
                if (i === 0 || i === this.numRows - 1 || j === 0 || j === this.numColumns - 1) {
                    image = this.foregroundBorderWall;
                    context.globalAlpha = 1;
                }
                // background top and bottom rows
                else if (i === 1 || i === this.numRows - 2) {
                    image = this.backgroundTopBottomWall;
                    context.globalAlpha = 0.65;
                }
                //background (middle)
                else {
                    image = this.backgroundWall1;
                    context.globalAlpha = 0.65;
                }
                context.drawImage(image, j * this.wallWidth, i * this.wallHeight, this.wallWidth, this.wallHeight);
            }
        }
        this.attackSequences[this.currentAttackSequence].draw(context);
    }
    /**
     * determine the endpoints of attacks on the borders of the stage
     */
    calculateEndpoints() {
        let divider = 0;
        //top row
        for (let x = this.wallWidth / 2; x < this.numColumns * this.wallWidth; x += this.wallWidth) {
            this.endpoints.push(new Endpoint(x, this.wallHeight / 2));
            divider++;
        }
        this.endpointDividers.push(divider);
        //bottom row
        for (let x = this.wallWidth / 2; x < this.numColumns * this.wallWidth; x += this.wallWidth) {
            this.endpoints.push(new Endpoint(x, this.game.height - this.wallHeight / 2));
            divider++;
        }
        this.endpointDividers.push(divider);
        //left column
        for (let y = this.wallHeight * 1.5; y < (this.numRows - 1) * this.wallHeight; y += this.wallHeight) {
            this.endpoints.push(new Endpoint(this.wallWidth / 2, y));
            divider++;
        }
        this.endpointDividers.push(divider);
        //right column
        for (let y = this.wallHeight * 1.5; y < (this.numRows - 1) * this.wallHeight; y += this.wallHeight) {
            this.endpoints.push(new Endpoint(this.game.width - this.wallWidth / 2, y));
            divider++;
        }
        this.endpointDividers.push(divider);
    }
    /**
     * returns a series of attack sequences
     * @returns {AttackSequence[]}
     */
    getAttackSequences() {
        const openingSequences = [
            new AttackSequence(this.game, [
                [this.topEndpoints[18], this.bottomEndpoints[18]],
                [this.topEndpoints[17], this.bottomEndpoints[17]],
                [this.topEndpoints[16], this.bottomEndpoints[16]],
                [this.topEndpoints[15], this.bottomEndpoints[15]],
                [this.topEndpoints[14], this.bottomEndpoints[14]],
                [this.topEndpoints[13], this.bottomEndpoints[13]],
                [this.topEndpoints[12], this.bottomEndpoints[12]],
                [this.topEndpoints[11], this.bottomEndpoints[11]],
                [this.topEndpoints[10], this.bottomEndpoints[10]],
            ], 3, 500),
            new AttackSequence(this.game, [
                [this.topEndpoints[1], this.bottomEndpoints[1]],
                [this.topEndpoints[2], this.bottomEndpoints[2]],
                [this.topEndpoints[3], this.bottomEndpoints[3]],
                [this.topEndpoints[4], this.bottomEndpoints[4]],
                [this.topEndpoints[5], this.bottomEndpoints[5]],
                [this.topEndpoints[6], this.bottomEndpoints[6]],
                [this.topEndpoints[7], this.bottomEndpoints[7]],
                [this.topEndpoints[8], this.bottomEndpoints[8]],
                [this.topEndpoints[9], this.bottomEndpoints[9]],
            ], 3, 500),
            new AttackSequence(this.game, [
                [this.leftEndpoints[0], this.rightEndpoints[0]],
                [this.leftEndpoints[1], this.rightEndpoints[1]],
                [this.leftEndpoints[8], this.rightEndpoints[8]],
                [this.leftEndpoints[7], this.rightEndpoints[7]],
                [this.leftEndpoints[0], this.rightEndpoints[0]],
                [this.leftEndpoints[1], this.rightEndpoints[1]],
            ], 2, 500),
        ];
        const AttackSequenceData = class {
            constructor(attackEndpointList, numAttacksAtOnce, attackSpeed) {
                this.attackEndpointList = attackEndpointList;
                this.numAttacksAtOnce = numAttacksAtOnce;
                this.attackSpeed = attackSpeed;
            }
        }
        const sequencesDataPack1 = [
            //circle (clockwise)
            new AttackSequenceData([
                [this.topEndpoints[0], this.bottomEndpoints[19]],
                [this.topEndpoints[1], this.bottomEndpoints[18]],
                [this.topEndpoints[2], this.bottomEndpoints[17]],
                [this.topEndpoints[3], this.bottomEndpoints[16]],
                [this.topEndpoints[4], this.bottomEndpoints[15]],
                [this.topEndpoints[5], this.bottomEndpoints[14]],
                [this.topEndpoints[6], this.bottomEndpoints[13]],
                [this.topEndpoints[7], this.bottomEndpoints[12]],
                [this.topEndpoints[8], this.bottomEndpoints[11]],
                [this.topEndpoints[9], this.bottomEndpoints[10]],
                [this.topEndpoints[10], this.bottomEndpoints[9]],
                [this.topEndpoints[11], this.bottomEndpoints[8]],
                [this.topEndpoints[12], this.bottomEndpoints[7]],
                [this.topEndpoints[13], this.bottomEndpoints[6]],
                [this.topEndpoints[14], this.bottomEndpoints[5]],
                [this.topEndpoints[15], this.bottomEndpoints[4]],
                [this.topEndpoints[16], this.bottomEndpoints[3]],
                [this.topEndpoints[17], this.bottomEndpoints[2]],
                [this.topEndpoints[18], this.bottomEndpoints[1]],
                [this.topEndpoints[19], this.bottomEndpoints[0]],
                [this.leftEndpoints[8], this.rightEndpoints[0]],
                [this.leftEndpoints[7], this.rightEndpoints[1]],
                [this.leftEndpoints[6], this.rightEndpoints[2]],
                [this.leftEndpoints[5], this.rightEndpoints[3]],
                [this.leftEndpoints[4], this.rightEndpoints[4]],
                [this.leftEndpoints[3], this.rightEndpoints[5]],
                [this.leftEndpoints[2], this.rightEndpoints[6]],
                [this.leftEndpoints[1], this.rightEndpoints[7]],
                [this.leftEndpoints[0], this.rightEndpoints[8]],
            ], 1, 50),
            //circle (counterclockwise)
            new AttackSequenceData([           
                [this.leftEndpoints[0], this.rightEndpoints[8]],
                [this.leftEndpoints[1], this.rightEndpoints[7]],
                [this.leftEndpoints[2], this.rightEndpoints[6]],
                [this.leftEndpoints[3], this.rightEndpoints[5]],
                [this.leftEndpoints[4], this.rightEndpoints[4]],
                [this.leftEndpoints[5], this.rightEndpoints[3]],
                [this.leftEndpoints[6], this.rightEndpoints[2]],
                [this.leftEndpoints[7], this.rightEndpoints[1]],
                [this.leftEndpoints[8], this.rightEndpoints[0]],
                [this.topEndpoints[19], this.bottomEndpoints[0]],
                [this.topEndpoints[18], this.bottomEndpoints[1]],
                [this.topEndpoints[17], this.bottomEndpoints[2]],
                [this.topEndpoints[16], this.bottomEndpoints[3]],
                [this.topEndpoints[15], this.bottomEndpoints[4]],
                [this.topEndpoints[14], this.bottomEndpoints[5]], 
                [this.topEndpoints[13], this.bottomEndpoints[6]],
                [this.topEndpoints[12], this.bottomEndpoints[7]],
                [this.topEndpoints[11], this.bottomEndpoints[8]],
                [this.topEndpoints[10], this.bottomEndpoints[9]],
                [this.topEndpoints[9], this.bottomEndpoints[10]],
                [this.topEndpoints[8], this.bottomEndpoints[11]],
                [this.topEndpoints[7], this.bottomEndpoints[12]],
                [this.topEndpoints[6], this.bottomEndpoints[13]],
                [this.topEndpoints[5], this.bottomEndpoints[14]],
                [this.topEndpoints[4], this.bottomEndpoints[15]],
                [this.topEndpoints[3], this.bottomEndpoints[16]],
                [this.topEndpoints[2], this.bottomEndpoints[17]],
                [this.topEndpoints[1], this.bottomEndpoints[18]],
                [this.topEndpoints[0], this.bottomEndpoints[19]],
            ], 1, 50),
            //force hover
            new AttackSequenceData([
                [this.leftEndpoints[0], this.rightEndpoints[0]],
                [this.leftEndpoints[8], this.rightEndpoints[8]],
            ], 2, 1000),
            //force bottom right
            new AttackSequenceData([
                [this.topEndpoints[1], this.bottomEndpoints[1]],
                [this.topEndpoints[2], this.bottomEndpoints[2]],
                [this.topEndpoints[3], this.bottomEndpoints[3]],
                [this.topEndpoints[4], this.bottomEndpoints[4]],
                [this.topEndpoints[5], this.bottomEndpoints[5]],
                [this.topEndpoints[6], this.bottomEndpoints[6]],
                [this.topEndpoints[7], this.bottomEndpoints[7]],
                [this.topEndpoints[8], this.bottomEndpoints[8]],
                [this.topEndpoints[9], this.bottomEndpoints[9]],
                [this.topEndpoints[10], this.bottomEndpoints[10]],
                [this.topEndpoints[11], this.bottomEndpoints[11]],
                [this.topEndpoints[12], this.bottomEndpoints[12]],
                [this.leftEndpoints[0], this.rightEndpoints[0]],
                [this.leftEndpoints[1], this.rightEndpoints[1]],
                [this.leftEndpoints[2], this.rightEndpoints[2]],
                [this.leftEndpoints[3], this.rightEndpoints[3]],
                [this.leftEndpoints[4], this.rightEndpoints[4]],
            ], 17, 1000),
            //force bottom left
            new AttackSequenceData([
                [this.topEndpoints[19], this.bottomEndpoints[19]],
                [this.topEndpoints[18], this.bottomEndpoints[18]],
                [this.topEndpoints[17], this.bottomEndpoints[17]],
                [this.topEndpoints[16], this.bottomEndpoints[16]],
                [this.topEndpoints[15], this.bottomEndpoints[15]],
                [this.topEndpoints[14], this.bottomEndpoints[14]],
                [this.topEndpoints[13], this.bottomEndpoints[13]],
                [this.topEndpoints[12], this.bottomEndpoints[12]],
                [this.topEndpoints[11], this.bottomEndpoints[11]],
                [this.topEndpoints[10], this.bottomEndpoints[10]],
                [this.topEndpoints[9], this.bottomEndpoints[9]],
                [this.topEndpoints[8], this.bottomEndpoints[8]],
                [this.leftEndpoints[0], this.rightEndpoints[0]],
                [this.leftEndpoints[1], this.rightEndpoints[1]],
                [this.leftEndpoints[2], this.rightEndpoints[2]],
                [this.leftEndpoints[3], this.rightEndpoints[3]],
                [this.leftEndpoints[4], this.rightEndpoints[4]],
            ], 17, 1000),
            //force top right
            new AttackSequenceData([
                [this.topEndpoints[1], this.bottomEndpoints[1]],
                [this.topEndpoints[2], this.bottomEndpoints[2]],
                [this.topEndpoints[3], this.bottomEndpoints[3]],
                [this.topEndpoints[4], this.bottomEndpoints[4]],
                [this.topEndpoints[5], this.bottomEndpoints[5]],
                [this.topEndpoints[6], this.bottomEndpoints[6]],
                [this.topEndpoints[7], this.bottomEndpoints[7]],
                [this.topEndpoints[8], this.bottomEndpoints[8]],
                [this.topEndpoints[9], this.bottomEndpoints[9]],
                [this.topEndpoints[10], this.bottomEndpoints[10]],
                [this.topEndpoints[11], this.bottomEndpoints[11]],
                [this.topEndpoints[12], this.bottomEndpoints[12]],
                [this.leftEndpoints[8], this.rightEndpoints[8]],
                [this.leftEndpoints[7], this.rightEndpoints[7]],
                [this.leftEndpoints[6], this.rightEndpoints[6]],
                [this.leftEndpoints[5], this.rightEndpoints[5]],
                [this.leftEndpoints[4], this.rightEndpoints[4]],
            ], 17, 1000),
            //force top left
            new AttackSequenceData([
                [this.topEndpoints[19], this.bottomEndpoints[19]],
                [this.topEndpoints[18], this.bottomEndpoints[18]],
                [this.topEndpoints[17], this.bottomEndpoints[17]],
                [this.topEndpoints[16], this.bottomEndpoints[16]],
                [this.topEndpoints[15], this.bottomEndpoints[15]],
                [this.topEndpoints[14], this.bottomEndpoints[14]],
                [this.topEndpoints[13], this.bottomEndpoints[13]],
                [this.topEndpoints[12], this.bottomEndpoints[12]],
                [this.topEndpoints[11], this.bottomEndpoints[11]],
                [this.topEndpoints[10], this.bottomEndpoints[10]],
                [this.topEndpoints[9], this.bottomEndpoints[9]],
                [this.topEndpoints[8], this.bottomEndpoints[8]],
                [this.leftEndpoints[8], this.rightEndpoints[8]],
                [this.leftEndpoints[7], this.rightEndpoints[7]],
                [this.leftEndpoints[6], this.rightEndpoints[6]],
                [this.leftEndpoints[5], this.rightEndpoints[5]],
                [this.leftEndpoints[4], this.rightEndpoints[4]],
            ], 17, 1000),
            //vertical diagonals
            new AttackSequenceData([
                [this.topEndpoints[0], this.bottomEndpoints[3]],
                [this.topEndpoints[1], this.bottomEndpoints[4]],
                [this.topEndpoints[2], this.bottomEndpoints[5]],
                [this.topEndpoints[6], this.bottomEndpoints[3]],
                [this.topEndpoints[7], this.bottomEndpoints[4]],
                [this.topEndpoints[8], this.bottomEndpoints[5]],
                [this.topEndpoints[6], this.bottomEndpoints[9]],
                [this.topEndpoints[7], this.bottomEndpoints[10]],
                [this.topEndpoints[8], this.bottomEndpoints[11]],
                [this.topEndpoints[12], this.bottomEndpoints[9]],
                [this.topEndpoints[13], this.bottomEndpoints[10]],
                [this.topEndpoints[14], this.bottomEndpoints[11]],
                [this.topEndpoints[12], this.bottomEndpoints[15]],
                [this.topEndpoints[13], this.bottomEndpoints[16]],
                [this.topEndpoints[14], this.bottomEndpoints[17]],
            ], 3, 250),
            //horizontal diagonals
            new AttackSequenceData([
                [this.leftEndpoints[0], this.rightEndpoints[2]],
                [this.leftEndpoints[1], this.rightEndpoints[3]],
                [this.leftEndpoints[4], this.rightEndpoints[2]],
                [this.leftEndpoints[5], this.rightEndpoints[3]],
                [this.leftEndpoints[4], this.rightEndpoints[6]],
                [this.leftEndpoints[5], this.rightEndpoints[7]],
                [this.leftEndpoints[8], this.rightEndpoints[6]],
                [this.bottomEndpoints[0], this.rightEndpoints[7]],
            ], 2, 300),
        ];
        let i = 0;
        while (i < 30) {
            const randomSequenceData = sequencesDataPack1[Math.floor(Math.random() * sequencesDataPack1.length)];
            openingSequences.push(new AttackSequence(this.game, randomSequenceData.attackEndpointList, randomSequenceData.numAttacksAtOnce, randomSequenceData.attackSpeed));
            i++;
        }
        return openingSequences;
    }
}