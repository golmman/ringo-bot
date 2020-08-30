const { context } = require('./context');

function drawBoard(ctx) {
    const { tileSize } = context.board;
    const startX = context.board.canvasX % tileSize;
    const startY = context.board.canvasY % tileSize;
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
        context.board.canvasX,
        context.board.canvasY,
        context.board.tileSize,
        context.board.tileSize,
    );
}

function drawMouseHighlight(ctx) {
    const { canvasX, canvasY, tileSize } = context.board;
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

module.exports = { redraw };
