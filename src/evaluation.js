const { GRID_SIZE } = require('./constants');
const { isBlueDisk, isRedDisk } = require('./board');

const DIRECTION_INDICES = [
    [1, 2, 3], // east
    [GRID_SIZE, 2 * GRID_SIZE, 3 * GRID_SIZE], // south
    [GRID_SIZE + 1, 2 * GRID_SIZE + 2, 3 * GRID_SIZE + 3], // south-east
    [GRID_SIZE - 1, 2 * GRID_SIZE - 2, 3 * GRID_SIZE - 3], // south-west
];

function isWinAtDirection(board, gridIndex, isProperColor, direction) {
    const directionIndices = DIRECTION_INDICES[direction];
    let lineLength = 1;

    for (const directionIndex of directionIndices) {
        const piece = board.grid[gridIndex + directionIndex];
        if (!isProperColor(piece)) {
            break;
        }
        lineLength += 1;

        const x = (gridIndex + directionIndex) % GRID_SIZE;
        const y = (gridIndex + directionIndex) / GRID_SIZE;
        console.log(`f ${piece} ${x} ${y}`);
    }

    for (const directionIndex of directionIndices) {
        const piece = board.grid[gridIndex - directionIndex];
        if (!isProperColor(piece)) {
            break;
        }
        lineLength += 1;

        const x = (gridIndex + directionIndex) % GRID_SIZE;
        const y = (gridIndex + directionIndex) / GRID_SIZE;
        console.log(`b ${piece} ${x} ${y}`);
    }

    console.log(direction, lineLength);

    return lineLength >= 4;
}

function isWinAt(board, gridIndex, isProperColor) {
    if (!isProperColor(board.grid[gridIndex])) {
        return false;
    }

    for (let direction = 0; direction < 4; direction += 1) {
        if (isWinAtDirection(board, gridIndex, isProperColor, direction)) {
            return true;
        }
    }

    return false;
}

function isBlueWinAt(board, gridIndex) {
    return isWinAt(board, gridIndex, isBlueDisk);
}

function isRedWinAt(board, gridIndex) {
    return isWinAt(board, gridIndex, isRedDisk);
}

module.exports = {
    isBlueWinAt,
    isRedWinAt,
};
