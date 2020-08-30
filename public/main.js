/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { intDiv } = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst { context } = __webpack_require__(/*! ./context */ \"./src/context.js\");\nconst {\n    EMPTY,\n    BLUE_DISK,\n    RED_DISK,\n    BLUE_RING,\n    RED_RING,\n    GRID_SIZE,\n    GRID_SIZE2,\n} = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\nfunction putPiece(piece, x, y) {\n    const position = GRID_SIZE * y + x;\n    context.board.grid[position] = piece;\n    return position;\n}\n\nfunction putBlueDisk(disk, x, y) {\n    const position = putPiece(disk, x, y);\n    context.board.blueDisks.push(position);\n}\n\nfunction putRedDisk(disk, x, y) {\n    const position = putPiece(disk, x, y);\n    context.board.redDisks.push(position);\n}\n\nfunction putBlueRing(ring, x, y) {\n    const position = putPiece(ring, x, y);\n    context.board.blueRings.push(position);\n}\n\nfunction putRedRing(ring, x, y) {\n    const position = putPiece(ring, x, y);\n    context.board.redRings.push(position);\n}\n\nfunction initBoard() {\n    const { board } = context;\n\n    board.grid = new Array(GRID_SIZE2).fill(EMPTY);\n\n    const gridCenter = GRID_SIZE / 2;\n\n    putBlueRing(BLUE_RING + 0, gridCenter, gridCenter);\n    putBlueRing(BLUE_RING + 1, gridCenter + 2, gridCenter);\n    putBlueRing(BLUE_RING + 2, gridCenter, gridCenter + 2);\n    putBlueRing(BLUE_RING + 3, gridCenter + 2, gridCenter + 2);\n\n    putRedRing(RED_RING + 0, gridCenter + 1, gridCenter);\n    putRedRing(RED_RING + 1, gridCenter, gridCenter + 1);\n    putRedRing(RED_RING + 2, gridCenter + 2, gridCenter + 1);\n    putRedRing(RED_RING + 3, gridCenter + 1, gridCenter + 2);\n\n    //putBlueDisk(BLUE_DISK + 0, gridCenter + 1, gridCenter + 1);\n    putBlueDisk(BLUE_DISK + 1, gridCenter + 2, gridCenter + 1);\n    putRedDisk(RED_DISK + 0, gridCenter + 3, gridCenter + 4);\n}\n\nfunction isBlueDisk(piece) {\n    return intDiv(piece, BLUE_DISK) === 1;\n}\n\nfunction getCoords(gridIndex) {\n    return {\n        x: gridIndex % GRID_SIZE,\n        y: intDiv(gridIndex, GRID_SIZE),\n    };\n}\n\nmodule.exports = {\n    getCoords,\n    initBoard,\n    isBlueDisk,\n    putPiece,\n};\n\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n    EMPTY: 0,\n    BLUE_DISK: 1000,\n    RED_DISK: 2000,\n    BLUE_RING: 3000,\n    RED_RING: 4000,\n\n    MAX_DISKS: 10,\n    MAX_RINGS: 4,\n    DROP_DISK: -1,\n\n    GRID_SIZE: 256,\n    GRID_SIZE2: 256 * 256,\n};\n\n\n//# sourceURL=webpack:///./src/constants.js?");

/***/ }),

/***/ "./src/context.js":
/*!************************!*\
  !*** ./src/context.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const context = {};\n\nfunction resetContext() {\n    context.canvas = null;\n\n    context.events = {\n        mouseWheel: null,\n        mouseDown: null,\n        mouseMove: {\n            clientX: 0,\n            clientY: 0,\n        },\n        isMouseDown: false,\n    };\n\n    context.board = {\n        canvasX: 100,\n        canvasY: 100,\n        tileSize: 100,\n\n        isBlueTurn: true,\n        activeDisks: null,\n        grid: [],\n        blueDisks: [],\n        redDisks: [],\n        blueRings: [],\n        redRings: [],\n    };\n}\n\nmodule.exports = {\n    context,\n    resetContext,\n};\n\n\n//# sourceURL=webpack:///./src/context.js?");

/***/ }),

