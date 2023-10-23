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
        this.attackSequences = [
            new AttackSequence(this.game, this.endpoints, this.endpointDividers, [
                ["t1", "b1"],
                ["t2", "b2"],
                ["t3", "b3"],
                ["t4", "b4"],
                ["t5", "b5"],
                ["t6", "b6"],
                ["t7", "b7"],
                ["t8", "b8"],
                ["t9", "b9"],
            ], 3, 300)
        ];
        this.currentAttackSequence = 0;
        this.completed = false;
    }
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
}