/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");
/* harmony import */ var _prevGuessCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prevGuessCheck */ "./src/prevGuessCheck.js");
/* harmony import */ var _hitCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hitCheck */ "./src/hitCheck.js");




const Gameboard = function (coords0, coords1, coords2, coords3, coords4) {
  const carrier = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(coords0);
  const battleship = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(coords1);
  const destroyer = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(coords2);
  const submarine = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(coords3);
  const patrol = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(coords4);

  const misses = [];

  const hits = [];

  const recieveAttack = function (coords) {
    if ((0,_prevGuessCheck__WEBPACK_IMPORTED_MODULE_1__.prevGuessCheck)(this, coords).includes(true)) return;

    const guessCheck = (0,_hitCheck__WEBPACK_IMPORTED_MODULE_2__.hitCheck)(this, coords);

    if (guessCheck.every((x) => x === false)) {
      misses.push(coords);
      return this;
    }

    if (guessCheck.some((x) => x === true)) {
      hits.push(coords);
      console.log(coords, guessCheck.indexOf(true));
    }

    // console.log(hitCheck(this, coords));
  };

  return {
    carrier,
    battleship,
    destroyer,
    submarine,
    patrol,
    misses,
    recieveAttack,
    hits
  };
};



// BOATS:
//
// Carrier     : C -- 5
// Battleship  : B -- 4
// Destroyer   : D -- 3
// Submarine   : S -- 3
// Patrol      : P -- 2
//
// Boat hit    : lowercase (i.e. D => d)

// PLAY:
//
// Hit   : 1
// Miss  : 0

/* 
const board = [
    [[0,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [0,7], [0,8], [0,9]],
    [[1,0], [1,1], [1,2], [1,3], [1,4], [1,5], [1,6], [1,7], [1,8], [1,9]],
    [[2,0], [2,1], [2,2], [2,3], [2,4], [2,5], [2,6], [2,7], [2,8], [2,9]],
    [[3,0], [3,1], [3,2], [3,3], [3,4], [3,5], [3,6], [3,7], [3,8], [3,9]],
    [[4,0], [4,1], [4,2], [4,3], [4,4], [4,5], [4,6], [4,7], [4,8], [4,9]],
    [[5,0], [5,1], [5,2], [5,3], [5,4], [5,5], [5,6], [5,7], [5,8], [5,9]],
    [[6,0], [6,1], [6,2], [6,3], [6,4], [6,5], [6,6], [6,7], [6,8], [6,9]],
    [[7,0], [7,1], [7,2], [7,3], [7,4], [7,5], [7,6], [7,7], [7,8], [7,9]],
    [[8,0], [8,1], [8,2], [8,3], [8,4], [8,5], [8,6], [8,7], [8,8], [8,9]],
    [[9,0], [9,1], [9,2], [9,3], [9,4], [9,5], [9,6], [9,7], [9,8], [9,9]]
  ];
*/


/***/ }),

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
const Ship = function (coords) {
  // Create ship coordinate array = [[[coords], hit], [[coords], hit], [[coords], hit]]
  const location = coords.map((coord) => [coord, false]);
  let sunk = false;

  const hit = function (index) {
    this.location[index][1] = true;
    return this;
  };

  const isSunk = function () {
    if (this.location.every((coord) => coord[1] === true)) this.sunk = true;
    return this;
  };

  return { location, sunk, hit, isSunk };
};




/***/ }),

/***/ "./src/arrEqualCheck.js":
/*!******************************!*\
  !*** ./src/arrEqualCheck.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrEqualCheck": () => (/* binding */ arrEqualCheck)
/* harmony export */ });
const arrEqualCheck = function (arr1, arr2) {
  return arr1.every((val, index) => val === arr2[index]);
};




/***/ }),

/***/ "./src/hitCheck.js":
/*!*************************!*\
  !*** ./src/hitCheck.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hitCheck": () => (/* binding */ hitCheck)
/* harmony export */ });
/* harmony import */ var _arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrEqualCheck */ "./src/arrEqualCheck.js");