/***/ "./src/draw.js":
/*!*********************!*\
  !*** ./src/draw.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { context } = __webpack_require__(/*! ./context */ \"./src/context.js\");\nconst { getCoords } = __webpack_require__(/*! ./board */ \"./src/board.js\");\nconst {\n    GRID_SIZE,\n} = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\nfunction drawBoard(ctx) {\n    const { tileSize } = context.board;\n    const startX = context.board.canvasX % tileSize;\n    const startY = context.board.canvasY % tileSize;\n    const endX = context.canvas.width;\n    const endY = context.canvas.height;\n\n    ctx.strokeStyle = 'rgb(160, 160, 160)';\n    ctx.lineWidth = 1;\n\n    for (let x = startX; x <= endX; x += tileSize) {\n        ctx.beginPath();\n        ctx.moveTo(x, 0);\n        ctx.lineTo(x, endY);\n        ctx.stroke();\n    }\n\n    for (let y = startY; y <= endY; y += tileSize) {\n        ctx.beginPath();\n        ctx.moveTo(0, y);\n        ctx.lineTo(endX, y);\n        ctx.stroke();\n    }\n}\n\nfunction drawOrigin(ctx) {\n    const { canvasX, canvasY, tileSize } = context.board;\n\n    ctx.strokeStyle = 'rgb(255, 255, 255)';\n    ctx.lineWidth = 3;\n\n    ctx.beginPath();\n    ctx.moveTo(canvasX - tileSize, canvasY);\n    ctx.lineTo(canvasX + tileSize, canvasY);\n    ctx.stroke();\n\n    ctx.beginPath();\n    ctx.moveTo(canvasX, canvasY - tileSize);\n    ctx.lineTo(canvasX, canvasY + tileSize);\n    ctx.stroke();\n}\n\nfunction drawMouseHighlight(ctx) {\n    const { canvasX, canvasY, tileSize } = context.board;\n    const canvasRect = context.canvas.getBoundingClientRect();\n\n    const mouseX = context.events.mouseMove.clientX - canvasRect.left;\n    const mouseY = context.events.mouseMove.clientY - canvasRect.top;\n\n    const canvasMouseX = mouseX - canvasX;\n    const canvasMouseY = mouseY - canvasY;\n\n    const highlightX = canvasMouseX > 0\n        ? mouseX - canvasMouseX % tileSize\n        : mouseX - canvasMouseX % tileSize - tileSize;\n\n    const highlightY = canvasMouseY > 0\n        ? mouseY - canvasMouseY % tileSize\n        : mouseY - canvasMouseY % tileSize - tileSize;\n\n    ctx.fillStyle = 'rgb(48, 48, 48)';\n    ctx.fillRect(\n        highlightX,\n        highlightY,\n        tileSize,\n        tileSize,\n    );\n}\n\nfunction convertBoardToCanvasCoords({ x, y }) {\n    const { canvasX, canvasY, tileSize } = context.board;\n    const tx = x - GRID_SIZE / 2;\n    const ty = y - GRID_SIZE / 2;\n\n    return {\n        x: canvasX + tx * tileSize,\n        y: canvasY + ty * tileSize,\n    };\n}\n\nfunction drawBlueDisks(ctx) {\n    const { blueDisks, tileSize } = context.board;\n\n    for (let k = 0; k < blueDisks.length; k += 1) {\n        const boardCoords = getCoords(blueDisks[k]);\n        const canvasCoords = convertBoardToCanvasCoords(boardCoords);\n\n        ctx.beginPath();\n        ctx.fillStyle = 'rgb(24, 24, 160)';\n        ctx.arc(\n            canvasCoords.x + tileSize / 2,\n            canvasCoords.y + tileSize / 2,\n            0.3 * tileSize,\n            0, 2 * Math.PI,\n        );\n        ctx.fill();\n    }\n}\n\nfunction drawRedDisks(ctx) {\n    const { redDisks, tileSize } = context.board;\n\n    for (let k = 0; k < redDisks.length; k += 1) {\n        const boardCoords = getCoords(redDisks[k]);\n        const canvasCoords = convertBoardToCanvasCoords(boardCoords);\n\n        ctx.beginPath();\n        ctx.fillStyle = 'rgb(160, 24, 24)';\n        ctx.arc(\n            canvasCoords.x + tileSize / 2,\n            canvasCoords.y + tileSize / 2,\n            0.3 * tileSize,\n            0, 2 * Math.PI,\n        );\n        ctx.fill();\n    }\n}\n\nfunction drawBlueRings(ctx) {\n    const { blueRings, tileSize } = context.board;\n\n    for (let k = 0; k < blueRings.length; k += 1) {\n        const boardCoords = getCoords(blueRings[k]);\n        const canvasCoords = convertBoardToCanvasCoords(boardCoords);\n\n        ctx.beginPath();\n        ctx.strokeStyle = 'rgb(24, 24, 160)';\n        ctx.lineWidth = 0.1 * tileSize;\n        ctx.arc(\n            canvasCoords.x + tileSize / 2,\n            canvasCoords.y + tileSize / 2,\n            0.4 * tileSize,\n            0, 2 * Math.PI,\n        );\n        ctx.stroke();\n    }\n}\n\nfunction drawRedRings(ctx) {\n    const { redRings, tileSize } = context.board;\n\n    for (let k = 0; k < redRings.length; k += 1) {\n        const boardCoords = getCoords(redRings[k]);\n        const canvasCoords = convertBoardToCanvasCoords(boardCoords);\n\n        ctx.beginPath();\n        ctx.strokeStyle = 'rgb(160, 24, 24)';\n        ctx.lineWidth = 0.1 * tileSize;\n        ctx.arc(\n            canvasCoords.x + tileSize / 2,\n            canvasCoords.y + tileSize / 2,\n            0.4 * tileSize,\n            0, 2 * Math.PI,\n        );\n        ctx.stroke();\n    }\n}\n\nfunction drawPieces(ctx) {\n    drawBlueDisks(ctx);\n    drawRedDisks(ctx);\n    drawBlueRings(ctx);\n    drawRedRings(ctx);\n}\n\nfunction redraw() {\n    console.log('redraw');\n\n    const ctx = context.canvas.getContext('2d');\n\n    ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);\n\n    drawOrigin(ctx);\n    drawBoard(ctx);\n    drawMouseHighlight(ctx);\n    drawPieces(ctx);\n}\n\nmodule.exports = { redraw };\n\n\n//# sourceURL=webpack:///./src/draw.js?");

