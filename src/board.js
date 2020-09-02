const { intDiv } = require('./util');
const { context } = require('./context');
const {
    EMPTY,
    BLUE_DISK,
    RED_DISK,
    BLUE_RING,
    RED_RING,
    GRID_SIZE,
    GRID_SIZE2,
} = require('./constants');

function putPiece(piece, x, y) {
    const position = GRID_SIZE * y + x;
    context.board.grid[position] = piece;
    return position;
}

function putBlueDisk(disk, x, y) {
    const position = putPiece(disk, x, y);
    context.board.blueDisks.add(position);
}

function putRedDisk(disk, x, y) {
    const position = putPiece(disk, x, y);
    context.board.redDisks.add(position);
}

function putBlueRing(ring, x, y) {
    const position = putPiece(ring, x, y);
    context.board.blueRings.add(position);
}

function putRedRing(ring, x, y) {
    const position = putPiece(ring, x, y);
    context.board.redRings.add(position);
}

function initBoard() {
    const { board } = context;

    board.grid = new Array(GRID_SIZE2).fill(EMPTY);

    const gridCenter = GRID_SIZE / 2;

    putBlueRing(BLUE_RING + 0, gridCenter, gridCenter);
    putBlueRing(BLUE_RING + 1, gridCenter + 2, gridCenter);
    putBlueRing(BLUE_RING + 2, gridCenter, gridCenter + 2);
    putBlueRing(BLUE_RING + 3, gridCenter + 2, gridCenter + 2);

    putRedRing(RED_RING + 0, gridCenter + 1, gridCenter);
    putRedRing(RED_RING + 1, gridCenter, gridCenter + 1);
    putRedRing(RED_RING + 2, gridCenter + 2, gridCenter + 1);
    putRedRing(RED_RING + 3, gridCenter + 1, gridCenter + 2);

    //putBlueDisk(BLUE_DISK + 0, gridCenter + 1, gridCenter + 1);
    putBlueDisk(BLUE_DISK + 1, gridCenter + 2, gridCenter + 1);
    putRedDisk(RED_DISK + 0, gridCenter + 3, gridCenter + 4);
}

function isBlueDisk(piece) {
    return intDiv(piece, 1000) === 1;
}

function isRedDisk(piece) {
    return intDiv(piece, 1000) === 2;
}

function isBlueRing(piece) {
    return intDiv(piece, 1000) === 3;
}

function isRedRing(piece) {
    return intDiv(piece, 1000) === 4;
}

function getCoords(gridIndex) {
    return {
        x: gridIndex % GRID_SIZE,
        y: intDiv(gridIndex, GRID_SIZE),
    };
}

function getGridIndexAt({ canvasX, canvasY }) {
    const { canvasX: cX, canvasY: cY, tileSize } = context.board;

    const gridXRaw = canvasX - cX > 0
        ? intDiv(canvasX - cX, tileSize)
        : intDiv(canvasX - cX, tileSize) - 1;
    const gridX = gridXRaw + GRID_SIZE / 2;

    const gridYRaw = canvasY - cY > 0
        ? intDiv(canvasY - cY, tileSize)
        : intDiv(canvasY - cY, tileSize) - 1;
    const gridY = gridYRaw + GRID_SIZE / 2;

    const gridIndex = GRID_SIZE * gridY + gridX;

    console.log(`grid: ${gridX} ${gridY}`);

    return gridIndex;
}

module.exports = {
    getCoords,
    getGridIndexAt,
    initBoard,
    isBlueDisk,
    isBlueRing,
    isRedDisk,
    isRedRing,
    putPiece,
};
