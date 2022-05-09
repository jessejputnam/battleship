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




const Player = function (playerName, coords) {
  const gameboard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)(...coords);
  const guesses = [];
  const attack = function (enemyGameboard, coords) {
    const turn = enemyGameboard.receiveAttack(coords);

    // Exit if already guessed
    if (turn === false) return this;

    guesses.push(coords);

    //! NEED TO STORE GAME OVER INFORMATION SOMEWHERE (GAMEFLOW?)
    const defeatCheck = enemyGameboard.checkForDefeat();
    if (defeatCheck.defeat === true) {
      console.log(`Game over: ${this.name} wins`);
      return;
    }
  };

  //! CHANGE ACTIVE PLAYER

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

/***/ "./src/domInteraction.js":
/*!*******************************!*\
  !*** ./src/domInteraction.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayBoats": () => (/* binding */ displayBoats)
/* harmony export */ });


/* DOM VARIABLES */
const gameboards = document.querySelectorAll(".gameboard");
const rows = document.querySelectorAll(".row");
const squares = document.querySelectorAll(".square");

const displayBoats = function (player) {
  // Loop over each ship of player
  for (let ship in player.gameboard.ships) {
    // Get ship coordinates
    player.gameboard.ships[ship].location.forEach((coord) => {
      const gameboard =
        player.playerName === "computer" ? gameboards[1] : gameboards[0];
      const row = gameboard.children[coord[0][0]];
      const square = row.children[coord[0][1]];

      // Add ship background color
      square.classList.add(`square--${ship}`);
      console.log(ship);
    });
  }
  // console.log(rows);
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
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ "./src/Player.js");
/* harmony import */ var _domInteraction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domInteraction */ "./src/domInteraction.js");





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

const testCoords1 = [coords0, coords1, coords2, coords3, coords4];
const testCoords2 = [coords5, coords6, coords7, coords8, coords9];

//* ############# GAMEFLOW ##################

const player = (0,_Player__WEBPACK_IMPORTED_MODULE_0__.Player)("player", testCoords1);
const computer = (0,_Player__WEBPACK_IMPORTED_MODULE_0__.Player)("computer", testCoords2);

console.log(player);
console.log(computer);

(0,_domInteraction__WEBPACK_IMPORTED_MODULE_1__.displayBoats)(player);
(0,_domInteraction__WEBPACK_IMPORTED_MODULE_1__.displayBoats)(computer);

// player.attack(computer.gameboard, [0, 0]);
// computer.attack(player.gameboard, [5, 5]);
// player.attack(computer.gameboard, [0, 0]);
// player.attack(computer.gameboard, [0, 1]);
// player.attack(computer.gameboard, [1, 0]);
// player.attack(computer.gameboard, [2, 0]);
// player.attack(computer.gameboard, [3, 0]);
// player.attack(computer.gameboard, [4, 0]);

