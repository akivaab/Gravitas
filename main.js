import { Player } from "./player.js";

window.addEventListener('load', function() {

    const /** @type {HTMLCanvasElement} */ canvas = document.getElementById('canvas');
    const /** @type {CanvasRenderingContext2D} */ context = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 550;
    console.log(canvas.height);

    const game = new Game(canvas.width, canvas.height);
    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(context);
    }
    animate();
});

export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player = new Player(this);
    }
    update() {

    }
    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        context.clearRect(0, 0, this.width, this.height);
        this.player.draw(context);
    }
}