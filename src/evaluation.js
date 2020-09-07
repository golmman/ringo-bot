const { GRID_SIZE } = require('./constants');
const {
    isBlueDisk,
    isBlueRing,
    isRedDisk,
    isRedRing,
} = require('./board');

const DIRECTION_INDICES = [
    [1, 2, 3], // east
    [GRID_SIZE, 2 * GRID_SIZE, 3 * GRID_SIZE], // south
    [GRID_SIZE + 1, 2 * GRID_SIZE + 2, 3 * GRID_SIZE + 3], // south-east
    [GRID_SIZE - 1, 2 * GRID_SIZE - 2, 3 * GRID_SIZE - 3], // south-west
];

function isWinAtDirection(board, gridIndex, isProperPiece, direction) {
    const directionIndices = DIRECTION_INDICES[direction];
    let lineLength = 1;

    for (const directionIndex of directionIndices) {
        const piece = board.grid[gridIndex + directionIndex];
        if (!isProperPiece(piece)) {
            break;
        }
        lineLength += 1;
    }

    for (const directionIndex of directionIndices) {
        const piece = board.grid[gridIndex - directionIndex];
        if (!isProperPiece(piece)) {
            break;
        }
        lineLength += 1;
    }

    return lineLength >= 4;
}

function isWinAt(board, gridIndex, isProperPiece) {
    if (!isProperPiece(board.grid[gridIndex])) {
        return false;
    }

    for (let direction = 0; direction < 4; direction += 1) {
        if (isWinAtDirection(board, gridIndex, isProperPiece, direction)) {
            return true;
        }
    }

    return false;
}

function isBlueDiskWinAt(board, gridIndex) {
    return isWinAt(board, gridIndex, isBlueDisk);
}

function isRedDiskWinAt(board, gridIndex) {
    return isWinAt(board, gridIndex, isRedDisk);
}

function isBlueRingWinAt(board, gridIndex) {
    return isWinAt(board, gridIndex, isBlueRing);
}

function isRedRingWinAt(board, gridIndex) {
    return isWinAt(board, gridIndex, isRedRing);
}

module.exports = {
    isBlueDiskWinAt,
    isRedDiskWinAt,
    isBlueRingWinAt,
    isRedRingWinAt,
};
