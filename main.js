import { Player } from "./player.js";
import { InputHandler } from "./input.js";

window.addEventListener('load', function() {

    const /** @type {HTMLCanvasElement} */ canvas = document.getElementById('canvas');
    const /** @type {CanvasRenderingContext2D} */ context = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 550;
    

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    function animate(timeStamp) {
        let deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(context);
        requestAnimationFrame(animate);
    }
    animate(0);
});

export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.inputHandler = new InputHandler();
    }
    update(deltaTime) {
        this.player.update(this.inputHandler.keys, deltaTime);
    }
    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        context.clearRect(0, 0, this.width, this.height);
        this.player.draw(context);
    }
}