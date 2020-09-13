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
    isRing,
} = require('./board');
const { mergeSets } = require('./util');
const {
    BLUE_DISK,
    EMPTY,
    GRID_SIZE,
    MAX_DISKS,
    RED_DISK,
} = require('./constants');

const DIRECTIONS = [-1, 1, -GRID_SIZE, GRID_SIZE];
const DIRECTIONS_SET = new Set(DIRECTIONS);

function generateDiskPicks(board) {
    const activeDisks = board.isBlueTurn
        ? board.blueDisks
        : board.redDisks;

    if (activeDisks.size < MAX_DISKS) {
        return [-1];
    }

    // TODO: preserve board connectedness
    return Array.from(activeDisks);
}

function generateRingDrops(board, rings) {
    const ringDrops = new Set();

    for (const ring of rings) {
        for (const direction of DIRECTIONS) {
            const gridIndex = ring + direction;
            const piece = board.grid[gridIndex];
            if (!isRing(piece)) {
                ringDrops.add(gridIndex);
            }
        }
    }

    return ringDrops;
}

function areIndicesAdjacent(index1, index2) {
    return DIRECTIONS_SET.has(index1 - index2);
}

function getAdjacentRingCount(board, index) {
    let sum = 0;
    for (const direction of DIRECTIONS) {
        if (isRing(board.grid[index + direction])) {
            sum += 1;
        }
    }
    return sum;
}

function isMoveValid(board, { diskFrom, diskTo, ringTo }) {
    if (!(board.grid[ringTo] === EMPTY || ringTo === diskFrom)) {
        return false;
    }

    if (areIndicesAdjacent(diskTo, ringTo)) {
        if (getAdjacentRingCount(board, ringTo) < 2) {
            return false;
        }
    }

    return true;
}

function generateMoves(board) {
    const moves = [];

    const rings = mergeSets(board.blueRings, board.redRings);
    const ringDrops = generateRingDrops(board, rings);
    const diskDrops = rings;
    const diskPicks = generateDiskPicks(board);

    for (const ringTo of ringDrops) {
        for (const diskTo of diskDrops) {
            for (const diskFrom of diskPicks) {
                const move = { diskFrom, diskTo, ringTo };
                if (isMoveValid(board, move)) {
                    moves.push(move);
                }
            }
        }
    }

    return moves;
}

function generateRandomMove(board) {
    // TODO: lazy implementation
    const moves = generateMoves(board);
    return moves[getRandomInt(moves.length)];
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
    generateRingDrops,
    makeMove,
    unmakeMove,
};