const hitCheck = function (gameboard, coords) {
  const output = [];

  output.push(
    gameboard.carrier.location
      .map((coord) => (0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__.arrEqualCheck)(coord[0], coords))
      .includes(true)
  );

  output.push(
    gameboard.battleship.location
      .map((coord) => (0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__.arrEqualCheck)(coord[0], coords))
      .includes(true)
  );

  output.push(
    gameboard.destroyer.location
      .map((coord) => (0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__.arrEqualCheck)(coord[0], coords))
      .includes(true)
  );

  output.push(
    gameboard.submarine.location
      .map((coord) => (0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__.arrEqualCheck)(coord[0], coords))
      .includes(true)
  );

  output.push(
    gameboard.patrol.location
      .map((coord) => (0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__.arrEqualCheck)(coord[0], coords))
      .includes(true)
  );

  return output;
};



// carrier, battleship, destroyer, submarine, patrol


/***/ }),

/***/ "./src/prevGuessCheck.js":
/*!*******************************!*\
  !*** ./src/prevGuessCheck.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prevGuessCheck": () => (/* binding */ prevGuessCheck)
/* harmony export */ });
/* harmony import */ var _arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrEqualCheck */ "./src/arrEqualCheck.js");


const prevGuessCheck = (gameboard, coords) => {
  const output = [];

  output.push(
    gameboard.misses.map((coord) => (0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__.arrEqualCheck)(coord, coords)).includes(true)
  );

  return output;
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");



const newShip = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)([
  [0, 0],
  [0, 1],
  [0, 2]
]);

console.log(newShip.hit(0).hit(1).isSunk().sunk);

console.log(newShip);

// console.log(newShip);

// carrier
const coords0 = [
  [2, 2],
  [2, 3],
  [2, 4],
  [2, 5],
  [2, 6]
];
// battleship
const coords1 = [
  [1, 1],
  [1, 2],
  [1, 3],
  [1, 4]
];
// destroyer
const coords2 = [
  [0, 1],
  [0, 2],
  [0, 3]
];
// submarine
const coords3 = [
  [3, 3],
  [3, 4],
  [3, 5]
];
// patrol
const coords4 = [
  [4, 4],
  [4, 5]
];

const newGameboard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard)(coords0, coords1, coords2, coords3, coords4);
console.log(newGameboard);

