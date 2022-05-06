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
// Gameboard





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

  const receiveAttack = function (coords) {
    // Check if already guessed
    if ((0,_prevGuessCheck__WEBPACK_IMPORTED_MODULE_1__.prevGuessCheck)(this, coords).includes(true)) return false;

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
    defeat,
    ships,
    misses,
    receiveAttack,
    hits,
    checkForDefeat
  };
};




/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");


const Player = function (playerName, coords, gameOver) {
  const gameboard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)(...coords);
  const guesses = [];
  const attack = function (enemyGameboard, coords) {
    const turn = enemyGameboard.receiveAttack(coords);

    // Exit if already guessed
    if (turn === false) return;

    //! NEED TO STORE GAME OVER INFORMATION SOMWHERE (GAMEFLOW?)
    const defeatCheck = enemyGameboard.checkForDefeat();
    if (defeatCheck.defeat === true) {
      console.log(`Game over: ${this.name} wins`);
      return;
    }

    //! CHANGE ACTIVE PLAYER
  };

  return { playerName, guesses, attack, gameboard };
};




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
// Check if a guessed coordinate hits a ship


const hitCheck = function (gameboard, coords) {
  // Create array for ship hit check
  const output = [];

  // Loop over ships to check if coords is a hit for any
  for (let ship in gameboard.ships) {
    output.push(
      gameboard.ships[ship].location
        .map((coord) => (0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__.arrEqualCheck)(coord[0], coords))
        .includes(true)
    );
  }

  return output;
};




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
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ "./src/Player.js");



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

const coords5 = [
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0]
];
const coords6 = [
  [4, 1],
  [5, 1],
  [6, 1],
  [7, 1]
];
const coords7 = [
  [2, 2],
  [2, 3],
  [2, 4]
];
const coords8 = [
  [6, 1],
  [7, 1],
  [8, 1]
];
const coords9 = [
  [8, 6],
  [8, 7]
];

const testCoords = [coords0, coords1, coords2, coords3, coords4];
const testCoords2 = [coords5, coords6, coords7, coords8, coords9];

const player = (0,_Player__WEBPACK_IMPORTED_MODULE_1__.Player)("player", testCoords);
const computer = (0,_Player__WEBPACK_IMPORTED_MODULE_1__.Player)("computer", testCoords2);

console.log(player);
console.log(computer);

player.attack(computer.gameboard, [0, 0]);
computer.attack(player.gameboard, [5, 5]);
player.attack(computer.gameboard, [0, 0]);
player.attack(computer.gameboard, [0, 1]);
player.attack(computer.gameboard, [1, 0]);
player.attack(computer.gameboard, [2, 0]);
player.attack(computer.gameboard, [3, 0]);
player.attack(computer.gameboard, [4, 0]);

