const {
    addBlueDisk,
    addBlueRing,
    addRedDisk,
    addRedRing,
    deleteBlueDisk,
    deleteBlueRing,
    deleteRedDisk,
    deleteRedRing,
    isBlueRing,
} = require('./board');
const {
    BLUE_DISK,
    DROP_DISK,
    EMPTY,
    GRID_SIZE,
    MARKED,
    MAX_DISKS,
    RED_DISK,
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

    const removableDisks = board.activeDisks;

    return removableDisks;
}

function generateDiskTransferMoves(board, ring, moves) {
    const removableDisks = generateRemovableDisks(board);

    removableDisks.forEach((removableDisk) => {
        generateDiskDropMoves(board, ring, removableDisk, moves);
    });
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

    const nextDisk = board.isBlueTurn
        ? BLUE_DISK + board.blueDisks.size
        : RED_DISK + board.redDisks.size;

    const { addDisk, deleteDisk } = board.isBlueTurn
        ? { addDisk: addBlueDisk, deleteDisk: deleteBlueDisk }
        : { addDisk: addRedDisk, deleteDisk: deleteRedDisk };

    const ringToBeDeleted = board.grid[diskTo];
    const { addRing, deleteRing } = isBlueRing(ringToBeDeleted)
        ? { addRing: addBlueRing, deleteRing: deleteBlueRing }
        : { addRing: addRedRing, deleteRing: deleteRedRing };

    const deletedDisk = diskFrom > 0
        ? deleteDisk(board, diskFrom)
        : nextDisk;
    const deletedRing = deleteRing(board, diskTo);

    addDisk(board, deletedDisk, diskTo);
    addRing(board, deletedRing, ringTo);

    console.log(board.redRings);

    return 1;
}

// TODO: stub
// eslint-disable-next-line
function unmakeMove(board, { diskFrom, diskTo, ringTo }) {
    return 1;
}

module.exports = {
    makeMove,
    unmakeMove,
    generateMoves,
};
