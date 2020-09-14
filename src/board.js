const { intDiv } = require('./util');
const {
    EMPTY,
    BLUE_DISK,
    RED_DISK,
    BLUE_RING,
    RED_RING,
    GRID_SIZE,
} = require('./constants');

const COLOR_BLUE = '\x1b[34m';
const COLOR_RED = '\x1b[31m';
const COLOR_RESET = '\x1b[0m';

function getCoords(gridIndex) {
    return {
        x: gridIndex % GRID_SIZE,
        y: intDiv(gridIndex, GRID_SIZE),
    };
}

function getGridIndex({ x, y }) {
    return GRID_SIZE * y + x;
}

function setGridPiece(board, piece, gridIndex) {
    board.grid[gridIndex] = piece;
}

function unsetGridPiece(board, gridIndex) {
    const oldPiece = board.grid[gridIndex];
    board.grid[gridIndex] = EMPTY;
    return oldPiece;
}

function deleteBlueDisk(board, gridIndex) {
    const oldPiece = unsetGridPiece(board, gridIndex);
    board.blueDisks.delete(gridIndex);
    return oldPiece;
}

function deleteRedDisk(board, gridIndex) {
    const oldPiece = unsetGridPiece(board, gridIndex);
    board.redDisks.delete(gridIndex);
    return oldPiece;
}

function deleteBlueRing(board, gridIndex) {
    const oldPiece = unsetGridPiece(board, gridIndex);
    board.blueRings.delete(gridIndex);
    return oldPiece;
}

function deleteRedRing(board, gridIndex) {
    const oldPiece = unsetGridPiece(board, gridIndex);
    board.redRings.delete(gridIndex);
    return oldPiece;
}

function addBlueDisk(board, disk, gridIndex) {
    setGridPiece(board, disk, gridIndex);
    board.blueDisks.add(gridIndex);
}

function addRedDisk(board, disk, gridIndex) {
    setGridPiece(board, disk, gridIndex);
    board.redDisks.add(gridIndex);
}

function addBlueRing(board, ring, gridIndex) {
    setGridPiece(board, ring, gridIndex);
    board.blueRings.add(gridIndex);
}

function addRedRing(board, ring, gridIndex) {
    setGridPiece(board, ring, gridIndex);
    board.redRings.add(gridIndex);
}

function isBlueDisk(piece) {
    return intDiv(piece, 1000) === 1;
}

function isRedDisk(piece) {
    return intDiv(piece, 1000) === 2;
}

function isDisk(piece) {
    const p = intDiv(piece, 1000);
    return p === 1 || p === 2;
}

function isBlueRing(piece) {
    return intDiv(piece, 1000) === 3;
}

function isRedRing(piece) {
    return intDiv(piece, 1000) === 4;
}

function isRing(piece) {
    const p = intDiv(piece, 1000);
    return p === 3 || p === 4;
}

function blue(text) {
    return `${COLOR_BLUE}${text}${COLOR_RESET}`;
}

function red(text) {
    return `${COLOR_RED}${text}${COLOR_RESET}`;
}

function mapPieceSimple(piece) {
    if (isBlueDisk(piece)) {
        return 'b';
    }
    if (isRedDisk(piece)) {
        return 'r';
    }
    if (isBlueRing(piece)) {
        return 'B';
    }
    if (isRedRing(piece)) {
        return 'R';
    }

    return '-';
}

function mapPieceExact(piece) {
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

function mapPieceNice(piece) {
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

function printBoard(board, options) {
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

    let pieceMapper = mapPieceNice;
    if (options) {
        switch (options.pieceMapper) {
            case 'simple':
                pieceMapper = mapPieceSimple;
                break;
            case 'exact':
                pieceMapper = mapPieceExact;
                break;
            default:
                pieceMapper = mapPieceNice;
                break;
        }
    }

    console.log(dimensions);
    for (let y = dimensions.yMin; y <= dimensions.yMax; y += 1) {
        const start = GRID_SIZE * y + dimensions.xMin;
        const end = GRID_SIZE * y + dimensions.xMax + 1;

        const row = board.grid
            .slice(start, end)
            .map((p) => pieceMapper(p))
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
function setupBoard(board, piecesString) {
    board.duplicationMarkers = [];
    board.grid = new Array(GRID_SIZE * GRID_SIZE).fill(EMPTY);
    board.blueDisks = new Set();
    board.redDisks = new Set();
    board.blueRings = new Set();
    board.redRings = new Set();
    board.isBlueTurn = true;

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

    return board;
}

function initBoard(board) {
    setupBoard(board, `
        BRB
        R0R
        BRB
    `);

    //setupBoard(board, `
    //    0rr0
    //    bBRbbb
    //    bRBbrrr
    //    bBRbrrr
    //    bRBb
    //    0rr0
    //`);

    //setupBoard(board, `
    //    BRBbbb0
    //    R0Rbbb0
    //    BRBbbbb
    //    rrr0000
    //    rrr0000
    //    rrr0000
    //    00r0000
    //`);
}

module.exports = {
    addBlueDisk,
    addBlueRing,
    addRedDisk,
    addRedRing,
    deleteBlueDisk,
    deleteBlueRing,
    deleteRedDisk,
    deleteRedRing,
    getCoords,
    getGridIndex,
    initBoard,
    isBlueDisk,
    isBlueRing,
    isDisk,
    isRedDisk,
    isRedRing,
    isRing,
    printBoard,
    setupBoard,
};
