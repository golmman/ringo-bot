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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const gameContext = {\n    canvas: null,\n\n    events: {\n        mouseWheel: null,\n        mouseDown: null,\n        mouseMove: null,\n        isMouseDown: false,\n    },\n\n    map: {\n        canvasX: 100,\n        canvasY: 100,\n        tileSize: 100,\n    },\n};\n\nfunction drawBoard(ctx) {\n    const { tileSize } = gameContext.map;\n    const startX = gameContext.map.canvasX % tileSize;\n    const startY = gameContext.map.canvasY % tileSize;\n    const endX = gameContext.canvas.width;\n    const endY = gameContext.canvas.height;\n\n    ctx.strokeStyle = 'white';\n\n    for (let x = startX; x <= endX; x += tileSize) {\n        ctx.beginPath();\n        ctx.moveTo(x, 0);\n        ctx.lineTo(x, endY);\n        ctx.stroke();\n    }\n\n    for (let y = startY; y <= endY; y += tileSize) {\n        ctx.beginPath();\n        ctx.moveTo(0, y);\n        ctx.lineTo(endX, y);\n        ctx.stroke();\n    }\n}\n\nfunction redraw() {\n    console.log('redraw');\n\n    const ctx = gameContext.canvas.getContext(\"2d\");\n\n\n    ctx.clearRect(0, 0, gameContext.canvas.width, gameContext.canvas.height);\n\n    ctx.fillStyle = 'rgb(32, 32, 32)';\n    ctx.fillRect(\n        gameContext.map.canvasX,\n        gameContext.map.canvasY,\n        gameContext.map.tileSize,\n        gameContext.map.tileSize,\n    );\n\n    drawBoard(ctx);\n}\n\nfunction resizeCanvas() {\n    const canvas = document.getElementById(\"gameCanvas\");\n\n    canvas.width = 0.8 * window.innerWidth;\n    canvas.height = 0.8 * window.innerHeight;\n\n    gameContext.canvas = canvas;\n\n    redraw();\n}\n\nfunction handleMouseWheel(event) {\n    console.log(`handleMouseWheel: ${event.deltaY}`);\n\n    const canvasWidth = gameContext.canvas.width;\n    const canvasHeight = gameContext.canvas.height;\n    const mapCanvasX = gameContext.map.canvasX;\n    const mapCanvasY = gameContext.map.canvasY;\n\n    let tileSize = gameContext.map.tileSize;\n\n    const centerTileDistanceX = (canvasWidth / 2 - mapCanvasX) / tileSize;\n    const centerTileDistanceY = (canvasHeight / 2 - mapCanvasY) / tileSize;\n\n    tileSize -= event.deltaY;\n\n    if (tileSize > 100) {\n        tileSize = 100;\n    }\n\n    if (tileSize < 10) {\n        tileSize = 10;\n    }\n\n    gameContext.map.tileSize = tileSize;\n\n    gameContext.map.canvasX = canvasWidth / 2 - tileSize * centerTileDistanceX;\n    gameContext.map.canvasY = canvasHeight / 2 - tileSize * centerTileDistanceY;\n\n    redraw();\n}\n\nfunction handleMouseDown(event) {\n    console.log(`handleMouseDown`);\n\n    const {\n        screenX,\n        screenY,\n    } = event;\n\n    gameContext.events.mouseDown = {\n        screenX,\n        screenY,\n    };\n\n    gameContext.events.isMouseDown = true;\n}\n\nfunction handleMouseUp(event) {\n    console.log(`handleMouseUp`);\n    console.log(gameContext);\n\n    const {\n        screenX,\n        screenY,\n    } = event;\n\n    gameContext.events.mouseUp = {\n        screenX,\n        screenY,\n    };\n\n    gameContext.events.isMouseDown = false;\n}\n\nfunction handleMouseMove(event) {\n    if (gameContext.events.isMouseDown) {\n        const deltaX = event.screenX - gameContext.events.mouseMove.screenX;\n        const deltaY = event.screenY - gameContext.events.mouseMove.screenY;\n        //const deltaY = gameContext.events.mouseMove.screenY - gameContext.events.mouseDown.screenY;\n        //const deltaY = gameContext.events.mouseMove.screenY - gameContext.events.mouseDown.screenY;\n        gameContext.map.canvasX += deltaX;\n        gameContext.map.canvasY += deltaY;\n\n        redraw();\n    }\n\n    const {\n        screenX,\n        screenY,\n    } = event;\n\n    gameContext.events.mouseMove = {\n        screenX,\n        screenY,\n    };\n\n}\n\nfunction restartGame(x) {\n    console.log(x);\n\n    resizeCanvas();\n}\n\nwindow.addEventListener('resize', resizeCanvas);\n\nwindow.addEventListener('wheel', handleMouseWheel);\nwindow.addEventListener('mousedown', handleMouseDown);\nwindow.addEventListener('mouseup', handleMouseUp);\nwindow.addEventListener('mousemove', handleMouseMove);\n\nwindow.onload = () => restartGame('game started');\nwindow.restartGame = restartGame;\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });