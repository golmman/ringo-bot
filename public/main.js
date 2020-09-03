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

eval("const { intDiv } = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst {\n    EMPTY,\n    BLUE_DISK,\n    RED_DISK,\n    BLUE_RING,\n    RED_RING,\n    GRID_SIZE,\n    GRID_SIZE2,\n} = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\nfunction getCoords(gridIndex) {\n    return {\n        x: gridIndex % GRID_SIZE,\n        y: intDiv(gridIndex, GRID_SIZE),\n    };\n}\n\nfunction getGridIndex({ x, y }) {\n    return GRID_SIZE * y + x;\n}\n\nfunction setGridPiece(board, piece, gridIndex) {\n    board.grid[gridIndex] = piece;\n}\n\nfunction unsetGridPiece(board, gridIndex) {\n    const oldPiece = board.grid[gridIndex];\n    board.grid[gridIndex] = EMPTY;\n    return oldPiece;\n}\n\nfunction deleteBlueDisk(board, gridIndex) {\n    const oldPiece = unsetGridPiece(board, gridIndex);\n    board.blueDisks.delete(gridIndex);\n    return oldPiece;\n}\n\nfunction deleteRedDisk(board, gridIndex) {\n    const oldPiece = unsetGridPiece(board, gridIndex);\n    board.redDisks.delete(gridIndex);\n    return oldPiece;\n}\n\nfunction deleteBlueRing(board, gridIndex) {\n    const oldPiece = unsetGridPiece(board, gridIndex);\n    board.blueRings.delete(gridIndex);\n    return oldPiece;\n}\n\nfunction deleteRedRing(board, gridIndex) {\n    const oldPiece = unsetGridPiece(board, gridIndex);\n    board.redRings.delete(gridIndex);\n    return oldPiece;\n}\n\nfunction addBlueDisk(board, disk, gridIndex) {\n    setGridPiece(board, disk, gridIndex);\n    board.blueDisks.add(gridIndex);\n}\n\nfunction addRedDisk(board, disk, gridIndex) {\n    setGridPiece(board, disk, gridIndex);\n    board.redDisks.add(gridIndex);\n}\n\nfunction addBlueRing(board, ring, gridIndex) {\n    setGridPiece(board, ring, gridIndex);\n    board.blueRings.add(gridIndex);\n}\n\nfunction addRedRing(board, ring, gridIndex) {\n    setGridPiece(board, ring, gridIndex);\n    board.redRings.add(gridIndex);\n}\n\nfunction initBoard(board) {\n    board.grid = new Array(GRID_SIZE2).fill(EMPTY);\n\n    const gridCenter = GRID_SIZE / 2;\n\n    addBlueRing(board, BLUE_RING + 0, getGridIndex({ x: gridCenter, y: gridCenter }));\n    addBlueRing(board, BLUE_RING + 1, getGridIndex({ x: gridCenter + 2, y: gridCenter }));\n    addBlueRing(board, BLUE_RING + 2, getGridIndex({ x: gridCenter, y: gridCenter + 2 }));\n    addBlueRing(board, BLUE_RING + 3, getGridIndex({ x: gridCenter + 2, y: gridCenter + 2 }));\n\n    addRedRing(board, RED_RING + 0, getGridIndex({ x: gridCenter + 1, y: gridCenter }));\n    addRedRing(board, RED_RING + 1, getGridIndex({ x: gridCenter, y: gridCenter + 1 }));\n    addRedRing(board, RED_RING + 2, getGridIndex({ x: gridCenter + 2, y: gridCenter + 1 }));\n    addRedRing(board, RED_RING + 3, getGridIndex({ x: gridCenter + 1, y: gridCenter + 2 }));\n\n    //addBlueDisk(board, BLUE_DISK + 0, getGridIndex({ x: gridCenter + 1, y: gridCenter + 1 }));\n    //addBlueDisk(board, BLUE_DISK + 1, getGridIndex({ x: gridCenter + 2, y: gridCenter + 1 }));\n    //addRedDisk(board, RED_DISK + 0, getGridIndex({ x: gridCenter + 3, y: gridCenter + 4 }));\n\n    addBlueDisk(board, BLUE_DISK + 0, getGridIndex({ x: gridCenter + 3, y: gridCenter + 0 }));\n    addBlueDisk(board, BLUE_DISK + 1, getGridIndex({ x: gridCenter + 4, y: gridCenter + 0 }));\n    addBlueDisk(board, BLUE_DISK + 2, getGridIndex({ x: gridCenter + 5, y: gridCenter + 0 }));\n    addBlueDisk(board, BLUE_DISK + 3, getGridIndex({ x: gridCenter + 3, y: gridCenter + 1 }));\n    addBlueDisk(board, BLUE_DISK + 4, getGridIndex({ x: gridCenter + 4, y: gridCenter + 1 }));\n    addBlueDisk(board, BLUE_DISK + 5, getGridIndex({ x: gridCenter + 5, y: gridCenter + 1 }));\n    addBlueDisk(board, BLUE_DISK + 6, getGridIndex({ x: gridCenter + 3, y: gridCenter + 2 }));\n    addBlueDisk(board, BLUE_DISK + 7, getGridIndex({ x: gridCenter + 4, y: gridCenter + 2 }));\n    addBlueDisk(board, BLUE_DISK + 8, getGridIndex({ x: gridCenter + 5, y: gridCenter + 2 }));\n    addBlueDisk(board, BLUE_DISK + 9, getGridIndex({ x: gridCenter + 6, y: gridCenter + 2 }));\n\n    addRedDisk(board, RED_DISK + 0, getGridIndex({ y: gridCenter + 3, x: gridCenter + 0 }));\n    addRedDisk(board, RED_DISK + 1, getGridIndex({ y: gridCenter + 4, x: gridCenter + 0 }));\n    addRedDisk(board, RED_DISK + 2, getGridIndex({ y: gridCenter + 5, x: gridCenter + 0 }));\n    addRedDisk(board, RED_DISK + 3, getGridIndex({ y: gridCenter + 3, x: gridCenter + 1 }));\n    addRedDisk(board, RED_DISK + 4, getGridIndex({ y: gridCenter + 4, x: gridCenter + 1 }));\n    addRedDisk(board, RED_DISK + 5, getGridIndex({ y: gridCenter + 5, x: gridCenter + 1 }));\n    addRedDisk(board, RED_DISK + 6, getGridIndex({ y: gridCenter + 3, x: gridCenter + 2 }));\n    addRedDisk(board, RED_DISK + 7, getGridIndex({ y: gridCenter + 4, x: gridCenter + 2 }));\n    addRedDisk(board, RED_DISK + 8, getGridIndex({ y: gridCenter + 5, x: gridCenter + 2 }));\n    addRedDisk(board, RED_DISK + 9, getGridIndex({ y: gridCenter + 6, x: gridCenter + 2 }));\n}\n\nfunction isBlueDisk(piece) {\n    return intDiv(piece, 1000) === 1;\n}\n\nfunction isRedDisk(piece) {\n    return intDiv(piece, 1000) === 2;\n}\n\nfunction isBlueRing(piece) {\n    return intDiv(piece, 1000) === 3;\n}\n\nfunction isRedRing(piece) {\n    return intDiv(piece, 1000) === 4;\n}\n\nmodule.exports = {\n    addBlueDisk,\n    addBlueRing,\n    addRedDisk,\n    addRedRing,\n    deleteBlueDisk,\n    deleteBlueRing,\n    deleteRedDisk,\n    deleteRedRing,\n    getCoords,\n    initBoard,\n    isBlueDisk,\n    isBlueRing,\n    isRedDisk,\n    isRedRing,\n};\n\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n    EMPTY: 0,\n    MARKED: 1,\n    BLUE_DISK: 1000,\n    RED_DISK: 2000,\n    BLUE_RING: 3000,\n    RED_RING: 4000,\n\n    MAX_DISKS: 10,\n    MAX_RINGS: 4,\n    DROP_DISK: -1,\n\n    GRID_SIZE: 256,\n    GRID_SIZE2: 256 * 256,\n\n    BLUE: 0,\n    RED: 1,\n\n    OPPONENT_PHASE: 0,\n    PICK_DISK_PHASE: 1,\n    DROP_DISK_PHASE: 2,\n    DROP_RING_PHASE: 3,\n};\n\n\n//# sourceURL=webpack:///./src/constants.js?");

