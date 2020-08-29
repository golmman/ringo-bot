const context = {
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
    const { tileSize } = context.map;
    const startX = context.map.canvasX % tileSize;
    const startY = context.map.canvasY % tileSize;
    const endX = context.canvas.width;
    const endY = context.canvas.height;

    ctx.strokeStyle = 'white';

    for (let x = startX; x <= endX; x += tileSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, endY);
        ctx.stroke();
        ctx.closePath();
    }

    for (let y = startY; y <= endY; y += tileSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
        ctx.closePath();
    }
}

function drawOrigin(ctx) {
    ctx.fillStyle = 'rgb(48, 48, 48)';
    ctx.fillRect(
        context.map.canvasX,
        context.map.canvasY,
        context.map.tileSize,
        context.map.tileSize,
    );
}

function drawMouseHighlight(ctx) {
    const { canvasX, canvasY, tileSize } = context.map;
    const canvasRect = context.canvas.getBoundingClientRect();

    const mouseX = context.events.mouseMove.clientX - canvasRect.left;
    const mouseY = context.events.mouseMove.clientY - canvasRect.top;

    const canvasMouseX = mouseX - canvasX;
    const canvasMouseY = mouseY - canvasY;

    const highlightX = canvasMouseX > 0
        ? mouseX - canvasMouseX % tileSize
        : mouseX - canvasMouseX % tileSize - tileSize;

    const highlightY = canvasMouseY > 0
        ? mouseY - canvasMouseY % tileSize
        : mouseY - canvasMouseY % tileSize - tileSize;

    ctx.fillStyle = 'rgb(48, 48, 48)';
    ctx.fillRect(
        highlightX,
        highlightY,
        tileSize,
        tileSize,
    );
}

function redraw() {
    console.log('redraw');

    const ctx = context.canvas.getContext('2d');

    ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);

    drawOrigin(ctx);
    drawBoard(ctx);
    drawMouseHighlight(ctx);
}

function resizeCanvas() {
    const canvas = document.getElementById('gameCanvas');

    canvas.width = 0.8 * window.innerWidth;
    canvas.height = 0.8 * window.innerHeight;

    context.canvas = canvas;

    redraw();
}

function handleMouseClick(event) {
    console.log('handleMouseClick');
    const canvasRect = context.canvas.getBoundingClientRect();

    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;

    console.log(`${mouseX} ${mouseY}, click count: ${event.detail}`);
}

function handleMouseWheel(event) {
    console.log(`handleMouseWheel: ${event.deltaY}`);

    const canvasWidth = context.canvas.width;
    const canvasHeight = context.canvas.height;
    const mapCanvasX = context.map.canvasX;
    const mapCanvasY = context.map.canvasY;

    let { tileSize } = context.map;

    const centerTileDistanceX = (canvasWidth / 2 - mapCanvasX) / tileSize;
    const centerTileDistanceY = (canvasHeight / 2 - mapCanvasY) / tileSize;

    tileSize -= event.deltaY;

    if (tileSize > 100) {
        tileSize = 100;
    }

    if (tileSize < 10) {
        tileSize = 10;
    }

    context.map.tileSize = tileSize;

    context.map.canvasX = canvasWidth / 2 - tileSize * centerTileDistanceX;
    context.map.canvasY = canvasHeight / 2 - tileSize * centerTileDistanceY;

    redraw();
}

function handleMouseDown(event) {
    console.log('handleMouseDown');
    console.log(event);

    const {
        screenX,
        screenY,
    } = event;

    context.events.mouseDown = {
        screenX,
        screenY,
    };

    context.events.isMouseDown = true;
}

function handleMouseUp(event) {
    console.log('handleMouseUp');
    console.log(context);

    const {
        screenX,
        screenY,
    } = event;

    context.events.mouseUp = {
        screenX,
        screenY,
    };

    context.events.isMouseDown = false;
}

function handleMouseMove(event) {
    if (context.events.isMouseDown) {
        const deltaX = event.screenX - context.events.mouseMove.screenX;
        const deltaY = event.screenY - context.events.mouseMove.screenY;
        context.map.canvasX += deltaX;
        context.map.canvasY += deltaY;
    }

    const {
        clientX,
        clientY,
        screenX,
        screenY,
    } = event;

    context.events.mouseMove = {
        clientX,
        clientY,
        screenX,
        screenY,
    };

    redraw();
}

function restartGame(x) {
    console.log(x);

    resizeCanvas();
}

window.addEventListener('resize', resizeCanvas);

window.addEventListener('click', handleMouseClick);
window.addEventListener('mousedown', handleMouseDown);
window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('mouseup', handleMouseUp);
window.addEventListener('wheel', handleMouseWheel);

window.onload = () => restartGame('game started');
window.restartGame = restartGame;
