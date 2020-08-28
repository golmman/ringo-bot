const gameContext = {
    canvas: null,

    events: {
        mouseWheel: null,
        mouseDown: null,
        mouseMove: null,
        isMouseDown: false,
    },

    map: {
        canvasX: 100,
        canvasY: 100,
        tileSize: 100,
    },
};

function drawBoard(ctx) {
    const { tileSize } = gameContext.map;
    const startX = gameContext.map.canvasX % tileSize;
    const startY = gameContext.map.canvasY % tileSize;
    const endX = gameContext.canvas.width;
    const endY = gameContext.canvas.height;

    ctx.strokeStyle = 'white';

    for (let x = startX; x <= endX; x += tileSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, endY);
        ctx.stroke();
    }

    for (let y = startY; y <= endY; y += tileSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
    }
}

function redraw() {
    console.log('redraw');

    const ctx = gameContext.canvas.getContext("2d");


    ctx.clearRect(0, 0, gameContext.canvas.width, gameContext.canvas.height);

    ctx.fillStyle = 'rgb(32, 32, 32)';
    ctx.fillRect(
        gameContext.map.canvasX,
        gameContext.map.canvasY,
        gameContext.map.tileSize,
        gameContext.map.tileSize,
    );

    drawBoard(ctx);
}

function resizeCanvas() {
    const canvas = document.getElementById("gameCanvas");

    canvas.width = 0.8 * window.innerWidth;
    canvas.height = 0.8 * window.innerHeight;

    gameContext.canvas = canvas;

    redraw();
}

function handleMouseWheel(event) {
    console.log(`handleMouseWheel: ${event.deltaY}`);

    const canvasWidth = gameContext.canvas.width;
    const canvasHeight = gameContext.canvas.height;
    const mapCanvasX = gameContext.map.canvasX;
    const mapCanvasY = gameContext.map.canvasY;

    let tileSize = gameContext.map.tileSize;

    const centerTileDistanceX = (canvasWidth / 2 - mapCanvasX) / tileSize;
    const centerTileDistanceY = (canvasHeight / 2 - mapCanvasY) / tileSize;

    tileSize -= event.deltaY;

    if (tileSize > 100) {
        tileSize = 100;
    }

    if (tileSize < 10) {
        tileSize = 10;
    }

    gameContext.map.tileSize = tileSize;

    gameContext.map.canvasX = canvasWidth / 2 - tileSize * centerTileDistanceX;
    gameContext.map.canvasY = canvasHeight / 2 - tileSize * centerTileDistanceY;

    redraw();
}

function handleMouseDown(event) {
    console.log(`handleMouseDown`);

    const {
        screenX,
        screenY,
    } = event;

    gameContext.events.mouseDown = {
        screenX,
        screenY,
    };

    gameContext.events.isMouseDown = true;
}

function handleMouseUp(event) {
    console.log(`handleMouseUp`);
    console.log(gameContext);

    const {
        screenX,
        screenY,
    } = event;

    gameContext.events.mouseUp = {
        screenX,
        screenY,
    };

    gameContext.events.isMouseDown = false;
}

function handleMouseMove(event) {
    if (gameContext.events.isMouseDown) {
        const deltaX = event.screenX - gameContext.events.mouseMove.screenX;
        const deltaY = event.screenY - gameContext.events.mouseMove.screenY;
        //const deltaY = gameContext.events.mouseMove.screenY - gameContext.events.mouseDown.screenY;
        //const deltaY = gameContext.events.mouseMove.screenY - gameContext.events.mouseDown.screenY;
        gameContext.map.canvasX += deltaX;
        gameContext.map.canvasY += deltaY;

        redraw();
    }

    const {
        screenX,
        screenY,
    } = event;

    gameContext.events.mouseMove = {
        screenX,
        screenY,
    };

}

function restartGame(x) {
    console.log(x);

    resizeCanvas();
}

window.addEventListener('resize', resizeCanvas);

window.addEventListener('wheel', handleMouseWheel);
window.addEventListener('mousedown', handleMouseDown);
window.addEventListener('mouseup', handleMouseUp);
window.addEventListener('mousemove', handleMouseMove);

window.onload = () => restartGame('game started');
window.restartGame = restartGame;
