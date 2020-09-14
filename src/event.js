const { context } = require('./context');
const { redraw } = require('./draw');
const { generateMoves, makeMove } = require('./move');
const { intDiv } = require('./util');
const { findBestMove } = require('./engine');
const {
    isBlueDiskWinAt,
    isRedDiskWinAt,
    isBlueRingWinAt,
    isRedRingWinAt,
} = require('./evaluation');
const {
    BLUE,
    DROP_DISK_PHASE,
    DROP_RING_PHASE,
    GRID_SIZE,
    MAX_DISKS,
    OPPONENT_PHASE,
    PICK_DISK_PHASE,
    RED,
} = require('./constants');

function getGridIndexAtCanvasPos({ x, y }) {
    const { canvasX, canvasY, tileSize } = context.board;

    const gridXRaw = x - canvasX > 0
        ? intDiv(x - canvasX, tileSize)
        : intDiv(x - canvasX, tileSize) - 1;
    const gridX = gridXRaw + GRID_SIZE / 2;

    const gridYRaw = y - canvasY > 0
        ? intDiv(y - canvasY, tileSize)
        : intDiv(y - canvasY, tileSize) - 1;
    const gridY = gridYRaw + GRID_SIZE / 2;

    const gridIndex = GRID_SIZE * gridY + gridX;

    console.log(`grid: ${gridX} ${gridY}, gridIndex: ${gridIndex}`);

    return gridIndex;
}

function generatePickDiskMoves() {
    const { generatedMoves } = context.draw;

    context.draw.pickDiskMoves = new Set();
    for (let k = 0; k < generatedMoves.length; k += 1) {
        if (generatedMoves[k].diskFrom !== -1) {
            context.draw.pickDiskMoves.add(generatedMoves[k].diskFrom);
        }
    }
}

function generateDropDiskMoves(diskFrom) {
    const { generatedMoves } = context.draw;

    context.draw.dropDiskMoves = new Set();
    for (let k = 0; k < generatedMoves.length; k += 1) {
        if (diskFrom === generatedMoves[k].diskFrom) {
            context.draw.dropDiskMoves.add(generatedMoves[k].diskTo);
        }
    }
}

function generateDropRingMoves(diskFrom, diskTo) {
    const { generatedMoves } = context.draw;

    console.log('generateDropRingMoves');

    context.draw.dropRingMoves = new Set();
    for (let k = 0; k < generatedMoves.length; k += 1) {
        if (diskFrom === generatedMoves[k].diskFrom && diskTo === generatedMoves[k].diskTo) {
            console.log(generatedMoves[k]);
            context.draw.dropRingMoves.add(generatedMoves[k].ringTo);
        }
    }
}

function restartPhases() {
    console.log('restartPhases');
    context.draw.generatedMoves = generateMoves(context.board);

    context.draw.move = {
        diskFrom: -1,
        diskTo: -1,
        ringTo: -1,
    };

    const activeDisks = context.board.isBlueTurn
        ? context.board.blueDisks
        : context.board.redDisks;

    if (activeDisks.size < MAX_DISKS) {
        context.events.phase = DROP_DISK_PHASE;
        generateDropDiskMoves(-1);
    } else {
        context.events.phase = PICK_DISK_PHASE;
        generatePickDiskMoves();
    }

    redraw();
}

function getWinner(move) {
    const { board } = context;
    console.log(move);

    if (isBlueDiskWinAt(board, move.diskTo)) {
        return BLUE;
    }
    if (isBlueRingWinAt(board, move.ringTo)) {
        return BLUE;
    }
    if (isRedDiskWinAt(board, move.diskTo)) {
        return RED;
    }
    if (isRedRingWinAt(board, move.ringTo)) {
        return RED;
    }

    return null;
}

function runEngine() {
    console.log('runEngine');
    const { board } = context;

    context.draw.lastMove = findBestMove(board);
    makeMove(context.board, context.draw.lastMove);
    context.board.isBlueTurn = !context.board.isBlueTurn;

    context.draw.winner = getWinner(context.draw.lastMove);
    if (context.draw.winner === null) {
        restartPhases();
    }
}

