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
        blueDisks: [],
        redDisks: [],
        blueRings: [],
        redRings: [],
    };
}

module.exports = {
    context,
    resetContext,
};
