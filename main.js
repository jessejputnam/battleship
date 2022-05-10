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

  const checkAllSunk = function () {
    // Create array of all sunk checks
    const sunkArr = [];

    // Populate the array with sunk checks
    for (let ship in this.ships) {
      sunkArr.push(ships[ship].sunk);
    }

    // Evaluate the array for all sunk checks === true
    return sunkArr.every((el) => el === true);
  };

  return {
    ships,
    misses,
    receiveAttack,
    hits,
    checkAllSunk
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
/* harmony import */ var _getAttackCoords__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getAttackCoords */ "./src/getAttackCoords.js");





const Player = function (playerName, coords) {
  const gameboard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)(...coords);
  const guesses = [];
  let defeat = false;

  const attack = function (enemy, square) {
    // console.log(enemy);
    const coords =
      enemy.playerName === "player"
        ? (0,_getAttackCoords__WEBPACK_IMPORTED_MODULE_1__.getAttackCoordsComp)()
        : (0,_getAttackCoords__WEBPACK_IMPORTED_MODULE_1__.getAttackCoordsPlayer)(square);

    const turn = enemy.gameboard.receiveAttack(coords);

    // Exit if already guessed
    if (turn === false) return this;

    // Add guess to array
    guesses.push(coords);

    // Check defeat
    enemy.defeat = enemy.gameboard.checkAllSunk();
  };

  return { playerName, guesses, attack, gameboard, defeat };
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
/* harmony export */   "getAttackCoordsComp": () => (/* binding */ getAttackCoordsComp),
/* harmony export */   "getAttackCoordsPlayer": () => (/* binding */ getAttackCoordsPlayer)
/* harmony export */ });


const getAttackCoordsPlayer = function (square) {
  const row = square.parentElement.classList[1].slice(-1);
  const col = square.classList[1].slice(-1);
  return [parseInt(row, 10), parseInt(col, 10)];
};