// console.log(computer);
// console.log(player);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLGVBQWUsK0NBQU07QUFDckIsaUJBQWlCLCtDQUFNOztBQUV2QjtBQUNBOztBQUVBLDZEQUFZO0FBQ1osNkRBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwbHlIaXREYW1hZ2UuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcnJFcXVhbENoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tSW50ZXJhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9oaXRDaGVjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3ByZXZHdWVzc0NoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEdhbWVib2FyZFxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9TaGlwXCI7XG5pbXBvcnQgeyBwcmV2R3Vlc3NDaGVjayB9IGZyb20gXCIuL3ByZXZHdWVzc0NoZWNrXCI7XG5pbXBvcnQgeyBoaXRDaGVjayB9IGZyb20gXCIuL2hpdENoZWNrXCI7XG5pbXBvcnQgeyBhcHBseUhpdERhbWFnZSB9IGZyb20gXCIuL2FwcGx5SGl0RGFtYWdlXCI7XG5cbmNvbnN0IEdhbWVib2FyZCA9IGZ1bmN0aW9uIChjb29yZHMwLCBjb29yZHMxLCBjb29yZHMyLCBjb29yZHMzLCBjb29yZHM0KSB7XG4gIGxldCBkZWZlYXQgPSBmYWxzZTtcblxuICAvLyBTaGlwc1xuICBjb25zdCBzaGlwcyA9IHtcbiAgICBjYXJyaWVyOiBTaGlwKGNvb3JkczApLFxuICAgIGJhdHRsZXNoaXA6IFNoaXAoY29vcmRzMSksXG4gICAgZGVzdHJveWVyOiBTaGlwKGNvb3JkczIpLFxuICAgIHN1Ym1hcmluZTogU2hpcChjb29yZHMzKSxcbiAgICBwYXRyb2w6IFNoaXAoY29vcmRzNClcbiAgfTtcblxuICAvLyBFbmVteSBHdWVzcyBBcnJheXNcbiAgY29uc3QgbWlzc2VzID0gW107XG4gIGNvbnN0IGhpdHMgPSBbXTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgIC8vIENoZWNrIGlmIGFscmVhZHkgZ3Vlc3NlZFxuICAgIGlmIChwcmV2R3Vlc3NDaGVjayh0aGlzLCBjb29yZHMpLmluY2x1ZGVzKHRydWUpKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBDaGVjayBpZiBndWVzcyBpcyBhIGhpdCBvbiBhIHNoaXBcbiAgICBjb25zdCBoaXRDaGVja0FyciA9IGhpdENoZWNrKHRoaXMsIGNvb3Jkcyk7XG5cbiAgICAvLyBJZiBub25lIHNob3cgaGl0LCBwdXQgaW50byBtaXNzZXMgYXJyYXlcbiAgICBpZiAoaGl0Q2hlY2tBcnIuZXZlcnkoKHgpID0+IHggPT09IGZhbHNlKSkge1xuICAgICAgbWlzc2VzLnB1c2goY29vcmRzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIElmIGd1ZXNzIHNob3dzIGhpdFxuICAgIGlmIChoaXRDaGVja0Fyci5zb21lKCh4KSA9PiB4ID09PSB0cnVlKSkge1xuICAgICAgaGl0cy5wdXNoKGNvb3Jkcyk7XG4gICAgICByZXR1cm4gYXBwbHlIaXREYW1hZ2UodGhpcywgaGl0Q2hlY2tBcnIsIGNvb3Jkcyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNoZWNrRm9yRGVmZWF0ID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIENyZWF0ZSBhcnJheSBvZiBhbGwgc3VuayBjaGVja3NcbiAgICBjb25zdCBzdW5rQXJyID0gW107XG5cbiAgICAvLyBQb3B1bGF0ZSB0aGUgYXJyYXkgd2l0aCBzdW5rIGNoZWNrc1xuICAgIGZvciAobGV0IHNoaXAgaW4gdGhpcy5zaGlwcykge1xuICAgICAgc3Vua0Fyci5wdXNoKHNoaXBzW3NoaXBdLnN1bmspO1xuICAgIH1cblxuICAgIC8vIEV2YWx1YXRlIHRoZSBhcnJheSBmb3IgYWxsIHN1bmsgY2hlY2tzID09PSB0cnVlXG4gICAgaWYgKHN1bmtBcnIuZXZlcnkoKGVsKSA9PiBlbCA9PT0gdHJ1ZSkpIHtcbiAgICAgIHRoaXMuZGVmZWF0ID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGRlZmVhdCxcbiAgICBzaGlwcyxcbiAgICBtaXNzZXMsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBoaXRzLFxuICAgIGNoZWNrRm9yRGVmZWF0XG4gIH07XG59O1xuXG5leHBvcnQgeyBHYW1lYm9hcmQgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcblxuY29uc3QgUGxheWVyID0gZnVuY3Rpb24gKHBsYXllck5hbWUsIGNvb3Jkcykge1xuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoLi4uY29vcmRzKTtcbiAgY29uc3QgZ3Vlc3NlcyA9IFtdO1xuICBjb25zdCBhdHRhY2sgPSBmdW5jdGlvbiAoZW5lbXlHYW1lYm9hcmQsIGNvb3Jkcykge1xuICAgIGNvbnN0IHR1cm4gPSBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3Jkcyk7XG5cbiAgICAvLyBFeGl0IGlmIGFscmVhZHkgZ3Vlc3NlZFxuICAgIGlmICh0dXJuID09PSBmYWxzZSkgcmV0dXJuIHRoaXM7XG5cbiAgICBndWVzc2VzLnB1c2goY29vcmRzKTtcblxuICAgIC8vISBORUVEIFRPIFNUT1JFIEdBTUUgT1ZFUiBJTkZPUk1BVElPTiBTT01FV0hFUkUgKEdBTUVGTE9XPylcbiAgICBjb25zdCBkZWZlYXRDaGVjayA9IGVuZW15R2FtZWJvYXJkLmNoZWNrRm9yRGVmZWF0KCk7XG4gICAgaWYgKGRlZmVhdENoZWNrLmRlZmVhdCA9PT0gdHJ1ZSkge1xuICAgICAgY29uc29sZS5sb2coYEdhbWUgb3ZlcjogJHt0aGlzLm5hbWV9IHdpbnNgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH07XG5cbiAgLy8hIENIQU5HRSBBQ1RJVkUgUExBWUVSXG5cbiAgcmV0dXJuIHsgcGxheWVyTmFtZSwgZ3Vlc3NlcywgYXR0YWNrLCBnYW1lYm9hcmQgfTtcbn07XG5cbmV4cG9ydCB7IFBsYXllciB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IFNoaXAgPSBmdW5jdGlvbiAoY29vcmRzKSB7XG4gIC8vIENyZWF0ZSBzaGlwIGNvb3JkaW5hdGUgYXJyYXkgPSBbW1tjb29yZHNdLCBoaXRdLCBbW2Nvb3Jkc10sIGhpdF0sIFtbY29vcmRzXSwgaGl0XV1cbiAgY29uc3QgbG9jYXRpb24gPSBjb29yZHMubWFwKChjb29yZCkgPT4gW2Nvb3JkLCBmYWxzZV0pO1xuICBsZXQgc3VuayA9IGZhbHNlO1xuXG4gIGNvbnN0IGhpdCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIHRoaXMubG9jYXRpb25baW5kZXhdWzFdID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMubG9jYXRpb24uZXZlcnkoKGNvb3JkKSA9PiBjb29yZFsxXSA9PT0gdHJ1ZSkpIHRoaXMuc3VuayA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIHsgbG9jYXRpb24sIHN1bmssIGhpdCwgaXNTdW5rIH07XG59O1xuXG5leHBvcnQgeyBTaGlwIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyRXF1YWxDaGVjayB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcblxuY29uc3QgZ2V0SGl0U2hpcEluZGV4ID0gZnVuY3Rpb24gKHNoaXAsIGNvb3Jkcykge1xuICByZXR1cm4gc2hpcC5sb2NhdGlvbi5maW5kSW5kZXgoKGVsKSA9PiBhcnJFcXVhbENoZWNrKGVsWzBdLCBjb29yZHMpKTtcbn07XG5cbmNvbnN0IGFwcGx5SGl0RGFtYWdlID0gZnVuY3Rpb24gKGdhbWVib2FyZCwgaGl0Q2hlY2tBcnIsIGNvb3Jkcykge1xuICBjb25zdCBzaGlwcyA9IFtcImNhcnJpZXJcIiwgXCJiYXR0bGVzaGlwXCIsIFwiZGVzdHJveWVyXCIsIFwic3VibWFyaW5lXCIsIFwicGF0cm9sXCJdO1xuXG4gIC8vIElkZW50aWZ5IHdoaWNoIHNoaXAgd2FzIGhpdFxuICBjb25zdCBoaXRTaGlwID0gc2hpcHNbaGl0Q2hlY2tBcnIuaW5kZXhPZih0cnVlKV07XG5cbiAgLy8gSWRlbnRpZnkgaW5kZXggd2hlcmUgc2hpcCB3YXMgaGl0XG4gIGNvbnN0IGhpdFNoaXBJbmRleCA9IGdldEhpdFNoaXBJbmRleChnYW1lYm9hcmQuc2hpcHNbaGl0U2hpcF0sIGNvb3Jkcyk7XG5cbiAgLy8gQXBwbHkgZGFtYWdlIHdpdGggbWV0aG9kXG4gIGdhbWVib2FyZC5zaGlwc1toaXRTaGlwXS5oaXQoaGl0U2hpcEluZGV4KTtcblxuICAvLyBDaGVjayBpZiBzaGlwIGlzIHN1bmtcbiAgZ2FtZWJvYXJkLnNoaXBzW2hpdFNoaXBdLmlzU3VuaygpO1xuXG4gIHJldHVybiBnYW1lYm9hcmQ7XG59O1xuXG5leHBvcnQgeyBhcHBseUhpdERhbWFnZSB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGFyckVxdWFsQ2hlY2sgPSBmdW5jdGlvbiAoYXJyMSwgYXJyMikge1xuICByZXR1cm4gYXJyMS5ldmVyeSgodmFsLCBpbmRleCkgPT4gdmFsID09PSBhcnIyW2luZGV4XSk7XG59O1xuXG5leHBvcnQgeyBhcnJFcXVhbENoZWNrIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLyogRE9NIFZBUklBQkxFUyAqL1xuY29uc3QgZ2FtZWJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2FtZWJvYXJkXCIpO1xuY29uc3Qgcm93cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucm93XCIpO1xuY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3F1YXJlXCIpO1xuXG5jb25zdCBkaXNwbGF5Qm9hdHMgPSBmdW5jdGlvbiAocGxheWVyKSB7XG4gIC8vIExvb3Agb3ZlciBlYWNoIHNoaXAgb2YgcGxheWVyXG4gIGZvciAobGV0IHNoaXAgaW4gcGxheWVyLmdhbWVib2FyZC5zaGlwcykge1xuICAgIC8vIEdldCBzaGlwIGNvb3JkaW5hdGVzXG4gICAgcGxheWVyLmdhbWVib2FyZC5zaGlwc1tzaGlwXS5sb2NhdGlvbi5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgY29uc3QgZ2FtZWJvYXJkID1cbiAgICAgICAgcGxheWVyLnBsYXllck5hbWUgPT09IFwiY29tcHV0ZXJcIiA/IGdhbWVib2FyZHNbMV0gOiBnYW1lYm9hcmRzWzBdO1xuICAgICAgY29uc3Qgcm93ID0gZ2FtZWJvYXJkLmNoaWxkcmVuW2Nvb3JkWzBdWzBdXTtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IHJvdy5jaGlsZHJlbltjb29yZFswXVsxXV07XG5cbiAgICAgIC8vIEFkZCBzaGlwIGJhY2tncm91bmQgY29sb3JcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGBzcXVhcmUtLSR7c2hpcH1gKTtcbiAgICAgIGNvbnNvbGUubG9nKHNoaXApO1xuICAgIH0pO1xuICB9XG4gIC8vIGNvbnNvbGUubG9nKHJvd3MpO1xufTtcblxuZXhwb3J0IHsgZGlzcGxheUJvYXRzIH07XG4iLCIvLyBDaGVjayBpZiBhIGd1ZXNzZWQgY29vcmRpbmF0ZSBoaXRzIGEgc2hpcFxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGFyckVxdWFsQ2hlY2sgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5cbmNvbnN0IGhpdENoZWNrID0gZnVuY3Rpb24gKGdhbWVib2FyZCwgY29vcmRzKSB7XG4gIC8vIENyZWF0ZSBhcnJheSBmb3Igc2hpcCBoaXQgY2hlY2tcbiAgY29uc3Qgb3V0cHV0ID0gW107XG5cbiAgLy8gTG9vcCBvdmVyIHNoaXBzIHRvIGNoZWNrIGlmIGNvb3JkcyBpcyBhIGhpdCBmb3IgYW55XG4gIGZvciAobGV0IHNoaXAgaW4gZ2FtZWJvYXJkLnNoaXBzKSB7XG4gICAgb3V0cHV0LnB1c2goXG4gICAgICBnYW1lYm9hcmQuc2hpcHNbc2hpcF0ubG9jYXRpb25cbiAgICAgICAgLm1hcCgoY29vcmQpID0+IGFyckVxdWFsQ2hlY2soY29vcmRbMF0sIGNvb3JkcykpXG4gICAgICAgIC5pbmNsdWRlcyh0cnVlKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0IHsgaGl0Q2hlY2sgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJFcXVhbENoZWNrIH0gZnJvbSBcIi4vYXJyRXF1YWxDaGVja1wiO1xuXG5jb25zdCBwcmV2R3Vlc3NDaGVjayA9IChnYW1lYm9hcmQsIGNvb3JkcykgPT4ge1xuICBjb25zdCBvdXRwdXQgPSBbXTtcblxuICBvdXRwdXQucHVzaChcbiAgICBnYW1lYm9hcmQubWlzc2VzLm1hcCgoY29vcmQpID0+IGFyckVxdWFsQ2hlY2soY29vcmQsIGNvb3JkcykpLmluY2x1ZGVzKHRydWUpXG4gICk7XG5cbiAgb3V0cHV0LnB1c2goXG4gICAgZ2FtZWJvYXJkLmhpdHMubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZCwgY29vcmRzKSkuaW5jbHVkZXModHJ1ZSlcbiAgKTtcblxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0IHsgcHJldkd1ZXNzQ2hlY2sgfTtcblxuLy8gY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vUGxheWVyXCI7XG5pbXBvcnQgeyBkaXNwbGF5Qm9hdHMgfSBmcm9tIFwiLi9kb21JbnRlcmFjdGlvblwiO1xuXG4vLyBjYXJyaWVyXG5jb25zdCBjb29yZHMwID0gW1xuICBbMiwgMl0sXG4gIFsyLCAzXSxcbiAgWzIsIDRdLFxuICBbMiwgNV0sXG4gIFsyLCA2XVxuXTtcbi8vIGJhdHRsZXNoaXBcbmNvbnN0IGNvb3JkczEgPSBbXG4gIFsxLCAxXSxcbiAgWzEsIDJdLFxuICBbMSwgM10sXG4gIFsxLCA0XVxuXTtcbi8vIGRlc3Ryb3llclxuY29uc3QgY29vcmRzMiA9IFtcbiAgWzAsIDFdLFxuICBbMCwgMl0sXG4gIFswLCAzXVxuXTtcbi8vIHN1Ym1hcmluZVxuY29uc3QgY29vcmRzMyA9IFtcbiAgWzMsIDNdLFxuICBbMywgNF0sXG4gIFszLCA1XVxuXTtcbi8vIHBhdHJvbFxuY29uc3QgY29vcmRzNCA9IFtcbiAgWzQsIDRdLFxuICBbNCwgNV1cbl07XG5cbmNvbnN0IGNvb3JkczUgPSBbXG4gIFswLCAwXSxcbiAgWzEsIDBdLFxuICBbMiwgMF0sXG4gIFszLCAwXSxcbiAgWzQsIDBdXG5dO1xuY29uc3QgY29vcmRzNiA9IFtcbiAgWzQsIDFdLFxuICBbNSwgMV0sXG4gIFs2LCAxXSxcbiAgWzcsIDFdXG5dO1xuY29uc3QgY29vcmRzNyA9IFtcbiAgWzIsIDJdLFxuICBbMiwgM10sXG4gIFsyLCA0XVxuXTtcbmNvbnN0IGNvb3JkczggPSBbXG4gIFs2LCAxXSxcbiAgWzcsIDFdLFxuICBbOCwgMV1cbl07XG5jb25zdCBjb29yZHM5ID0gW1xuICBbOCwgNl0sXG4gIFs4LCA3XVxuXTtcblxuY29uc3QgdGVzdENvb3JkczEgPSBbY29vcmRzMCwgY29vcmRzMSwgY29vcmRzMiwgY29vcmRzMywgY29vcmRzNF07XG5jb25zdCB0ZXN0Q29vcmRzMiA9IFtjb29yZHM1LCBjb29yZHM2LCBjb29yZHM3LCBjb29yZHM4LCBjb29yZHM5XTtcblxuLy8qICMjIyMjIyMjIyMjIyMgR0FNRUZMT1cgIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmNvbnN0IHBsYXllciA9IFBsYXllcihcInBsYXllclwiLCB0ZXN0Q29vcmRzMSk7XG5jb25zdCBjb21wdXRlciA9IFBsYXllcihcImNvbXB1dGVyXCIsIHRlc3RDb29yZHMyKTtcblxuY29uc29sZS5sb2cocGxheWVyKTtcbmNvbnNvbGUubG9nKGNvbXB1dGVyKTtcblxuZGlzcGxheUJvYXRzKHBsYXllcik7XG5kaXNwbGF5Qm9hdHMoY29tcHV0ZXIpO1xuXG4vLyBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyLmdhbWVib2FyZCwgWzAsIDBdKTtcbi8vIGNvbXB1dGVyLmF0dGFjayhwbGF5ZXIuZ2FtZWJvYXJkLCBbNSwgNV0pO1xuLy8gcGxheWVyLmF0dGFjayhjb21wdXRlci5nYW1lYm9hcmQsIFswLCAwXSk7XG4vLyBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyLmdhbWVib2FyZCwgWzAsIDFdKTtcbi8vIHBsYXllci5hdHRhY2soY29tcHV0ZXIuZ2FtZWJvYXJkLCBbMSwgMF0pO1xuLy8gcGxheWVyLmF0dGFjayhjb21wdXRlci5nYW1lYm9hcmQsIFsyLCAwXSk7XG4vLyBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyLmdhbWVib2FyZCwgWzMsIDBdKTtcbi8vIHBsYXllci5hdHRhY2soY29tcHV0ZXIuZ2FtZWJvYXJkLCBbNCwgMF0pO1xuXG4vLyBjb25zb2xlLmxvZyhjb21wdXRlcik7XG4vLyBjb25zb2xlLmxvZyhwbGF5ZXIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9