/***/ }),

/***/ "./src/event.js":
/*!**********************!*\
  !*** ./src/event.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { context } = __webpack_require__(/*! ./context */ \"./src/context.js\");\nconst { redraw } = __webpack_require__(/*! ./draw */ \"./src/draw.js\");\nconst { generateMoves } = __webpack_require__(/*! ./move */ \"./src/move.js\");\n\nfunction handleMouseClick(event) {\n    console.log('handleMouseClick');\n    const canvasRect = context.canvas.getBoundingClientRect();\n\n    const mouseX = event.clientX - canvasRect.left;\n    const mouseY = event.clientY - canvasRect.top;\n\n    console.log(`${mouseX} ${mouseY}, click count: ${event.detail}`);\n\n    if (event.detail === 2) {\n        const moves = generateMoves(context.board);\n        console.log(moves);\n    }\n}\n\nfunction handleMouseDown(event) {\n    console.log('handleMouseDown');\n    console.log(event);\n\n    const {\n        screenX,\n        screenY,\n    } = event;\n\n    context.events.mouseDown = {\n        screenX,\n        screenY,\n    };\n\n    context.events.isMouseDown = true;\n}\n\nfunction handleMouseMove(event) {\n    if (context.events.isMouseDown) {\n        const deltaX = event.screenX - context.events.mouseMove.screenX;\n        const deltaY = event.screenY - context.events.mouseMove.screenY;\n        context.board.canvasX += deltaX;\n        context.board.canvasY += deltaY;\n    }\n\n    const {\n        clientX,\n        clientY,\n        screenX,\n        screenY,\n    } = event;\n\n    context.events.mouseMove = {\n        clientX,\n        clientY,\n        screenX,\n        screenY,\n    };\n\n    redraw();\n}\n\nfunction handleMouseUp(event) {\n    console.log('handleMouseUp');\n    console.log(context);\n\n    const {\n        screenX,\n        screenY,\n    } = event;\n\n    context.events.mouseUp = {\n        screenX,\n        screenY,\n    };\n\n    context.events.isMouseDown = false;\n}\n\nfunction handleMouseWheel(event) {\n    console.log(`handleMouseWheel: ${event.deltaY}`);\n\n    const canvasWidth = context.canvas.width;\n    const canvasHeight = context.canvas.height;\n    const mapCanvasX = context.board.canvasX;\n    const mapCanvasY = context.board.canvasY;\n\n    let { tileSize } = context.board;\n\n    const centerTileDistanceX = (canvasWidth / 2 - mapCanvasX) / tileSize;\n    const centerTileDistanceY = (canvasHeight / 2 - mapCanvasY) / tileSize;\n\n    tileSize -= event.deltaY;\n\n    if (tileSize > 100) {\n        tileSize = 100;\n    }\n\n    if (tileSize < 10) {\n        tileSize = 10;\n    }\n\n    context.board.tileSize = tileSize;\n\n    context.board.canvasX = canvasWidth / 2 - tileSize * centerTileDistanceX;\n    context.board.canvasY = canvasHeight / 2 - tileSize * centerTileDistanceY;\n\n    redraw();\n}\n\nmodule.exports = {\n    handleMouseClick,\n    handleMouseDown,\n    handleMouseMove,\n    handleMouseUp,\n    handleMouseWheel,\n};\n\n\n//# sourceURL=webpack:///./src/event.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { context, resetContext } = __webpack_require__(/*! ./context */ \"./src/context.js\");\nconst { initBoard } = __webpack_require__(/*! ./board */ \"./src/board.js\");\nconst { redraw } = __webpack_require__(/*! ./draw */ \"./src/draw.js\");\nconst {\n    handleMouseClick,\n    handleMouseDown,\n    handleMouseMove,\n    handleMouseUp,\n    handleMouseWheel,\n} = __webpack_require__(/*! ./event */ \"./src/event.js\");\n\nfunction resizeCanvas() {\n    const canvas = document.getElementById('gameCanvas');\n\n    canvas.width = 0.8 * window.innerWidth;\n    canvas.height = 0.8 * window.innerHeight;\n\n    context.canvas = canvas;\n\n    redraw();\n}\n\nfunction restartGame(x) {\n    console.log(x);\n\n    resetContext();\n    initBoard();\n    resizeCanvas();\n}\n\nwindow.addEventListener('resize', resizeCanvas);\n\nwindow.addEventListener('click', handleMouseClick);\nwindow.addEventListener('mousedown', handleMouseDown);\nwindow.addEventListener('mousemove', handleMouseMove);\nwindow.addEventListener('mouseup', handleMouseUp);\nwindow.addEventListener('wheel', handleMouseWheel);\n\nwindow.onload = () => restartGame('game started');\nwindow.restartGame = restartGame;\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/move.js":
