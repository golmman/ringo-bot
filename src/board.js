const { intDiv } = require('./util');
const {
    EMPTY,
    BLUE_DISK,
    RED_DISK,
    BLUE_RING,
    RED_RING,
    GRID_SIZE,
    GRID_SIZE2,
} = require('./constants');

function getCoords(gridIndex) {
    return {
        x: gridIndex % GRID_SIZE,
        y: intDiv(gridIndex, GRID_SIZE),
    };
}

function getGridIndex({ x, y }) {
    return GRID_SIZE * y + x;
}

function setGridPiece(board, piece, gridIndex) {
    board.grid[gridIndex] = piece;
}

function unsetGridPiece(board, gridIndex) {
    const oldPiece = board.grid[gridIndex];
    board.grid[gridIndex] = EMPTY;
    return oldPiece;
}

function deleteBlueDisk(board, gridIndex) {
    const oldPiece = unsetGridPiece(board, gridIndex);
    board.blueDisks.delete(gridIndex);
    return oldPiece;
}

function deleteRedDisk(board, gridIndex) {
    const oldPiece = unsetGridPiece(board, gridIndex);
    board.redDisks.delete(gridIndex);
    return oldPiece;
}

function deleteBlueRing(board, gridIndex) {
    const oldPiece = unsetGridPiece(board, gridIndex);
    board.blueRings.delete(gridIndex);
    return oldPiece;
}

function deleteRedRing(board, gridIndex) {
    const oldPiece = unsetGridPiece(board, gridIndex);
    board.redRings.delete(gridIndex);
    return oldPiece;
}

function addBlueDisk(board, disk, gridIndex) {
    setGridPiece(board, disk, gridIndex);
    board.blueDisks.add(gridIndex);
}

function addRedDisk(board, disk, gridIndex) {
    setGridPiece(board, disk, gridIndex);
    board.redDisks.add(gridIndex);
}

function addBlueRing(board, ring, gridIndex) {
    setGridPiece(board, ring, gridIndex);
    board.blueRings.add(gridIndex);
}

function addRedRing(board, ring, gridIndex) {
    setGridPiece(board, ring, gridIndex);
    board.redRings.add(gridIndex);
}

function initBoard(board) {
    board.grid = new Array(GRID_SIZE2).fill(EMPTY);

    const gridCenter = GRID_SIZE / 2;

    addBlueRing(board, BLUE_RING + 0, getGridIndex({ x: gridCenter, y: gridCenter }));
    addBlueRing(board, BLUE_RING + 1, getGridIndex({ x: gridCenter + 2, y: gridCenter }));
    addBlueRing(board, BLUE_RING + 2, getGridIndex({ x: gridCenter, y: gridCenter + 2 }));
    addBlueRing(board, BLUE_RING + 3, getGridIndex({ x: gridCenter + 2, y: gridCenter + 2 }));

    addRedRing(board, RED_RING + 0, getGridIndex({ x: gridCenter + 1, y: gridCenter }));
    addRedRing(board, RED_RING + 1, getGridIndex({ x: gridCenter, y: gridCenter + 1 }));
    addRedRing(board, RED_RING + 2, getGridIndex({ x: gridCenter + 2, y: gridCenter + 1 }));
    addRedRing(board, RED_RING + 3, getGridIndex({ x: gridCenter + 1, y: gridCenter + 2 }));

    addBlueDisk(board, BLUE_DISK + 0, getGridIndex({ x: gridCenter + 3, y: gridCenter + 0 }));
    addBlueDisk(board, BLUE_DISK + 1, getGridIndex({ x: gridCenter + 4, y: gridCenter + 0 }));
    addBlueDisk(board, BLUE_DISK + 2, getGridIndex({ x: gridCenter + 5, y: gridCenter + 0 }));
    addBlueDisk(board, BLUE_DISK + 3, getGridIndex({ x: gridCenter + 3, y: gridCenter + 1 }));
    addBlueDisk(board, BLUE_DISK + 4, getGridIndex({ x: gridCenter + 4, y: gridCenter + 1 }));
    addBlueDisk(board, BLUE_DISK + 5, getGridIndex({ x: gridCenter + 5, y: gridCenter + 1 }));
    addBlueDisk(board, BLUE_DISK + 6, getGridIndex({ x: gridCenter + 3, y: gridCenter + 2 }));
    addBlueDisk(board, BLUE_DISK + 7, getGridIndex({ x: gridCenter + 4, y: gridCenter + 2 }));
    addBlueDisk(board, BLUE_DISK + 8, getGridIndex({ x: gridCenter + 5, y: gridCenter + 2 }));
    addBlueDisk(board, BLUE_DISK + 9, getGridIndex({ x: gridCenter + 6, y: gridCenter + 2 }));

    addRedDisk(board, RED_DISK + 0, getGridIndex({ y: gridCenter + 3, x: gridCenter + 0 }));
    addRedDisk(board, RED_DISK + 1, getGridIndex({ y: gridCenter + 4, x: gridCenter + 0 }));
    addRedDisk(board, RED_DISK + 2, getGridIndex({ y: gridCenter + 5, x: gridCenter + 0 }));
    addRedDisk(board, RED_DISK + 3, getGridIndex({ y: gridCenter + 3, x: gridCenter + 1 }));
    addRedDisk(board, RED_DISK + 4, getGridIndex({ y: gridCenter + 4, x: gridCenter + 1 }));
    addRedDisk(board, RED_DISK + 5, getGridIndex({ y: gridCenter + 5, x: gridCenter + 1 }));
    addRedDisk(board, RED_DISK + 6, getGridIndex({ y: gridCenter + 3, x: gridCenter + 2 }));
    addRedDisk(board, RED_DISK + 7, getGridIndex({ y: gridCenter + 4, x: gridCenter + 2 }));
    addRedDisk(board, RED_DISK + 8, getGridIndex({ y: gridCenter + 5, x: gridCenter + 2 }));
    addRedDisk(board, RED_DISK + 9, getGridIndex({ y: gridCenter + 6, x: gridCenter + 2 }));
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

module.exports = {
    addBlueDisk,
    addBlueRing,
    addRedDisk,
    addRedRing,
    deleteBlueDisk,
    deleteBlueRing,
    deleteRedDisk,
    deleteRedRing,
    getCoords,
    initBoard,
    isBlueDisk,
    isBlueRing,
    isRedDisk,
    isRedRing,
};
