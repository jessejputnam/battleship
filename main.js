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
      console.log(`Game over: ${this.playerName} wins`);
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
/* harmony export */   "displayBoats": () => (/* binding */ displayBoats),
/* harmony export */   "gameboards": () => (/* binding */ gameboards),
/* harmony export */   "rows": () => (/* binding */ rows),
/* harmony export */   "squares": () => (/* binding */ squares)
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
        player.playerName === "computer" ? gameboards[0] : gameboards[1];
      const row = gameboard.children[coord[0][0]];
      const square = row.children[coord[0][1]];

      // Add ship background color
      square.classList.add(`square--${ship}`);
    });
  }
};




/***/ }),

/***/ "./src/getAttackCoords.js":
/*!********************************!*\
  !*** ./src/getAttackCoords.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAttackCoords": () => (/* binding */ getAttackCoords)
/* harmony export */ });


const getAttackCoords = function (square) {
  const row = square.parentElement.classList[1].slice(-1);
  const col = square.classList[1].slice(-1);
  return [parseInt(row, 10), parseInt(col, 10)];
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
/* harmony import */ var _getAttackCoords__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getAttackCoords */ "./src/getAttackCoords.js");






// carrier
const coords0 = [
  [2, 9],
  [3, 9],
  [4, 9],
  [5, 9],
  [6, 9]
];
// battleship
const coords1 = [
  [2, 0],
  [3, 0],
  [4, 0],
  [5, 0]
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
  [7, 4],
  [7, 5]
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
  [6, 4],
  [6, 5],
  [6, 6]
];
const coords9 = [
  [8, 6],
  [8, 7]
];

//* ############# GAMEFLOW ##################
const board = _domInteraction__WEBPACK_IMPORTED_MODULE_1__.gameboards[0];

let gameOver = false;

// Player chooses ship coordinates
const testCoords1 = [coords0, coords1, coords2, coords3, coords4];
const player = (0,_Player__WEBPACK_IMPORTED_MODULE_0__.Player)("player", testCoords1);

// Computer randomly chooses ship coordinates
const testCoords2 = [coords5, coords6, coords7, coords8, coords9];
const computer = (0,_Player__WEBPACK_IMPORTED_MODULE_0__.Player)("computer", testCoords2);

console.log(player);
console.log(computer);
console.log(board);

// Display boats on board
(0,_domInteraction__WEBPACK_IMPORTED_MODULE_1__.displayBoats)(player);
(0,_domInteraction__WEBPACK_IMPORTED_MODULE_1__.displayBoats)(computer);

// Game turn
// while (gameOver === false) {
//   // Player turn
// }