/*!*********************!*\
  !*** ./src/move.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n    DROP_DISK,\n    EMPTY,\n    GRID_SIZE,\n    MAX_DISKS,\n} = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\nfunction generateAdjacentEmptyIndices(board, index) {\n    const { grid } = board;\n\n    const emptyIndices = [];\n\n    if (grid[index - GRID_SIZE] === EMPTY) {\n        emptyIndices.push(index - GRID_SIZE);\n    }\n\n    if (grid[index - 1] === EMPTY) {\n        emptyIndices.push(index - 1);\n    }\n\n    if (grid[index + 1] === EMPTY) {\n        emptyIndices.push(index + 1);\n    }\n\n    if (grid[index + GRID_SIZE] === EMPTY) {\n        emptyIndices.push(index + GRID_SIZE);\n    }\n\n    return emptyIndices;\n}\n\nfunction generateRingMoves(board, ring, compareRing, diskFrom, moves) {\n    if (ring === compareRing) {\n        return;\n    }\n\n    const emptyIndices = generateAdjacentEmptyIndices(board, compareRing);\n    for (let k = 0; k < emptyIndices.length; k += 1) {\n        moves.push({\n            diskFrom,\n            diskTo: ring,\n            ringTo: emptyIndices[k],\n        });\n    }\n}\n\nfunction generateDiskDropMoves(board, ring, diskFrom, moves) {\n    const { blueRings, redRings } = board;\n\n    for (let k = 0; k < blueRings.length; k += 1) {\n        generateRingMoves(board, ring, blueRings[k], diskFrom, moves);\n    }\n\n    for (let k = 0; k < redRings.length; k += 1) {\n        generateRingMoves(board, ring, redRings[k], diskFrom, moves);\n    }\n}\n\nfunction generateRemovableDisks(board) {\n    // TODO: stub\n    return [];\n}\n\nfunction generateDiskTransferMoves(board, ring, moves) {\n    const removableDisks = generateRemovableDisks(board);\n\n    for (let k = 0; k < removableDisks.length; k += 1) {\n        generateDiskDropMoves(board, ring, removableDisks[k], moves);\n    }\n}\n\nfunction generateMovesForRings(board, rings, moves) {\n    for (let k = 0; k < rings.length; k += 1) {\n        if (board.activeDisks.length < MAX_DISKS) {\n            generateDiskDropMoves(board, rings[k], DROP_DISK, moves);\n        } else {\n            generateDiskTransferMoves(board, rings[k], moves);\n        }\n    }\n}\n\nfunction generateMoves(board) {\n    const moves = [];\n\n    board.activeDisks = board.isBlueTurn\n        ? board.blueDisks\n        : board.redDisks;\n\n    generateMovesForRings(board, board.blueRings, moves);\n    generateMovesForRings(board, board.redRings, moves);\n\n    return moves;\n}\n\nfunction doMove(board, { diskFrom, diskTo, ringTo }) {\n    return 1;\n}\n\nfunction undoMove(board, { diskFrom, diskTo, ringTo }) {\n    return 1;\n}\n\nmodule.exports = {\n    doMove,\n    undoMove,\n    generateMoves,\n};\n\n\n//# sourceURL=webpack:///./src/move.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Division function which behaves like most other languages when dividing\n// integers. E.g. intDiv(-2044, 1000) returns -2.\nfunction intDiv(dividend, divisor) {\n    return (dividend / divisor) | 0;\n}\n\nmodule.exports = {\n    intDiv,\n};\n\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });