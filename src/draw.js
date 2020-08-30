const { context } = require('./context');
const { getCoords } = require('./board');
const {
    GRID_SIZE,
} = require('./constants');

function drawBoard(ctx) {
    const { tileSize } = context.board;
    const startX = context.board.canvasX % tileSize;
    const startY = context.board.canvasY % tileSize;
    const endX = context.canvas.width;
    const endY = context.canvas.height;

    ctx.strokeStyle = 'white';

    for (let x = startX; x <= endX; x += tileSize) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, endY);
        ctx.stroke();
    }

    for (let y = startY; y <= endY; y += tileSize) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(0, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
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

function convertBoardToCanvasCoords({ x, y }) {
    const { canvasX, canvasY, tileSize } = context.board;
    const tx = x - GRID_SIZE / 2;
    const ty = y - GRID_SIZE / 2;

    return {
        x: canvasX + tx * tileSize,
        y: canvasY + ty * tileSize,
    };
}

function drawBlueRings(ctx) {
    const { blueRings, tileSize } = context.board;

    for (let k = 0; k < blueRings.length; k += 1) {
        const boardCoords = getCoords(blueRings[k]);
        const canvasCoords = convertBoardToCanvasCoords(boardCoords);

        ctx.beginPath();
        ctx.strokeStyle = 'rgb(24, 24, 160)';
        ctx.lineWidth = 0.1 * tileSize;
        ctx.arc(
            canvasCoords.x + tileSize / 2,
            canvasCoords.y + tileSize / 2,
            0.4 * tileSize,
            0, 2 * Math.PI,
        );
        ctx.stroke();
    }
}

function drawRedRings(ctx) {
    const { redRings, tileSize } = context.board;

    for (let k = 0; k < redRings.length; k += 1) {
        const boardCoords = getCoords(redRings[k]);
        const canvasCoords = convertBoardToCanvasCoords(boardCoords);

        ctx.beginPath();
        ctx.strokeStyle = 'rgb(160, 24, 24)';
        ctx.lineWidth = 0.1 * tileSize;
        ctx.arc(
            canvasCoords.x + tileSize / 2,
            canvasCoords.y + tileSize / 2,
            0.4 * tileSize,
            0, 2 * Math.PI,
        );
        ctx.stroke();
    }
}

function drawPieces(ctx) {
    drawBlueRings(ctx);
    drawRedRings(ctx);
}

function redraw() {
    console.log('redraw');

    const ctx = context.canvas.getContext('2d');

    ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);

    drawOrigin(ctx);
    drawBoard(ctx);
    drawMouseHighlight(ctx);
    drawPieces(ctx);
}

module.exports = { redraw };
