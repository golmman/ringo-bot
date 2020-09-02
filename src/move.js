const {
    DROP_DISK,
    EMPTY,
    MARKED,
    GRID_SIZE,
    MAX_DISKS,
} = require('./constants');

function generateAdjacentEmptyIndices(board, index) {
    const { grid, duplicationMarkers } = board;

    const emptyIndices = [];

    let i = index - GRID_SIZE;
    if (grid[i] === EMPTY) {
        emptyIndices.push(i);

        duplicationMarkers.push(i);
        grid[i] = MARKED;
    }

    i = index - 1;
    if (grid[i] === EMPTY) {
        emptyIndices.push(i);

        duplicationMarkers.push(i);
        grid[i] = MARKED;
    }

    i = index + 1;
    if (grid[i] === EMPTY) {
        emptyIndices.push(i);

        duplicationMarkers.push(i);
        grid[i] = MARKED;
    }

    i = index + GRID_SIZE;
    if (grid[i] === EMPTY) {
        emptyIndices.push(i);

        duplicationMarkers.push(i);
        grid[i] = MARKED;
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

function removeDuplicationMarkers(board) {
    const { duplicationMarkers, grid } = board;
    for (let k = 0; k < duplicationMarkers.length; k += 1) {
        grid[duplicationMarkers[k]] = EMPTY;
    }

    board.duplicationMarkers = [];
}

// populates the move list for the given ring.
function generateDiskDropMoves(board, ring, diskFrom, moves) {
    const { blueRings, redRings } = board;

    blueRings.forEach((blueRing) => {
        generateRingMoves(board, ring, blueRing, diskFrom, moves);
    });

    redRings.forEach((redRing) => {
        generateRingMoves(board, ring, redRing, diskFrom, moves);
    });

    removeDuplicationMarkers(board);
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
    rings.forEach((ring) => {
        if (board.activeDisks.size < MAX_DISKS) {
            generateDiskDropMoves(board, ring, DROP_DISK, moves);
        } else {
            generateDiskTransferMoves(board, ring, moves);
        }
    });
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

function makeMove(board, { diskFrom, diskTo, ringTo }) {
    console.log(`make move ${JSON.stringify({ diskFrom, diskTo, ringTo })}`);


    return 1;
}

function unmakeMove(board, { diskFrom, diskTo, ringTo }) {
    return 1;
}

module.exports = {
    makeMove,
    unmakeMove,
    generateMoves,
};
