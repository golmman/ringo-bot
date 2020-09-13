const { isBlueRing } = require('./board');
const { context } = require('./context');
const { getCoords } = require('./board');
const {
    GRID_SIZE,
    OPPONENT_PHASE,
    PICK_DISK_PHASE,
    DROP_DISK_PHASE,
    DROP_RING_PHASE,
} = require('./constants');

function convertBoardToCanvasCoords({ x, y }) {
    const { canvasX, canvasY, tileSize } = context.board;
    const tx = x - GRID_SIZE / 2;
    const ty = y - GRID_SIZE / 2;

    return {
        x: canvasX + tx * tileSize,
        y: canvasY + ty * tileSize,
    };
}

function drawBlueDisk(ctx, { x, y }) {
    const { tileSize } = context.board;
    ctx.beginPath();
    ctx.fillStyle = 'rgb(24, 24, 160)';
    ctx.arc(
        x + tileSize / 2,
        y + tileSize / 2,
        0.3 * tileSize,
        0, 2 * Math.PI,
    );
    ctx.fill();
}

function drawRedDisk(ctx, { x, y }) {
    const { tileSize } = context.board;
    ctx.beginPath();
    ctx.fillStyle = 'rgb(160, 24, 24)';
    ctx.arc(
        x + tileSize / 2,
        y + tileSize / 2,
        0.3 * tileSize,
        0, 2 * Math.PI,
    );
    ctx.fill();
}

function drawBlueRing(ctx, { x, y }) {
    const { tileSize } = context.board;
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(24, 24, 160)';
    ctx.lineWidth = 0.1 * tileSize;
    ctx.arc(
        x + tileSize / 2,
        y + tileSize / 2,
        0.4 * tileSize,
        0, 2 * Math.PI,
    );
    ctx.stroke();
}

function drawRedRing(ctx, { x, y }) {
    const { tileSize } = context.board;
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(160, 24, 24)';
    ctx.lineWidth = 0.1 * tileSize;
    ctx.arc(
        x + tileSize / 2,
        y + tileSize / 2,
        0.4 * tileSize,
        0, 2 * Math.PI,
    );
    ctx.stroke();
}

function drawLastMove(ctx) {
    const { lastMove } = context.draw;
    const { tileSize } = context.board;
    const highlightedTiles = [];

    if (lastMove.diskFrom !== -1) {
        highlightedTiles.push(lastMove.diskFrom);
    }

    if (lastMove.diskTo !== -1) {
        highlightedTiles.push(lastMove.diskTo);
    }

    if (lastMove.ringTo !== -1) {
        highlightedTiles.push(lastMove.ringTo);
    }

    highlightedTiles.forEach((tile) => {
        const boardCoords = getCoords(tile);
        const canvasCoords = convertBoardToCanvasCoords(boardCoords);

        ctx.fillStyle = 'rgb(48, 24, 24)';
        ctx.fillRect(
            canvasCoords.x,
            canvasCoords.y,
            tileSize,
            tileSize,
        );
    });
}

