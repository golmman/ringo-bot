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

function setGridPiece(piece, gridIndex) {
    context.board.grid[gridIndex] = piece;
}

function deleteBlueDisk(gridIndex) {

}

function addBlueDisk(disk, gridIndex) {
    setGridPiece(disk, gridIndex);
    context.board.blueDisks.add(gridIndex);
}

function addRedDisk(disk, gridIndex) {
    setGridPiece(disk, gridIndex);
    context.board.redDisks.add(gridIndex);
}

function addBlueRing(ring, gridIndex) {
    setGridPiece(ring, gridIndex);
    context.board.blueRings.add(gridIndex);
}

function addRedRing(ring, gridIndex) {
    setGridPiece(ring, gridIndex);
    context.board.redRings.add(gridIndex);
}

function initBoard() {
    const { board } = context;

    board.grid = new Array(GRID_SIZE2).fill(EMPTY);

    const gridCenter = GRID_SIZE / 2;

    addBlueRing(BLUE_RING + 0, getGridIndex({ x: gridCenter, y: gridCenter }));
    addBlueRing(BLUE_RING + 1, getGridIndex({ x: gridCenter + 2, y: gridCenter }));
    addBlueRing(BLUE_RING + 2, getGridIndex({ x: gridCenter, y: gridCenter + 2 }));
    addBlueRing(BLUE_RING + 3, getGridIndex({ x: gridCenter + 2, y: gridCenter + 2 }));

    addRedRing(RED_RING + 0, getGridIndex({ x: gridCenter + 1, y: gridCenter }));
    addRedRing(RED_RING + 1, getGridIndex({ x: gridCenter, y: gridCenter + 1 }));
    addRedRing(RED_RING + 2, getGridIndex({ x: gridCenter + 2, y: gridCenter + 1 }));
    addRedRing(RED_RING + 3, getGridIndex({ x: gridCenter + 1, y: gridCenter + 2 }));

    //addBlueDisk(BLUE_DISK + 0, getGridIndex({ x: gridCenter + 1, y: gridCenter + 1 }));
    addBlueDisk(BLUE_DISK + 1, getGridIndex({ x: gridCenter + 2, y: gridCenter + 1 }));
    addRedDisk(RED_DISK + 0, getGridIndex({ x: gridCenter + 3, y: gridCenter + 4 }));
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

function getGridIndex({ x, y }) {
    return GRID_SIZE * y + x;
}

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

    console.log(`grid: ${gridX} ${gridY}`);

    return gridIndex;
}

module.exports = {
    getCoords,
    getGridIndexAtCanvasPos,
    initBoard,
    isBlueDisk,
    isBlueRing,
    isRedDisk,
    isRedRing,
};
