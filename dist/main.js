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
        ? (0,_getAttackCoords__WEBPACK_IMPORTED_MODULE_1__.getAttackCoordsComp)(guesses)
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
/* harmony import */ var _arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrEqualCheck */ "./src/arrEqualCheck.js");
/* harmony import */ var _getRandomCoords__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getRandomCoords */ "./src/getRandomCoords.js");



("use strict");

const getAttackCoordsPlayer = function (square) {
  const row = square.parentElement.classList[1].slice(-1);
  const col = square.classList[1].slice(-1);
  return [parseInt(row, 10), parseInt(col, 10)];
};

const getAttackCoordsComp = function (guesses) {
  let coord, checkPrevGuesses;

  do {
    // Choose random coordinate
    coord = (0,_getRandomCoords__WEBPACK_IMPORTED_MODULE_1__.getRandomCoords)();

    // Check if coordinate was already guessed
    checkPrevGuesses = guesses.map((guess) => (0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__.arrEqualCheck)(coord, guess));
  } while (checkPrevGuesses.includes(true) && guesses.length < 100);

  if (guesses.length > 99) {
    throw new Error("No more guesses available");
  }
  return coord;
};




/***/ }),

/***/ "./src/getCompShipCoords.js":
/*!**********************************!*\
  !*** ./src/getCompShipCoords.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCompShipCoords": () => (/* binding */ getCompShipCoords)
/* harmony export */ });
/* harmony import */ var _getRandomCoords__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getRandomCoords */ "./src/getRandomCoords.js");
/* harmony import */ var _arrEqualCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrEqualCheck */ "./src/arrEqualCheck.js");



("use strict");

const getCompShipCoords = function () {
  const allShips = [];
  // let coords = getRandomCoords();
  // create ship(length)
  const makeShip = function (length) {
    const shipArr = [];
    const allShipsFlat = allShips.flat();

    // Get first coordinate
    let coord;
    do {
      coord = (0,_getRandomCoords__WEBPACK_IMPORTED_MODULE_0__.getRandomCoords)();
    } while (allShipsFlat.map((c) => (0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_1__.arrEqualCheck)(c, coord)).includes(true));

    // Add first coordinate to ship array
    shipArr.push(coord);

    // Building from first coordinate

    // Get possible directions against edge of board.
    /*
    Array will output which of the 4 would be valid.
    [x-positive, x-negative, y-positive, y-negative]
    */
    const possibleDirs = [
      shipArr[0][0] + 5 > 9,
      shipArr[0][0] - 5 < 0,
      shipArr[0][1] + 5 > 9,
      shipArr[0][1] - 5 < 0
    ]
      .map((x, i) => (x === false ? i : " "))
      .filter((x) => x !== " ");

    console.log(possibleDirs);
    // Filter for previous ship coordinate incompatability
    // allShipsFlat.

    const dirChoice =
      possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
    console.log(dirChoice);

    /*
    for (let i = 0; i < length; i++) {
      const allShipsCheck = allShips.flat().map((c) => arrEqualCheck(c, coord));

      // For first coordinate
      if (i === 0) {
        let coord;

        // Get random coordinate
        do {
          coord = getRandomCoords();
        } while (allShipsCheck.includes(true));

        shipArr.push(coord);
      }

      // For building from first coordinate
      if (i > 0) {
        shipArr.push(i);
        // Get possible directions against edge of board
        // Array will output which of the 4 would be valid
        // [x-positive, x-negative, y-positive, y-negative]
        const possibleDirs = [
          shipArr[0][0] + 5 > 9,
          shipArr[0][0] - 5 < 0,
          shipArr[0][1] + 5 > 9,
          shipArr[0][1] - 5 < 0
        ]
          .map((x, i) => (x === false ? i : " "))
          .filter((x) => x !== " ");

        const dirChoice =
          possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
        console.log(dirChoice);
      }
    }
    console.log(shipArr);
    return shipArr;
    */
  };

  allShips.push(makeShip(3));

  return allShips;
};



// [0] carrier, [1] battleship, [2] destroyer, [3] submarine, [4] patrol


/***/ }),

/***/ "./src/getRandomCoords.js":
/*!********************************!*\
  !*** ./src/getRandomCoords.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getNum": () => (/* binding */ getNum),
/* harmony export */   "getRandomCoords": () => (/* binding */ getRandomCoords)
/* harmony export */ });


const getRandomCoords = function () {
  return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
};

const getNum = function () {
  return Math.floor(Math.random() * 10);
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
/* harmony import */ var _getCompShipCoords__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getCompShipCoords */ "./src/getCompShipCoords.js");






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
  // console.log("Player turn");
  player.attack(computer, square);
  // console.log(player);

  //  Check for defeat
  if (computer.defeat === true) {
    console.log("Player wins!");
    //! Add display game over and restart
    return;
  }

  //! Deal with computer intelligence?
  // console.log("computer turn");
  computer.attack(player);
  // console.log(computer);
  console.log(computer.guesses);

  if (player.defeat === true) {
    console.log("Computer Wins!");
    //! Add display game over and restart
    return;
  }
});