console.log(computer);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwbHlIaXREYW1hZ2UuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcnJFcXVhbENoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaGl0Q2hlY2suanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wcmV2R3Vlc3NDaGVjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBHYW1lYm9hcmRcbmltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9TaGlwXCI7XG5pbXBvcnQgeyBwcmV2R3Vlc3NDaGVjayB9IGZyb20gXCIuL3ByZXZHdWVzc0NoZWNrXCI7XG5pbXBvcnQgeyBoaXRDaGVjayB9IGZyb20gXCIuL2hpdENoZWNrXCI7XG5pbXBvcnQgeyBhcHBseUhpdERhbWFnZSB9IGZyb20gXCIuL2FwcGx5SGl0RGFtYWdlXCI7XG5cbmNvbnN0IEdhbWVib2FyZCA9IGZ1bmN0aW9uIChjb29yZHMwLCBjb29yZHMxLCBjb29yZHMyLCBjb29yZHMzLCBjb29yZHM0KSB7XG4gIGxldCBkZWZlYXQgPSBmYWxzZTtcblxuICAvLyBTaGlwc1xuICBjb25zdCBzaGlwcyA9IHtcbiAgICBjYXJyaWVyOiBTaGlwKGNvb3JkczApLFxuICAgIGJhdHRsZXNoaXA6IFNoaXAoY29vcmRzMSksXG4gICAgZGVzdHJveWVyOiBTaGlwKGNvb3JkczIpLFxuICAgIHN1Ym1hcmluZTogU2hpcChjb29yZHMzKSxcbiAgICBwYXRyb2w6IFNoaXAoY29vcmRzNClcbiAgfTtcblxuICAvLyBFbmVteSBHdWVzcyBBcnJheXNcbiAgY29uc3QgbWlzc2VzID0gW107XG4gIGNvbnN0IGhpdHMgPSBbXTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgIC8vIENoZWNrIGlmIGFscmVhZHkgZ3Vlc3NlZFxuICAgIGlmIChwcmV2R3Vlc3NDaGVjayh0aGlzLCBjb29yZHMpLmluY2x1ZGVzKHRydWUpKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBDaGVjayBpZiBndWVzcyBpcyBhIGhpdCBvbiBhIHNoaXBcbiAgICBjb25zdCBoaXRDaGVja0FyciA9IGhpdENoZWNrKHRoaXMsIGNvb3Jkcyk7XG5cbiAgICAvLyBJZiBub25lIHNob3cgaGl0LCBwdXQgaW50byBtaXNzZXMgYXJyYXlcbiAgICBpZiAoaGl0Q2hlY2tBcnIuZXZlcnkoKHgpID0+IHggPT09IGZhbHNlKSkge1xuICAgICAgbWlzc2VzLnB1c2goY29vcmRzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIElmIGd1ZXNzIHNob3dzIGhpdFxuICAgIGlmIChoaXRDaGVja0Fyci5zb21lKCh4KSA9PiB4ID09PSB0cnVlKSkge1xuICAgICAgaGl0cy5wdXNoKGNvb3Jkcyk7XG4gICAgICByZXR1cm4gYXBwbHlIaXREYW1hZ2UodGhpcywgaGl0Q2hlY2tBcnIsIGNvb3Jkcyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNoZWNrRm9yRGVmZWF0ID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIENyZWF0ZSBhcnJheSBvZiBhbGwgc3VuayBjaGVja3NcbiAgICBjb25zdCBzdW5rQXJyID0gW107XG5cbiAgICAvLyBQb3B1bGF0ZSB0aGUgYXJyYXkgd2l0aCBzdW5rIGNoZWNrc1xuICAgIGZvciAobGV0IHNoaXAgaW4gdGhpcy5zaGlwcykge1xuICAgICAgc3Vua0Fyci5wdXNoKHNoaXBzW3NoaXBdLnN1bmspO1xuICAgIH1cblxuICAgIC8vIEV2YWx1YXRlIHRoZSBhcnJheSBmb3IgYWxsIHN1bmsgY2hlY2tzID09PSB0cnVlXG4gICAgaWYgKHN1bmtBcnIuZXZlcnkoKGVsKSA9PiBlbCA9PT0gdHJ1ZSkpIHtcbiAgICAgIHRoaXMuZGVmZWF0ID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGRlZmVhdCxcbiAgICBzaGlwcyxcbiAgICBtaXNzZXMsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBoaXRzLFxuICAgIGNoZWNrRm9yRGVmZWF0XG4gIH07XG59O1xuXG5leHBvcnQgeyBHYW1lYm9hcmQgfTtcbiIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuXG5jb25zdCBQbGF5ZXIgPSBmdW5jdGlvbiAocGxheWVyTmFtZSwgY29vcmRzLCBnYW1lT3Zlcikge1xuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoLi4uY29vcmRzKTtcbiAgY29uc3QgZ3Vlc3NlcyA9IFtdO1xuICBjb25zdCBhdHRhY2sgPSBmdW5jdGlvbiAoZW5lbXlHYW1lYm9hcmQsIGNvb3Jkcykge1xuICAgIGNvbnN0IHR1cm4gPSBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3Jkcyk7XG5cbiAgICAvLyBFeGl0IGlmIGFscmVhZHkgZ3Vlc3NlZFxuICAgIGlmICh0dXJuID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgLy8hIE5FRUQgVE8gU1RPUkUgR0FNRSBPVkVSIElORk9STUFUSU9OIFNPTVdIRVJFIChHQU1FRkxPVz8pXG4gICAgY29uc3QgZGVmZWF0Q2hlY2sgPSBlbmVteUdhbWVib2FyZC5jaGVja0ZvckRlZmVhdCgpO1xuICAgIGlmIChkZWZlYXRDaGVjay5kZWZlYXQgPT09IHRydWUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBHYW1lIG92ZXI6ICR7dGhpcy5uYW1lfSB3aW5zYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8hIENIQU5HRSBBQ1RJVkUgUExBWUVSXG4gIH07XG5cbiAgcmV0dXJuIHsgcGxheWVyTmFtZSwgZ3Vlc3NlcywgYXR0YWNrLCBnYW1lYm9hcmQgfTtcbn07XG5cbmV4cG9ydCB7IFBsYXllciB9O1xuIiwiY29uc3QgU2hpcCA9IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgLy8gQ3JlYXRlIHNoaXAgY29vcmRpbmF0ZSBhcnJheSA9IFtbW2Nvb3Jkc10sIGhpdF0sIFtbY29vcmRzXSwgaGl0XSwgW1tjb29yZHNdLCBoaXRdXVxuICBjb25zdCBsb2NhdGlvbiA9IGNvb3Jkcy5tYXAoKGNvb3JkKSA9PiBbY29vcmQsIGZhbHNlXSk7XG4gIGxldCBzdW5rID0gZmFsc2U7XG5cbiAgY29uc3QgaGl0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgdGhpcy5sb2NhdGlvbltpbmRleF1bMV0gPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5sb2NhdGlvbi5ldmVyeSgoY29vcmQpID0+IGNvb3JkWzFdID09PSB0cnVlKSkgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4geyBsb2NhdGlvbiwgc3VuaywgaGl0LCBpc1N1bmsgfTtcbn07XG5cbmV4cG9ydCB7IFNoaXAgfTtcbiIsImltcG9ydCB7IGFyckVxdWFsQ2hlY2sgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5cbmNvbnN0IGdldEhpdFNoaXBJbmRleCA9IGZ1bmN0aW9uIChzaGlwLCBjb29yZHMpIHtcbiAgcmV0dXJuIHNoaXAubG9jYXRpb24uZmluZEluZGV4KChlbCkgPT4gYXJyRXF1YWxDaGVjayhlbFswXSwgY29vcmRzKSk7XG59O1xuXG5jb25zdCBhcHBseUhpdERhbWFnZSA9IGZ1bmN0aW9uIChnYW1lYm9hcmQsIGhpdENoZWNrQXJyLCBjb29yZHMpIHtcbiAgY29uc3Qgc2hpcHMgPSBbXCJjYXJyaWVyXCIsIFwiYmF0dGxlc2hpcFwiLCBcImRlc3Ryb3llclwiLCBcInN1Ym1hcmluZVwiLCBcInBhdHJvbFwiXTtcblxuICAvLyBJZGVudGlmeSB3aGljaCBzaGlwIHdhcyBoaXRcbiAgY29uc3QgaGl0U2hpcCA9IHNoaXBzW2hpdENoZWNrQXJyLmluZGV4T2YodHJ1ZSldO1xuXG4gIC8vIElkZW50aWZ5IGluZGV4IHdoZXJlIHNoaXAgd2FzIGhpdFxuICBjb25zdCBoaXRTaGlwSW5kZXggPSBnZXRIaXRTaGlwSW5kZXgoZ2FtZWJvYXJkLnNoaXBzW2hpdFNoaXBdLCBjb29yZHMpO1xuXG4gIC8vIEFwcGx5IGRhbWFnZSB3aXRoIG1ldGhvZFxuICBnYW1lYm9hcmQuc2hpcHNbaGl0U2hpcF0uaGl0KGhpdFNoaXBJbmRleCk7XG5cbiAgLy8gQ2hlY2sgaWYgc2hpcCBpcyBzdW5rXG4gIGdhbWVib2FyZC5zaGlwc1toaXRTaGlwXS5pc1N1bmsoKTtcblxuICByZXR1cm4gZ2FtZWJvYXJkO1xufTtcblxuZXhwb3J0IHsgYXBwbHlIaXREYW1hZ2UgfTtcbiIsImNvbnN0IGFyckVxdWFsQ2hlY2sgPSBmdW5jdGlvbiAoYXJyMSwgYXJyMikge1xuICByZXR1cm4gYXJyMS5ldmVyeSgodmFsLCBpbmRleCkgPT4gdmFsID09PSBhcnIyW2luZGV4XSk7XG59O1xuXG5leHBvcnQgeyBhcnJFcXVhbENoZWNrIH07XG4iLCIvLyBDaGVjayBpZiBhIGd1ZXNzZWQgY29vcmRpbmF0ZSBoaXRzIGEgc2hpcFxuaW1wb3J0IHsgYXJyRXF1YWxDaGVjayB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcblxuY29uc3QgaGl0Q2hlY2sgPSBmdW5jdGlvbiAoZ2FtZWJvYXJkLCBjb29yZHMpIHtcbiAgLy8gQ3JlYXRlIGFycmF5IGZvciBzaGlwIGhpdCBjaGVja1xuICBjb25zdCBvdXRwdXQgPSBbXTtcblxuICAvLyBMb29wIG92ZXIgc2hpcHMgdG8gY2hlY2sgaWYgY29vcmRzIGlzIGEgaGl0IGZvciBhbnlcbiAgZm9yIChsZXQgc2hpcCBpbiBnYW1lYm9hcmQuc2hpcHMpIHtcbiAgICBvdXRwdXQucHVzaChcbiAgICAgIGdhbWVib2FyZC5zaGlwc1tzaGlwXS5sb2NhdGlvblxuICAgICAgICAubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZFswXSwgY29vcmRzKSlcbiAgICAgICAgLmluY2x1ZGVzKHRydWUpXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgeyBoaXRDaGVjayB9O1xuIiwiaW1wb3J0IHsgYXJyRXF1YWxDaGVjayB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcblxuY29uc3QgcHJldkd1ZXNzQ2hlY2sgPSAoZ2FtZWJvYXJkLCBjb29yZHMpID0+IHtcbiAgY29uc3Qgb3V0cHV0ID0gW107XG5cbiAgb3V0cHV0LnB1c2goXG4gICAgZ2FtZWJvYXJkLm1pc3Nlcy5tYXAoKGNvb3JkKSA9PiBhcnJFcXVhbENoZWNrKGNvb3JkLCBjb29yZHMpKS5pbmNsdWRlcyh0cnVlKVxuICApO1xuXG4gIG91dHB1dC5wdXNoKFxuICAgIGdhbWVib2FyZC5oaXRzLm1hcCgoY29vcmQpID0+IGFyckVxdWFsQ2hlY2soY29vcmQsIGNvb3JkcykpLmluY2x1ZGVzKHRydWUpXG4gICk7XG5cbiAgcmV0dXJuIG91dHB1dDtcbn07XG5cbmV4cG9ydCB7IHByZXZHdWVzc0NoZWNrIH07XG5cbi8vIGNhcnJpZXIsIGJhdHRsZXNoaXAsIGRlc3Ryb3llciwgc3VibWFyaW5lLCBwYXRyb2xcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9QbGF5ZXJcIjtcblxuLy8gY2FycmllclxuY29uc3QgY29vcmRzMCA9IFtcbiAgWzIsIDJdLFxuICBbMiwgM10sXG4gIFsyLCA0XSxcbiAgWzIsIDVdLFxuICBbMiwgNl1cbl07XG4vLyBiYXR0bGVzaGlwXG5jb25zdCBjb29yZHMxID0gW1xuICBbMSwgMV0sXG4gIFsxLCAyXSxcbiAgWzEsIDNdLFxuICBbMSwgNF1cbl07XG4vLyBkZXN0cm95ZXJcbmNvbnN0IGNvb3JkczIgPSBbXG4gIFswLCAxXSxcbiAgWzAsIDJdLFxuICBbMCwgM11cbl07XG4vLyBzdWJtYXJpbmVcbmNvbnN0IGNvb3JkczMgPSBbXG4gIFszLCAzXSxcbiAgWzMsIDRdLFxuICBbMywgNV1cbl07XG4vLyBwYXRyb2xcbmNvbnN0IGNvb3JkczQgPSBbXG4gIFs0LCA0XSxcbiAgWzQsIDVdXG5dO1xuXG5jb25zdCBjb29yZHM1ID0gW1xuICBbMCwgMF0sXG4gIFsxLCAwXSxcbiAgWzIsIDBdLFxuICBbMywgMF0sXG4gIFs0LCAwXVxuXTtcbmNvbnN0IGNvb3JkczYgPSBbXG4gIFs0LCAxXSxcbiAgWzUsIDFdLFxuICBbNiwgMV0sXG4gIFs3LCAxXVxuXTtcbmNvbnN0IGNvb3JkczcgPSBbXG4gIFsyLCAyXSxcbiAgWzIsIDNdLFxuICBbMiwgNF1cbl07XG5jb25zdCBjb29yZHM4ID0gW1xuICBbNiwgMV0sXG4gIFs3LCAxXSxcbiAgWzgsIDFdXG5dO1xuY29uc3QgY29vcmRzOSA9IFtcbiAgWzgsIDZdLFxuICBbOCwgN11cbl07XG5cbmNvbnN0IHRlc3RDb29yZHMgPSBbY29vcmRzMCwgY29vcmRzMSwgY29vcmRzMiwgY29vcmRzMywgY29vcmRzNF07XG5jb25zdCB0ZXN0Q29vcmRzMiA9IFtjb29yZHM1LCBjb29yZHM2LCBjb29yZHM3LCBjb29yZHM4LCBjb29yZHM5XTtcblxuY29uc3QgcGxheWVyID0gUGxheWVyKFwicGxheWVyXCIsIHRlc3RDb29yZHMpO1xuY29uc3QgY29tcHV0ZXIgPSBQbGF5ZXIoXCJjb21wdXRlclwiLCB0ZXN0Q29vcmRzMik7XG5cbmNvbnNvbGUubG9nKHBsYXllcik7XG5jb25zb2xlLmxvZyhjb21wdXRlcik7XG5cbnBsYXllci5hdHRhY2soY29tcHV0ZXIuZ2FtZWJvYXJkLCBbMCwgMF0pO1xuY29tcHV0ZXIuYXR0YWNrKHBsYXllci5nYW1lYm9hcmQsIFs1LCA1XSk7XG5wbGF5ZXIuYXR0YWNrKGNvbXB1dGVyLmdhbWVib2FyZCwgWzAsIDBdKTtcbnBsYXllci5hdHRhY2soY29tcHV0ZXIuZ2FtZWJvYXJkLCBbMCwgMV0pO1xucGxheWVyLmF0dGFjayhjb21wdXRlci5nYW1lYm9hcmQsIFsxLCAwXSk7XG5wbGF5ZXIuYXR0YWNrKGNvbXB1dGVyLmdhbWVib2FyZCwgWzIsIDBdKTtcbnBsYXllci5hdHRhY2soY29tcHV0ZXIuZ2FtZWJvYXJkLCBbMywgMF0pO1xucGxheWVyLmF0dGFjayhjb21wdXRlci5nYW1lYm9hcmQsIFs0LCAwXSk7XG5cbmNvbnNvbGUubG9nKGNvbXB1dGVyKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==