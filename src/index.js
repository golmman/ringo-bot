function redraw({ gameCanvas }) {
    console.log('redraw');

    var ctx = gameCanvas.getContext("2d");
    ctx.moveTo(0,0);
    ctx.lineTo(200,100);
    ctx.stroke();
}

function resizeCanvas() {
    const gameCanvas = document.getElementById("gameCanvas");

    gameCanvas.width = 0.8 * window.innerWidth;
    gameCanvas.height = 0.8 * window.innerHeight;

    redraw({ gameCanvas });
}

function restartGame(x) {
    console.log(x);

    resizeCanvas();
}

window.addEventListener('resize', resizeCanvas, false);
window.onload = () => restartGame('game started');
window.restartGame = restartGame;
