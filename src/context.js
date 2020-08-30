const {
    EMPTY,
    RING_BLUE,
    RING_RED,
    GRID_SIZE,
} = require('./constants');

const context = {};

function initBoard() {
    const { board } = context;

    board.grid = new Array(GRID_SIZE).fill(
        new Array(GRID_SIZE).fill(EMPTY),
    );

    const gridCenter = GRID_SIZE / 2;

    board.grid[gridCenter][gridCenter] = RING_BLUE;
    board.grid[gridCenter + 2][gridCenter] = RING_BLUE;
    board.grid[gridCenter][gridCenter + 2] = RING_BLUE;
    board.grid[gridCenter + 2][gridCenter + 2] = RING_BLUE;

    board.grid[gridCenter + 1][gridCenter] = RING_RED;
    board.grid[gridCenter][gridCenter + 1] = RING_RED;
    board.grid[gridCenter + 2][gridCenter + 1] = RING_RED;
    board.grid[gridCenter + 1][gridCenter + 2] = RING_RED;
}

function resetContext() {
    context.canvas = null;

    context.events = {
        mouseWheel: null,
        mouseDown: null,
        mouseMove: null,
        isMouseDown: false,
    };

    context.board = {
        canvasX: 100,
        canvasY: 100,
        tileSize: 100,

        grid: [],
        pieces: {
            blue: [],
            red: [],
        },
        rings: {
            blue: [],
            red: [],
        },
    };

    initBoard();
}

module.exports = {
    context,
    resetContext,
};
