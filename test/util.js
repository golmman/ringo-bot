const {
    addBlueDisk,
    addBlueRing,
    addRedDisk,
    addRedRing,
    isBlueDisk,
    isBlueRing,
    isRedDisk,
    isRedRing,
} = require('../src/board');
const { intDiv } = require('../src/util');
const {
    EMPTY,
    BLUE_DISK,
    RED_DISK,
    BLUE_RING,
    RED_RING,
    GRID_SIZE,
} = require('../src/constants');

const COLOR_BLUE = '\x1b[34m';
const COLOR_RED = '\x1b[31m';
const COLOR_RESET = '\x1b[0m';

function blue(text) {
    return `${COLOR_BLUE}${text}${COLOR_RESET}`;
}

function red(text) {
    return `${COLOR_RED}${text}${COLOR_RESET}`;
}

// eslint-disable-next-line no-unused-vars
function getPieceShorthand(piece) {
    if (isBlueDisk(piece)) {
        return blue(`b${piece - BLUE_DISK}`);
    }
    if (isRedDisk(piece)) {
        return red(`r${piece - RED_DISK}`);
    }
    if (isBlueRing(piece)) {
        return blue(`B${piece - BLUE_RING}`);
    }
    if (isRedRing(piece)) {
        return red(`R${piece - RED_RING}`);
    }

    return '--';
}

function getPieceNice(piece) {
    if (isBlueDisk(piece)) {
        return blue('•');
    }
    if (isRedDisk(piece)) {
        return red('•');
    }
    if (isBlueRing(piece)) {
        return blue('O');
    }
    if (isRedRing(piece)) {
        return red('O');
    }

    return '·';
}

function printBoard(board) {
    const dimensions = {
        xMin: GRID_SIZE,
        yMin: GRID_SIZE,
        xMax: 0,
        yMax: 0,
    };

    board.grid.forEach((piece, index) => {
        if (piece) {
            const x = index % GRID_SIZE;
            const y = intDiv(index, GRID_SIZE);
            if (x < dimensions.xMin) dimensions.xMin = x;
            if (y < dimensions.yMin) dimensions.yMin = y;
            if (x > dimensions.xMax) dimensions.xMax = x;
            if (y > dimensions.yMax) dimensions.yMax = y;
        }
    });

    console.log(dimensions);
    for (let y = dimensions.yMin; y <= dimensions.yMax; y += 1) {
        const start = GRID_SIZE * y + dimensions.xMin;
        const end = GRID_SIZE * y + dimensions.xMax + 1;

        const row = board.grid
            .slice(start, end)
            .map((p) => getPieceNice(p))
            .join(' ');
        console.log(row);
    }
}

function createPiecesGrid(piecesString) {
    return piecesString
        .split('\n')
        .map((s) => s.replace(/\s/g, ''))
        .filter((s) => s.length > 0)
        .map((s) => s.split(''));
}

// The pieces variable is expected to follow the format
// const piece = `
//     bb0rrR
//     bbrrrB
//     brb000
//     bbbb00
// `;
function setupBoard(piecesString, otherBoard) {
    const board = {
        grid: new Array(GRID_SIZE * GRID_SIZE).fill(EMPTY),
        blueDisks: new Set(),
        redDisks: new Set(),
        blueRings: new Set(),
        redRings: new Set(),
    };

    const gridCenter = GRID_SIZE / 2;

    const pieces = createPiecesGrid(piecesString);

    pieces.forEach((row, y) => {
        row.forEach((piece, x) => {
            const gridIndex = GRID_SIZE * (y + gridCenter) + x + gridCenter;
            switch (piece) {
                case 'b':
                    addBlueDisk(board, BLUE_DISK + board.blueDisks.size, gridIndex);
                    break;
                case 'r':
                    addRedDisk(board, RED_DISK + board.redDisks.size, gridIndex);
                    break;
                case 'B':
                    addBlueRing(board, BLUE_RING + board.blueRings.size, gridIndex);
                    break;
                case 'R':
                    addRedRing(board, RED_RING + board.redRings.size, gridIndex);
                    break;
                default:
                    break;
            }
        });
    });

    return {
        ...board,
        ...otherBoard,
    };
}

module.exports = {
    printBoard,
    setupBoard,
};
