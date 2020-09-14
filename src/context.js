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

        phase: null,
    };

    context.draw = {
        move: {
            diskFrom: -1,
            diskTo: -1,
            ringTo: -1,
        },
        lastMove: {
            diskFrom: -1,
            diskTo: -1,
            ringTo: -1,
        },
        generatedMoves: null,
        pickDiskMoves: null,
        dropDiskMoves: null,
        dropRingMoves: null,

        winner: null,
    };

    context.board = {
        // TODO: move to draw namespace
        canvasX: 100,
        canvasY: 100,
        tileSize: 100,

        botColor: constants.RED,
        isBlueTurn: true,
        activeDisks: null,

        // used to mark duplicate ring targets during move generation
        duplicationMarkers: [],

        grid: [],
        blueDisks: new Set(),
        redDisks: new Set(),
        blueRings: new Set(),
        redRings: new Set(),
    };
}

module.exports = {
    context,
    resetContext,
};
