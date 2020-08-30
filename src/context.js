const constants = require('./constants');

const context = {};

function resetContext() {
    // TODO: move to draw namespace
    context.canvas = null;

    // TODO: rename to event
    context.events = {
        mouseWheel: null,
        mouseDown: null,
        mouseMove: {
            clientX: 0,
            clientY: 0,
        },
        isMouseDown: false,

        phase: constants.OPPONENT_PHASE,
    };

    context.draw = {
        generatedMoves: null,
        pickDiskMoves: null,
        dropDiskMoves: null,
        dropRingMoves: null,
    };

    context.board = {
        // TODO: move to draw namespace
        canvasX: 100,
        canvasY: 100,
        tileSize: 100,

        isBlueTurn: true,
        activeDisks: null,

        // used to mark duplicate ring targets during move generation
        duplicationMarkers: [],

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