function handleKeyDown(event) {
    console.log(`handleKeyDown, keyCode: ${event.keyCode}`);

    const { phase } = context.events;

    if (event.keyCode === 70 && phase === OPPONENT_PHASE) { // f key
        restartPhases();
    }
}

function handleMouseClick(event) {
    console.log('handleMouseClick');

    const { phase } = context.events;

    if (phase === OPPONENT_PHASE) {
        console.log('opponent phase, mouse click processing aborted');
        return;
    }

    const { pickDiskMoves, dropDiskMoves, dropRingMoves } = context.draw;

    const canvasRect = context.canvas.getBoundingClientRect();

    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;

    const gridIndex = getGridIndexAtCanvasPos({ x: mouseX, y: mouseY });

    console.log(`mouse: ${mouseX} ${mouseY}, click count: ${event.detail}`);

    //if (event.detail !== 2) {
    //    return;
    //}

    if (phase === PICK_DISK_PHASE) {
        if (pickDiskMoves.has(gridIndex)) {
            console.log('pick disk phase legal move');
            context.draw.move.diskFrom = gridIndex;
            context.events.phase = DROP_DISK_PHASE;
            generateDropDiskMoves(context.draw.move.diskFrom);

            redraw();
        } else {
            console.log('pick disk phase illegal move');
        }
    } else if (phase === DROP_DISK_PHASE) {
        if (dropDiskMoves.has(gridIndex)) {
            console.log('drop disk phase legal move');
            context.draw.move.diskTo = gridIndex;
            context.events.phase = DROP_RING_PHASE;
            generateDropRingMoves(context.draw.move.diskFrom, context.draw.move.diskTo);

            redraw();
        } else {
            console.log('drop disk phase illegal move');
        }
    } else if (phase === DROP_RING_PHASE) {
        if (dropRingMoves.has(gridIndex)) {
            console.log('drop ring phase legal move');
            context.draw.move.ringTo = gridIndex;
            makeMove(context.board, context.draw.move);

            context.events.phase = OPPONENT_PHASE;
            context.board.isBlueTurn = !context.board.isBlueTurn;

            context.draw.winner = getWinner(context.draw.move);

            context.draw.move = {
                diskFrom: -1,
                diskTo: -1,
                ringTo: -1,
            };

            redraw();

            if (context.draw.winner === null) {
                runEngine();
            }
        } else {
            console.log('drop ring phase illegal move');
        }
    }
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
    context.events.mouseButton = event.button;
}

function handleMouseMove(event) {
    if (context.events.isMouseDown && context.events.mouseButton === 2) {
        const deltaX = event.screenX - context.events.mouseMove.screenX;
        const deltaY = event.screenY - context.events.mouseMove.screenY;
        context.board.canvasX += deltaX;
        context.board.canvasY += deltaY;
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

    context.events.mouseButton = null;
    context.events.isMouseDown = false;
}

function handleMouseWheel(event) {
    console.log(`handleMouseWheel: ${event.deltaY}`);

    const canvasWidth = context.canvas.width;
    const canvasHeight = context.canvas.height;
    const mapCanvasX = context.board.canvasX;
    const mapCanvasY = context.board.canvasY;

    let { tileSize } = context.board;

    const centerTileDistanceX = (canvasWidth / 2 - mapCanvasX) / tileSize;
    const centerTileDistanceY = (canvasHeight / 2 - mapCanvasY) / tileSize;

    tileSize -= event.deltaY;

    if (tileSize > 100) {
        tileSize = 100;
    }

    if (tileSize < 10) {
        tileSize = 10;
    }

    context.board.tileSize = tileSize;

    context.board.canvasX = canvasWidth / 2 - tileSize * centerTileDistanceX;
    context.board.canvasY = canvasHeight / 2 - tileSize * centerTileDistanceY;

    redraw();
}

module.exports = {
    handleKeyDown,
    handleMouseClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseWheel,
    restartPhases,
};
