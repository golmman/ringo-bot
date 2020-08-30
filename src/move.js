const {
    DROP_DISK,
    EMPTY,
    GRID_SIZE,
    MAX_DISKS,
} = require('./constants');

function generateAdjacentEmptyIndices(board, index) {
    const { grid } = board;

    const emptyIndices = [];

    if (grid[index - GRID_SIZE] === EMPTY) {
        emptyIndices.push(index - GRID_SIZE);
    }

    if (grid[index - 1] === EMPTY) {
        emptyIndices.push(index - 1);
    }

    if (grid[index + 1] === EMPTY) {
        emptyIndices.push(index + 1);
    }

    if (grid[index + GRID_SIZE] === EMPTY) {
        emptyIndices.push(index + GRID_SIZE);
    }

    return emptyIndices;
}

function generateRingMoves(board, ring, compareRing, diskFrom, moves) {
    if (ring === compareRing) {
        return;
    }

    const emptyIndices = generateAdjacentEmptyIndices(board, compareRing);
    for (let k = 0; k < emptyIndices.length; k += 1) {
        moves.push({
            diskFrom,
            diskTo: ring,
            ringTo: emptyIndices[k],
        });
    }
}

function generateDiskDropMoves(board, ring, diskFrom, moves) {
    const { blueRings, redRings } = board;

    for (let k = 0; k < blueRings.length; k += 1) {
        generateRingMoves(board, ring, blueRings[k], diskFrom, moves);
    }

    for (let k = 0; k < redRings.length; k += 1) {
        generateRingMoves(board, ring, redRings[k], diskFrom, moves);
    }
}

function generateRemovableDisks(board) {
    // TODO: stub
    return [];
}

function generateDiskTransferMoves(board, ring, moves) {
    const removableDisks = generateRemovableDisks(board);

    for (let k = 0; k < removableDisks.length; k += 1) {
        generateDiskDropMoves(board, ring, removableDisks[k], moves);
    }
}

function generateMovesForRings(board, rings, moves) {
    for (let k = 0; k < rings.length; k += 1) {
        if (board.activeDisks.length < MAX_DISKS) {
            generateDiskDropMoves(board, rings[k], DROP_DISK, moves);
        } else {
            generateDiskTransferMoves(board, rings[k], moves);
        }
    }
}

function generateMoves(board) {
    const moves = [];

    board.activeDisks = board.isBlueTurn
        ? board.blueDisks
        : board.redDisks;

    generateMovesForRings(board, board.blueRings, moves);
    generateMovesForRings(board, board.redRings, moves);

    return moves;
}

function doMove(board, { diskFrom, diskTo, ringTo }) {
    return 1;
}

function undoMove(board, { diskFrom, diskTo, ringTo }) {
    return 1;
}

module.exports = {
    doMove,
    undoMove,
    generateMoves,
};