board.addEventListener("click", (e) => {
  const square = e.target.closest(".square");
  if (!square) return;

  const coord = (0,_getAttackCoords__WEBPACK_IMPORTED_MODULE_2__.getAttackCoords)(square);

  console.log(coord);

  player.attack(computer.gameboard, coord);
  console.log(player);
  console.log(computer);
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsMERBQWE7O0FBRTNCOztBQUVBO0FBQ0E7QUFDQSxlQUFlLCtDQUFNOztBQUVyQjtBQUNBO0FBQ0EsaUJBQWlCLCtDQUFNOztBQUV2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2REFBWTtBQUNaLDZEQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsaUVBQWU7O0FBRS9COztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwbHlIaXREYW1hZ2UuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcnJFcXVhbENoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tSW50ZXJhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nZXRBdHRhY2tDb29yZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9oaXRDaGVjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3ByZXZHdWVzc0NoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEdhbWVib2FyZFxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9TaGlwXCI7XG5pbXBvcnQgeyBwcmV2R3Vlc3NDaGVjayB9IGZyb20gXCIuL3ByZXZHdWVzc0NoZWNrXCI7XG5pbXBvcnQgeyBoaXRDaGVjayB9IGZyb20gXCIuL2hpdENoZWNrXCI7XG5pbXBvcnQgeyBhcHBseUhpdERhbWFnZSB9IGZyb20gXCIuL2FwcGx5SGl0RGFtYWdlXCI7XG5cbmNvbnN0IEdhbWVib2FyZCA9IGZ1bmN0aW9uIChjb29yZHMwLCBjb29yZHMxLCBjb29yZHMyLCBjb29yZHMzLCBjb29yZHM0KSB7XG4gIGxldCBkZWZlYXQgPSBmYWxzZTtcblxuICAvLyBTaGlwc1xuICBjb25zdCBzaGlwcyA9IHtcbiAgICBjYXJyaWVyOiBTaGlwKGNvb3JkczApLFxuICAgIGJhdHRsZXNoaXA6IFNoaXAoY29vcmRzMSksXG4gICAgZGVzdHJveWVyOiBTaGlwKGNvb3JkczIpLFxuICAgIHN1Ym1hcmluZTogU2hpcChjb29yZHMzKSxcbiAgICBwYXRyb2w6IFNoaXAoY29vcmRzNClcbiAgfTtcblxuICAvLyBFbmVteSBHdWVzcyBBcnJheXNcbiAgY29uc3QgbWlzc2VzID0gW107XG4gIGNvbnN0IGhpdHMgPSBbXTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgIC8vIENoZWNrIGlmIGFscmVhZHkgZ3Vlc3NlZFxuICAgIGlmIChwcmV2R3Vlc3NDaGVjayh0aGlzLCBjb29yZHMpLmluY2x1ZGVzKHRydWUpKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBDaGVjayBpZiBndWVzcyBpcyBhIGhpdCBvbiBhIHNoaXBcbiAgICBjb25zdCBoaXRDaGVja0FyciA9IGhpdENoZWNrKHRoaXMsIGNvb3Jkcyk7XG5cbiAgICAvLyBJZiBub25lIHNob3cgaGl0LCBwdXQgaW50byBtaXNzZXMgYXJyYXlcbiAgICBpZiAoaGl0Q2hlY2tBcnIuZXZlcnkoKHgpID0+IHggPT09IGZhbHNlKSkge1xuICAgICAgbWlzc2VzLnB1c2goY29vcmRzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIElmIGd1ZXNzIHNob3dzIGhpdFxuICAgIGlmIChoaXRDaGVja0Fyci5zb21lKCh4KSA9PiB4ID09PSB0cnVlKSkge1xuICAgICAgaGl0cy5wdXNoKGNvb3Jkcyk7XG4gICAgICByZXR1cm4gYXBwbHlIaXREYW1hZ2UodGhpcywgaGl0Q2hlY2tBcnIsIGNvb3Jkcyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNoZWNrRm9yRGVmZWF0ID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIENyZWF0ZSBhcnJheSBvZiBhbGwgc3VuayBjaGVja3NcbiAgICBjb25zdCBzdW5rQXJyID0gW107XG5cbiAgICAvLyBQb3B1bGF0ZSB0aGUgYXJyYXkgd2l0aCBzdW5rIGNoZWNrc1xuICAgIGZvciAobGV0IHNoaXAgaW4gdGhpcy5zaGlwcykge1xuICAgICAgc3Vua0Fyci5wdXNoKHNoaXBzW3NoaXBdLnN1bmspO1xuICAgIH1cblxuICAgIC8vIEV2YWx1YXRlIHRoZSBhcnJheSBmb3IgYWxsIHN1bmsgY2hlY2tzID09PSB0cnVlXG4gICAgaWYgKHN1bmtBcnIuZXZlcnkoKGVsKSA9PiBlbCA9PT0gdHJ1ZSkpIHtcbiAgICAgIHRoaXMuZGVmZWF0ID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGRlZmVhdCxcbiAgICBzaGlwcyxcbiAgICBtaXNzZXMsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBoaXRzLFxuICAgIGNoZWNrRm9yRGVmZWF0XG4gIH07XG59O1xuXG5leHBvcnQgeyBHYW1lYm9hcmQgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcblxuY29uc3QgUGxheWVyID0gZnVuY3Rpb24gKHBsYXllck5hbWUsIGNvb3Jkcykge1xuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoLi4uY29vcmRzKTtcbiAgY29uc3QgZ3Vlc3NlcyA9IFtdO1xuXG4gIGNvbnN0IGF0dGFjayA9IGZ1bmN0aW9uIChlbmVteUdhbWVib2FyZCwgY29vcmRzKSB7XG4gICAgY29uc3QgdHVybiA9IGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcblxuICAgIC8vIEV4aXQgaWYgYWxyZWFkeSBndWVzc2VkXG4gICAgaWYgKHR1cm4gPT09IGZhbHNlKSByZXR1cm4gdGhpcztcblxuICAgIGd1ZXNzZXMucHVzaChjb29yZHMpO1xuXG4gICAgLy8hIE5FRUQgVE8gU1RPUkUgR0FNRSBPVkVSIElORk9STUFUSU9OIFNPTUVXSEVSRSAoR0FNRUZMT1c/KVxuICAgIGNvbnN0IGRlZmVhdENoZWNrID0gZW5lbXlHYW1lYm9hcmQuY2hlY2tGb3JEZWZlYXQoKTtcbiAgICBpZiAoZGVmZWF0Q2hlY2suZGVmZWF0ID09PSB0cnVlKSB7XG4gICAgICBjb25zb2xlLmxvZyhgR2FtZSBvdmVyOiAke3RoaXMucGxheWVyTmFtZX0gd2luc2ApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfTtcblxuICAvLyEgQ0hBTkdFIEFDVElWRSBQTEFZRVJcblxuICByZXR1cm4geyBwbGF5ZXJOYW1lLCBndWVzc2VzLCBhdHRhY2ssIGdhbWVib2FyZCB9O1xufTtcblxuZXhwb3J0IHsgUGxheWVyIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgU2hpcCA9IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgLy8gQ3JlYXRlIHNoaXAgY29vcmRpbmF0ZSBhcnJheSA9IFtbW2Nvb3Jkc10sIGhpdF0sIFtbY29vcmRzXSwgaGl0XSwgW1tjb29yZHNdLCBoaXRdXVxuICBjb25zdCBsb2NhdGlvbiA9IGNvb3Jkcy5tYXAoKGNvb3JkKSA9PiBbY29vcmQsIGZhbHNlXSk7XG4gIGxldCBzdW5rID0gZmFsc2U7XG5cbiAgY29uc3QgaGl0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgdGhpcy5sb2NhdGlvbltpbmRleF1bMV0gPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5sb2NhdGlvbi5ldmVyeSgoY29vcmQpID0+IGNvb3JkWzFdID09PSB0cnVlKSkgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4geyBsb2NhdGlvbiwgc3VuaywgaGl0LCBpc1N1bmsgfTtcbn07XG5cbmV4cG9ydCB7IFNoaXAgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJFcXVhbENoZWNrIH0gZnJvbSBcIi4vYXJyRXF1YWxDaGVja1wiO1xuXG5jb25zdCBnZXRIaXRTaGlwSW5kZXggPSBmdW5jdGlvbiAoc2hpcCwgY29vcmRzKSB7XG4gIHJldHVybiBzaGlwLmxvY2F0aW9uLmZpbmRJbmRleCgoZWwpID0+IGFyckVxdWFsQ2hlY2soZWxbMF0sIGNvb3JkcykpO1xufTtcblxuY29uc3QgYXBwbHlIaXREYW1hZ2UgPSBmdW5jdGlvbiAoZ2FtZWJvYXJkLCBoaXRDaGVja0FyciwgY29vcmRzKSB7XG4gIGNvbnN0IHNoaXBzID0gW1wiY2FycmllclwiLCBcImJhdHRsZXNoaXBcIiwgXCJkZXN0cm95ZXJcIiwgXCJzdWJtYXJpbmVcIiwgXCJwYXRyb2xcIl07XG5cbiAgLy8gSWRlbnRpZnkgd2hpY2ggc2hpcCB3YXMgaGl0XG4gIGNvbnN0IGhpdFNoaXAgPSBzaGlwc1toaXRDaGVja0Fyci5pbmRleE9mKHRydWUpXTtcblxuICAvLyBJZGVudGlmeSBpbmRleCB3aGVyZSBzaGlwIHdhcyBoaXRcbiAgY29uc3QgaGl0U2hpcEluZGV4ID0gZ2V0SGl0U2hpcEluZGV4KGdhbWVib2FyZC5zaGlwc1toaXRTaGlwXSwgY29vcmRzKTtcblxuICAvLyBBcHBseSBkYW1hZ2Ugd2l0aCBtZXRob2RcbiAgZ2FtZWJvYXJkLnNoaXBzW2hpdFNoaXBdLmhpdChoaXRTaGlwSW5kZXgpO1xuXG4gIC8vIENoZWNrIGlmIHNoaXAgaXMgc3Vua1xuICBnYW1lYm9hcmQuc2hpcHNbaGl0U2hpcF0uaXNTdW5rKCk7XG5cbiAgcmV0dXJuIGdhbWVib2FyZDtcbn07XG5cbmV4cG9ydCB7IGFwcGx5SGl0RGFtYWdlIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgYXJyRXF1YWxDaGVjayA9IGZ1bmN0aW9uIChhcnIxLCBhcnIyKSB7XG4gIHJldHVybiBhcnIxLmV2ZXJ5KCh2YWwsIGluZGV4KSA9PiB2YWwgPT09IGFycjJbaW5kZXhdKTtcbn07XG5cbmV4cG9ydCB7IGFyckVxdWFsQ2hlY2sgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBET00gVkFSSUFCTEVTICovXG5jb25zdCBnYW1lYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5nYW1lYm9hcmRcIik7XG5jb25zdCByb3dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yb3dcIik7XG5jb25zdCBzcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zcXVhcmVcIik7XG5cbmNvbnN0IGRpc3BsYXlCb2F0cyA9IGZ1bmN0aW9uIChwbGF5ZXIpIHtcbiAgLy8gTG9vcCBvdmVyIGVhY2ggc2hpcCBvZiBwbGF5ZXJcbiAgZm9yIChsZXQgc2hpcCBpbiBwbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzKSB7XG4gICAgLy8gR2V0IHNoaXAgY29vcmRpbmF0ZXNcbiAgICBwbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzW3NoaXBdLmxvY2F0aW9uLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBjb25zdCBnYW1lYm9hcmQgPVxuICAgICAgICBwbGF5ZXIucGxheWVyTmFtZSA9PT0gXCJjb21wdXRlclwiID8gZ2FtZWJvYXJkc1swXSA6IGdhbWVib2FyZHNbMV07XG4gICAgICBjb25zdCByb3cgPSBnYW1lYm9hcmQuY2hpbGRyZW5bY29vcmRbMF1bMF1dO1xuICAgICAgY29uc3Qgc3F1YXJlID0gcm93LmNoaWxkcmVuW2Nvb3JkWzBdWzFdXTtcblxuICAgICAgLy8gQWRkIHNoaXAgYmFja2dyb3VuZCBjb2xvclxuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYHNxdWFyZS0tJHtzaGlwfWApO1xuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgeyBkaXNwbGF5Qm9hdHMsIHNxdWFyZXMsIHJvd3MsIGdhbWVib2FyZHMgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBnZXRBdHRhY2tDb29yZHMgPSBmdW5jdGlvbiAoc3F1YXJlKSB7XG4gIGNvbnN0IHJvdyA9IHNxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdFsxXS5zbGljZSgtMSk7XG4gIGNvbnN0IGNvbCA9IHNxdWFyZS5jbGFzc0xpc3RbMV0uc2xpY2UoLTEpO1xuICByZXR1cm4gW3BhcnNlSW50KHJvdywgMTApLCBwYXJzZUludChjb2wsIDEwKV07XG59O1xuXG5leHBvcnQgeyBnZXRBdHRhY2tDb29yZHMgfTtcbiIsIi8vIENoZWNrIGlmIGEgZ3Vlc3NlZCBjb29yZGluYXRlIGhpdHMgYSBzaGlwXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyRXF1YWxDaGVjayB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcblxuY29uc3QgaGl0Q2hlY2sgPSBmdW5jdGlvbiAoZ2FtZWJvYXJkLCBjb29yZHMpIHtcbiAgLy8gQ3JlYXRlIGFycmF5IGZvciBzaGlwIGhpdCBjaGVja1xuICBjb25zdCBvdXRwdXQgPSBbXTtcblxuICAvLyBMb29wIG92ZXIgc2hpcHMgdG8gY2hlY2sgaWYgY29vcmRzIGlzIGEgaGl0IGZvciBhbnlcbiAgZm9yIChsZXQgc2hpcCBpbiBnYW1lYm9hcmQuc2hpcHMpIHtcbiAgICBvdXRwdXQucHVzaChcbiAgICAgIGdhbWVib2FyZC5zaGlwc1tzaGlwXS5sb2NhdGlvblxuICAgICAgICAubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZFswXSwgY29vcmRzKSlcbiAgICAgICAgLmluY2x1ZGVzKHRydWUpXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgeyBoaXRDaGVjayB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGFyckVxdWFsQ2hlY2sgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5cbmNvbnN0IHByZXZHdWVzc0NoZWNrID0gKGdhbWVib2FyZCwgY29vcmRzKSA9PiB7XG4gIGNvbnN0IG91dHB1dCA9IFtdO1xuXG4gIG91dHB1dC5wdXNoKFxuICAgIGdhbWVib2FyZC5taXNzZXMubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZCwgY29vcmRzKSkuaW5jbHVkZXModHJ1ZSlcbiAgKTtcblxuICBvdXRwdXQucHVzaChcbiAgICBnYW1lYm9hcmQuaGl0cy5tYXAoKGNvb3JkKSA9PiBhcnJFcXVhbENoZWNrKGNvb3JkLCBjb29yZHMpKS5pbmNsdWRlcyh0cnVlKVxuICApO1xuXG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgeyBwcmV2R3Vlc3NDaGVjayB9O1xuXG4vLyBjYXJyaWVyLCBiYXR0bGVzaGlwLCBkZXN0cm95ZXIsIHN1Ym1hcmluZSwgcGF0cm9sXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9QbGF5ZXJcIjtcbmltcG9ydCB7IGRpc3BsYXlCb2F0cywgc3F1YXJlcywgZ2FtZWJvYXJkcyB9IGZyb20gXCIuL2RvbUludGVyYWN0aW9uXCI7XG5pbXBvcnQgeyBnZXRBdHRhY2tDb29yZHMgfSBmcm9tIFwiLi9nZXRBdHRhY2tDb29yZHNcIjtcblxuLy8gY2FycmllclxuY29uc3QgY29vcmRzMCA9IFtcbiAgWzIsIDldLFxuICBbMywgOV0sXG4gIFs0LCA5XSxcbiAgWzUsIDldLFxuICBbNiwgOV1cbl07XG4vLyBiYXR0bGVzaGlwXG5jb25zdCBjb29yZHMxID0gW1xuICBbMiwgMF0sXG4gIFszLCAwXSxcbiAgWzQsIDBdLFxuICBbNSwgMF1cbl07XG4vLyBkZXN0cm95ZXJcbmNvbnN0IGNvb3JkczIgPSBbXG4gIFswLCAxXSxcbiAgWzAsIDJdLFxuICBbMCwgM11cbl07XG4vLyBzdWJtYXJpbmVcbmNvbnN0IGNvb3JkczMgPSBbXG4gIFszLCAzXSxcbiAgWzMsIDRdLFxuICBbMywgNV1cbl07XG4vLyBwYXRyb2xcbmNvbnN0IGNvb3JkczQgPSBbXG4gIFs3LCA0XSxcbiAgWzcsIDVdXG5dO1xuXG5jb25zdCBjb29yZHM1ID0gW1xuICBbMCwgMF0sXG4gIFsxLCAwXSxcbiAgWzIsIDBdLFxuICBbMywgMF0sXG4gIFs0LCAwXVxuXTtcbmNvbnN0IGNvb3JkczYgPSBbXG4gIFs0LCAxXSxcbiAgWzUsIDFdLFxuICBbNiwgMV0sXG4gIFs3LCAxXVxuXTtcbmNvbnN0IGNvb3JkczcgPSBbXG4gIFsyLCAyXSxcbiAgWzIsIDNdLFxuICBbMiwgNF1cbl07XG5jb25zdCBjb29yZHM4ID0gW1xuICBbNiwgNF0sXG4gIFs2LCA1XSxcbiAgWzYsIDZdXG5dO1xuY29uc3QgY29vcmRzOSA9IFtcbiAgWzgsIDZdLFxuICBbOCwgN11cbl07XG5cbi8vKiAjIyMjIyMjIyMjIyMjIEdBTUVGTE9XICMjIyMjIyMjIyMjIyMjIyMjI1xuY29uc3QgYm9hcmQgPSBnYW1lYm9hcmRzWzBdO1xuXG5sZXQgZ2FtZU92ZXIgPSBmYWxzZTtcblxuLy8gUGxheWVyIGNob29zZXMgc2hpcCBjb29yZGluYXRlc1xuY29uc3QgdGVzdENvb3JkczEgPSBbY29vcmRzMCwgY29vcmRzMSwgY29vcmRzMiwgY29vcmRzMywgY29vcmRzNF07XG5jb25zdCBwbGF5ZXIgPSBQbGF5ZXIoXCJwbGF5ZXJcIiwgdGVzdENvb3JkczEpO1xuXG4vLyBDb21wdXRlciByYW5kb21seSBjaG9vc2VzIHNoaXAgY29vcmRpbmF0ZXNcbmNvbnN0IHRlc3RDb29yZHMyID0gW2Nvb3JkczUsIGNvb3JkczYsIGNvb3JkczcsIGNvb3JkczgsIGNvb3JkczldO1xuY29uc3QgY29tcHV0ZXIgPSBQbGF5ZXIoXCJjb21wdXRlclwiLCB0ZXN0Q29vcmRzMik7XG5cbmNvbnNvbGUubG9nKHBsYXllcik7XG5jb25zb2xlLmxvZyhjb21wdXRlcik7XG5jb25zb2xlLmxvZyhib2FyZCk7XG5cbi8vIERpc3BsYXkgYm9hdHMgb24gYm9hcmRcbmRpc3BsYXlCb2F0cyhwbGF5ZXIpO1xuZGlzcGxheUJvYXRzKGNvbXB1dGVyKTtcblxuLy8gR2FtZSB0dXJuXG4vLyB3aGlsZSAoZ2FtZU92ZXIgPT09IGZhbHNlKSB7XG4vLyAgIC8vIFBsYXllciB0dXJuXG4vLyB9XG5cbmJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBjb25zdCBzcXVhcmUgPSBlLnRhcmdldC5jbG9zZXN0KFwiLnNxdWFyZVwiKTtcbiAgaWYgKCFzcXVhcmUpIHJldHVybjtcblxuICBjb25zdCBjb29yZCA9IGdldEF0dGFja0Nvb3JkcyhzcXVhcmUpO1xuXG4gIGNvbnNvbGUubG9nKGNvb3JkKTtcblxuICBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyLmdhbWVib2FyZCwgY29vcmQpO1xuICBjb25zb2xlLmxvZyhwbGF5ZXIpO1xuICBjb25zb2xlLmxvZyhjb21wdXRlcik7XG59KTtcblxuLy8gcGxheWVyLmF0dGFjayhjb21wdXRlci5nYW1lYm9hcmQsIFswLCAwXSk7XG4vLyBjb21wdXRlci5hdHRhY2socGxheWVyLmdhbWVib2FyZCwgWzUsIDVdKTtcbi8vIHBsYXllci5hdHRhY2soY29tcHV0ZXIuZ2FtZWJvYXJkLCBbMCwgMF0pO1xuLy8gcGxheWVyLmF0dGFjayhjb21wdXRlci5nYW1lYm9hcmQsIFswLCAxXSk7XG4vLyBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyLmdhbWVib2FyZCwgWzEsIDBdKTtcbi8vIHBsYXllci5hdHRhY2soY29tcHV0ZXIuZ2FtZWJvYXJkLCBbMiwgMF0pO1xuLy8gcGxheWVyLmF0dGFjayhjb21wdXRlci5nYW1lYm9hcmQsIFszLCAwXSk7XG4vLyBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyLmdhbWVib2FyZCwgWzQsIDBdKTtcblxuLy8gY29uc29sZS5sb2coY29tcHV0ZXIpO1xuLy8gY29uc29sZS5sb2cocGxheWVyKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==