/***/ }),

/***/ "./src/context.js":
/*!************************!*\
  !*** ./src/context.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const constants = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\nconst context = {};\n\nfunction resetContext() {\n    // TODO: move to draw namespace\n    context.canvas = null;\n\n    // TODO: rename to event\n    context.events = {\n        mouseWheel: null,\n        mouseDown: null,\n        mouseMove: {\n            clientX: 0,\n            clientY: 0,\n        },\n        isMouseDown: false,\n\n        phase: constants.OPPONENT_PHASE,\n    };\n\n    context.draw = {\n        move: {\n            diskFrom: -1,\n            diskTo: -1,\n            ringTo: -1,\n        },\n        generatedMoves: null,\n        pickDiskMoves: null,\n        dropDiskMoves: null,\n        dropRingMoves: null,\n    };\n\n    context.board = {\n        // TODO: move to draw namespace\n        canvasX: 100,\n        canvasY: 100,\n        tileSize: 100,\n\n        botColor: constants.RED,\n        isBlueTurn: true,\n        activeDisks: null,\n\n        // used to mark duplicate ring targets during move generation\n        duplicationMarkers: [],\n\n        grid: [],\n        blueDisks: new Set(),\n        redDisks: new Set(),\n        blueRings: new Set(),\n        redRings: new Set(),\n    };\n}\n\nmodule.exports = {\n    context,\n    resetContext,\n};\n\n\n//# sourceURL=webpack:///./src/context.js?");

/***/ }),