newGameboard.recieveAttack([1, 4]);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUE4QjtBQUNvQjtBQUNaOztBQUV0QztBQUNBLGtCQUFrQiwyQ0FBSTtBQUN0QixxQkFBcUIsMkNBQUk7QUFDekIsb0JBQW9CLDJDQUFJO0FBQ3hCLG9CQUFvQiwyQ0FBSTtBQUN4QixpQkFBaUIsMkNBQUk7O0FBRXJCOztBQUVBOztBQUVBO0FBQ0EsUUFBUSwrREFBYzs7QUFFdEIsdUJBQXVCLG1EQUFROztBQUUvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDs7QUFFZ0I7Ozs7Ozs7Ozs7Ozs7OztBQ2xCaEI7QUFDQTtBQUNBOztBQUV5Qjs7Ozs7Ozs7Ozs7Ozs7OztBQ0p1Qjs7QUFFaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLDZEQUFhO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQiw2REFBYTtBQUNuQztBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IsNkRBQWE7QUFDbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLDZEQUFhO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQiw2REFBYTtBQUNuQztBQUNBOztBQUVBO0FBQ0E7O0FBRW9COztBQUVwQjs7Ozs7Ozs7Ozs7Ozs7OztBQ3hDZ0Q7O0FBRWhEO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MsNkRBQWE7QUFDakQ7O0FBRUE7QUFDQTs7QUFFMEI7Ozs7Ozs7VUNaMUI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOOEI7QUFDVTs7QUFFeEMsZ0JBQWdCLDJDQUFJO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLHFEQUFTO0FBQzlCOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXJyRXF1YWxDaGVjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2hpdENoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcHJldkd1ZXNzQ2hlY2suanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL1NoaXBcIjtcbmltcG9ydCB7IHByZXZHdWVzc0NoZWNrIH0gZnJvbSBcIi4vcHJldkd1ZXNzQ2hlY2tcIjtcbmltcG9ydCB7IGhpdENoZWNrIH0gZnJvbSBcIi4vaGl0Q2hlY2tcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gZnVuY3Rpb24gKGNvb3JkczAsIGNvb3JkczEsIGNvb3JkczIsIGNvb3JkczMsIGNvb3JkczQpIHtcbiAgY29uc3QgY2FycmllciA9IFNoaXAoY29vcmRzMCk7XG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKGNvb3JkczEpO1xuICBjb25zdCBkZXN0cm95ZXIgPSBTaGlwKGNvb3JkczIpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBTaGlwKGNvb3JkczMpO1xuICBjb25zdCBwYXRyb2wgPSBTaGlwKGNvb3JkczQpO1xuXG4gIGNvbnN0IG1pc3NlcyA9IFtdO1xuXG4gIGNvbnN0IGhpdHMgPSBbXTtcblxuICBjb25zdCByZWNpZXZlQXR0YWNrID0gZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgIGlmIChwcmV2R3Vlc3NDaGVjayh0aGlzLCBjb29yZHMpLmluY2x1ZGVzKHRydWUpKSByZXR1cm47XG5cbiAgICBjb25zdCBndWVzc0NoZWNrID0gaGl0Q2hlY2sodGhpcywgY29vcmRzKTtcblxuICAgIGlmIChndWVzc0NoZWNrLmV2ZXJ5KCh4KSA9PiB4ID09PSBmYWxzZSkpIHtcbiAgICAgIG1pc3Nlcy5wdXNoKGNvb3Jkcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAoZ3Vlc3NDaGVjay5zb21lKCh4KSA9PiB4ID09PSB0cnVlKSkge1xuICAgICAgaGl0cy5wdXNoKGNvb3Jkcyk7XG4gICAgICBjb25zb2xlLmxvZyhjb29yZHMsIGd1ZXNzQ2hlY2suaW5kZXhPZih0cnVlKSk7XG4gICAgfVxuXG4gICAgLy8gY29uc29sZS5sb2coaGl0Q2hlY2sodGhpcywgY29vcmRzKSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBjYXJyaWVyLFxuICAgIGJhdHRsZXNoaXAsXG4gICAgZGVzdHJveWVyLFxuICAgIHN1Ym1hcmluZSxcbiAgICBwYXRyb2wsXG4gICAgbWlzc2VzLFxuICAgIHJlY2lldmVBdHRhY2ssXG4gICAgaGl0c1xuICB9O1xufTtcblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG5cbi8vIEJPQVRTOlxuLy9cbi8vIENhcnJpZXIgICAgIDogQyAtLSA1XG4vLyBCYXR0bGVzaGlwICA6IEIgLS0gNFxuLy8gRGVzdHJveWVyICAgOiBEIC0tIDNcbi8vIFN1Ym1hcmluZSAgIDogUyAtLSAzXG4vLyBQYXRyb2wgICAgICA6IFAgLS0gMlxuLy9cbi8vIEJvYXQgaGl0ICAgIDogbG93ZXJjYXNlIChpLmUuIEQgPT4gZClcblxuLy8gUExBWTpcbi8vXG4vLyBIaXQgICA6IDFcbi8vIE1pc3MgIDogMFxuXG4vKiBcbmNvbnN0IGJvYXJkID0gW1xuICAgIFtbMCwwXSwgWzAsMV0sIFswLDJdLCBbMCwzXSwgWzAsNF0sIFswLDVdLCBbMCw2XSwgWzAsN10sIFswLDhdLCBbMCw5XV0sXG4gICAgW1sxLDBdLCBbMSwxXSwgWzEsMl0sIFsxLDNdLCBbMSw0XSwgWzEsNV0sIFsxLDZdLCBbMSw3XSwgWzEsOF0sIFsxLDldXSxcbiAgICBbWzIsMF0sIFsyLDFdLCBbMiwyXSwgWzIsM10sIFsyLDRdLCBbMiw1XSwgWzIsNl0sIFsyLDddLCBbMiw4XSwgWzIsOV1dLFxuICAgIFtbMywwXSwgWzMsMV0sIFszLDJdLCBbMywzXSwgWzMsNF0sIFszLDVdLCBbMyw2XSwgWzMsN10sIFszLDhdLCBbMyw5XV0sXG4gICAgW1s0LDBdLCBbNCwxXSwgWzQsMl0sIFs0LDNdLCBbNCw0XSwgWzQsNV0sIFs0LDZdLCBbNCw3XSwgWzQsOF0sIFs0LDldXSxcbiAgICBbWzUsMF0sIFs1LDFdLCBbNSwyXSwgWzUsM10sIFs1LDRdLCBbNSw1XSwgWzUsNl0sIFs1LDddLCBbNSw4XSwgWzUsOV1dLFxuICAgIFtbNiwwXSwgWzYsMV0sIFs2LDJdLCBbNiwzXSwgWzYsNF0sIFs2LDVdLCBbNiw2XSwgWzYsN10sIFs2LDhdLCBbNiw5XV0sXG4gICAgW1s3LDBdLCBbNywxXSwgWzcsMl0sIFs3LDNdLCBbNyw0XSwgWzcsNV0sIFs3LDZdLCBbNyw3XSwgWzcsOF0sIFs3LDldXSxcbiAgICBbWzgsMF0sIFs4LDFdLCBbOCwyXSwgWzgsM10sIFs4LDRdLCBbOCw1XSwgWzgsNl0sIFs4LDddLCBbOCw4XSwgWzgsOV1dLFxuICAgIFtbOSwwXSwgWzksMV0sIFs5LDJdLCBbOSwzXSwgWzksNF0sIFs5LDVdLCBbOSw2XSwgWzksN10sIFs5LDhdLCBbOSw5XV1cbiAgXTtcbiovXG4iLCJjb25zdCBTaGlwID0gZnVuY3Rpb24gKGNvb3Jkcykge1xuICAvLyBDcmVhdGUgc2hpcCBjb29yZGluYXRlIGFycmF5ID0gW1tbY29vcmRzXSwgaGl0XSwgW1tjb29yZHNdLCBoaXRdLCBbW2Nvb3Jkc10sIGhpdF1dXG4gIGNvbnN0IGxvY2F0aW9uID0gY29vcmRzLm1hcCgoY29vcmQpID0+IFtjb29yZCwgZmFsc2VdKTtcbiAgbGV0IHN1bmsgPSBmYWxzZTtcblxuICBjb25zdCBoaXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICB0aGlzLmxvY2F0aW9uW2luZGV4XVsxXSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmxvY2F0aW9uLmV2ZXJ5KChjb29yZCkgPT4gY29vcmRbMV0gPT09IHRydWUpKSB0aGlzLnN1bmsgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiB7IGxvY2F0aW9uLCBzdW5rLCBoaXQsIGlzU3VuayB9O1xufTtcblxuZXhwb3J0IHsgU2hpcCB9O1xuIiwiY29uc3QgYXJyRXF1YWxDaGVjayA9IGZ1bmN0aW9uIChhcnIxLCBhcnIyKSB7XG4gIHJldHVybiBhcnIxLmV2ZXJ5KCh2YWwsIGluZGV4KSA9PiB2YWwgPT09IGFycjJbaW5kZXhdKTtcbn07XG5cbmV4cG9ydCB7IGFyckVxdWFsQ2hlY2sgfTtcbiIsImltcG9ydCB7IGFyckVxdWFsQ2hlY2sgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5cbmNvbnN0IGhpdENoZWNrID0gZnVuY3Rpb24gKGdhbWVib2FyZCwgY29vcmRzKSB7XG4gIGNvbnN0IG91dHB1dCA9IFtdO1xuXG4gIG91dHB1dC5wdXNoKFxuICAgIGdhbWVib2FyZC5jYXJyaWVyLmxvY2F0aW9uXG4gICAgICAubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZFswXSwgY29vcmRzKSlcbiAgICAgIC5pbmNsdWRlcyh0cnVlKVxuICApO1xuXG4gIG91dHB1dC5wdXNoKFxuICAgIGdhbWVib2FyZC5iYXR0bGVzaGlwLmxvY2F0aW9uXG4gICAgICAubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZFswXSwgY29vcmRzKSlcbiAgICAgIC5pbmNsdWRlcyh0cnVlKVxuICApO1xuXG4gIG91dHB1dC5wdXNoKFxuICAgIGdhbWVib2FyZC5kZXN0cm95ZXIubG9jYXRpb25cbiAgICAgIC5tYXAoKGNvb3JkKSA9PiBhcnJFcXVhbENoZWNrKGNvb3JkWzBdLCBjb29yZHMpKVxuICAgICAgLmluY2x1ZGVzKHRydWUpXG4gICk7XG5cbiAgb3V0cHV0LnB1c2goXG4gICAgZ2FtZWJvYXJkLnN1Ym1hcmluZS5sb2NhdGlvblxuICAgICAgLm1hcCgoY29vcmQpID0+IGFyckVxdWFsQ2hlY2soY29vcmRbMF0sIGNvb3JkcykpXG4gICAgICAuaW5jbHVkZXModHJ1ZSlcbiAgKTtcblxuICBvdXRwdXQucHVzaChcbiAgICBnYW1lYm9hcmQucGF0cm9sLmxvY2F0aW9uXG4gICAgICAubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZFswXSwgY29vcmRzKSlcbiAgICAgIC5pbmNsdWRlcyh0cnVlKVxuICApO1xuXG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgeyBoaXRDaGVjayB9O1xuXG4vLyBjYXJyaWVyLCBiYXR0bGVzaGlwLCBkZXN0cm95ZXIsIHN1Ym1hcmluZSwgcGF0cm9sXG4iLCJpbXBvcnQgeyBhcnJFcXVhbENoZWNrIH0gZnJvbSBcIi4vYXJyRXF1YWxDaGVja1wiO1xuXG5jb25zdCBwcmV2R3Vlc3NDaGVjayA9IChnYW1lYm9hcmQsIGNvb3JkcykgPT4ge1xuICBjb25zdCBvdXRwdXQgPSBbXTtcblxuICBvdXRwdXQucHVzaChcbiAgICBnYW1lYm9hcmQubWlzc2VzLm1hcCgoY29vcmQpID0+IGFyckVxdWFsQ2hlY2soY29vcmQsIGNvb3JkcykpLmluY2x1ZGVzKHRydWUpXG4gICk7XG5cbiAgcmV0dXJuIG91dHB1dDtcbn07XG5cbmV4cG9ydCB7IHByZXZHdWVzc0NoZWNrIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9TaGlwXCI7XG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcblxuY29uc3QgbmV3U2hpcCA9IFNoaXAoW1xuICBbMCwgMF0sXG4gIFswLCAxXSxcbiAgWzAsIDJdXG5dKTtcblxuY29uc29sZS5sb2cobmV3U2hpcC5oaXQoMCkuaGl0KDEpLmlzU3VuaygpLnN1bmspO1xuXG5jb25zb2xlLmxvZyhuZXdTaGlwKTtcblxuLy8gY29uc29sZS5sb2cobmV3U2hpcCk7XG5cbi8vIGNhcnJpZXJcbmNvbnN0IGNvb3JkczAgPSBbXG4gIFsyLCAyXSxcbiAgWzIsIDNdLFxuICBbMiwgNF0sXG4gIFsyLCA1XSxcbiAgWzIsIDZdXG5dO1xuLy8gYmF0dGxlc2hpcFxuY29uc3QgY29vcmRzMSA9IFtcbiAgWzEsIDFdLFxuICBbMSwgMl0sXG4gIFsxLCAzXSxcbiAgWzEsIDRdXG5dO1xuLy8gZGVzdHJveWVyXG5jb25zdCBjb29yZHMyID0gW1xuICBbMCwgMV0sXG4gIFswLCAyXSxcbiAgWzAsIDNdXG5dO1xuLy8gc3VibWFyaW5lXG5jb25zdCBjb29yZHMzID0gW1xuICBbMywgM10sXG4gIFszLCA0XSxcbiAgWzMsIDVdXG5dO1xuLy8gcGF0cm9sXG5jb25zdCBjb29yZHM0ID0gW1xuICBbNCwgNF0sXG4gIFs0LCA1XVxuXTtcblxuY29uc3QgbmV3R2FtZWJvYXJkID0gR2FtZWJvYXJkKGNvb3JkczAsIGNvb3JkczEsIGNvb3JkczIsIGNvb3JkczMsIGNvb3JkczQpO1xuY29uc29sZS5sb2cobmV3R2FtZWJvYXJkKTtcblxubmV3R2FtZWJvYXJkLnJlY2lldmVBdHRhY2soWzEsIDRdKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==