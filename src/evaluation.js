const { GRID_SIZE } = require('./constants');
const { isBlueDisk, isRedDisk } = require('./board');

const DIRECTIONS = {
    EAST,
    SOUTH,
    SOUTH_EAST,
    SOUTH_WEST,
};

const DIRECTION_INDICES = [
    [1, 2, 3], // east
    [GRID_SIZE, 2 * GRID_SIZE, 3 * GRID_SIZE], // south
    [GRID_SIZE + 1, 2 * GRID_SIZE + 2, 3 * GRID_SIZE + 3], // south-east
    [GRID_SIZE - 1, 2 * GRID_SIZE - 2, 3 * GRID_SIZE - 3], // south-west
];

function isWinAtDirection(board, gridIndex, isProperColor, direction) {
    const directionIndices = DIRECTION_INDICES[direction];
    let lineLength = 0;

    directionIndices.forEach((directionIndex) => {
        const piece = board.grid[gridIndex + directionIndex];
        if (isProperColor(piece)) {
            lineLength += 1;
        } else {
            return;
        }
    });


    directionIndices.forEach((directionIndex) => {
        const piece = board.grid[gridIndex - directionIndex];
        if (isProperColor(piece)) {
            lineLength += 1;
        } else {
            return;
        }
    });

    return lineLength >= 4;
}

function isWinAt(board, gridIndex, isProperColor) {
    for (let direction = 0; direction < 4; direction += 1) {
        if (isWinAtDirection(board, gridIndex, isProperColor, direction)) {
            return true;
        }
    }

    return false;
}

function isBlueWinAt(board, gridIndex) {
    isWinAt(board, gridIndex, isBlueDisk);
}

function isRedWinAt(board, gridIndex) {
    isWinAt(board, gridIndex, isRedDisk);
}

module.exports = {
    isBlueWinAt,
    isRedWinAt,
};