/***/ "./src/draw.js":
/*!*********************!*\
  !*** ./src/draw.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { isBlueRing } = __webpack_require__(/*! ./board */ \"./src/board.js\");\nconst { context } = __webpack_require__(/*! ./context */ \"./src/context.js\");\nconst { getCoords } = __webpack_require__(/*! ./board */ \"./src/board.js\");\nconst {\n    GRID_SIZE,\n    OPPONENT_PHASE,\n    PICK_DISK_PHASE,\n    DROP_DISK_PHASE,\n    DROP_RING_PHASE,\n    RED,\n    BLUE,\n} = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\nfunction drawBlueDisk(ctx, { x, y }) {\n    const { tileSize } = context.board;\n    ctx.beginPath();\n    ctx.fillStyle = 'rgb(24, 24, 160)';\n    ctx.arc(\n        x + tileSize / 2,\n        y + tileSize / 2,\n        0.3 * tileSize,\n        0, 2 * Math.PI,\n    );\n    ctx.fill();\n}\n\nfunction drawRedDisk(ctx, { x, y }) {\n    const { tileSize } = context.board;\n    ctx.beginPath();\n    ctx.fillStyle = 'rgb(160, 24, 24)';\n    ctx.arc(\n        x + tileSize / 2,\n        y + tileSize / 2,\n        0.3 * tileSize,\n        0, 2 * Math.PI,\n    );\n    ctx.fill();\n}\n\nfunction drawBlueRing(ctx, { x, y }) {\n    const { tileSize } = context.board;\n    ctx.beginPath();\n    ctx.strokeStyle = 'rgb(24, 24, 160)';\n    ctx.lineWidth = 0.1 * tileSize;\n    ctx.arc(\n        x + tileSize / 2,\n        y + tileSize / 2,\n        0.4 * tileSize,\n        0, 2 * Math.PI,\n    );\n    ctx.stroke();\n}\n\nfunction drawRedRing(ctx, { x, y }) {\n    const { tileSize } = context.board;\n    ctx.beginPath();\n    ctx.strokeStyle = 'rgb(160, 24, 24)';\n    ctx.lineWidth = 0.1 * tileSize;\n    ctx.arc(\n        x + tileSize / 2,\n        y + tileSize / 2,\n        0.4 * tileSize,\n        0, 2 * Math.PI,\n    );\n    ctx.stroke();\n}\n\nfunction drawBoard(ctx) {\n    const { tileSize } = context.board;\n    const startX = context.board.canvasX % tileSize;\n    const startY = context.board.canvasY % tileSize;\n    const endX = context.canvas.width;\n    const endY = context.canvas.height;\n\n    ctx.strokeStyle = 'rgb(160, 160, 160)';\n    ctx.lineWidth = 1;\n\n    for (let x = startX; x <= endX; x += tileSize) {\n        ctx.beginPath();\n        ctx.moveTo(x, 0);\n        ctx.lineTo(x, endY);\n        ctx.stroke();\n    }\n\n    for (let y = startY; y <= endY; y += tileSize) {\n        ctx.beginPath();\n        ctx.moveTo(0, y);\n        ctx.lineTo(endX, y);\n        ctx.stroke();\n    }\n}\n\nfunction drawPhasePiece(ctx) {\n    const { phase } = context.events;\n    const { move } = context.draw;\n\n    const {\n        canvasX,\n        canvasY,\n        tileSize,\n        isBlueTurn,\n        grid,\n    } = context.board;\n\n    const canvasRect = context.canvas.getBoundingClientRect();\n\n    const mouseX = context.events.mouseMove.clientX - canvasRect.left;\n    const mouseY = context.events.mouseMove.clientY - canvasRect.top;\n\n    if (phase === OPPONENT_PHASE) {\n        return;\n    }\n\n    if (phase === PICK_DISK_PHASE) {\n        return;\n    }\n\n    if (phase === DROP_DISK_PHASE) {\n        const x = mouseX - tileSize / 2;\n        const y = mouseY - tileSize / 2;\n\n        if (isBlueTurn) {\n            drawBlueDisk(ctx, { x, y });\n        } else {\n            drawRedDisk(ctx, { x, y });\n        }\n    }\n\n    if (phase === DROP_RING_PHASE) {\n        const x = mouseX - tileSize / 2;\n        const y = mouseY - tileSize / 2;\n\n        if (isBlueRing(grid[move.diskTo])) {\n            drawBlueRing(ctx, { x, y });\n        } else {\n            drawRedRing(ctx, { x, y });\n        }\n    }\n}\n\nfunction drawPossibleMoves(ctx) {\n    const { canvasX, canvasY, tileSize } = context.board;\n    const { phase } = context.events;\n    const { generatedMoves } = context.draw;\n    let highlightedTiles = new Set();\n\n    if (phase === OPPONENT_PHASE) {\n        return;\n    }\n\n    if (phase === PICK_DISK_PHASE) {\n        highlightedTiles = context.draw.pickDiskMoves;\n    }\n\n    if (phase === DROP_DISK_PHASE) {\n        highlightedTiles = context.draw.dropDiskMoves;\n    }\n\n    if (phase === DROP_RING_PHASE) {\n        highlightedTiles = context.draw.dropRingMoves;\n    }\n\n    highlightedTiles.forEach((tile) => {\n        const boardCoords = getCoords(tile);\n        const canvasCoords = convertBoardToCanvasCoords(boardCoords);\n\n        ctx.fillStyle = 'rgb(16, 64, 16)';\n        ctx.fillRect(\n            canvasCoords.x,\n            canvasCoords.y,\n            tileSize,\n            tileSize,\n        );\n    });\n}\n\nfunction drawOrigin(ctx) {\n    const { canvasX, canvasY, tileSize } = context.board;\n\n    ctx.strokeStyle = 'rgb(255, 255, 255)';\n    ctx.lineWidth = 3;\n\n    ctx.beginPath();\n    ctx.moveTo(canvasX - tileSize, canvasY);\n    ctx.lineTo(canvasX + tileSize, canvasY);\n    ctx.stroke();\n\n    ctx.beginPath();\n    ctx.moveTo(canvasX, canvasY - tileSize);\n    ctx.lineTo(canvasX, canvasY + tileSize);\n    ctx.stroke();\n}\n\nfunction drawMouseHighlight(ctx) {\n    const { canvasX, canvasY, tileSize } = context.board;\n    const canvasRect = context.canvas.getBoundingClientRect();\n\n    const mouseX = context.events.mouseMove.clientX - canvasRect.left;\n    const mouseY = context.events.mouseMove.clientY - canvasRect.top;\n\n    const canvasMouseX = mouseX - canvasX;\n    const canvasMouseY = mouseY - canvasY;\n\n    const highlightX = canvasMouseX > 0\n        ? mouseX - canvasMouseX % tileSize\n        : mouseX - canvasMouseX % tileSize - tileSize;\n\n    const highlightY = canvasMouseY > 0\n        ? mouseY - canvasMouseY % tileSize\n        : mouseY - canvasMouseY % tileSize - tileSize;\n\n    ctx.fillStyle = 'rgb(48, 48, 48)';\n    ctx.fillRect(\n        highlightX,\n        highlightY,\n        tileSize,\n        tileSize,\n    );\n}\n\nfunction convertBoardToCanvasCoords({ x, y }) {\n    const { canvasX, canvasY, tileSize } = context.board;\n    const tx = x - GRID_SIZE / 2;\n    const ty = y - GRID_SIZE / 2;\n\n    return {\n        x: canvasX + tx * tileSize,\n        y: canvasY + ty * tileSize,\n    };\n}\n\nfunction drawBlueDisks(ctx) {\n    const { blueDisks, isBlueTurn } = context.board;\n    const { move } = context.draw;\n\n    blueDisks.forEach((blueDisk) => {\n        const boardCoords = getCoords(blueDisk);\n        const canvasCoords = convertBoardToCanvasCoords(boardCoords);\n\n        if (move.diskFrom === blueDisk) {\n            return;\n        }\n\n        drawBlueDisk(ctx, canvasCoords);\n    });\n\n    if (move.diskTo > 0 && isBlueTurn) {\n        const boardCoords = getCoords(move.diskTo);\n        const canvasCoords = convertBoardToCanvasCoords(boardCoords);\n        drawBlueDisk(ctx, canvasCoords);\n    }\n}\n\nfunction drawRedDisks(ctx) {\n    const { redDisks, isBlueTurn } = context.board;\n    const { move } = context.draw;\n\n    redDisks.forEach((redDisk) => {\n        const boardCoords = getCoords(redDisk);\n        const canvasCoords = convertBoardToCanvasCoords(boardCoords);\n\n        if (move.diskFrom === redDisk) {\n            return;\n        }\n\n        drawRedDisk(ctx, canvasCoords);\n    });\n\n    if (move.diskTo > 0 && !isBlueTurn) {\n        const boardCoords = getCoords(move.diskTo);\n        const canvasCoords = convertBoardToCanvasCoords(boardCoords);\n        drawRedDisk(ctx, canvasCoords);\n    }\n}\n\nfunction drawBlueRings(ctx) {\n    const { blueRings } = context.board;\n    const { move } = context.draw;\n\n    blueRings.forEach((blueRing) => {\n        const boardCoords = getCoords(blueRing);\n        const canvasCoords = convertBoardToCanvasCoords(boardCoords);\n\n        if (move.diskTo === blueRing) {\n            return;\n        }\n\n        drawBlueRing(ctx, canvasCoords);\n    });\n}\n\nfunction drawRedRings(ctx) {\n    const { redRings } = context.board;\n    const { move } = context.draw;\n\n    redRings.forEach((redRing) => {\n        const boardCoords = getCoords(redRing);\n        const canvasCoords = convertBoardToCanvasCoords(boardCoords);\n\n        if (move.diskTo === redRing) {\n            return;\n        }\n\n        drawRedRing(ctx, canvasCoords);\n    });\n}\n\nfunction drawPieces(ctx) {\n    drawBlueDisks(ctx);\n    drawRedDisks(ctx);\n    drawBlueRings(ctx);\n    drawRedRings(ctx);\n}\n\nfunction redraw() {\n    console.log('redraw');\n\n    const ctx = context.canvas.getContext('2d');\n\n    ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);\n\n    drawPossibleMoves(ctx);\n    drawBoard(ctx);\n    drawOrigin(ctx);\n    drawMouseHighlight(ctx);\n    drawPieces(ctx);\n    drawPhasePiece(ctx);\n}\n\nmodule.exports = { redraw };\n\n\n//# sourceURL=webpack:///./src/draw.js?");

