window.addEventListener('load', function() {

    const /** @type {HTMLCanvasElement} */ canvas = document.getElementById('canvas');
    const /** @type {CanvasRenderingContext2D} */ context = canvas.getContext('2d');
    const aspectRatio = 16 / 9;
    canvas.width = 1000;
    canvas.height = 1000 / aspectRatio;

    class Game {
        constructor(width, height) {

        }
        update() {

        }
        draw(context) {

        }
    }

    const game = new Game(canvas.width, canvas.height);
    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(context);
    }
    animate();

});