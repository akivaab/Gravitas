import { Game } from "./main.js";

export class Stage {
    /**
     * @constructor
     * @param {Game} game 
     */
    constructor(game) {
        this.game = game
        this.topBottomWall = document.getElementById('two-light-wall');
        this.leftRightWall = document.getElementById('one-light-wall');
        this.zeroLightWall = document.getElementById('zero-light-wall');
        this.fourLightWall = document.getElementById('four-light-wall');
        this.wallWidth = 50;
        this.wallHeight = 50;
        this.numColumns = 1000 / this.wallWidth;
        this.numRows = 550 / this.wallHeight;
    }
    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numColumns; j++) {
                let /** @type {HTMLImageElement} */ image;
                //top or bottom row
                if (i === 0 || i === this.numRows - 1) {
                    image = this.topBottomWall;
                    context.globalAlpha = 1;
                }
                //left or right column
                else if (j === 0 || j === this.numColumns - 1) {
                    image = this.leftRightWall;
                    context.globalAlpha = 1;
                }
                //background (middle)
                else {
                    image = /*Math.random() > 0.5 ? this.fourLightWall :*/ this.zeroLightWall;
                    context.globalAlpha = 0.7;
                }
                context.drawImage(image, j * this.wallWidth, i * this.wallHeight, this.wallWidth, this.wallHeight);
            }
        }
    }
}