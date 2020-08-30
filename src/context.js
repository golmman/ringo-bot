const context = {};

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
}

module.exports = {
    context,
    resetContext,
};