const check = (0,_getCompShipCoords__WEBPACK_IMPORTED_MODULE_2__.getCompShipCoords)();
console.log(check);

// const check1 = [
//   [
//     [1, 6],
//     [2, 6],
//     [3, 6]
//   ],
//   [
//     [7, 2],
//     [7, 3],
//     [7, 4],
//     [7, 5]
//   ],
//   [
//     [0, 0],
//     [0, 1]
//   ]
// ];
// console.log(check1);
// console.log(check1.flat());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDWiw2REFBWTs7QUFFWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGNBQWMscUVBQWlCO0FBQy9COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwbHlIaXREYW1hZ2UuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcnJFcXVhbENoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tSW50ZXJhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nZXRBdHRhY2tDb29yZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nZXRDb21wU2hpcENvb3Jkcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dldFJhbmRvbUNvb3Jkcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2hpdENoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcHJldkd1ZXNzQ2hlY2suanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gR2FtZWJvYXJkXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL1NoaXBcIjtcbmltcG9ydCB7IHByZXZHdWVzc0NoZWNrIH0gZnJvbSBcIi4vcHJldkd1ZXNzQ2hlY2tcIjtcbmltcG9ydCB7IGhpdENoZWNrIH0gZnJvbSBcIi4vaGl0Q2hlY2tcIjtcbmltcG9ydCB7IGFwcGx5SGl0RGFtYWdlIH0gZnJvbSBcIi4vYXBwbHlIaXREYW1hZ2VcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gZnVuY3Rpb24gKGNvb3JkczAsIGNvb3JkczEsIGNvb3JkczIsIGNvb3JkczMsIGNvb3JkczQpIHtcbiAgLy8gU2hpcHNcbiAgY29uc3Qgc2hpcHMgPSB7XG4gICAgY2FycmllcjogU2hpcChjb29yZHMwKSxcbiAgICBiYXR0bGVzaGlwOiBTaGlwKGNvb3JkczEpLFxuICAgIGRlc3Ryb3llcjogU2hpcChjb29yZHMyKSxcbiAgICBzdWJtYXJpbmU6IFNoaXAoY29vcmRzMyksXG4gICAgcGF0cm9sOiBTaGlwKGNvb3JkczQpXG4gIH07XG5cbiAgLy8gRW5lbXkgR3Vlc3MgQXJyYXlzXG4gIGNvbnN0IG1pc3NlcyA9IFtdO1xuICBjb25zdCBoaXRzID0gW107XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICAvLyBDaGVjayBpZiBhbHJlYWR5IGd1ZXNzZWRcbiAgICBpZiAocHJldkd1ZXNzQ2hlY2sodGhpcywgY29vcmRzKS5pbmNsdWRlcyh0cnVlKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gQ2hlY2sgaWYgZ3Vlc3MgaXMgYSBoaXQgb24gYSBzaGlwXG4gICAgY29uc3QgaGl0Q2hlY2tBcnIgPSBoaXRDaGVjayh0aGlzLCBjb29yZHMpO1xuXG4gICAgLy8gSWYgbm9uZSBzaG93IGhpdCwgcHV0IGludG8gbWlzc2VzIGFycmF5XG4gICAgaWYgKGhpdENoZWNrQXJyLmV2ZXJ5KCh4KSA9PiB4ID09PSBmYWxzZSkpIHtcbiAgICAgIG1pc3Nlcy5wdXNoKGNvb3Jkcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBJZiBndWVzcyBzaG93cyBoaXRcbiAgICBpZiAoaGl0Q2hlY2tBcnIuc29tZSgoeCkgPT4geCA9PT0gdHJ1ZSkpIHtcbiAgICAgIGhpdHMucHVzaChjb29yZHMpO1xuICAgICAgcmV0dXJuIGFwcGx5SGl0RGFtYWdlKHRoaXMsIGhpdENoZWNrQXJyLCBjb29yZHMpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGVja0FsbFN1bmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gQ3JlYXRlIGFycmF5IG9mIGFsbCBzdW5rIGNoZWNrc1xuICAgIGNvbnN0IHN1bmtBcnIgPSBbXTtcblxuICAgIC8vIFBvcHVsYXRlIHRoZSBhcnJheSB3aXRoIHN1bmsgY2hlY2tzXG4gICAgZm9yIChsZXQgc2hpcCBpbiB0aGlzLnNoaXBzKSB7XG4gICAgICBzdW5rQXJyLnB1c2goc2hpcHNbc2hpcF0uc3Vuayk7XG4gICAgfVxuXG4gICAgLy8gRXZhbHVhdGUgdGhlIGFycmF5IGZvciBhbGwgc3VuayBjaGVja3MgPT09IHRydWVcbiAgICByZXR1cm4gc3Vua0Fyci5ldmVyeSgoZWwpID0+IGVsID09PSB0cnVlKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNoaXBzLFxuICAgIG1pc3NlcyxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGhpdHMsXG4gICAgY2hlY2tBbGxTdW5rXG4gIH07XG59O1xuXG5leHBvcnQgeyBHYW1lYm9hcmQgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcbmltcG9ydCB7IGdldEF0dGFja0Nvb3Jkc0NvbXAsIGdldEF0dGFja0Nvb3Jkc1BsYXllciB9IGZyb20gXCIuL2dldEF0dGFja0Nvb3Jkc1wiO1xuXG5jb25zdCBQbGF5ZXIgPSBmdW5jdGlvbiAocGxheWVyTmFtZSwgY29vcmRzKSB7XG4gIGNvbnN0IGdhbWVib2FyZCA9IEdhbWVib2FyZCguLi5jb29yZHMpO1xuICBjb25zdCBndWVzc2VzID0gW107XG4gIGxldCBkZWZlYXQgPSBmYWxzZTtcblxuICBjb25zdCBhdHRhY2sgPSBmdW5jdGlvbiAoZW5lbXksIHNxdWFyZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKGVuZW15KTtcbiAgICBjb25zdCBjb29yZHMgPVxuICAgICAgZW5lbXkucGxheWVyTmFtZSA9PT0gXCJwbGF5ZXJcIlxuICAgICAgICA/IGdldEF0dGFja0Nvb3Jkc0NvbXAoZ3Vlc3NlcylcbiAgICAgICAgOiBnZXRBdHRhY2tDb29yZHNQbGF5ZXIoc3F1YXJlKTtcblxuICAgIGNvbnN0IHR1cm4gPSBlbmVteS5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuXG4gICAgLy8gRXhpdCBpZiBhbHJlYWR5IGd1ZXNzZWRcbiAgICBpZiAodHVybiA9PT0gZmFsc2UpIHJldHVybiB0aGlzO1xuXG4gICAgLy8gQWRkIGd1ZXNzIHRvIGFycmF5XG4gICAgZ3Vlc3Nlcy5wdXNoKGNvb3Jkcyk7XG5cbiAgICAvLyBDaGVjayBkZWZlYXRcbiAgICBlbmVteS5kZWZlYXQgPSBlbmVteS5nYW1lYm9hcmQuY2hlY2tBbGxTdW5rKCk7XG4gIH07XG5cbiAgcmV0dXJuIHsgcGxheWVyTmFtZSwgZ3Vlc3NlcywgYXR0YWNrLCBnYW1lYm9hcmQsIGRlZmVhdCB9O1xufTtcblxuZXhwb3J0IHsgUGxheWVyIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgU2hpcCA9IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgLy8gQ3JlYXRlIHNoaXAgY29vcmRpbmF0ZSBhcnJheSA9IFtbW2Nvb3Jkc10sIGhpdF0sIFtbY29vcmRzXSwgaGl0XSwgW1tjb29yZHNdLCBoaXRdXVxuICBjb25zdCBsb2NhdGlvbiA9IGNvb3Jkcy5tYXAoKGNvb3JkKSA9PiBbY29vcmQsIGZhbHNlXSk7XG4gIGxldCBzdW5rID0gZmFsc2U7XG5cbiAgY29uc3QgaGl0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgdGhpcy5sb2NhdGlvbltpbmRleF1bMV0gPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5sb2NhdGlvbi5ldmVyeSgoY29vcmQpID0+IGNvb3JkWzFdID09PSB0cnVlKSkgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4geyBsb2NhdGlvbiwgc3VuaywgaGl0LCBpc1N1bmsgfTtcbn07XG5cbmV4cG9ydCB7IFNoaXAgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJFcXVhbENoZWNrIH0gZnJvbSBcIi4vYXJyRXF1YWxDaGVja1wiO1xuXG5jb25zdCBnZXRIaXRTaGlwSW5kZXggPSBmdW5jdGlvbiAoc2hpcCwgY29vcmRzKSB7XG4gIHJldHVybiBzaGlwLmxvY2F0aW9uLmZpbmRJbmRleCgoZWwpID0+IGFyckVxdWFsQ2hlY2soZWxbMF0sIGNvb3JkcykpO1xufTtcblxuY29uc3QgYXBwbHlIaXREYW1hZ2UgPSBmdW5jdGlvbiAoZ2FtZWJvYXJkLCBoaXRDaGVja0FyciwgY29vcmRzKSB7XG4gIGNvbnN0IHNoaXBzID0gW1wiY2FycmllclwiLCBcImJhdHRsZXNoaXBcIiwgXCJkZXN0cm95ZXJcIiwgXCJzdWJtYXJpbmVcIiwgXCJwYXRyb2xcIl07XG5cbiAgLy8gSWRlbnRpZnkgd2hpY2ggc2hpcCB3YXMgaGl0XG4gIGNvbnN0IGhpdFNoaXAgPSBzaGlwc1toaXRDaGVja0Fyci5pbmRleE9mKHRydWUpXTtcblxuICAvLyBJZGVudGlmeSBpbmRleCB3aGVyZSBzaGlwIHdhcyBoaXRcbiAgY29uc3QgaGl0U2hpcEluZGV4ID0gZ2V0SGl0U2hpcEluZGV4KGdhbWVib2FyZC5zaGlwc1toaXRTaGlwXSwgY29vcmRzKTtcblxuICAvLyBBcHBseSBkYW1hZ2Ugd2l0aCBtZXRob2RcbiAgZ2FtZWJvYXJkLnNoaXBzW2hpdFNoaXBdLmhpdChoaXRTaGlwSW5kZXgpO1xuXG4gIC8vIENoZWNrIGlmIHNoaXAgaXMgc3Vua1xuICBnYW1lYm9hcmQuc2hpcHNbaGl0U2hpcF0uaXNTdW5rKCk7XG5cbiAgcmV0dXJuIGdhbWVib2FyZDtcbn07XG5cbmV4cG9ydCB7IGFwcGx5SGl0RGFtYWdlIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgYXJyRXF1YWxDaGVjayA9IGZ1bmN0aW9uIChhcnIxLCBhcnIyKSB7XG4gIHJldHVybiBhcnIxLmV2ZXJ5KCh2YWwsIGluZGV4KSA9PiB2YWwgPT09IGFycjJbaW5kZXhdKTtcbn07XG5cbmV4cG9ydCB7IGFyckVxdWFsQ2hlY2sgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBET00gVkFSSUFCTEVTICovXG5jb25zdCBnYW1lYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5nYW1lYm9hcmRcIik7XG5jb25zdCByb3dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yb3dcIik7XG5jb25zdCBzcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zcXVhcmVcIik7XG5cbmNvbnN0IGRpc3BsYXlCb2F0cyA9IGZ1bmN0aW9uIChwbGF5ZXIpIHtcbiAgLy8gTG9vcCBvdmVyIGVhY2ggc2hpcCBvZiBwbGF5ZXJcbiAgZm9yIChsZXQgc2hpcCBpbiBwbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzKSB7XG4gICAgLy8gR2V0IHNoaXAgY29vcmRpbmF0ZXNcbiAgICBwbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzW3NoaXBdLmxvY2F0aW9uLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBjb25zdCBnYW1lYm9hcmQgPVxuICAgICAgICBwbGF5ZXIucGxheWVyTmFtZSA9PT0gXCJjb21wdXRlclwiID8gZ2FtZWJvYXJkc1swXSA6IGdhbWVib2FyZHNbMV07XG4gICAgICBjb25zdCByb3cgPSBnYW1lYm9hcmQuY2hpbGRyZW5bY29vcmRbMF1bMF1dO1xuICAgICAgY29uc3Qgc3F1YXJlID0gcm93LmNoaWxkcmVuW2Nvb3JkWzBdWzFdXTtcblxuICAgICAgLy8gQWRkIHNoaXAgYmFja2dyb3VuZCBjb2xvclxuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYHNxdWFyZS0tJHtzaGlwfWApO1xuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgeyBkaXNwbGF5Qm9hdHMsIHNxdWFyZXMsIHJvd3MsIGdhbWVib2FyZHMgfTtcbiIsImltcG9ydCB7IGFyckVxdWFsQ2hlY2sgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5pbXBvcnQgeyBnZXRSYW5kb21Db29yZHMgfSBmcm9tIFwiLi9nZXRSYW5kb21Db29yZHNcIjtcblxuKFwidXNlIHN0cmljdFwiKTtcblxuY29uc3QgZ2V0QXR0YWNrQ29vcmRzUGxheWVyID0gZnVuY3Rpb24gKHNxdWFyZSkge1xuICBjb25zdCByb3cgPSBzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3RbMV0uc2xpY2UoLTEpO1xuICBjb25zdCBjb2wgPSBzcXVhcmUuY2xhc3NMaXN0WzFdLnNsaWNlKC0xKTtcbiAgcmV0dXJuIFtwYXJzZUludChyb3csIDEwKSwgcGFyc2VJbnQoY29sLCAxMCldO1xufTtcblxuY29uc3QgZ2V0QXR0YWNrQ29vcmRzQ29tcCA9IGZ1bmN0aW9uIChndWVzc2VzKSB7XG4gIGxldCBjb29yZCwgY2hlY2tQcmV2R3Vlc3NlcztcblxuICBkbyB7XG4gICAgLy8gQ2hvb3NlIHJhbmRvbSBjb29yZGluYXRlXG4gICAgY29vcmQgPSBnZXRSYW5kb21Db29yZHMoKTtcblxuICAgIC8vIENoZWNrIGlmIGNvb3JkaW5hdGUgd2FzIGFscmVhZHkgZ3Vlc3NlZFxuICAgIGNoZWNrUHJldkd1ZXNzZXMgPSBndWVzc2VzLm1hcCgoZ3Vlc3MpID0+IGFyckVxdWFsQ2hlY2soY29vcmQsIGd1ZXNzKSk7XG4gIH0gd2hpbGUgKGNoZWNrUHJldkd1ZXNzZXMuaW5jbHVkZXModHJ1ZSkgJiYgZ3Vlc3Nlcy5sZW5ndGggPCAxMDApO1xuXG4gIGlmIChndWVzc2VzLmxlbmd0aCA+IDk5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gbW9yZSBndWVzc2VzIGF2YWlsYWJsZVwiKTtcbiAgfVxuICByZXR1cm4gY29vcmQ7XG59O1xuXG5leHBvcnQgeyBnZXRBdHRhY2tDb29yZHNQbGF5ZXIsIGdldEF0dGFja0Nvb3Jkc0NvbXAgfTtcbiIsImltcG9ydCB7IGdldFJhbmRvbUNvb3JkcywgZ2V0TnVtIH0gZnJvbSBcIi4vZ2V0UmFuZG9tQ29vcmRzXCI7XG5pbXBvcnQgeyBhcnJFcXVhbENoZWNrIH0gZnJvbSBcIi4vYXJyRXF1YWxDaGVja1wiO1xuXG4oXCJ1c2Ugc3RyaWN0XCIpO1xuXG5jb25zdCBnZXRDb21wU2hpcENvb3JkcyA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYWxsU2hpcHMgPSBbXTtcbiAgLy8gbGV0IGNvb3JkcyA9IGdldFJhbmRvbUNvb3JkcygpO1xuICAvLyBjcmVhdGUgc2hpcChsZW5ndGgpXG4gIGNvbnN0IG1ha2VTaGlwID0gZnVuY3Rpb24gKGxlbmd0aCkge1xuICAgIGNvbnN0IHNoaXBBcnIgPSBbXTtcbiAgICBjb25zdCBhbGxTaGlwc0ZsYXQgPSBhbGxTaGlwcy5mbGF0KCk7XG5cbiAgICAvLyBHZXQgZmlyc3QgY29vcmRpbmF0ZVxuICAgIGxldCBjb29yZDtcbiAgICBkbyB7XG4gICAgICBjb29yZCA9IGdldFJhbmRvbUNvb3JkcygpO1xuICAgIH0gd2hpbGUgKGFsbFNoaXBzRmxhdC5tYXAoKGMpID0+IGFyckVxdWFsQ2hlY2soYywgY29vcmQpKS5pbmNsdWRlcyh0cnVlKSk7XG5cbiAgICAvLyBBZGQgZmlyc3QgY29vcmRpbmF0ZSB0byBzaGlwIGFycmF5XG4gICAgc2hpcEFyci5wdXNoKGNvb3JkKTtcblxuICAgIC8vIEJ1aWxkaW5nIGZyb20gZmlyc3QgY29vcmRpbmF0ZVxuXG4gICAgLy8gR2V0IHBvc3NpYmxlIGRpcmVjdGlvbnMgYWdhaW5zdCBlZGdlIG9mIGJvYXJkLlxuICAgIC8qXG4gICAgQXJyYXkgd2lsbCBvdXRwdXQgd2hpY2ggb2YgdGhlIDQgd291bGQgYmUgdmFsaWQuXG4gICAgW3gtcG9zaXRpdmUsIHgtbmVnYXRpdmUsIHktcG9zaXRpdmUsIHktbmVnYXRpdmVdXG4gICAgKi9cbiAgICBjb25zdCBwb3NzaWJsZURpcnMgPSBbXG4gICAgICBzaGlwQXJyWzBdWzBdICsgNSA+IDksXG4gICAgICBzaGlwQXJyWzBdWzBdIC0gNSA8IDAsXG4gICAgICBzaGlwQXJyWzBdWzFdICsgNSA+IDksXG4gICAgICBzaGlwQXJyWzBdWzFdIC0gNSA8IDBcbiAgICBdXG4gICAgICAubWFwKCh4LCBpKSA9PiAoeCA9PT0gZmFsc2UgPyBpIDogXCIgXCIpKVxuICAgICAgLmZpbHRlcigoeCkgPT4geCAhPT0gXCIgXCIpO1xuXG4gICAgY29uc29sZS5sb2cocG9zc2libGVEaXJzKTtcbiAgICAvLyBGaWx0ZXIgZm9yIHByZXZpb3VzIHNoaXAgY29vcmRpbmF0ZSBpbmNvbXBhdGFiaWxpdHlcbiAgICAvLyBhbGxTaGlwc0ZsYXQuXG5cbiAgICBjb25zdCBkaXJDaG9pY2UgPVxuICAgICAgcG9zc2libGVEaXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlRGlycy5sZW5ndGgpXTtcbiAgICBjb25zb2xlLmxvZyhkaXJDaG9pY2UpO1xuXG4gICAgLypcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBhbGxTaGlwc0NoZWNrID0gYWxsU2hpcHMuZmxhdCgpLm1hcCgoYykgPT4gYXJyRXF1YWxDaGVjayhjLCBjb29yZCkpO1xuXG4gICAgICAvLyBGb3IgZmlyc3QgY29vcmRpbmF0ZVxuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgbGV0IGNvb3JkO1xuXG4gICAgICAgIC8vIEdldCByYW5kb20gY29vcmRpbmF0ZVxuICAgICAgICBkbyB7XG4gICAgICAgICAgY29vcmQgPSBnZXRSYW5kb21Db29yZHMoKTtcbiAgICAgICAgfSB3aGlsZSAoYWxsU2hpcHNDaGVjay5pbmNsdWRlcyh0cnVlKSk7XG5cbiAgICAgICAgc2hpcEFyci5wdXNoKGNvb3JkKTtcbiAgICAgIH1cblxuICAgICAgLy8gRm9yIGJ1aWxkaW5nIGZyb20gZmlyc3QgY29vcmRpbmF0ZVxuICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgIHNoaXBBcnIucHVzaChpKTtcbiAgICAgICAgLy8gR2V0IHBvc3NpYmxlIGRpcmVjdGlvbnMgYWdhaW5zdCBlZGdlIG9mIGJvYXJkXG4gICAgICAgIC8vIEFycmF5IHdpbGwgb3V0cHV0IHdoaWNoIG9mIHRoZSA0IHdvdWxkIGJlIHZhbGlkXG4gICAgICAgIC8vIFt4LXBvc2l0aXZlLCB4LW5lZ2F0aXZlLCB5LXBvc2l0aXZlLCB5LW5lZ2F0aXZlXVxuICAgICAgICBjb25zdCBwb3NzaWJsZURpcnMgPSBbXG4gICAgICAgICAgc2hpcEFyclswXVswXSArIDUgPiA5LFxuICAgICAgICAgIHNoaXBBcnJbMF1bMF0gLSA1IDwgMCxcbiAgICAgICAgICBzaGlwQXJyWzBdWzFdICsgNSA+IDksXG4gICAgICAgICAgc2hpcEFyclswXVsxXSAtIDUgPCAwXG4gICAgICAgIF1cbiAgICAgICAgICAubWFwKCh4LCBpKSA9PiAoeCA9PT0gZmFsc2UgPyBpIDogXCIgXCIpKVxuICAgICAgICAgIC5maWx0ZXIoKHgpID0+IHggIT09IFwiIFwiKTtcblxuICAgICAgICBjb25zdCBkaXJDaG9pY2UgPVxuICAgICAgICAgIHBvc3NpYmxlRGlyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZURpcnMubGVuZ3RoKV07XG4gICAgICAgIGNvbnNvbGUubG9nKGRpckNob2ljZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHNoaXBBcnIpO1xuICAgIHJldHVybiBzaGlwQXJyO1xuICAgICovXG4gIH07XG5cbiAgYWxsU2hpcHMucHVzaChtYWtlU2hpcCgzKSk7XG5cbiAgcmV0dXJuIGFsbFNoaXBzO1xufTtcblxuZXhwb3J0IHsgZ2V0Q29tcFNoaXBDb29yZHMgfTtcblxuLy8gWzBdIGNhcnJpZXIsIFsxXSBiYXR0bGVzaGlwLCBbMl0gZGVzdHJveWVyLCBbM10gc3VibWFyaW5lLCBbNF0gcGF0cm9sXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgZ2V0UmFuZG9tQ29vcmRzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXTtcbn07XG5cbmNvbnN0IGdldE51bSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbn07XG5cbmV4cG9ydCB7IGdldFJhbmRvbUNvb3JkcywgZ2V0TnVtIH07XG4iLCIvLyBDaGVjayBpZiBhIGd1ZXNzZWQgY29vcmRpbmF0ZSBoaXRzIGEgc2hpcFxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGFyckVxdWFsQ2hlY2sgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5cbmNvbnN0IGhpdENoZWNrID0gZnVuY3Rpb24gKGdhbWVib2FyZCwgY29vcmRzKSB7XG4gIC8vIENyZWF0ZSBhcnJheSBmb3Igc2hpcCBoaXQgY2hlY2tcbiAgY29uc3Qgb3V0cHV0ID0gW107XG5cbiAgLy8gTG9vcCBvdmVyIHNoaXBzIHRvIGNoZWNrIGlmIGNvb3JkcyBpcyBhIGhpdCBmb3IgYW55XG4gIGZvciAobGV0IHNoaXAgaW4gZ2FtZWJvYXJkLnNoaXBzKSB7XG4gICAgb3V0cHV0LnB1c2goXG4gICAgICBnYW1lYm9hcmQuc2hpcHNbc2hpcF0ubG9jYXRpb25cbiAgICAgICAgLm1hcCgoY29vcmQpID0+IGFyckVxdWFsQ2hlY2soY29vcmRbMF0sIGNvb3JkcykpXG4gICAgICAgIC5pbmNsdWRlcyh0cnVlKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0IHsgaGl0Q2hlY2sgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJFcXVhbENoZWNrIH0gZnJvbSBcIi4vYXJyRXF1YWxDaGVja1wiO1xuXG5jb25zdCBwcmV2R3Vlc3NDaGVjayA9IChnYW1lYm9hcmQsIGNvb3JkcykgPT4ge1xuICBjb25zdCBvdXRwdXQgPSBbXTtcblxuICBvdXRwdXQucHVzaChcbiAgICBnYW1lYm9hcmQubWlzc2VzLm1hcCgoY29vcmQpID0+IGFyckVxdWFsQ2hlY2soY29vcmQsIGNvb3JkcykpLmluY2x1ZGVzKHRydWUpXG4gICk7XG5cbiAgb3V0cHV0LnB1c2goXG4gICAgZ2FtZWJvYXJkLmhpdHMubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZCwgY29vcmRzKSkuaW5jbHVkZXModHJ1ZSlcbiAgKTtcblxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0IHsgcHJldkd1ZXNzQ2hlY2sgfTtcblxuLy8gY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vUGxheWVyXCI7XG5pbXBvcnQgeyBkaXNwbGF5Qm9hdHMsIHNxdWFyZXMsIGdhbWVib2FyZHMgfSBmcm9tIFwiLi9kb21JbnRlcmFjdGlvblwiO1xuaW1wb3J0IHsgZ2V0Q29tcFNoaXBDb29yZHMgfSBmcm9tIFwiLi9nZXRDb21wU2hpcENvb3Jkc1wiO1xuXG4vLyBjYXJyaWVyXG5jb25zdCBjb29yZHMwID0gW1xuICBbMiwgOV0sXG4gIFszLCA5XSxcbiAgWzQsIDldLFxuICBbNSwgOV0sXG4gIFs2LCA5XVxuXTtcbi8vIGJhdHRsZXNoaXBcbmNvbnN0IGNvb3JkczEgPSBbXG4gIFsyLCAwXSxcbiAgWzMsIDBdLFxuICBbNCwgMF0sXG4gIFs1LCAwXVxuXTtcbi8vIGRlc3Ryb3llclxuY29uc3QgY29vcmRzMiA9IFtcbiAgWzAsIDFdLFxuICBbMCwgMl0sXG4gIFswLCAzXVxuXTtcbi8vIHN1Ym1hcmluZVxuY29uc3QgY29vcmRzMyA9IFtcbiAgWzMsIDNdLFxuICBbMywgNF0sXG4gIFszLCA1XVxuXTtcbi8vIHBhdHJvbFxuY29uc3QgY29vcmRzNCA9IFtcbiAgWzcsIDRdLFxuICBbNywgNV1cbl07XG5cbmNvbnN0IGNvb3JkczUgPSBbXG4gIFswLCAwXSxcbiAgWzEsIDBdLFxuICBbMiwgMF0sXG4gIFszLCAwXSxcbiAgWzQsIDBdXG5dO1xuY29uc3QgY29vcmRzNiA9IFtcbiAgWzQsIDFdLFxuICBbNSwgMV0sXG4gIFs2LCAxXSxcbiAgWzcsIDFdXG5dO1xuY29uc3QgY29vcmRzNyA9IFtcbiAgWzIsIDJdLFxuICBbMiwgM10sXG4gIFsyLCA0XVxuXTtcbmNvbnN0IGNvb3JkczggPSBbXG4gIFs2LCA0XSxcbiAgWzYsIDVdLFxuICBbNiwgNl1cbl07XG5jb25zdCBjb29yZHM5ID0gW1xuICBbOCwgNl0sXG4gIFs4LCA3XVxuXTtcblxuLy8qICMjIyMjIyMjIyMjIyMgR0FNRUZMT1cgIyMjIyMjIyMjIyMjIyMjIyMjXG5jb25zdCBib2FyZCA9IGdhbWVib2FyZHNbMF07XG5cbmxldCBnYW1lT3ZlciA9IGZhbHNlO1xuXG4vLyBQbGF5ZXIgY2hvb3NlcyBzaGlwIGNvb3JkaW5hdGVzXG5jb25zdCB0ZXN0Q29vcmRzMSA9IFtjb29yZHMwLCBjb29yZHMxLCBjb29yZHMyLCBjb29yZHMzLCBjb29yZHM0XTtcbmNvbnN0IHBsYXllciA9IFBsYXllcihcInBsYXllclwiLCB0ZXN0Q29vcmRzMSk7XG5cbi8vIENvbXB1dGVyIHJhbmRvbWx5IGNob29zZXMgc2hpcCBjb29yZGluYXRlc1xuY29uc3QgdGVzdENvb3JkczIgPSBbY29vcmRzNSwgY29vcmRzNiwgY29vcmRzNywgY29vcmRzOCwgY29vcmRzOV07XG5jb25zdCBjb21wdXRlciA9IFBsYXllcihcImNvbXB1dGVyXCIsIHRlc3RDb29yZHMyKTtcblxuY29uc29sZS5sb2cocGxheWVyKTtcbmNvbnNvbGUubG9nKGNvbXB1dGVyKTtcblxuLy8gRGlzcGxheSBib2F0cyBvbiBib2FyZFxuZGlzcGxheUJvYXRzKHBsYXllcik7XG5kaXNwbGF5Qm9hdHMoY29tcHV0ZXIpO1xuXG5ib2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgY29uc3Qgc3F1YXJlID0gZS50YXJnZXQuY2xvc2VzdChcIi5zcXVhcmVcIik7XG4gIGlmICghc3F1YXJlKSByZXR1cm47XG5cbiAgLy8gRGlzYWxsb3cgYWxyZWFkeSBjbGlja2VkIHNxdWFyZXNcbiAgaWYgKHNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoXCJzcXVhcmUtLWhpdFwiKSkgcmV0dXJuO1xuICBpZiAoc3F1YXJlLmNsYXNzTGlzdC5jb250YWlucyhcInNxdWFyZS0tbWlzc1wiKSkgcmV0dXJuO1xuXG4gIC8vIFBsYXllciB0dXJuXG4gIC8vIGNvbnNvbGUubG9nKFwiUGxheWVyIHR1cm5cIik7XG4gIHBsYXllci5hdHRhY2soY29tcHV0ZXIsIHNxdWFyZSk7XG4gIC8vIGNvbnNvbGUubG9nKHBsYXllcik7XG5cbiAgLy8gIENoZWNrIGZvciBkZWZlYXRcbiAgaWYgKGNvbXB1dGVyLmRlZmVhdCA9PT0gdHJ1ZSkge1xuICAgIGNvbnNvbGUubG9nKFwiUGxheWVyIHdpbnMhXCIpO1xuICAgIC8vISBBZGQgZGlzcGxheSBnYW1lIG92ZXIgYW5kIHJlc3RhcnRcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyEgRGVhbCB3aXRoIGNvbXB1dGVyIGludGVsbGlnZW5jZT9cbiAgLy8gY29uc29sZS5sb2coXCJjb21wdXRlciB0dXJuXCIpO1xuICBjb21wdXRlci5hdHRhY2socGxheWVyKTtcbiAgLy8gY29uc29sZS5sb2coY29tcHV0ZXIpO1xuICBjb25zb2xlLmxvZyhjb21wdXRlci5ndWVzc2VzKTtcblxuICBpZiAocGxheWVyLmRlZmVhdCA9PT0gdHJ1ZSkge1xuICAgIGNvbnNvbGUubG9nKFwiQ29tcHV0ZXIgV2lucyFcIik7XG4gICAgLy8hIEFkZCBkaXNwbGF5IGdhbWUgb3ZlciBhbmQgcmVzdGFydFxuICAgIHJldHVybjtcbiAgfVxufSk7XG5cbmNvbnN0IGNoZWNrID0gZ2V0Q29tcFNoaXBDb29yZHMoKTtcbmNvbnNvbGUubG9nKGNoZWNrKTtcblxuLy8gY29uc3QgY2hlY2sxID0gW1xuLy8gICBbXG4vLyAgICAgWzEsIDZdLFxuLy8gICAgIFsyLCA2XSxcbi8vICAgICBbMywgNl1cbi8vICAgXSxcbi8vICAgW1xuLy8gICAgIFs3LCAyXSxcbi8vICAgICBbNywgM10sXG4vLyAgICAgWzcsIDRdLFxuLy8gICAgIFs3LCA1XVxuLy8gICBdLFxuLy8gICBbXG4vLyAgICAgWzAsIDBdLFxuLy8gICAgIFswLCAxXVxuLy8gICBdXG4vLyBdO1xuLy8gY29uc29sZS5sb2coY2hlY2sxKTtcbi8vIGNvbnNvbGUubG9nKGNoZWNrMS5mbGF0KCkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9