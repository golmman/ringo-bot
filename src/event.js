const { context } = require('./context');
const { redraw } = require('./draw');
const { generateMoves } = require('./move');
const { intDiv } = require('./util');
const {
    OPPONENT_PHASE,
    PICK_DISK_PHASE,
    DROP_DISK_PHASE,
    DROP_RING_PHASE,
    MAX_DISKS,
    GRID_SIZE,
} = require('./constants');

function generatePickDiskMoves() {
    const { generatedMoves } = context.draw;

    context.draw.pickDiskMoves = new Set();
    for (let k = 0; k < generatedMoves.length; k += 1) {
        if (generatedMoves[k].diskFrom !== -1) {
            context.draw.pickDiskMoves.add(generatedMoves[k].diskFrom);
        }
    }
}

function generateDropDiskMoves() {
    const { generatedMoves } = context.draw;

    context.draw.dropDiskMoves = new Set();
    for (let k = 0; k < generatedMoves.length; k += 1) {
        context.draw.dropDiskMoves.add(generatedMoves[k].diskTo);
    }
}

function generateDropRingMoves(diskTo) {
    const { generatedMoves } = context.draw;

    context.draw.dropRingMoves = new Set();
    for (let k = 0; k < generatedMoves.length; k += 1) {
        if (diskTo === generatedMoves[k].diskTo) {
            context.draw.dropRingMoves.add(generatedMoves[k].ringTo);
        }
    }
}

function handleKeyDown(event) {
    console.log(`handleKeyDown, keyCode: ${event.keyCode}`);

    const { phase } = context.events;

    if (event.keyCode === 70 && phase === OPPONENT_PHASE) { // f key
        context.draw.generatedMoves = generateMoves(context.board);
        generatePickDiskMoves();
        generateDropDiskMoves();
        generateDropRingMoves(32896);

        context.draw.move = {
            diskFrom: -1,
            diskTo: -1,
            ringTo: -1,
        };

        if (context.board.activeDisks.length < MAX_DISKS) {
            context.events.phase = DROP_DISK_PHASE;
        } else {
            context.events.phase = PICK_DISK_PHASE;
        }

        console.log(context.draw.generatedMoves);
        console.log(`transitioned to phase: ${context.events.phase}`);

        console.log('pick disk moves');
        console.log(context.draw.pickDiskMoves);
        console.log('drop disk moves');
        console.log(context.draw.dropDiskMoves);
        console.log('drop ring moves');
        console.log(context.draw.dropRingMoves);
    }
}

function handleMouseClick(event) {
    console.log('handleMouseClick');
    const { phase } = context.events;
    const { canvasX, canvasY, tileSize } = context.board;
    const { dropDiskMoves } = context.draw;

    const canvasRect = context.canvas.getBoundingClientRect();

    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;

    const gridXRaw = mouseX - canvasX > 0
        ? intDiv(mouseX - canvasX, tileSize)
        : intDiv(mouseX - canvasX, tileSize) - 1;
    const gridX = gridXRaw + GRID_SIZE / 2;

    const gridYRaw = mouseY - canvasY > 0
        ? intDiv(mouseY - canvasY, tileSize)
        : intDiv(mouseY - canvasY, tileSize) - 1;
    const gridY = gridYRaw + GRID_SIZE / 2;

    const gridIndex = GRID_SIZE * gridY + gridX;

    console.log(`mouse: ${mouseX} ${mouseY}, click count: ${event.detail}`);
    console.log(`grid: ${gridX} ${gridY}`);

    if (event.detail === 2) {
        if (phase === DROP_DISK_PHASE) {
            if (dropDiskMoves.has(gridIndex)) {
                console.log('yes!');
            } else {
                console.log('no!');
            }
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
}

function handleMouseMove(event) {
    if (context.events.isMouseDown) {
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
};
