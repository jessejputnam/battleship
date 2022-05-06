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
/* harmony import */ var _applyHitDamage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./applyHitDamage */ "./src/applyHitDamage.js");





const Gameboard = function (coords0, coords1, coords2, coords3, coords4) {
  let defeat = false;

  // Ships
  const ships = {
    carrier: (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(coords0),
    battleship: (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(coords1),
    destroyer: (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(coords2),
    submarine: (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(coords3),
    patrol: (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(coords4)
  };

  // Enemy Guess Arrays
  const misses = [];
  const hits = [];

  const recieveAttack = function (coords) {
    // Check if already guessed
    if ((0,_prevGuessCheck__WEBPACK_IMPORTED_MODULE_1__.prevGuessCheck)(this, coords).includes(true)) return this;

    // Check if guess is a hit on a ship
    const hitCheckArr = (0,_hitCheck__WEBPACK_IMPORTED_MODULE_2__.hitCheck)(this, coords);

    // If none show hit, put into misses array
    if (hitCheckArr.every((x) => x === false)) {
      misses.push(coords);
      return this;
    }

    // If guess shows hit
    if (hitCheckArr.some((x) => x === true)) {
      hits.push(coords);
      return (0,_applyHitDamage__WEBPACK_IMPORTED_MODULE_3__.applyHitDamage)(this, hitCheckArr, coords);
    }
  };

  const checkForDefeat = function () {
    // Create array of all sunk checks
    const sunkArr = [];

    // Populate the array with sunk checks
    for (let ship in this.ships) {
      sunkArr.push(ships[ship].sunk);
    }

    // Evaluate the array for all sunk checks === true
    if (sunkArr.every((el) => el === true)) {
      this.defeat = true;
      return this;
    }
    return this;
  };

  return {
    // carrier,
    // battleship,
    // destroyer,
    // submarine,
    // patrol,
    ships,
    misses,
    recieveAttack,
    hits,
    checkForDefeat
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

/***/ "./src/applyHitDamage.js":
/*!*******************************!*\
  !*** ./src/applyHitDamage.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyHitDamage": () => (/* binding */ applyHitDamage)
/* harmony export */ });
/* harmony import */ var _arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrEqualCheck */ "./src/arrEqualCheck.js");


const getHitShipIndex = function (ship, coords) {
  console.log(ship.location.findIndex((el) => (0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__.arrEqualCheck)(el[0], coords)));
  return ship.location.findIndex((el) => (0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__.arrEqualCheck)(el[0], coords));
};

const applyHitDamage = function (gameboard, hitCheckArr, coords) {
  const ships = ["carrier", "battleship", "destroyer", "submarine", "patrol"];

  // Identify which ship was hit
  const hitShip = ships[hitCheckArr.indexOf(true)];

  // Identify index where ship was hit
  const hitShipIndex = getHitShipIndex(gameboard.ships[hitShip], coords);

  // Apply damage with method
  gameboard.ships[hitShip].hit(hitShipIndex);

  // Check if ship is sunk
  gameboard.ships[hitShip].isSunk();

  return gameboard;
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
    gameboard.ships.carrier.location
      .map((coord) => (0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__.arrEqualCheck)(coord[0], coords))
      .includes(true)
  );

  output.push(
    gameboard.ships.battleship.location
      .map((coord) => (0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__.arrEqualCheck)(coord[0], coords))
      .includes(true)
  );

  output.push(
    gameboard.ships.destroyer.location
      .map((coord) => (0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__.arrEqualCheck)(coord[0], coords))
      .includes(true)
  );

  output.push(
    gameboard.ships.submarine.location
      .map((coord) => (0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__.arrEqualCheck)(coord[0], coords))
      .includes(true)
  );

  output.push(
    gameboard.ships.patrol.location
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

  output.push(
    gameboard.hits.map((coord) => (0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__.arrEqualCheck)(coord, coords)).includes(true)
  );

  return output;
};



// carrier, battleship, destroyer, submarine, patrol


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
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");


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

const testCoords = [coords0, coords1, coords2, coords3, coords4];

const newGameboard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)(...testCoords);
console.log(newGameboard);

// hit carrier
newGameboard.recieveAttack([2, 6]);
newGameboard.recieveAttack([0, 0]);
newGameboard.recieveAttack([1, 5]);
// hit patrol 1
newGameboard.recieveAttack([4, 4]);
// hit patrol 2
newGameboard.recieveAttack([4, 5]);
newGameboard.recieveAttack([2, 1]);
newGameboard.recieveAttack([0, 0]);
// hit battlehship
newGameboard.recieveAttack([1, 1]);
console.table(newGameboard.ships.carrier.location);
console.table(newGameboard.ships.battleship.location);
console.table(newGameboard.ships.destroyer.location);
console.table(newGameboard.ships.submarine.location);
console.table(newGameboard.ships.patrol.location);

newGameboard.checkForDefeat();

newGameboard.checkForDefeat();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBOEI7QUFDb0I7QUFDWjtBQUNZOztBQUVsRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLDJDQUFJO0FBQ2pCLGdCQUFnQiwyQ0FBSTtBQUNwQixlQUFlLDJDQUFJO0FBQ25CLGVBQWUsMkNBQUk7QUFDbkIsWUFBWSwyQ0FBSTtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEsK0RBQWM7O0FBRXRCO0FBQ0Esd0JBQXdCLG1EQUFROztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsK0RBQWM7QUFDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7O0FBRWdCOzs7Ozs7Ozs7Ozs7Ozs7O0FDbEJnQzs7QUFFaEQ7QUFDQSw4Q0FBOEMsNkRBQWE7QUFDM0QseUNBQXlDLDZEQUFhO0FBQ3REOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUUwQjs7Ozs7Ozs7Ozs7Ozs7O0FDekIxQjtBQUNBO0FBQ0E7O0FBRXlCOzs7Ozs7Ozs7Ozs7Ozs7O0FDSnVCOztBQUVoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IsNkRBQWE7QUFDbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLDZEQUFhO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQiw2REFBYTtBQUNuQztBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IsNkRBQWE7QUFDbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLDZEQUFhO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTs7QUFFb0I7O0FBRXBCOzs7Ozs7Ozs7Ozs7Ozs7O0FDeENnRDs7QUFFaEQ7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyw2REFBYTtBQUNqRDs7QUFFQTtBQUNBLGtDQUFrQyw2REFBYTtBQUMvQzs7QUFFQTtBQUNBOztBQUUwQjs7QUFFMUI7Ozs7Ozs7VUNsQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ053Qzs7QUFFeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxxQkFBcUIscURBQVM7QUFDOUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcGx5SGl0RGFtYWdlLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXJyRXF1YWxDaGVjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2hpdENoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcHJldkd1ZXNzQ2hlY2suanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL1NoaXBcIjtcbmltcG9ydCB7IHByZXZHdWVzc0NoZWNrIH0gZnJvbSBcIi4vcHJldkd1ZXNzQ2hlY2tcIjtcbmltcG9ydCB7IGhpdENoZWNrIH0gZnJvbSBcIi4vaGl0Q2hlY2tcIjtcbmltcG9ydCB7IGFwcGx5SGl0RGFtYWdlIH0gZnJvbSBcIi4vYXBwbHlIaXREYW1hZ2VcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gZnVuY3Rpb24gKGNvb3JkczAsIGNvb3JkczEsIGNvb3JkczIsIGNvb3JkczMsIGNvb3JkczQpIHtcbiAgbGV0IGRlZmVhdCA9IGZhbHNlO1xuXG4gIC8vIFNoaXBzXG4gIGNvbnN0IHNoaXBzID0ge1xuICAgIGNhcnJpZXI6IFNoaXAoY29vcmRzMCksXG4gICAgYmF0dGxlc2hpcDogU2hpcChjb29yZHMxKSxcbiAgICBkZXN0cm95ZXI6IFNoaXAoY29vcmRzMiksXG4gICAgc3VibWFyaW5lOiBTaGlwKGNvb3JkczMpLFxuICAgIHBhdHJvbDogU2hpcChjb29yZHM0KVxuICB9O1xuXG4gIC8vIEVuZW15IEd1ZXNzIEFycmF5c1xuICBjb25zdCBtaXNzZXMgPSBbXTtcbiAgY29uc3QgaGl0cyA9IFtdO1xuXG4gIGNvbnN0IHJlY2lldmVBdHRhY2sgPSBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBndWVzc2VkXG4gICAgaWYgKHByZXZHdWVzc0NoZWNrKHRoaXMsIGNvb3JkcykuaW5jbHVkZXModHJ1ZSkpIHJldHVybiB0aGlzO1xuXG4gICAgLy8gQ2hlY2sgaWYgZ3Vlc3MgaXMgYSBoaXQgb24gYSBzaGlwXG4gICAgY29uc3QgaGl0Q2hlY2tBcnIgPSBoaXRDaGVjayh0aGlzLCBjb29yZHMpO1xuXG4gICAgLy8gSWYgbm9uZSBzaG93IGhpdCwgcHV0IGludG8gbWlzc2VzIGFycmF5XG4gICAgaWYgKGhpdENoZWNrQXJyLmV2ZXJ5KCh4KSA9PiB4ID09PSBmYWxzZSkpIHtcbiAgICAgIG1pc3Nlcy5wdXNoKGNvb3Jkcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBJZiBndWVzcyBzaG93cyBoaXRcbiAgICBpZiAoaGl0Q2hlY2tBcnIuc29tZSgoeCkgPT4geCA9PT0gdHJ1ZSkpIHtcbiAgICAgIGhpdHMucHVzaChjb29yZHMpO1xuICAgICAgcmV0dXJuIGFwcGx5SGl0RGFtYWdlKHRoaXMsIGhpdENoZWNrQXJyLCBjb29yZHMpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGVja0ZvckRlZmVhdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBDcmVhdGUgYXJyYXkgb2YgYWxsIHN1bmsgY2hlY2tzXG4gICAgY29uc3Qgc3Vua0FyciA9IFtdO1xuXG4gICAgLy8gUG9wdWxhdGUgdGhlIGFycmF5IHdpdGggc3VuayBjaGVja3NcbiAgICBmb3IgKGxldCBzaGlwIGluIHRoaXMuc2hpcHMpIHtcbiAgICAgIHN1bmtBcnIucHVzaChzaGlwc1tzaGlwXS5zdW5rKTtcbiAgICB9XG5cbiAgICAvLyBFdmFsdWF0ZSB0aGUgYXJyYXkgZm9yIGFsbCBzdW5rIGNoZWNrcyA9PT0gdHJ1ZVxuICAgIGlmIChzdW5rQXJyLmV2ZXJ5KChlbCkgPT4gZWwgPT09IHRydWUpKSB7XG4gICAgICB0aGlzLmRlZmVhdCA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICAvLyBjYXJyaWVyLFxuICAgIC8vIGJhdHRsZXNoaXAsXG4gICAgLy8gZGVzdHJveWVyLFxuICAgIC8vIHN1Ym1hcmluZSxcbiAgICAvLyBwYXRyb2wsXG4gICAgc2hpcHMsXG4gICAgbWlzc2VzLFxuICAgIHJlY2lldmVBdHRhY2ssXG4gICAgaGl0cyxcbiAgICBjaGVja0ZvckRlZmVhdFxuICB9O1xufTtcblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG5cbi8vIEJPQVRTOlxuLy9cbi8vIENhcnJpZXIgICAgIDogQyAtLSA1XG4vLyBCYXR0bGVzaGlwICA6IEIgLS0gNFxuLy8gRGVzdHJveWVyICAgOiBEIC0tIDNcbi8vIFN1Ym1hcmluZSAgIDogUyAtLSAzXG4vLyBQYXRyb2wgICAgICA6IFAgLS0gMlxuLy9cbi8vIEJvYXQgaGl0ICAgIDogbG93ZXJjYXNlIChpLmUuIEQgPT4gZClcblxuLy8gUExBWTpcbi8vXG4vLyBIaXQgICA6IDFcbi8vIE1pc3MgIDogMFxuIiwiY29uc3QgU2hpcCA9IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgLy8gQ3JlYXRlIHNoaXAgY29vcmRpbmF0ZSBhcnJheSA9IFtbW2Nvb3Jkc10sIGhpdF0sIFtbY29vcmRzXSwgaGl0XSwgW1tjb29yZHNdLCBoaXRdXVxuICBjb25zdCBsb2NhdGlvbiA9IGNvb3Jkcy5tYXAoKGNvb3JkKSA9PiBbY29vcmQsIGZhbHNlXSk7XG4gIGxldCBzdW5rID0gZmFsc2U7XG5cbiAgY29uc3QgaGl0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgdGhpcy5sb2NhdGlvbltpbmRleF1bMV0gPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5sb2NhdGlvbi5ldmVyeSgoY29vcmQpID0+IGNvb3JkWzFdID09PSB0cnVlKSkgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4geyBsb2NhdGlvbiwgc3VuaywgaGl0LCBpc1N1bmsgfTtcbn07XG5cbmV4cG9ydCB7IFNoaXAgfTtcbiIsImltcG9ydCB7IGFyckVxdWFsQ2hlY2sgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5cbmNvbnN0IGdldEhpdFNoaXBJbmRleCA9IGZ1bmN0aW9uIChzaGlwLCBjb29yZHMpIHtcbiAgY29uc29sZS5sb2coc2hpcC5sb2NhdGlvbi5maW5kSW5kZXgoKGVsKSA9PiBhcnJFcXVhbENoZWNrKGVsWzBdLCBjb29yZHMpKSk7XG4gIHJldHVybiBzaGlwLmxvY2F0aW9uLmZpbmRJbmRleCgoZWwpID0+IGFyckVxdWFsQ2hlY2soZWxbMF0sIGNvb3JkcykpO1xufTtcblxuY29uc3QgYXBwbHlIaXREYW1hZ2UgPSBmdW5jdGlvbiAoZ2FtZWJvYXJkLCBoaXRDaGVja0FyciwgY29vcmRzKSB7XG4gIGNvbnN0IHNoaXBzID0gW1wiY2FycmllclwiLCBcImJhdHRsZXNoaXBcIiwgXCJkZXN0cm95ZXJcIiwgXCJzdWJtYXJpbmVcIiwgXCJwYXRyb2xcIl07XG5cbiAgLy8gSWRlbnRpZnkgd2hpY2ggc2hpcCB3YXMgaGl0XG4gIGNvbnN0IGhpdFNoaXAgPSBzaGlwc1toaXRDaGVja0Fyci5pbmRleE9mKHRydWUpXTtcblxuICAvLyBJZGVudGlmeSBpbmRleCB3aGVyZSBzaGlwIHdhcyBoaXRcbiAgY29uc3QgaGl0U2hpcEluZGV4ID0gZ2V0SGl0U2hpcEluZGV4KGdhbWVib2FyZC5zaGlwc1toaXRTaGlwXSwgY29vcmRzKTtcblxuICAvLyBBcHBseSBkYW1hZ2Ugd2l0aCBtZXRob2RcbiAgZ2FtZWJvYXJkLnNoaXBzW2hpdFNoaXBdLmhpdChoaXRTaGlwSW5kZXgpO1xuXG4gIC8vIENoZWNrIGlmIHNoaXAgaXMgc3Vua1xuICBnYW1lYm9hcmQuc2hpcHNbaGl0U2hpcF0uaXNTdW5rKCk7XG5cbiAgcmV0dXJuIGdhbWVib2FyZDtcbn07XG5cbmV4cG9ydCB7IGFwcGx5SGl0RGFtYWdlIH07XG4iLCJjb25zdCBhcnJFcXVhbENoZWNrID0gZnVuY3Rpb24gKGFycjEsIGFycjIpIHtcbiAgcmV0dXJuIGFycjEuZXZlcnkoKHZhbCwgaW5kZXgpID0+IHZhbCA9PT0gYXJyMltpbmRleF0pO1xufTtcblxuZXhwb3J0IHsgYXJyRXF1YWxDaGVjayB9O1xuIiwiaW1wb3J0IHsgYXJyRXF1YWxDaGVjayB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcblxuY29uc3QgaGl0Q2hlY2sgPSBmdW5jdGlvbiAoZ2FtZWJvYXJkLCBjb29yZHMpIHtcbiAgY29uc3Qgb3V0cHV0ID0gW107XG5cbiAgb3V0cHV0LnB1c2goXG4gICAgZ2FtZWJvYXJkLnNoaXBzLmNhcnJpZXIubG9jYXRpb25cbiAgICAgIC5tYXAoKGNvb3JkKSA9PiBhcnJFcXVhbENoZWNrKGNvb3JkWzBdLCBjb29yZHMpKVxuICAgICAgLmluY2x1ZGVzKHRydWUpXG4gICk7XG5cbiAgb3V0cHV0LnB1c2goXG4gICAgZ2FtZWJvYXJkLnNoaXBzLmJhdHRsZXNoaXAubG9jYXRpb25cbiAgICAgIC5tYXAoKGNvb3JkKSA9PiBhcnJFcXVhbENoZWNrKGNvb3JkWzBdLCBjb29yZHMpKVxuICAgICAgLmluY2x1ZGVzKHRydWUpXG4gICk7XG5cbiAgb3V0cHV0LnB1c2goXG4gICAgZ2FtZWJvYXJkLnNoaXBzLmRlc3Ryb3llci5sb2NhdGlvblxuICAgICAgLm1hcCgoY29vcmQpID0+IGFyckVxdWFsQ2hlY2soY29vcmRbMF0sIGNvb3JkcykpXG4gICAgICAuaW5jbHVkZXModHJ1ZSlcbiAgKTtcblxuICBvdXRwdXQucHVzaChcbiAgICBnYW1lYm9hcmQuc2hpcHMuc3VibWFyaW5lLmxvY2F0aW9uXG4gICAgICAubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZFswXSwgY29vcmRzKSlcbiAgICAgIC5pbmNsdWRlcyh0cnVlKVxuICApO1xuXG4gIG91dHB1dC5wdXNoKFxuICAgIGdhbWVib2FyZC5zaGlwcy5wYXRyb2wubG9jYXRpb25cbiAgICAgIC5tYXAoKGNvb3JkKSA9PiBhcnJFcXVhbENoZWNrKGNvb3JkWzBdLCBjb29yZHMpKVxuICAgICAgLmluY2x1ZGVzKHRydWUpXG4gICk7XG5cbiAgcmV0dXJuIG91dHB1dDtcbn07XG5cbmV4cG9ydCB7IGhpdENoZWNrIH07XG5cbi8vIGNhcnJpZXIsIGJhdHRsZXNoaXAsIGRlc3Ryb3llciwgc3VibWFyaW5lLCBwYXRyb2xcbiIsImltcG9ydCB7IGFyckVxdWFsQ2hlY2sgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5cbmNvbnN0IHByZXZHdWVzc0NoZWNrID0gKGdhbWVib2FyZCwgY29vcmRzKSA9PiB7XG4gIGNvbnN0IG91dHB1dCA9IFtdO1xuXG4gIG91dHB1dC5wdXNoKFxuICAgIGdhbWVib2FyZC5taXNzZXMubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZCwgY29vcmRzKSkuaW5jbHVkZXModHJ1ZSlcbiAgKTtcblxuICBvdXRwdXQucHVzaChcbiAgICBnYW1lYm9hcmQuaGl0cy5tYXAoKGNvb3JkKSA9PiBhcnJFcXVhbENoZWNrKGNvb3JkLCBjb29yZHMpKS5pbmNsdWRlcyh0cnVlKVxuICApO1xuXG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgeyBwcmV2R3Vlc3NDaGVjayB9O1xuXG4vLyBjYXJyaWVyLCBiYXR0bGVzaGlwLCBkZXN0cm95ZXIsIHN1Ym1hcmluZSwgcGF0cm9sXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuXG4vLyBjYXJyaWVyXG5jb25zdCBjb29yZHMwID0gW1xuICBbMiwgMl0sXG4gIFsyLCAzXSxcbiAgWzIsIDRdLFxuICBbMiwgNV0sXG4gIFsyLCA2XVxuXTtcbi8vIGJhdHRsZXNoaXBcbmNvbnN0IGNvb3JkczEgPSBbXG4gIFsxLCAxXSxcbiAgWzEsIDJdLFxuICBbMSwgM10sXG4gIFsxLCA0XVxuXTtcbi8vIGRlc3Ryb3llclxuY29uc3QgY29vcmRzMiA9IFtcbiAgWzAsIDFdLFxuICBbMCwgMl0sXG4gIFswLCAzXVxuXTtcbi8vIHN1Ym1hcmluZVxuY29uc3QgY29vcmRzMyA9IFtcbiAgWzMsIDNdLFxuICBbMywgNF0sXG4gIFszLCA1XVxuXTtcbi8vIHBhdHJvbFxuY29uc3QgY29vcmRzNCA9IFtcbiAgWzQsIDRdLFxuICBbNCwgNV1cbl07XG5cbmNvbnN0IHRlc3RDb29yZHMgPSBbY29vcmRzMCwgY29vcmRzMSwgY29vcmRzMiwgY29vcmRzMywgY29vcmRzNF07XG5cbmNvbnN0IG5ld0dhbWVib2FyZCA9IEdhbWVib2FyZCguLi50ZXN0Q29vcmRzKTtcbmNvbnNvbGUubG9nKG5ld0dhbWVib2FyZCk7XG5cbi8vIGhpdCBjYXJyaWVyXG5uZXdHYW1lYm9hcmQucmVjaWV2ZUF0dGFjayhbMiwgNl0pO1xubmV3R2FtZWJvYXJkLnJlY2lldmVBdHRhY2soWzAsIDBdKTtcbm5ld0dhbWVib2FyZC5yZWNpZXZlQXR0YWNrKFsxLCA1XSk7XG4vLyBoaXQgcGF0cm9sIDFcbm5ld0dhbWVib2FyZC5yZWNpZXZlQXR0YWNrKFs0LCA0XSk7XG4vLyBoaXQgcGF0cm9sIDJcbm5ld0dhbWVib2FyZC5yZWNpZXZlQXR0YWNrKFs0LCA1XSk7XG5uZXdHYW1lYm9hcmQucmVjaWV2ZUF0dGFjayhbMiwgMV0pO1xubmV3R2FtZWJvYXJkLnJlY2lldmVBdHRhY2soWzAsIDBdKTtcbi8vIGhpdCBiYXR0bGVoc2hpcFxubmV3R2FtZWJvYXJkLnJlY2lldmVBdHRhY2soWzEsIDFdKTtcbmNvbnNvbGUudGFibGUobmV3R2FtZWJvYXJkLnNoaXBzLmNhcnJpZXIubG9jYXRpb24pO1xuY29uc29sZS50YWJsZShuZXdHYW1lYm9hcmQuc2hpcHMuYmF0dGxlc2hpcC5sb2NhdGlvbik7XG5jb25zb2xlLnRhYmxlKG5ld0dhbWVib2FyZC5zaGlwcy5kZXN0cm95ZXIubG9jYXRpb24pO1xuY29uc29sZS50YWJsZShuZXdHYW1lYm9hcmQuc2hpcHMuc3VibWFyaW5lLmxvY2F0aW9uKTtcbmNvbnNvbGUudGFibGUobmV3R2FtZWJvYXJkLnNoaXBzLnBhdHJvbC5sb2NhdGlvbik7XG5cbm5ld0dhbWVib2FyZC5jaGVja0ZvckRlZmVhdCgpO1xuXG5uZXdHYW1lYm9hcmQuY2hlY2tGb3JEZWZlYXQoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==