/***/ }),

/***/ "./src/event.js":
/*!**********************!*\
  !*** ./src/event.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { context } = __webpack_require__(/*! ./context */ \"./src/context.js\");\nconst { redraw } = __webpack_require__(/*! ./draw */ \"./src/draw.js\");\nconst { generateMoves, makeMove } = __webpack_require__(/*! ./move */ \"./src/move.js\");\nconst { intDiv } = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst {\n    OPPONENT_PHASE,\n    PICK_DISK_PHASE,\n    DROP_DISK_PHASE,\n    DROP_RING_PHASE,\n    MAX_DISKS,\n    GRID_SIZE,\n} = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\nfunction getGridIndexAtCanvasPos({ x, y }) {\n    const { canvasX, canvasY, tileSize } = context.board;\n\n    const gridXRaw = x - canvasX > 0\n        ? intDiv(x - canvasX, tileSize)\n        : intDiv(x - canvasX, tileSize) - 1;\n    const gridX = gridXRaw + GRID_SIZE / 2;\n\n    const gridYRaw = y - canvasY > 0\n        ? intDiv(y - canvasY, tileSize)\n        : intDiv(y - canvasY, tileSize) - 1;\n    const gridY = gridYRaw + GRID_SIZE / 2;\n\n    const gridIndex = GRID_SIZE * gridY + gridX;\n\n    console.log(`grid: ${gridX} ${gridY}`);\n\n    return gridIndex;\n}\n\nfunction generatePickDiskMoves() {\n    const { generatedMoves } = context.draw;\n\n    context.draw.pickDiskMoves = new Set();\n    for (let k = 0; k < generatedMoves.length; k += 1) {\n        if (generatedMoves[k].diskFrom !== -1) {\n            context.draw.pickDiskMoves.add(generatedMoves[k].diskFrom);\n        }\n    }\n}\n\nfunction generateDropDiskMoves() {\n    const { generatedMoves } = context.draw;\n\n    context.draw.dropDiskMoves = new Set();\n    for (let k = 0; k < generatedMoves.length; k += 1) {\n        context.draw.dropDiskMoves.add(generatedMoves[k].diskTo);\n    }\n}\n\nfunction generateDropRingMoves(diskTo) {\n    const { generatedMoves } = context.draw;\n\n    context.draw.dropRingMoves = new Set();\n    for (let k = 0; k < generatedMoves.length; k += 1) {\n        if (diskTo === generatedMoves[k].diskTo) {\n            context.draw.dropRingMoves.add(generatedMoves[k].ringTo);\n        }\n    }\n}\n\nfunction handleKeyDown(event) {\n    console.log(`handleKeyDown, keyCode: ${event.keyCode}`);\n\n    const { phase } = context.events;\n\n    if (event.keyCode === 70 && phase === OPPONENT_PHASE) { // f key\n        context.draw.generatedMoves = generateMoves(context.board);\n        generatePickDiskMoves();\n        generateDropDiskMoves();\n\n        context.draw.move = {\n            diskFrom: -1,\n            diskTo: -1,\n            ringTo: -1,\n        };\n\n        if (context.board.activeDisks.size < MAX_DISKS) {\n            context.events.phase = DROP_DISK_PHASE;\n        } else {\n            context.events.phase = PICK_DISK_PHASE;\n        }\n\n        redraw();\n\n        console.log(context.draw.generatedMoves);\n        console.log(`transitioned to phase: ${context.events.phase}`);\n\n        console.log('pick disk moves');\n        console.log(context.draw.pickDiskMoves);\n        console.log('drop disk moves');\n        console.log(context.draw.dropDiskMoves);\n        console.log('drop ring moves');\n        console.log(context.draw.dropRingMoves);\n    }\n}\n\nfunction handleMouseClick(event) {\n    console.log('handleMouseClick');\n    const { phase } = context.events;\n    const { canvasX, canvasY, tileSize } = context.board;\n    const { pickDiskMoves, dropDiskMoves, dropRingMoves } = context.draw;\n\n    const canvasRect = context.canvas.getBoundingClientRect();\n\n    const mouseX = event.clientX - canvasRect.left;\n    const mouseY = event.clientY - canvasRect.top;\n\n    const gridIndex = getGridIndexAtCanvasPos({ x: mouseX, y: mouseY });\n\n    console.log(`mouse: ${mouseX} ${mouseY}, click count: ${event.detail}`);\n\n    if (event.detail === 2) {\n        if (phase === PICK_DISK_PHASE) {\n            if (pickDiskMoves.has(gridIndex)) {\n                console.log('pick disk phase legal move');\n                context.draw.move.diskFrom = gridIndex;\n                context.events.phase = DROP_DISK_PHASE;\n\n                redraw();\n            } else {\n                console.log('pick disk phase illegal move');\n            }\n        }\n\n        if (phase === DROP_DISK_PHASE) {\n            if (dropDiskMoves.has(gridIndex)) {\n                console.log('drop disk phase legal move');\n                generateDropRingMoves(gridIndex);\n                context.draw.move.diskTo = gridIndex;\n                context.events.phase = DROP_RING_PHASE;\n\n                redraw();\n            } else {\n                console.log('drop disk phase illegal move');\n            }\n        }\n\n        if (phase === DROP_RING_PHASE) {\n            if (dropRingMoves.has(gridIndex)) {\n                console.log('drop ring phase legal move');\n                context.draw.move.ringTo = gridIndex;\n                makeMove(context.board, context.draw.move);\n\n                context.events.phase = OPPONENT_PHASE;\n                context.board.isBlueTurn = !context.board.isBlueTurn;\n\n                context.draw.move = {\n                    diskFrom: -1,\n                    diskTo: -1,\n                    ringTo: -1,\n                };\n\n                redraw();\n            } else {\n                console.log('drop ring phase illegal move');\n            }\n        }\n    }\n}\n\nfunction handleMouseDown(event) {\n    console.log('handleMouseDown');\n    console.log(event);\n\n    const {\n        screenX,\n        screenY,\n    } = event;\n\n    context.events.mouseDown = {\n        screenX,\n        screenY,\n    };\n\n    context.events.isMouseDown = true;\n}\n\nfunction handleMouseMove(event) {\n    if (context.events.isMouseDown) {\n        const deltaX = event.screenX - context.events.mouseMove.screenX;\n        const deltaY = event.screenY - context.events.mouseMove.screenY;\n        context.board.canvasX += deltaX;\n        context.board.canvasY += deltaY;\n    }\n\n    const {\n        clientX,\n        clientY,\n        screenX,\n        screenY,\n    } = event;\n\n    context.events.mouseMove = {\n        clientX,\n        clientY,\n        screenX,\n        screenY,\n    };\n\n    redraw();\n}\n\nfunction handleMouseUp(event) {\n    console.log('handleMouseUp');\n    console.log(context);\n\n    const {\n        screenX,\n        screenY,\n    } = event;\n\n    context.events.mouseUp = {\n        screenX,\n        screenY,\n    };\n\n    context.events.isMouseDown = false;\n}\n\nfunction handleMouseWheel(event) {\n    console.log(`handleMouseWheel: ${event.deltaY}`);\n\n    const canvasWidth = context.canvas.width;\n    const canvasHeight = context.canvas.height;\n    const mapCanvasX = context.board.canvasX;\n    const mapCanvasY = context.board.canvasY;\n\n    let { tileSize } = context.board;\n\n    const centerTileDistanceX = (canvasWidth / 2 - mapCanvasX) / tileSize;\n    const centerTileDistanceY = (canvasHeight / 2 - mapCanvasY) / tileSize;\n\n    tileSize -= event.deltaY;\n\n    if (tileSize > 100) {\n        tileSize = 100;\n    }\n\n    if (tileSize < 10) {\n        tileSize = 10;\n    }\n\n    context.board.tileSize = tileSize;\n\n    context.board.canvasX = canvasWidth / 2 - tileSize * centerTileDistanceX;\n    context.board.canvasY = canvasHeight / 2 - tileSize * centerTileDistanceY;\n\n    redraw();\n}\n\nmodule.exports = {\n    handleKeyDown,\n    handleMouseClick,\n    handleMouseDown,\n    handleMouseMove,\n    handleMouseUp,\n    handleMouseWheel,\n};\n\n\n//# sourceURL=webpack:///./src/event.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { context, resetContext } = __webpack_require__(/*! ./context */ \"./src/context.js\");\nconst { initBoard } = __webpack_require__(/*! ./board */ \"./src/board.js\");\nconst { redraw } = __webpack_require__(/*! ./draw */ \"./src/draw.js\");\nconst {\n    handleKeyDown,\n    handleMouseClick,\n    handleMouseDown,\n    handleMouseMove,\n    handleMouseUp,\n    handleMouseWheel,\n} = __webpack_require__(/*! ./event */ \"./src/event.js\");\n\nfunction resizeCanvas() {\n    const canvas = document.getElementById('gameCanvas');\n\n    canvas.width = 0.8 * window.innerWidth;\n    canvas.height = 0.8 * window.innerHeight;\n\n    context.canvas = canvas;\n\n    redraw();\n}\n\nfunction restartGame(x) {\n    console.log(x);\n\n    resetContext();\n    initBoard(context.board);\n    resizeCanvas();\n}\n\nwindow.addEventListener('resize', resizeCanvas);\n\nwindow.addEventListener('keydown', handleKeyDown);\nwindow.addEventListener('click', handleMouseClick);\nwindow.addEventListener('mousedown', handleMouseDown);\nwindow.addEventListener('mousemove', handleMouseMove);\nwindow.addEventListener('mouseup', handleMouseUp);\nwindow.addEventListener('wheel', handleMouseWheel);\n\nwindow.onload = () => restartGame('game started');\nwindow.restartGame = restartGame;\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/move.js":
