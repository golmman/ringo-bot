const { context, resetContext } = require('./context');
const { initBoard } = require('./board');
const { redraw } = require('./draw');
const {
    handleKeyDown,
    handleMouseClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseWheel,
} = require('./event');

function resizeCanvas() {
    const canvas = document.getElementById('gameCanvas');

    canvas.width = 0.8 * window.innerWidth;
    canvas.height = 0.8 * window.innerHeight;

    context.canvas = canvas;

    redraw();
}

function restartGame(x) {
    console.log(x);

    resetContext();
    initBoard();
    resizeCanvas();
}

window.addEventListener('resize', resizeCanvas);

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('click', handleMouseClick);
window.addEventListener('mousedown', handleMouseDown);
window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('mouseup', handleMouseUp);
window.addEventListener('wheel', handleMouseWheel);

window.onload = () => restartGame('game started');
window.restartGame = restartGame;
