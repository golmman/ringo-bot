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
}

function isBlueDisk(piece) {
    return intDiv(piece, BLUE_DISK) === 1;
}

function putPiece(piece, x, y) {
    const position = GRID_SIZE * y + x;
    context.board.grid[position] = piece;
    return position;
}

function putBlueRing(ring, x, y) {
    const position = putPiece(ring, x, y);
    context.board.rings.blue.push(position);
}

function putRedRing(ring, x, y) {
    const position = putPiece(ring, x, y);
    context.board.rings.red.push(position);
}

module.exports = {
    initBoard,
    isBlueDisk,
    putPiece,
};