/*!*********************!*\
  !*** ./src/move.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n    addBlueDisk,\n    addBlueRing,\n    addRedDisk,\n    addRedRing,\n    deleteBlueDisk,\n    deleteBlueRing,\n    deleteRedDisk,\n    deleteRedRing,\n    isBlueRing,\n} = __webpack_require__(/*! ./board */ \"./src/board.js\");\nconst {\n    BLUE_DISK,\n    DROP_DISK,\n    EMPTY,\n    GRID_SIZE,\n    MARKED,\n    MAX_DISKS,\n    RED_DISK,\n} = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\nfunction generateAdjacentEmptyIndices(board, index) {\n    const { grid, duplicationMarkers } = board;\n\n    const emptyIndices = [];\n\n    let i = index - GRID_SIZE;\n    if (grid[i] === EMPTY) {\n        emptyIndices.push(i);\n\n        duplicationMarkers.push(i);\n        grid[i] = MARKED;\n    }\n\n    i = index - 1;\n    if (grid[i] === EMPTY) {\n        emptyIndices.push(i);\n\n        duplicationMarkers.push(i);\n        grid[i] = MARKED;\n    }\n\n    i = index + 1;\n    if (grid[i] === EMPTY) {\n        emptyIndices.push(i);\n\n        duplicationMarkers.push(i);\n        grid[i] = MARKED;\n    }\n\n    i = index + GRID_SIZE;\n    if (grid[i] === EMPTY) {\n        emptyIndices.push(i);\n\n        duplicationMarkers.push(i);\n        grid[i] = MARKED;\n    }\n\n    return emptyIndices;\n}\n\nfunction generateRingMoves(board, ring, compareRing, diskFrom, moves) {\n    if (ring === compareRing) {\n        return;\n    }\n\n    const emptyIndices = generateAdjacentEmptyIndices(board, compareRing);\n    for (let k = 0; k < emptyIndices.length; k += 1) {\n        moves.push({\n            diskFrom,\n            diskTo: ring,\n            ringTo: emptyIndices[k],\n        });\n    }\n}\n\nfunction removeDuplicationMarkers(board) {\n    const { duplicationMarkers, grid } = board;\n    for (let k = 0; k < duplicationMarkers.length; k += 1) {\n        grid[duplicationMarkers[k]] = EMPTY;\n    }\n\n    board.duplicationMarkers = [];\n}\n\n// populates the move list for the given ring.\nfunction generateDiskDropMoves(board, ring, diskFrom, moves) {\n    const { blueRings, redRings } = board;\n\n    blueRings.forEach((blueRing) => {\n        generateRingMoves(board, ring, blueRing, diskFrom, moves);\n    });\n\n    redRings.forEach((redRing) => {\n        generateRingMoves(board, ring, redRing, diskFrom, moves);\n    });\n\n    removeDuplicationMarkers(board);\n}\n\nfunction generateRemovableDisks(board) {\n    // TODO: stub\n\n    const removableDisks = board.activeDisks;\n\n    return removableDisks;\n}\n\nfunction generateDiskTransferMoves(board, ring, moves) {\n    const removableDisks = generateRemovableDisks(board);\n\n    removableDisks.forEach((removableDisk) => {\n        generateDiskDropMoves(board, ring, removableDisk, moves);\n    });\n}\n\nfunction generateMovesForRings(board, rings, moves) {\n    rings.forEach((ring) => {\n        if (board.activeDisks.size < MAX_DISKS) {\n            generateDiskDropMoves(board, ring, DROP_DISK, moves);\n        } else {\n            generateDiskTransferMoves(board, ring, moves);\n        }\n    });\n}\n\nfunction generateMoves(board) {\n    const moves = [];\n\n    board.activeDisks = board.isBlueTurn\n        ? board.blueDisks\n        : board.redDisks;\n\n    generateMovesForRings(board, board.blueRings, moves);\n    generateMovesForRings(board, board.redRings, moves);\n\n    return moves;\n}\n\nfunction makeMove(board, { diskFrom, diskTo, ringTo }) {\n    console.log(`make move ${JSON.stringify({ diskFrom, diskTo, ringTo })}`);\n\n    const nextDisk = board.isBlueTurn\n        ? BLUE_DISK + board.blueDisks.size\n        : RED_DISK + board.redDisks.size;\n\n    const { addDisk, deleteDisk } = board.isBlueTurn\n        ? { addDisk: addBlueDisk, deleteDisk: deleteBlueDisk }\n        : { addDisk: addRedDisk, deleteDisk: deleteRedDisk };\n\n    const ringToBeDeleted = board.grid[diskTo];\n    const { addRing, deleteRing } = isBlueRing(ringToBeDeleted)\n        ? { addRing: addBlueRing, deleteRing: deleteBlueRing }\n        : { addRing: addRedRing, deleteRing: deleteRedRing };\n\n    const deletedDisk = diskFrom > 0\n        ? deleteDisk(board, diskFrom)\n        : nextDisk;\n    const deletedRing = deleteRing(board, diskTo)\n\n    addDisk(board, deletedDisk, diskTo);\n    addRing(board, deletedRing, ringTo);\n\n    console.log(board.redRings);\n\n    return 1;\n}\n\nfunction unmakeMove(board, { diskFrom, diskTo, ringTo }) {\n    return 1;\n}\n\nmodule.exports = {\n    makeMove,\n    unmakeMove,\n    generateMoves,\n};\n\n\n//# sourceURL=webpack:///./src/move.js?");

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