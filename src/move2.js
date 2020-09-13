const {
    isDisk,
    isRing,
} = require('./board');
const { mergeSets } = require('./util');
const {
    GRID_SIZE,
    MAX_DISKS,
    EMPTY,
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

module.exports = {
    generateMoves,
    generateRingDrops,
};
