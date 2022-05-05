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
/* harmony import */ var _arrEqualCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrEqualCheck */ "./src/arrEqualCheck.js");



const Gameboard = function (coords0, coords1, coords2, coords3, coords4) {
  const carrier = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(coords0);
  const battleship = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(coords1);
  const destroyer = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(coords2);
  const submarine = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(coords3);
  const patrol = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(coords4);

  const misses = [
    [0, 1],
    [0, 2],
    [0, 3],
    [2, 2]
  ];

  const hits = [];

  const recieveAttack = function (coords) {
    if ((0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_1__.missCheck)(this, coords).includes(true)) return;
    console.log("Checking");
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
/* harmony export */   "arrEqualCheck": () => (/* binding */ arrEqualCheck),
/* harmony export */   "missCheck": () => (/* binding */ missCheck)
/* harmony export */ });
const arrEqualCheck = function (arr1, arr2) {
  return arr1.every((val, index) => val === arr2[index]);
};

const missCheck = (gameboard, coords) => {
  const output = [];

  output.push(
    gameboard.misses.map((coord) => arrEqualCheck(coord, coords)).includes(true)
  );

  output.push(
    gameboard.carrier.location
      .map((coord) => arrEqualCheck(coord[0], coords))
      .includes(true)
  );

  output.push(
    gameboard.battleship.location
      .map((coord) => arrEqualCheck(coord[0], coords))
      .includes(true)
  );

  output.push(
    gameboard.destroyer.location
      .map((coord) => arrEqualCheck(coord[0], coords))
      .includes(true)
  );

  output.push(
    gameboard.submarine.location
      .map((coord) => arrEqualCheck(coord[0], coords))
      .includes(true)
  );

  output.push(
    gameboard.patrol.location
      .map((coord) => arrEqualCheck(coord[0], coords))
      .includes(true)
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

const coords2 = [
  [0, 1],
  [0, 2],
  [0, 3]
];
const coords1 = [
  [1, 1],
  [1, 2],
  [1, 3],
  [1, 4]
];
const coords0 = [
  [2, 2],
  [2, 3],
  [2, 4],
  [2, 5],
  [2, 6]
];
const coords3 = [
  [3, 3],
  [3, 4],
  [3, 5]
];
const coords4 = [
  [4, 4],
  [4, 5]
];

const newGameboard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard)(coords0, coords1, coords2, coords3, coords4);
console.log(newGameboard);

newGameboard.recieveAttack([1, 5]);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQThCO0FBQzZCOztBQUUzRDtBQUNBLGtCQUFrQiwyQ0FBSTtBQUN0QixxQkFBcUIsMkNBQUk7QUFDekIsb0JBQW9CLDJDQUFJO0FBQ3hCLG9CQUFvQiwyQ0FBSTtBQUN4QixpQkFBaUIsMkNBQUk7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFFBQVEseURBQVM7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7O0FBRWdCOzs7Ozs7Ozs7Ozs7Ozs7O0FDbEJoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRW9DOzs7Ozs7O1VDNUNwQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ044QjtBQUNVOztBQUV4QyxnQkFBZ0IsMkNBQUk7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixxREFBUztBQUM5Qjs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FyckVxdWFsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL1NoaXBcIjtcbmltcG9ydCB7IGFyckVxdWFsQ2hlY2ssIG1pc3NDaGVjayB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gZnVuY3Rpb24gKGNvb3JkczAsIGNvb3JkczEsIGNvb3JkczIsIGNvb3JkczMsIGNvb3JkczQpIHtcbiAgY29uc3QgY2FycmllciA9IFNoaXAoY29vcmRzMCk7XG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKGNvb3JkczEpO1xuICBjb25zdCBkZXN0cm95ZXIgPSBTaGlwKGNvb3JkczIpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBTaGlwKGNvb3JkczMpO1xuICBjb25zdCBwYXRyb2wgPSBTaGlwKGNvb3JkczQpO1xuXG4gIGNvbnN0IG1pc3NlcyA9IFtcbiAgICBbMCwgMV0sXG4gICAgWzAsIDJdLFxuICAgIFswLCAzXSxcbiAgICBbMiwgMl1cbiAgXTtcblxuICBjb25zdCBoaXRzID0gW107XG5cbiAgY29uc3QgcmVjaWV2ZUF0dGFjayA9IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICBpZiAobWlzc0NoZWNrKHRoaXMsIGNvb3JkcykuaW5jbHVkZXModHJ1ZSkpIHJldHVybjtcbiAgICBjb25zb2xlLmxvZyhcIkNoZWNraW5nXCIpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgY2FycmllcixcbiAgICBiYXR0bGVzaGlwLFxuICAgIGRlc3Ryb3llcixcbiAgICBzdWJtYXJpbmUsXG4gICAgcGF0cm9sLFxuICAgIG1pc3NlcyxcbiAgICByZWNpZXZlQXR0YWNrLFxuICAgIGhpdHNcbiAgfTtcbn07XG5cbmV4cG9ydCB7IEdhbWVib2FyZCB9O1xuXG4vLyBCT0FUUzpcbi8vXG4vLyBDYXJyaWVyICAgICA6IEMgLS0gNVxuLy8gQmF0dGxlc2hpcCAgOiBCIC0tIDRcbi8vIERlc3Ryb3llciAgIDogRCAtLSAzXG4vLyBTdWJtYXJpbmUgICA6IFMgLS0gM1xuLy8gUGF0cm9sICAgICAgOiBQIC0tIDJcbi8vXG4vLyBCb2F0IGhpdCAgICA6IGxvd2VyY2FzZSAoaS5lLiBEID0+IGQpXG5cbi8vIFBMQVk6XG4vL1xuLy8gSGl0ICAgOiAxXG4vLyBNaXNzICA6IDBcblxuLyogXG5jb25zdCBib2FyZCA9IFtcbiAgICBbWzAsMF0sIFswLDFdLCBbMCwyXSwgWzAsM10sIFswLDRdLCBbMCw1XSwgWzAsNl0sIFswLDddLCBbMCw4XSwgWzAsOV1dLFxuICAgIFtbMSwwXSwgWzEsMV0sIFsxLDJdLCBbMSwzXSwgWzEsNF0sIFsxLDVdLCBbMSw2XSwgWzEsN10sIFsxLDhdLCBbMSw5XV0sXG4gICAgW1syLDBdLCBbMiwxXSwgWzIsMl0sIFsyLDNdLCBbMiw0XSwgWzIsNV0sIFsyLDZdLCBbMiw3XSwgWzIsOF0sIFsyLDldXSxcbiAgICBbWzMsMF0sIFszLDFdLCBbMywyXSwgWzMsM10sIFszLDRdLCBbMyw1XSwgWzMsNl0sIFszLDddLCBbMyw4XSwgWzMsOV1dLFxuICAgIFtbNCwwXSwgWzQsMV0sIFs0LDJdLCBbNCwzXSwgWzQsNF0sIFs0LDVdLCBbNCw2XSwgWzQsN10sIFs0LDhdLCBbNCw5XV0sXG4gICAgW1s1LDBdLCBbNSwxXSwgWzUsMl0sIFs1LDNdLCBbNSw0XSwgWzUsNV0sIFs1LDZdLCBbNSw3XSwgWzUsOF0sIFs1LDldXSxcbiAgICBbWzYsMF0sIFs2LDFdLCBbNiwyXSwgWzYsM10sIFs2LDRdLCBbNiw1XSwgWzYsNl0sIFs2LDddLCBbNiw4XSwgWzYsOV1dLFxuICAgIFtbNywwXSwgWzcsMV0sIFs3LDJdLCBbNywzXSwgWzcsNF0sIFs3LDVdLCBbNyw2XSwgWzcsN10sIFs3LDhdLCBbNyw5XV0sXG4gICAgW1s4LDBdLCBbOCwxXSwgWzgsMl0sIFs4LDNdLCBbOCw0XSwgWzgsNV0sIFs4LDZdLCBbOCw3XSwgWzgsOF0sIFs4LDldXSxcbiAgICBbWzksMF0sIFs5LDFdLCBbOSwyXSwgWzksM10sIFs5LDRdLCBbOSw1XSwgWzksNl0sIFs5LDddLCBbOSw4XSwgWzksOV1dXG4gIF07XG4qL1xuIiwiY29uc3QgU2hpcCA9IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgLy8gQ3JlYXRlIHNoaXAgY29vcmRpbmF0ZSBhcnJheSA9IFtbW2Nvb3Jkc10sIGhpdF0sIFtbY29vcmRzXSwgaGl0XSwgW1tjb29yZHNdLCBoaXRdXVxuICBjb25zdCBsb2NhdGlvbiA9IGNvb3Jkcy5tYXAoKGNvb3JkKSA9PiBbY29vcmQsIGZhbHNlXSk7XG4gIGxldCBzdW5rID0gZmFsc2U7XG5cbiAgY29uc3QgaGl0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgdGhpcy5sb2NhdGlvbltpbmRleF1bMV0gPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5sb2NhdGlvbi5ldmVyeSgoY29vcmQpID0+IGNvb3JkWzFdID09PSB0cnVlKSkgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4geyBsb2NhdGlvbiwgc3VuaywgaGl0LCBpc1N1bmsgfTtcbn07XG5cbmV4cG9ydCB7IFNoaXAgfTtcbiIsImNvbnN0IGFyckVxdWFsQ2hlY2sgPSBmdW5jdGlvbiAoYXJyMSwgYXJyMikge1xuICByZXR1cm4gYXJyMS5ldmVyeSgodmFsLCBpbmRleCkgPT4gdmFsID09PSBhcnIyW2luZGV4XSk7XG59O1xuXG5jb25zdCBtaXNzQ2hlY2sgPSAoZ2FtZWJvYXJkLCBjb29yZHMpID0+IHtcbiAgY29uc3Qgb3V0cHV0ID0gW107XG5cbiAgb3V0cHV0LnB1c2goXG4gICAgZ2FtZWJvYXJkLm1pc3Nlcy5tYXAoKGNvb3JkKSA9PiBhcnJFcXVhbENoZWNrKGNvb3JkLCBjb29yZHMpKS5pbmNsdWRlcyh0cnVlKVxuICApO1xuXG4gIG91dHB1dC5wdXNoKFxuICAgIGdhbWVib2FyZC5jYXJyaWVyLmxvY2F0aW9uXG4gICAgICAubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZFswXSwgY29vcmRzKSlcbiAgICAgIC5pbmNsdWRlcyh0cnVlKVxuICApO1xuXG4gIG91dHB1dC5wdXNoKFxuICAgIGdhbWVib2FyZC5iYXR0bGVzaGlwLmxvY2F0aW9uXG4gICAgICAubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZFswXSwgY29vcmRzKSlcbiAgICAgIC5pbmNsdWRlcyh0cnVlKVxuICApO1xuXG4gIG91dHB1dC5wdXNoKFxuICAgIGdhbWVib2FyZC5kZXN0cm95ZXIubG9jYXRpb25cbiAgICAgIC5tYXAoKGNvb3JkKSA9PiBhcnJFcXVhbENoZWNrKGNvb3JkWzBdLCBjb29yZHMpKVxuICAgICAgLmluY2x1ZGVzKHRydWUpXG4gICk7XG5cbiAgb3V0cHV0LnB1c2goXG4gICAgZ2FtZWJvYXJkLnN1Ym1hcmluZS5sb2NhdGlvblxuICAgICAgLm1hcCgoY29vcmQpID0+IGFyckVxdWFsQ2hlY2soY29vcmRbMF0sIGNvb3JkcykpXG4gICAgICAuaW5jbHVkZXModHJ1ZSlcbiAgKTtcblxuICBvdXRwdXQucHVzaChcbiAgICBnYW1lYm9hcmQucGF0cm9sLmxvY2F0aW9uXG4gICAgICAubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZFswXSwgY29vcmRzKSlcbiAgICAgIC5pbmNsdWRlcyh0cnVlKVxuICApO1xuXG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgeyBhcnJFcXVhbENoZWNrLCBtaXNzQ2hlY2sgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL1NoaXBcIjtcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuXG5jb25zdCBuZXdTaGlwID0gU2hpcChbXG4gIFswLCAwXSxcbiAgWzAsIDFdLFxuICBbMCwgMl1cbl0pO1xuXG5jb25zb2xlLmxvZyhuZXdTaGlwLmhpdCgwKS5oaXQoMSkuaXNTdW5rKCkuc3Vuayk7XG5cbmNvbnNvbGUubG9nKG5ld1NoaXApO1xuXG4vLyBjb25zb2xlLmxvZyhuZXdTaGlwKTtcblxuY29uc3QgY29vcmRzMiA9IFtcbiAgWzAsIDFdLFxuICBbMCwgMl0sXG4gIFswLCAzXVxuXTtcbmNvbnN0IGNvb3JkczEgPSBbXG4gIFsxLCAxXSxcbiAgWzEsIDJdLFxuICBbMSwgM10sXG4gIFsxLCA0XVxuXTtcbmNvbnN0IGNvb3JkczAgPSBbXG4gIFsyLCAyXSxcbiAgWzIsIDNdLFxuICBbMiwgNF0sXG4gIFsyLCA1XSxcbiAgWzIsIDZdXG5dO1xuY29uc3QgY29vcmRzMyA9IFtcbiAgWzMsIDNdLFxuICBbMywgNF0sXG4gIFszLCA1XVxuXTtcbmNvbnN0IGNvb3JkczQgPSBbXG4gIFs0LCA0XSxcbiAgWzQsIDVdXG5dO1xuXG5jb25zdCBuZXdHYW1lYm9hcmQgPSBHYW1lYm9hcmQoY29vcmRzMCwgY29vcmRzMSwgY29vcmRzMiwgY29vcmRzMywgY29vcmRzNCk7XG5jb25zb2xlLmxvZyhuZXdHYW1lYm9hcmQpO1xuXG5uZXdHYW1lYm9hcmQucmVjaWV2ZUF0dGFjayhbMSwgNV0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9