const getAttackCoordsComp = function () {
  return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
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




// import { getAttackCoords } from "./getAttackCoords";

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

// Display boats on board
(0,_domInteraction__WEBPACK_IMPORTED_MODULE_1__.displayBoats)(player);
(0,_domInteraction__WEBPACK_IMPORTED_MODULE_1__.displayBoats)(computer);

board.addEventListener("click", (e) => {
  const square = e.target.closest(".square");
  if (!square) return;

  // Disallow already clicked squares
  if (square.classList.contains("square--hit")) return;
  if (square.classList.contains("square--miss")) return;

  // Player turn
  console.log("Player turn");
  player.attack(computer, square);
  console.log(player);

  //  Check for defeat
  if (computer.defeat === true) {
    console.log("Player wins!");
    //! Add display game over and restart
    return;
  }

  //! Deal with computer double guess
  //! Deal with computer intelligence?
  console.log("computer turn");
  computer.attack(player);
  console.log(computer);

  if (player.defeat === true) {
    console.log("Computer Wins!");
    //! Add display game over and restart
    return;
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLDBEQUFhOztBQUUzQjs7QUFFQTtBQUNBO0FBQ0EsZUFBZSwrQ0FBTTs7QUFFckI7QUFDQTtBQUNBLGlCQUFpQiwrQ0FBTTs7QUFFdkI7QUFDQTs7QUFFQTtBQUNBLDZEQUFZO0FBQ1osNkRBQVk7O0FBRVo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBseUhpdERhbWFnZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FyckVxdWFsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb21JbnRlcmFjdGlvbi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dldEF0dGFja0Nvb3Jkcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2hpdENoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcHJldkd1ZXNzQ2hlY2suanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gR2FtZWJvYXJkXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL1NoaXBcIjtcbmltcG9ydCB7IHByZXZHdWVzc0NoZWNrIH0gZnJvbSBcIi4vcHJldkd1ZXNzQ2hlY2tcIjtcbmltcG9ydCB7IGhpdENoZWNrIH0gZnJvbSBcIi4vaGl0Q2hlY2tcIjtcbmltcG9ydCB7IGFwcGx5SGl0RGFtYWdlIH0gZnJvbSBcIi4vYXBwbHlIaXREYW1hZ2VcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gZnVuY3Rpb24gKGNvb3JkczAsIGNvb3JkczEsIGNvb3JkczIsIGNvb3JkczMsIGNvb3JkczQpIHtcbiAgLy8gU2hpcHNcbiAgY29uc3Qgc2hpcHMgPSB7XG4gICAgY2FycmllcjogU2hpcChjb29yZHMwKSxcbiAgICBiYXR0bGVzaGlwOiBTaGlwKGNvb3JkczEpLFxuICAgIGRlc3Ryb3llcjogU2hpcChjb29yZHMyKSxcbiAgICBzdWJtYXJpbmU6IFNoaXAoY29vcmRzMyksXG4gICAgcGF0cm9sOiBTaGlwKGNvb3JkczQpXG4gIH07XG5cbiAgLy8gRW5lbXkgR3Vlc3MgQXJyYXlzXG4gIGNvbnN0IG1pc3NlcyA9IFtdO1xuICBjb25zdCBoaXRzID0gW107XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICAvLyBDaGVjayBpZiBhbHJlYWR5IGd1ZXNzZWRcbiAgICBpZiAocHJldkd1ZXNzQ2hlY2sodGhpcywgY29vcmRzKS5pbmNsdWRlcyh0cnVlKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gQ2hlY2sgaWYgZ3Vlc3MgaXMgYSBoaXQgb24gYSBzaGlwXG4gICAgY29uc3QgaGl0Q2hlY2tBcnIgPSBoaXRDaGVjayh0aGlzLCBjb29yZHMpO1xuXG4gICAgLy8gSWYgbm9uZSBzaG93IGhpdCwgcHV0IGludG8gbWlzc2VzIGFycmF5XG4gICAgaWYgKGhpdENoZWNrQXJyLmV2ZXJ5KCh4KSA9PiB4ID09PSBmYWxzZSkpIHtcbiAgICAgIG1pc3Nlcy5wdXNoKGNvb3Jkcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBJZiBndWVzcyBzaG93cyBoaXRcbiAgICBpZiAoaGl0Q2hlY2tBcnIuc29tZSgoeCkgPT4geCA9PT0gdHJ1ZSkpIHtcbiAgICAgIGhpdHMucHVzaChjb29yZHMpO1xuICAgICAgcmV0dXJuIGFwcGx5SGl0RGFtYWdlKHRoaXMsIGhpdENoZWNrQXJyLCBjb29yZHMpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGVja0FsbFN1bmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gQ3JlYXRlIGFycmF5IG9mIGFsbCBzdW5rIGNoZWNrc1xuICAgIGNvbnN0IHN1bmtBcnIgPSBbXTtcblxuICAgIC8vIFBvcHVsYXRlIHRoZSBhcnJheSB3aXRoIHN1bmsgY2hlY2tzXG4gICAgZm9yIChsZXQgc2hpcCBpbiB0aGlzLnNoaXBzKSB7XG4gICAgICBzdW5rQXJyLnB1c2goc2hpcHNbc2hpcF0uc3Vuayk7XG4gICAgfVxuXG4gICAgLy8gRXZhbHVhdGUgdGhlIGFycmF5IGZvciBhbGwgc3VuayBjaGVja3MgPT09IHRydWVcbiAgICByZXR1cm4gc3Vua0Fyci5ldmVyeSgoZWwpID0+IGVsID09PSB0cnVlKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNoaXBzLFxuICAgIG1pc3NlcyxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGhpdHMsXG4gICAgY2hlY2tBbGxTdW5rXG4gIH07XG59O1xuXG5leHBvcnQgeyBHYW1lYm9hcmQgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcbmltcG9ydCB7IGdldEF0dGFja0Nvb3Jkc0NvbXAsIGdldEF0dGFja0Nvb3Jkc1BsYXllciB9IGZyb20gXCIuL2dldEF0dGFja0Nvb3Jkc1wiO1xuXG5jb25zdCBQbGF5ZXIgPSBmdW5jdGlvbiAocGxheWVyTmFtZSwgY29vcmRzKSB7XG4gIGNvbnN0IGdhbWVib2FyZCA9IEdhbWVib2FyZCguLi5jb29yZHMpO1xuICBjb25zdCBndWVzc2VzID0gW107XG4gIGxldCBkZWZlYXQgPSBmYWxzZTtcblxuICBjb25zdCBhdHRhY2sgPSBmdW5jdGlvbiAoZW5lbXksIHNxdWFyZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKGVuZW15KTtcbiAgICBjb25zdCBjb29yZHMgPVxuICAgICAgZW5lbXkucGxheWVyTmFtZSA9PT0gXCJwbGF5ZXJcIlxuICAgICAgICA/IGdldEF0dGFja0Nvb3Jkc0NvbXAoKVxuICAgICAgICA6IGdldEF0dGFja0Nvb3Jkc1BsYXllcihzcXVhcmUpO1xuXG4gICAgY29uc3QgdHVybiA9IGVuZW15LmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3Jkcyk7XG5cbiAgICAvLyBFeGl0IGlmIGFscmVhZHkgZ3Vlc3NlZFxuICAgIGlmICh0dXJuID09PSBmYWxzZSkgcmV0dXJuIHRoaXM7XG5cbiAgICAvLyBBZGQgZ3Vlc3MgdG8gYXJyYXlcbiAgICBndWVzc2VzLnB1c2goY29vcmRzKTtcblxuICAgIC8vIENoZWNrIGRlZmVhdFxuICAgIGVuZW15LmRlZmVhdCA9IGVuZW15LmdhbWVib2FyZC5jaGVja0FsbFN1bmsoKTtcbiAgfTtcblxuICByZXR1cm4geyBwbGF5ZXJOYW1lLCBndWVzc2VzLCBhdHRhY2ssIGdhbWVib2FyZCwgZGVmZWF0IH07XG59O1xuXG5leHBvcnQgeyBQbGF5ZXIgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBTaGlwID0gZnVuY3Rpb24gKGNvb3Jkcykge1xuICAvLyBDcmVhdGUgc2hpcCBjb29yZGluYXRlIGFycmF5ID0gW1tbY29vcmRzXSwgaGl0XSwgW1tjb29yZHNdLCBoaXRdLCBbW2Nvb3Jkc10sIGhpdF1dXG4gIGNvbnN0IGxvY2F0aW9uID0gY29vcmRzLm1hcCgoY29vcmQpID0+IFtjb29yZCwgZmFsc2VdKTtcbiAgbGV0IHN1bmsgPSBmYWxzZTtcblxuICBjb25zdCBoaXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICB0aGlzLmxvY2F0aW9uW2luZGV4XVsxXSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmxvY2F0aW9uLmV2ZXJ5KChjb29yZCkgPT4gY29vcmRbMV0gPT09IHRydWUpKSB0aGlzLnN1bmsgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiB7IGxvY2F0aW9uLCBzdW5rLCBoaXQsIGlzU3VuayB9O1xufTtcblxuZXhwb3J0IHsgU2hpcCB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGFyckVxdWFsQ2hlY2sgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5cbmNvbnN0IGdldEhpdFNoaXBJbmRleCA9IGZ1bmN0aW9uIChzaGlwLCBjb29yZHMpIHtcbiAgcmV0dXJuIHNoaXAubG9jYXRpb24uZmluZEluZGV4KChlbCkgPT4gYXJyRXF1YWxDaGVjayhlbFswXSwgY29vcmRzKSk7XG59O1xuXG5jb25zdCBhcHBseUhpdERhbWFnZSA9IGZ1bmN0aW9uIChnYW1lYm9hcmQsIGhpdENoZWNrQXJyLCBjb29yZHMpIHtcbiAgY29uc3Qgc2hpcHMgPSBbXCJjYXJyaWVyXCIsIFwiYmF0dGxlc2hpcFwiLCBcImRlc3Ryb3llclwiLCBcInN1Ym1hcmluZVwiLCBcInBhdHJvbFwiXTtcblxuICAvLyBJZGVudGlmeSB3aGljaCBzaGlwIHdhcyBoaXRcbiAgY29uc3QgaGl0U2hpcCA9IHNoaXBzW2hpdENoZWNrQXJyLmluZGV4T2YodHJ1ZSldO1xuXG4gIC8vIElkZW50aWZ5IGluZGV4IHdoZXJlIHNoaXAgd2FzIGhpdFxuICBjb25zdCBoaXRTaGlwSW5kZXggPSBnZXRIaXRTaGlwSW5kZXgoZ2FtZWJvYXJkLnNoaXBzW2hpdFNoaXBdLCBjb29yZHMpO1xuXG4gIC8vIEFwcGx5IGRhbWFnZSB3aXRoIG1ldGhvZFxuICBnYW1lYm9hcmQuc2hpcHNbaGl0U2hpcF0uaGl0KGhpdFNoaXBJbmRleCk7XG5cbiAgLy8gQ2hlY2sgaWYgc2hpcCBpcyBzdW5rXG4gIGdhbWVib2FyZC5zaGlwc1toaXRTaGlwXS5pc1N1bmsoKTtcblxuICByZXR1cm4gZ2FtZWJvYXJkO1xufTtcblxuZXhwb3J0IHsgYXBwbHlIaXREYW1hZ2UgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBhcnJFcXVhbENoZWNrID0gZnVuY3Rpb24gKGFycjEsIGFycjIpIHtcbiAgcmV0dXJuIGFycjEuZXZlcnkoKHZhbCwgaW5kZXgpID0+IHZhbCA9PT0gYXJyMltpbmRleF0pO1xufTtcblxuZXhwb3J0IHsgYXJyRXF1YWxDaGVjayB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIERPTSBWQVJJQUJMRVMgKi9cbmNvbnN0IGdhbWVib2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdhbWVib2FyZFwiKTtcbmNvbnN0IHJvd3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJvd1wiKTtcbmNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNxdWFyZVwiKTtcblxuY29uc3QgZGlzcGxheUJvYXRzID0gZnVuY3Rpb24gKHBsYXllcikge1xuICAvLyBMb29wIG92ZXIgZWFjaCBzaGlwIG9mIHBsYXllclxuICBmb3IgKGxldCBzaGlwIGluIHBsYXllci5nYW1lYm9hcmQuc2hpcHMpIHtcbiAgICAvLyBHZXQgc2hpcCBjb29yZGluYXRlc1xuICAgIHBsYXllci5nYW1lYm9hcmQuc2hpcHNbc2hpcF0ubG9jYXRpb24uZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIGNvbnN0IGdhbWVib2FyZCA9XG4gICAgICAgIHBsYXllci5wbGF5ZXJOYW1lID09PSBcImNvbXB1dGVyXCIgPyBnYW1lYm9hcmRzWzBdIDogZ2FtZWJvYXJkc1sxXTtcbiAgICAgIGNvbnN0IHJvdyA9IGdhbWVib2FyZC5jaGlsZHJlbltjb29yZFswXVswXV07XG4gICAgICBjb25zdCBzcXVhcmUgPSByb3cuY2hpbGRyZW5bY29vcmRbMF1bMV1dO1xuXG4gICAgICAvLyBBZGQgc2hpcCBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChgc3F1YXJlLS0ke3NoaXB9YCk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCB7IGRpc3BsYXlCb2F0cywgc3F1YXJlcywgcm93cywgZ2FtZWJvYXJkcyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGdldEF0dGFja0Nvb3Jkc1BsYXllciA9IGZ1bmN0aW9uIChzcXVhcmUpIHtcbiAgY29uc3Qgcm93ID0gc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0WzFdLnNsaWNlKC0xKTtcbiAgY29uc3QgY29sID0gc3F1YXJlLmNsYXNzTGlzdFsxXS5zbGljZSgtMSk7XG4gIHJldHVybiBbcGFyc2VJbnQocm93LCAxMCksIHBhcnNlSW50KGNvbCwgMTApXTtcbn07XG5cbmNvbnN0IGdldEF0dGFja0Nvb3Jkc0NvbXAgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCldO1xufTtcblxuZXhwb3J0IHsgZ2V0QXR0YWNrQ29vcmRzUGxheWVyLCBnZXRBdHRhY2tDb29yZHNDb21wIH07XG4iLCIvLyBDaGVjayBpZiBhIGd1ZXNzZWQgY29vcmRpbmF0ZSBoaXRzIGEgc2hpcFxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGFyckVxdWFsQ2hlY2sgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5cbmNvbnN0IGhpdENoZWNrID0gZnVuY3Rpb24gKGdhbWVib2FyZCwgY29vcmRzKSB7XG4gIC8vIENyZWF0ZSBhcnJheSBmb3Igc2hpcCBoaXQgY2hlY2tcbiAgY29uc3Qgb3V0cHV0ID0gW107XG5cbiAgLy8gTG9vcCBvdmVyIHNoaXBzIHRvIGNoZWNrIGlmIGNvb3JkcyBpcyBhIGhpdCBmb3IgYW55XG4gIGZvciAobGV0IHNoaXAgaW4gZ2FtZWJvYXJkLnNoaXBzKSB7XG4gICAgb3V0cHV0LnB1c2goXG4gICAgICBnYW1lYm9hcmQuc2hpcHNbc2hpcF0ubG9jYXRpb25cbiAgICAgICAgLm1hcCgoY29vcmQpID0+IGFyckVxdWFsQ2hlY2soY29vcmRbMF0sIGNvb3JkcykpXG4gICAgICAgIC5pbmNsdWRlcyh0cnVlKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0IHsgaGl0Q2hlY2sgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJFcXVhbENoZWNrIH0gZnJvbSBcIi4vYXJyRXF1YWxDaGVja1wiO1xuXG5jb25zdCBwcmV2R3Vlc3NDaGVjayA9IChnYW1lYm9hcmQsIGNvb3JkcykgPT4ge1xuICBjb25zdCBvdXRwdXQgPSBbXTtcblxuICBvdXRwdXQucHVzaChcbiAgICBnYW1lYm9hcmQubWlzc2VzLm1hcCgoY29vcmQpID0+IGFyckVxdWFsQ2hlY2soY29vcmQsIGNvb3JkcykpLmluY2x1ZGVzKHRydWUpXG4gICk7XG5cbiAgb3V0cHV0LnB1c2goXG4gICAgZ2FtZWJvYXJkLmhpdHMubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZCwgY29vcmRzKSkuaW5jbHVkZXModHJ1ZSlcbiAgKTtcblxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0IHsgcHJldkd1ZXNzQ2hlY2sgfTtcblxuLy8gY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vUGxheWVyXCI7XG5pbXBvcnQgeyBkaXNwbGF5Qm9hdHMsIHNxdWFyZXMsIGdhbWVib2FyZHMgfSBmcm9tIFwiLi9kb21JbnRlcmFjdGlvblwiO1xuLy8gaW1wb3J0IHsgZ2V0QXR0YWNrQ29vcmRzIH0gZnJvbSBcIi4vZ2V0QXR0YWNrQ29vcmRzXCI7XG5cbi8vIGNhcnJpZXJcbmNvbnN0IGNvb3JkczAgPSBbXG4gIFsyLCA5XSxcbiAgWzMsIDldLFxuICBbNCwgOV0sXG4gIFs1LCA5XSxcbiAgWzYsIDldXG5dO1xuLy8gYmF0dGxlc2hpcFxuY29uc3QgY29vcmRzMSA9IFtcbiAgWzIsIDBdLFxuICBbMywgMF0sXG4gIFs0LCAwXSxcbiAgWzUsIDBdXG5dO1xuLy8gZGVzdHJveWVyXG5jb25zdCBjb29yZHMyID0gW1xuICBbMCwgMV0sXG4gIFswLCAyXSxcbiAgWzAsIDNdXG5dO1xuLy8gc3VibWFyaW5lXG5jb25zdCBjb29yZHMzID0gW1xuICBbMywgM10sXG4gIFszLCA0XSxcbiAgWzMsIDVdXG5dO1xuLy8gcGF0cm9sXG5jb25zdCBjb29yZHM0ID0gW1xuICBbNywgNF0sXG4gIFs3LCA1XVxuXTtcblxuY29uc3QgY29vcmRzNSA9IFtcbiAgWzAsIDBdLFxuICBbMSwgMF0sXG4gIFsyLCAwXSxcbiAgWzMsIDBdLFxuICBbNCwgMF1cbl07XG5jb25zdCBjb29yZHM2ID0gW1xuICBbNCwgMV0sXG4gIFs1LCAxXSxcbiAgWzYsIDFdLFxuICBbNywgMV1cbl07XG5jb25zdCBjb29yZHM3ID0gW1xuICBbMiwgMl0sXG4gIFsyLCAzXSxcbiAgWzIsIDRdXG5dO1xuY29uc3QgY29vcmRzOCA9IFtcbiAgWzYsIDRdLFxuICBbNiwgNV0sXG4gIFs2LCA2XVxuXTtcbmNvbnN0IGNvb3JkczkgPSBbXG4gIFs4LCA2XSxcbiAgWzgsIDddXG5dO1xuXG4vLyogIyMjIyMjIyMjIyMjIyBHQU1FRkxPVyAjIyMjIyMjIyMjIyMjIyMjIyNcbmNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkc1swXTtcblxubGV0IGdhbWVPdmVyID0gZmFsc2U7XG5cbi8vIFBsYXllciBjaG9vc2VzIHNoaXAgY29vcmRpbmF0ZXNcbmNvbnN0IHRlc3RDb29yZHMxID0gW2Nvb3JkczAsIGNvb3JkczEsIGNvb3JkczIsIGNvb3JkczMsIGNvb3JkczRdO1xuY29uc3QgcGxheWVyID0gUGxheWVyKFwicGxheWVyXCIsIHRlc3RDb29yZHMxKTtcblxuLy8gQ29tcHV0ZXIgcmFuZG9tbHkgY2hvb3NlcyBzaGlwIGNvb3JkaW5hdGVzXG5jb25zdCB0ZXN0Q29vcmRzMiA9IFtjb29yZHM1LCBjb29yZHM2LCBjb29yZHM3LCBjb29yZHM4LCBjb29yZHM5XTtcbmNvbnN0IGNvbXB1dGVyID0gUGxheWVyKFwiY29tcHV0ZXJcIiwgdGVzdENvb3JkczIpO1xuXG5jb25zb2xlLmxvZyhwbGF5ZXIpO1xuY29uc29sZS5sb2coY29tcHV0ZXIpO1xuXG4vLyBEaXNwbGF5IGJvYXRzIG9uIGJvYXJkXG5kaXNwbGF5Qm9hdHMocGxheWVyKTtcbmRpc3BsYXlCb2F0cyhjb21wdXRlcik7XG5cbmJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBjb25zdCBzcXVhcmUgPSBlLnRhcmdldC5jbG9zZXN0KFwiLnNxdWFyZVwiKTtcbiAgaWYgKCFzcXVhcmUpIHJldHVybjtcblxuICAvLyBEaXNhbGxvdyBhbHJlYWR5IGNsaWNrZWQgc3F1YXJlc1xuICBpZiAoc3F1YXJlLmNsYXNzTGlzdC5jb250YWlucyhcInNxdWFyZS0taGl0XCIpKSByZXR1cm47XG4gIGlmIChzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwic3F1YXJlLS1taXNzXCIpKSByZXR1cm47XG5cbiAgLy8gUGxheWVyIHR1cm5cbiAgY29uc29sZS5sb2coXCJQbGF5ZXIgdHVyblwiKTtcbiAgcGxheWVyLmF0dGFjayhjb21wdXRlciwgc3F1YXJlKTtcbiAgY29uc29sZS5sb2cocGxheWVyKTtcblxuICAvLyAgQ2hlY2sgZm9yIGRlZmVhdFxuICBpZiAoY29tcHV0ZXIuZGVmZWF0ID09PSB0cnVlKSB7XG4gICAgY29uc29sZS5sb2coXCJQbGF5ZXIgd2lucyFcIik7XG4gICAgLy8hIEFkZCBkaXNwbGF5IGdhbWUgb3ZlciBhbmQgcmVzdGFydFxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vISBEZWFsIHdpdGggY29tcHV0ZXIgZG91YmxlIGd1ZXNzXG4gIC8vISBEZWFsIHdpdGggY29tcHV0ZXIgaW50ZWxsaWdlbmNlP1xuICBjb25zb2xlLmxvZyhcImNvbXB1dGVyIHR1cm5cIik7XG4gIGNvbXB1dGVyLmF0dGFjayhwbGF5ZXIpO1xuICBjb25zb2xlLmxvZyhjb21wdXRlcik7XG5cbiAgaWYgKHBsYXllci5kZWZlYXQgPT09IHRydWUpIHtcbiAgICBjb25zb2xlLmxvZyhcIkNvbXB1dGVyIFdpbnMhXCIpO1xuICAgIC8vISBBZGQgZGlzcGxheSBnYW1lIG92ZXIgYW5kIHJlc3RhcnRcbiAgICByZXR1cm47XG4gIH1cbn0pO1xuXG4vLyBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyLmdhbWVib2FyZCwgWzAsIDBdKTtcbi8vIGNvbXB1dGVyLmF0dGFjayhwbGF5ZXIuZ2FtZWJvYXJkLCBbNSwgNV0pO1xuLy8gcGxheWVyLmF0dGFjayhjb21wdXRlci5nYW1lYm9hcmQsIFswLCAwXSk7XG4vLyBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyLmdhbWVib2FyZCwgWzAsIDFdKTtcbi8vIHBsYXllci5hdHRhY2soY29tcHV0ZXIuZ2FtZWJvYXJkLCBbMSwgMF0pO1xuLy8gcGxheWVyLmF0dGFjayhjb21wdXRlci5nYW1lYm9hcmQsIFsyLCAwXSk7XG4vLyBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyLmdhbWVib2FyZCwgWzMsIDBdKTtcbi8vIHBsYXllci5hdHRhY2soY29tcHV0ZXIuZ2FtZWJvYXJkLCBbNCwgMF0pO1xuXG4vLyBjb25zb2xlLmxvZyhjb21wdXRlcik7XG4vLyBjb25zb2xlLmxvZyhwbGF5ZXIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9