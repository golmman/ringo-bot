const { context } = require('./context');
const { redraw } = require('./draw');

function handleMouseClick(event) {
    console.log('handleMouseClick');
    const canvasRect = context.canvas.getBoundingClientRect();

    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;

    console.log(`${mouseX} ${mouseY}, click count: ${event.detail}`);
}

function handleMouseDown(event) {
    console.log('handleMouseDown');
    console.log(event);

    const {
        screenX,
        screenY,
    } = event;

    context.events.mouseDown = {
        screenX,
        screenY,
    };

    context.events.isMouseDown = true;
}

function handleMouseMove(event) {
    if (context.events.isMouseDown) {
        const deltaX = event.screenX - context.events.mouseMove.screenX;
        const deltaY = event.screenY - context.events.mouseMove.screenY;
        context.board.canvasX += deltaX;
        context.board.canvasY += deltaY;
    }

    const {
        clientX,
        clientY,
        screenX,
        screenY,
    } = event;

    context.events.mouseMove = {
        clientX,
        clientY,
        screenX,
        screenY,
    };

    redraw();
}

function handleMouseUp(event) {
    console.log('handleMouseUp');
    console.log(context);

    const {
        screenX,
        screenY,
    } = event;

    context.events.mouseUp = {
        screenX,
        screenY,
    };

    context.events.isMouseDown = false;
}

function handleMouseWheel(event) {
    console.log(`handleMouseWheel: ${event.deltaY}`);

    const canvasWidth = context.canvas.width;
    const canvasHeight = context.canvas.height;
    const mapCanvasX = context.board.canvasX;
    const mapCanvasY = context.board.canvasY;

    let { tileSize } = context.board;

    const centerTileDistanceX = (canvasWidth / 2 - mapCanvasX) / tileSize;
    const centerTileDistanceY = (canvasHeight / 2 - mapCanvasY) / tileSize;

    tileSize -= event.deltaY;

    if (tileSize > 100) {
        tileSize = 100;
    }

    if (tileSize < 10) {
        tileSize = 10;
    }

    context.board.tileSize = tileSize;

    context.board.canvasX = canvasWidth / 2 - tileSize * centerTileDistanceX;
    context.board.canvasY = canvasHeight / 2 - tileSize * centerTileDistanceY;

    redraw();
}

module.exports = {
    handleMouseClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseWheel,
};
