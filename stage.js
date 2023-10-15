import { Game } from "./main.js";
import { Attack } from "./attack.js";

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
    }
}