function drawBoard(ctx) {
    const { tileSize } = context.board;
    const startX = context.board.canvasX % tileSize;
    const startY = context.board.canvasY % tileSize;
    const endX = context.canvas.width;
    const endY = context.canvas.height;

    ctx.strokeStyle = 'rgb(160, 160, 160)';
    ctx.lineWidth = 1;

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

function drawPhasePiece(ctx) {
    const { phase } = context.events;
    const { move } = context.draw;

    const {
        tileSize,
        isBlueTurn,
        grid,
    } = context.board;

    const canvasRect = context.canvas.getBoundingClientRect();

    const mouseX = context.events.mouseMove.clientX - canvasRect.left;
    const mouseY = context.events.mouseMove.clientY - canvasRect.top;

    if (phase === OPPONENT_PHASE) {
        return;
    }

    if (phase === PICK_DISK_PHASE) {
        return;
    }

    if (phase === DROP_DISK_PHASE) {
        const x = mouseX - tileSize / 2;
        const y = mouseY - tileSize / 2;

        if (isBlueTurn) {
            drawBlueDisk(ctx, { x, y });
        } else {
            drawRedDisk(ctx, { x, y });
        }
    }

    if (phase === DROP_RING_PHASE) {
        const x = mouseX - tileSize / 2;
        const y = mouseY - tileSize / 2;

        if (isBlueRing(grid[move.diskTo])) {
            drawBlueRing(ctx, { x, y });
        } else {
            drawRedRing(ctx, { x, y });
        }
    }
}

function drawPossibleMoves(ctx) {
    const { tileSize } = context.board;
    const { phase } = context.events;
    let highlightedTiles = new Set();

    if (phase === OPPONENT_PHASE) {
        return;
    }

    if (phase === PICK_DISK_PHASE) {
        highlightedTiles = context.draw.pickDiskMoves;
    }

    if (phase === DROP_DISK_PHASE) {
        highlightedTiles = context.draw.dropDiskMoves;
    }

    if (phase === DROP_RING_PHASE) {
        highlightedTiles = context.draw.dropRingMoves;
    }

    highlightedTiles.forEach((tile) => {
        const boardCoords = getCoords(tile);
        const canvasCoords = convertBoardToCanvasCoords(boardCoords);

        ctx.fillStyle = 'rgb(16, 64, 16)';
        ctx.fillRect(
            canvasCoords.x,
            canvasCoords.y,
            tileSize,
            tileSize,
        );
    });
}

function drawOrigin(ctx) {
    const { canvasX, canvasY, tileSize } = context.board;

    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(canvasX - tileSize, canvasY);
    ctx.lineTo(canvasX + tileSize, canvasY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvasX, canvasY - tileSize);
    ctx.lineTo(canvasX, canvasY + tileSize);
    ctx.stroke();
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

function drawBlueDisks(ctx) {
    const { blueDisks, isBlueTurn } = context.board;
    const { move } = context.draw;

    blueDisks.forEach((blueDisk) => {
        const boardCoords = getCoords(blueDisk);
        const canvasCoords = convertBoardToCanvasCoords(boardCoords);

        if (move.diskFrom === blueDisk) {
            return;
        }

        drawBlueDisk(ctx, canvasCoords);
    });

    if (move.diskTo > 0 && isBlueTurn) {
        const boardCoords = getCoords(move.diskTo);
        const canvasCoords = convertBoardToCanvasCoords(boardCoords);
        drawBlueDisk(ctx, canvasCoords);
    }
}

function drawRedDisks(ctx) {
    const { redDisks, isBlueTurn } = context.board;
    const { move } = context.draw;

    redDisks.forEach((redDisk) => {
        const boardCoords = getCoords(redDisk);
        const canvasCoords = convertBoardToCanvasCoords(boardCoords);

        if (move.diskFrom === redDisk) {
            return;
        }

        drawRedDisk(ctx, canvasCoords);
    });

    if (move.diskTo > 0 && !isBlueTurn) {
        const boardCoords = getCoords(move.diskTo);
        const canvasCoords = convertBoardToCanvasCoords(boardCoords);
        drawRedDisk(ctx, canvasCoords);
    }
}

function drawBlueRings(ctx) {
    const { blueRings } = context.board;
    const { move } = context.draw;

    blueRings.forEach((blueRing) => {
        const boardCoords = getCoords(blueRing);
        const canvasCoords = convertBoardToCanvasCoords(boardCoords);

        if (move.diskTo === blueRing) {
            return;
        }

        drawBlueRing(ctx, canvasCoords);
    });
}

function drawRedRings(ctx) {
    const { redRings } = context.board;
    const { move } = context.draw;

    redRings.forEach((redRing) => {
        const boardCoords = getCoords(redRing);
        const canvasCoords = convertBoardToCanvasCoords(boardCoords);

        if (move.diskTo === redRing) {
            return;
        }

        drawRedRing(ctx, canvasCoords);
    });
}

function drawPieces(ctx) {
    drawBlueDisks(ctx);
    drawRedDisks(ctx);
    drawBlueRings(ctx);
    drawRedRings(ctx);
}

function redraw() {
    console.log('redraw');

    const ctx = context.canvas.getContext('2d');

    ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);

    drawLastMove(ctx);
    drawPossibleMoves(ctx);
    drawBoard(ctx);
    drawMouseHighlight(ctx);
    drawOrigin(ctx);
    drawPieces(ctx);
    drawPhasePiece(ctx);
}

module.exports = { redraw };
