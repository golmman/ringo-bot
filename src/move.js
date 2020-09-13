const { getRandomInt } = require('./util');
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
    MAX_RINGS,
    RED_DISK,
} = require('./constants');

function isIndexEmptyOrEmptied(board, index, diskFrom) {
    if (board.grid[index] === EMPTY) {
        return true;
    }

    if (board.grid[index] === MARKED) {
        return false;
    }

    if (index === diskFrom) {
        return true;
    }

    return false;
}

function generateAdjacentEmptyIndices(board, index, diskFrom) {
    const { grid, duplicationMarkers } = board;

    const emptyIndices = [];

    let i = index - GRID_SIZE;
    if (isIndexEmptyOrEmptied(board, i, diskFrom)) {
        emptyIndices.push(i);

        duplicationMarkers.push({ index: i, piece: grid[i] });
        grid[i] = MARKED;
    }

    i = index - 1;
    if (isIndexEmptyOrEmptied(board, i, diskFrom)) {
        emptyIndices.push(i);

        duplicationMarkers.push({ index: i, piece: grid[i] });
        grid[i] = MARKED;
    }

    i = index + 1;
    if (isIndexEmptyOrEmptied(board, i, diskFrom)) {
        emptyIndices.push(i);

        duplicationMarkers.push({ index: i, piece: grid[i] });
        grid[i] = MARKED;
    }

    i = index + GRID_SIZE;
    if (isIndexEmptyOrEmptied(board, i, diskFrom)) {
        emptyIndices.push(i);

        duplicationMarkers.push({ index: i, piece: grid[i] });
        grid[i] = MARKED;
    }

    return emptyIndices;
}

function generateRingMoves(board, ring, compareRing, diskFrom, moves) {
    if (ring === compareRing) {
        return;
    }

    const emptyIndices = generateAdjacentEmptyIndices(board, compareRing, diskFrom);
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
    duplicationMarkers.forEach(({ index, piece }) => {
        grid[index] = piece;
    });

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
    // TODO: prevents disk islands being formed

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

function generateRandomMove(board) {
    const move = {};

    board.activeDisks = board.isBlueTurn
        ? board.blueDisks
        : board.redDisks;

    if (board.activeDisks.size < MAX_DISKS) {
        move.diskFrom = -1;
    } else {
        // TODO: make disk/ring sets arrays to avoid costly conversions?
        // -> this will make the (un)makeMove functions slower though...
        move.diskFrom = Array.from(board.activeDisks)[getRandomInt(MAX_DISKS)];
    }

    const relevantRings = Array.from(board.blueRings).concat(Array.from(board.redRings));

    const maxRings2 = 2 * MAX_RINGS;
    const r = getRandomInt(maxRings2);
    move.diskTo = relevantRings.splice(r, 1)[0];

    for (let k = 0; k < maxRings2 - 1; k += 1) {
        const ringIndex = getRandomInt(relevantRings.length);
        const ring = relevantRings.splice(ringIndex, 1)[0];

        const directions = [1, -1, GRID_SIZE, -GRID_SIZE];
        for (let l = 0; l < 4; l += 1) {
            const dirIndex = getRandomInt(directions.length);
            const dir = directions.splice(dirIndex, 1)[0];

            if (board.grid[ring + dir] === EMPTY) {
                move.ringTo = ring + dir;
                return move;
            }
        }
    }
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

    return 1;
}

// TODO: stub
// eslint-disable-next-line
function unmakeMove(board, { diskFrom, diskTo, ringTo }) {
    return 1;
}

module.exports = {
    generateMoves,
    generateRandomMove,
    makeMove,
    unmakeMove,
};
