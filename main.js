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

/***/ "./src/createRandomShips.js":
/*!**********************************!*\
  !*** ./src/createRandomShips.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildShipCoords": () => (/* binding */ buildShipCoords),
/* harmony export */   "findPossibleDirs": () => (/* binding */ findPossibleDirs)
/* harmony export */ });
/**
 * Array checks if x and y can fit in negative and positive dir.
 * In this order: [x-positive, x-negative, y-positive, y-negative]
 * Returns an array with the indexes of valid [0, 1, 2, 3]
 */
const findPossibleDirs = function (coord, length) {
  return [
    coord[0] + (length - 1) > 9,
    coord[0] - (length - 1) < 0,
    coord[1] + (length - 1) > 9,
    coord[1] - (length - 1) < 0
  ]
    .map((x, i) => (x === false ? i : " "))
    .filter((x) => x !== " ");
};

// Build possible ships based on coords w/r/t board edges
const buildShipCoords = function (length, dir, coord) {
  const ship = [];

  if (dir === 0)
    for (let i = coord[0]; i < coord[0] + length; i++) ship.push([i, coord[1]]);

  if (dir === 1)
    for (let i = coord[0]; i > coord[0] - length; i--) ship.push([i, coord[1]]);

  if (dir === 2)
    for (let i = coord[1]; i < coord[1] + length; i++) ship.push([coord[0], i]);

  if (dir === 3)
    for (let i = coord[1]; i > coord[1] - length; i--) ship.push([coord[0], i]);

  return ship;
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
/* harmony import */ var _makeShip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./makeShip */ "./src/makeShip.js");


("use strict");

const getCompShipCoords = function () {
  const allShips = [];

  // Create carrier
  allShips.push((0,_makeShip__WEBPACK_IMPORTED_MODULE_0__.makeShip)(allShips, 5));

  // Create battleship
  allShips.push((0,_makeShip__WEBPACK_IMPORTED_MODULE_0__.makeShip)(allShips, 4));

  // Create destroyer
  allShips.push((0,_makeShip__WEBPACK_IMPORTED_MODULE_0__.makeShip)(allShips, 3));

  // Create submarine
  allShips.push((0,_makeShip__WEBPACK_IMPORTED_MODULE_0__.makeShip)(allShips, 3));

  // Create patrol
  allShips.push((0,_makeShip__WEBPACK_IMPORTED_MODULE_0__.makeShip)(allShips, 2));

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

/***/ "./src/makeShip.js":
/*!*************************!*\
  !*** ./src/makeShip.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeShip": () => (/* binding */ makeShip)
/* harmony export */ });
/* harmony import */ var _getRandomCoords__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getRandomCoords */ "./src/getRandomCoords.js");
/* harmony import */ var _arrEqualCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrEqualCheck */ "./src/arrEqualCheck.js");
/* harmony import */ var _createRandomShips__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createRandomShips */ "./src/createRandomShips.js");






const makeShip = function (allShips, length) {
  const allShipsCoords = allShips.flat();

  // Get first coordinate
  let coord;
  do {
    coord = (0,_getRandomCoords__WEBPACK_IMPORTED_MODULE_0__.getRandomCoords)();
  } while (allShipsCoords.map((c) => (0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_1__.arrEqualCheck)(c, coord)).includes(true));

  // Get possible directions against edge of board from coord.
  const possibleDirs = (0,_createRandomShips__WEBPACK_IMPORTED_MODULE_2__.findPossibleDirs)(coord, length);

  // Create array of all possible ships
  const possibleShips = possibleDirs.map((dir) =>
    (0,_createRandomShips__WEBPACK_IMPORTED_MODULE_2__.buildShipCoords)(length, dir, coord)
  );

  // Check each ship for conflict with previous ship placement
  const shipChoicesFinal = [];

  // Loop over possible ships
  for (let ship of possibleShips) {
    const coordCheckArr = [];

    // Loop over coordinates of each possible ship
    for (let shipCoord of ship) {
      let match = 0;

      // Loop over previous ships; if match, mark that
      allShipsCoords.forEach((allShipsCoord) => {
        if ((0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_1__.arrEqualCheck)(shipCoord, allShipsCoord)) match++;
      });

      // If a match is found, add true
      coordCheckArr.push(match === 0 ? false : true);
    }

    // Add valid ships to choice array
    if (!coordCheckArr.includes(true)) shipChoicesFinal.push(ship);
  }

  // Randomly select from remaining options
  return shipChoicesFinal[Math.floor(Math.random() * shipChoicesFinal.length)];
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

//* ############# GAMEFLOW ##################
const board = _domInteraction__WEBPACK_IMPORTED_MODULE_1__.gameboards[0];

let gameOver = false;

// Player chooses ship coordinates
const testCoords1 = [coords0, coords1, coords2, coords3, coords4];
const player = (0,_Player__WEBPACK_IMPORTED_MODULE_0__.Player)("player", testCoords1);

// Computer randomly chooses ship coordinates
const computer = (0,_Player__WEBPACK_IMPORTED_MODULE_0__.Player)("computer", (0,_getCompShipCoords__WEBPACK_IMPORTED_MODULE_2__.getCompShipCoords)());

console.log(player);
console.log(computer);

// Display boats on board
(0,_domInteraction__WEBPACK_IMPORTED_MODULE_1__.displayBoats)(player);
(0,_domInteraction__WEBPACK_IMPORTED_MODULE_1__.displayBoats)(computer);

board.addEventListener("click", (e) => {
  const square = e.target.closest(".square");
  if (!square) return;
  console.log([
    square.parentElement.classList[1].slice(-1),
    square.classList[1].slice(-1)
  ]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsMERBQWE7O0FBRTNCOztBQUVBO0FBQ0E7QUFDQSxlQUFlLCtDQUFNOztBQUVyQjtBQUNBLGlCQUFpQiwrQ0FBTSxhQUFhLHFFQUFpQjs7QUFFckQ7QUFDQTs7QUFFQTtBQUNBLDZEQUFZO0FBQ1osNkRBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwbHlIaXREYW1hZ2UuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcnJFcXVhbENoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY3JlYXRlUmFuZG9tU2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb21JbnRlcmFjdGlvbi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dldEF0dGFja0Nvb3Jkcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dldENvbXBTaGlwQ29vcmRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2V0UmFuZG9tQ29vcmRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaGl0Q2hlY2suanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tYWtlU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3ByZXZHdWVzc0NoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEdhbWVib2FyZFxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9TaGlwXCI7XG5pbXBvcnQgeyBwcmV2R3Vlc3NDaGVjayB9IGZyb20gXCIuL3ByZXZHdWVzc0NoZWNrXCI7XG5pbXBvcnQgeyBoaXRDaGVjayB9IGZyb20gXCIuL2hpdENoZWNrXCI7XG5pbXBvcnQgeyBhcHBseUhpdERhbWFnZSB9IGZyb20gXCIuL2FwcGx5SGl0RGFtYWdlXCI7XG5cbmNvbnN0IEdhbWVib2FyZCA9IGZ1bmN0aW9uIChjb29yZHMwLCBjb29yZHMxLCBjb29yZHMyLCBjb29yZHMzLCBjb29yZHM0KSB7XG4gIC8vIFNoaXBzXG4gIGNvbnN0IHNoaXBzID0ge1xuICAgIGNhcnJpZXI6IFNoaXAoY29vcmRzMCksXG4gICAgYmF0dGxlc2hpcDogU2hpcChjb29yZHMxKSxcbiAgICBkZXN0cm95ZXI6IFNoaXAoY29vcmRzMiksXG4gICAgc3VibWFyaW5lOiBTaGlwKGNvb3JkczMpLFxuICAgIHBhdHJvbDogU2hpcChjb29yZHM0KVxuICB9O1xuXG4gIC8vIEVuZW15IEd1ZXNzIEFycmF5c1xuICBjb25zdCBtaXNzZXMgPSBbXTtcbiAgY29uc3QgaGl0cyA9IFtdO1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBndWVzc2VkXG4gICAgaWYgKHByZXZHdWVzc0NoZWNrKHRoaXMsIGNvb3JkcykuaW5jbHVkZXModHJ1ZSkpIHJldHVybiBmYWxzZTtcblxuICAgIC8vIENoZWNrIGlmIGd1ZXNzIGlzIGEgaGl0IG9uIGEgc2hpcFxuICAgIGNvbnN0IGhpdENoZWNrQXJyID0gaGl0Q2hlY2sodGhpcywgY29vcmRzKTtcblxuICAgIC8vIElmIG5vbmUgc2hvdyBoaXQsIHB1dCBpbnRvIG1pc3NlcyBhcnJheVxuICAgIGlmIChoaXRDaGVja0Fyci5ldmVyeSgoeCkgPT4geCA9PT0gZmFsc2UpKSB7XG4gICAgICBtaXNzZXMucHVzaChjb29yZHMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gSWYgZ3Vlc3Mgc2hvd3MgaGl0XG4gICAgaWYgKGhpdENoZWNrQXJyLnNvbWUoKHgpID0+IHggPT09IHRydWUpKSB7XG4gICAgICBoaXRzLnB1c2goY29vcmRzKTtcbiAgICAgIHJldHVybiBhcHBseUhpdERhbWFnZSh0aGlzLCBoaXRDaGVja0FyciwgY29vcmRzKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2hlY2tBbGxTdW5rID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIENyZWF0ZSBhcnJheSBvZiBhbGwgc3VuayBjaGVja3NcbiAgICBjb25zdCBzdW5rQXJyID0gW107XG5cbiAgICAvLyBQb3B1bGF0ZSB0aGUgYXJyYXkgd2l0aCBzdW5rIGNoZWNrc1xuICAgIGZvciAobGV0IHNoaXAgaW4gdGhpcy5zaGlwcykge1xuICAgICAgc3Vua0Fyci5wdXNoKHNoaXBzW3NoaXBdLnN1bmspO1xuICAgIH1cblxuICAgIC8vIEV2YWx1YXRlIHRoZSBhcnJheSBmb3IgYWxsIHN1bmsgY2hlY2tzID09PSB0cnVlXG4gICAgcmV0dXJuIHN1bmtBcnIuZXZlcnkoKGVsKSA9PiBlbCA9PT0gdHJ1ZSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzaGlwcyxcbiAgICBtaXNzZXMsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBoaXRzLFxuICAgIGNoZWNrQWxsU3Vua1xuICB9O1xufTtcblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBnZXRBdHRhY2tDb29yZHNDb21wLCBnZXRBdHRhY2tDb29yZHNQbGF5ZXIgfSBmcm9tIFwiLi9nZXRBdHRhY2tDb29yZHNcIjtcblxuY29uc3QgUGxheWVyID0gZnVuY3Rpb24gKHBsYXllck5hbWUsIGNvb3Jkcykge1xuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoLi4uY29vcmRzKTtcbiAgY29uc3QgZ3Vlc3NlcyA9IFtdO1xuICBsZXQgZGVmZWF0ID0gZmFsc2U7XG5cbiAgY29uc3QgYXR0YWNrID0gZnVuY3Rpb24gKGVuZW15LCBzcXVhcmUpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhlbmVteSk7XG4gICAgY29uc3QgY29vcmRzID1cbiAgICAgIGVuZW15LnBsYXllck5hbWUgPT09IFwicGxheWVyXCJcbiAgICAgICAgPyBnZXRBdHRhY2tDb29yZHNDb21wKGd1ZXNzZXMpXG4gICAgICAgIDogZ2V0QXR0YWNrQ29vcmRzUGxheWVyKHNxdWFyZSk7XG5cbiAgICBjb25zdCB0dXJuID0gZW5lbXkuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcblxuICAgIC8vIEV4aXQgaWYgYWxyZWFkeSBndWVzc2VkXG4gICAgaWYgKHR1cm4gPT09IGZhbHNlKSByZXR1cm4gdGhpcztcblxuICAgIC8vIEFkZCBndWVzcyB0byBhcnJheVxuICAgIGd1ZXNzZXMucHVzaChjb29yZHMpO1xuXG4gICAgLy8gQ2hlY2sgZGVmZWF0XG4gICAgZW5lbXkuZGVmZWF0ID0gZW5lbXkuZ2FtZWJvYXJkLmNoZWNrQWxsU3VuaygpO1xuICB9O1xuXG4gIHJldHVybiB7IHBsYXllck5hbWUsIGd1ZXNzZXMsIGF0dGFjaywgZ2FtZWJvYXJkLCBkZWZlYXQgfTtcbn07XG5cbmV4cG9ydCB7IFBsYXllciB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IFNoaXAgPSBmdW5jdGlvbiAoY29vcmRzKSB7XG4gIC8vIENyZWF0ZSBzaGlwIGNvb3JkaW5hdGUgYXJyYXkgPSBbW1tjb29yZHNdLCBoaXRdLCBbW2Nvb3Jkc10sIGhpdF0sIFtbY29vcmRzXSwgaGl0XV1cbiAgY29uc3QgbG9jYXRpb24gPSBjb29yZHMubWFwKChjb29yZCkgPT4gW2Nvb3JkLCBmYWxzZV0pO1xuICBsZXQgc3VuayA9IGZhbHNlO1xuXG4gIGNvbnN0IGhpdCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIHRoaXMubG9jYXRpb25baW5kZXhdWzFdID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMubG9jYXRpb24uZXZlcnkoKGNvb3JkKSA9PiBjb29yZFsxXSA9PT0gdHJ1ZSkpIHRoaXMuc3VuayA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIHsgbG9jYXRpb24sIHN1bmssIGhpdCwgaXNTdW5rIH07XG59O1xuXG5leHBvcnQgeyBTaGlwIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyRXF1YWxDaGVjayB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcblxuY29uc3QgZ2V0SGl0U2hpcEluZGV4ID0gZnVuY3Rpb24gKHNoaXAsIGNvb3Jkcykge1xuICByZXR1cm4gc2hpcC5sb2NhdGlvbi5maW5kSW5kZXgoKGVsKSA9PiBhcnJFcXVhbENoZWNrKGVsWzBdLCBjb29yZHMpKTtcbn07XG5cbmNvbnN0IGFwcGx5SGl0RGFtYWdlID0gZnVuY3Rpb24gKGdhbWVib2FyZCwgaGl0Q2hlY2tBcnIsIGNvb3Jkcykge1xuICBjb25zdCBzaGlwcyA9IFtcImNhcnJpZXJcIiwgXCJiYXR0bGVzaGlwXCIsIFwiZGVzdHJveWVyXCIsIFwic3VibWFyaW5lXCIsIFwicGF0cm9sXCJdO1xuXG4gIC8vIElkZW50aWZ5IHdoaWNoIHNoaXAgd2FzIGhpdFxuICBjb25zdCBoaXRTaGlwID0gc2hpcHNbaGl0Q2hlY2tBcnIuaW5kZXhPZih0cnVlKV07XG5cbiAgLy8gSWRlbnRpZnkgaW5kZXggd2hlcmUgc2hpcCB3YXMgaGl0XG4gIGNvbnN0IGhpdFNoaXBJbmRleCA9IGdldEhpdFNoaXBJbmRleChnYW1lYm9hcmQuc2hpcHNbaGl0U2hpcF0sIGNvb3Jkcyk7XG5cbiAgLy8gQXBwbHkgZGFtYWdlIHdpdGggbWV0aG9kXG4gIGdhbWVib2FyZC5zaGlwc1toaXRTaGlwXS5oaXQoaGl0U2hpcEluZGV4KTtcblxuICAvLyBDaGVjayBpZiBzaGlwIGlzIHN1bmtcbiAgZ2FtZWJvYXJkLnNoaXBzW2hpdFNoaXBdLmlzU3VuaygpO1xuXG4gIHJldHVybiBnYW1lYm9hcmQ7XG59O1xuXG5leHBvcnQgeyBhcHBseUhpdERhbWFnZSB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGFyckVxdWFsQ2hlY2sgPSBmdW5jdGlvbiAoYXJyMSwgYXJyMikge1xuICByZXR1cm4gYXJyMS5ldmVyeSgodmFsLCBpbmRleCkgPT4gdmFsID09PSBhcnIyW2luZGV4XSk7XG59O1xuXG5leHBvcnQgeyBhcnJFcXVhbENoZWNrIH07XG4iLCIvKipcbiAqIEFycmF5IGNoZWNrcyBpZiB4IGFuZCB5IGNhbiBmaXQgaW4gbmVnYXRpdmUgYW5kIHBvc2l0aXZlIGRpci5cbiAqIEluIHRoaXMgb3JkZXI6IFt4LXBvc2l0aXZlLCB4LW5lZ2F0aXZlLCB5LXBvc2l0aXZlLCB5LW5lZ2F0aXZlXVxuICogUmV0dXJucyBhbiBhcnJheSB3aXRoIHRoZSBpbmRleGVzIG9mIHZhbGlkIFswLCAxLCAyLCAzXVxuICovXG5jb25zdCBmaW5kUG9zc2libGVEaXJzID0gZnVuY3Rpb24gKGNvb3JkLCBsZW5ndGgpIHtcbiAgcmV0dXJuIFtcbiAgICBjb29yZFswXSArIChsZW5ndGggLSAxKSA+IDksXG4gICAgY29vcmRbMF0gLSAobGVuZ3RoIC0gMSkgPCAwLFxuICAgIGNvb3JkWzFdICsgKGxlbmd0aCAtIDEpID4gOSxcbiAgICBjb29yZFsxXSAtIChsZW5ndGggLSAxKSA8IDBcbiAgXVxuICAgIC5tYXAoKHgsIGkpID0+ICh4ID09PSBmYWxzZSA/IGkgOiBcIiBcIikpXG4gICAgLmZpbHRlcigoeCkgPT4geCAhPT0gXCIgXCIpO1xufTtcblxuLy8gQnVpbGQgcG9zc2libGUgc2hpcHMgYmFzZWQgb24gY29vcmRzIHcvci90IGJvYXJkIGVkZ2VzXG5jb25zdCBidWlsZFNoaXBDb29yZHMgPSBmdW5jdGlvbiAobGVuZ3RoLCBkaXIsIGNvb3JkKSB7XG4gIGNvbnN0IHNoaXAgPSBbXTtcblxuICBpZiAoZGlyID09PSAwKVxuICAgIGZvciAobGV0IGkgPSBjb29yZFswXTsgaSA8IGNvb3JkWzBdICsgbGVuZ3RoOyBpKyspIHNoaXAucHVzaChbaSwgY29vcmRbMV1dKTtcblxuICBpZiAoZGlyID09PSAxKVxuICAgIGZvciAobGV0IGkgPSBjb29yZFswXTsgaSA+IGNvb3JkWzBdIC0gbGVuZ3RoOyBpLS0pIHNoaXAucHVzaChbaSwgY29vcmRbMV1dKTtcblxuICBpZiAoZGlyID09PSAyKVxuICAgIGZvciAobGV0IGkgPSBjb29yZFsxXTsgaSA8IGNvb3JkWzFdICsgbGVuZ3RoOyBpKyspIHNoaXAucHVzaChbY29vcmRbMF0sIGldKTtcblxuICBpZiAoZGlyID09PSAzKVxuICAgIGZvciAobGV0IGkgPSBjb29yZFsxXTsgaSA+IGNvb3JkWzFdIC0gbGVuZ3RoOyBpLS0pIHNoaXAucHVzaChbY29vcmRbMF0sIGldKTtcblxuICByZXR1cm4gc2hpcDtcbn07XG5cbmV4cG9ydCB7IGJ1aWxkU2hpcENvb3JkcywgZmluZFBvc3NpYmxlRGlycyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIERPTSBWQVJJQUJMRVMgKi9cbmNvbnN0IGdhbWVib2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdhbWVib2FyZFwiKTtcbmNvbnN0IHJvd3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJvd1wiKTtcbmNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNxdWFyZVwiKTtcblxuY29uc3QgZGlzcGxheUJvYXRzID0gZnVuY3Rpb24gKHBsYXllcikge1xuICAvLyBMb29wIG92ZXIgZWFjaCBzaGlwIG9mIHBsYXllclxuICBmb3IgKGxldCBzaGlwIGluIHBsYXllci5nYW1lYm9hcmQuc2hpcHMpIHtcbiAgICAvLyBHZXQgc2hpcCBjb29yZGluYXRlc1xuICAgIHBsYXllci5nYW1lYm9hcmQuc2hpcHNbc2hpcF0ubG9jYXRpb24uZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIGNvbnN0IGdhbWVib2FyZCA9XG4gICAgICAgIHBsYXllci5wbGF5ZXJOYW1lID09PSBcImNvbXB1dGVyXCIgPyBnYW1lYm9hcmRzWzBdIDogZ2FtZWJvYXJkc1sxXTtcbiAgICAgIGNvbnN0IHJvdyA9IGdhbWVib2FyZC5jaGlsZHJlbltjb29yZFswXVswXV07XG4gICAgICBjb25zdCBzcXVhcmUgPSByb3cuY2hpbGRyZW5bY29vcmRbMF1bMV1dO1xuXG4gICAgICAvLyBBZGQgc2hpcCBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChgc3F1YXJlLS0ke3NoaXB9YCk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCB7IGRpc3BsYXlCb2F0cywgc3F1YXJlcywgcm93cywgZ2FtZWJvYXJkcyB9O1xuIiwiaW1wb3J0IHsgYXJyRXF1YWxDaGVjayB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcbmltcG9ydCB7IGdldFJhbmRvbUNvb3JkcyB9IGZyb20gXCIuL2dldFJhbmRvbUNvb3Jkc1wiO1xuXG4oXCJ1c2Ugc3RyaWN0XCIpO1xuXG5jb25zdCBnZXRBdHRhY2tDb29yZHNQbGF5ZXIgPSBmdW5jdGlvbiAoc3F1YXJlKSB7XG4gIGNvbnN0IHJvdyA9IHNxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdFsxXS5zbGljZSgtMSk7XG4gIGNvbnN0IGNvbCA9IHNxdWFyZS5jbGFzc0xpc3RbMV0uc2xpY2UoLTEpO1xuICByZXR1cm4gW3BhcnNlSW50KHJvdywgMTApLCBwYXJzZUludChjb2wsIDEwKV07XG59O1xuXG5jb25zdCBnZXRBdHRhY2tDb29yZHNDb21wID0gZnVuY3Rpb24gKGd1ZXNzZXMpIHtcbiAgbGV0IGNvb3JkLCBjaGVja1ByZXZHdWVzc2VzO1xuXG4gIGRvIHtcbiAgICAvLyBDaG9vc2UgcmFuZG9tIGNvb3JkaW5hdGVcbiAgICBjb29yZCA9IGdldFJhbmRvbUNvb3JkcygpO1xuXG4gICAgLy8gQ2hlY2sgaWYgY29vcmRpbmF0ZSB3YXMgYWxyZWFkeSBndWVzc2VkXG4gICAgY2hlY2tQcmV2R3Vlc3NlcyA9IGd1ZXNzZXMubWFwKChndWVzcykgPT4gYXJyRXF1YWxDaGVjayhjb29yZCwgZ3Vlc3MpKTtcbiAgfSB3aGlsZSAoY2hlY2tQcmV2R3Vlc3Nlcy5pbmNsdWRlcyh0cnVlKSAmJiBndWVzc2VzLmxlbmd0aCA8IDEwMCk7XG5cbiAgaWYgKGd1ZXNzZXMubGVuZ3RoID4gOTkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBtb3JlIGd1ZXNzZXMgYXZhaWxhYmxlXCIpO1xuICB9XG4gIHJldHVybiBjb29yZDtcbn07XG5cbmV4cG9ydCB7IGdldEF0dGFja0Nvb3Jkc1BsYXllciwgZ2V0QXR0YWNrQ29vcmRzQ29tcCB9O1xuIiwiaW1wb3J0IHsgbWFrZVNoaXAgfSBmcm9tIFwiLi9tYWtlU2hpcFwiO1xuXG4oXCJ1c2Ugc3RyaWN0XCIpO1xuXG5jb25zdCBnZXRDb21wU2hpcENvb3JkcyA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYWxsU2hpcHMgPSBbXTtcblxuICAvLyBDcmVhdGUgY2FycmllclxuICBhbGxTaGlwcy5wdXNoKG1ha2VTaGlwKGFsbFNoaXBzLCA1KSk7XG5cbiAgLy8gQ3JlYXRlIGJhdHRsZXNoaXBcbiAgYWxsU2hpcHMucHVzaChtYWtlU2hpcChhbGxTaGlwcywgNCkpO1xuXG4gIC8vIENyZWF0ZSBkZXN0cm95ZXJcbiAgYWxsU2hpcHMucHVzaChtYWtlU2hpcChhbGxTaGlwcywgMykpO1xuXG4gIC8vIENyZWF0ZSBzdWJtYXJpbmVcbiAgYWxsU2hpcHMucHVzaChtYWtlU2hpcChhbGxTaGlwcywgMykpO1xuXG4gIC8vIENyZWF0ZSBwYXRyb2xcbiAgYWxsU2hpcHMucHVzaChtYWtlU2hpcChhbGxTaGlwcywgMikpO1xuXG4gIHJldHVybiBhbGxTaGlwcztcbn07XG5cbmV4cG9ydCB7IGdldENvbXBTaGlwQ29vcmRzIH07XG5cbi8vIFswXSBjYXJyaWVyLCBbMV0gYmF0dGxlc2hpcCwgWzJdIGRlc3Ryb3llciwgWzNdIHN1Ym1hcmluZSwgWzRdIHBhdHJvbFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGdldFJhbmRvbUNvb3JkcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCksIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKV07XG59O1xuXG5jb25zdCBnZXROdW0gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG59O1xuXG5leHBvcnQgeyBnZXRSYW5kb21Db29yZHMsIGdldE51bSB9O1xuIiwiLy8gQ2hlY2sgaWYgYSBndWVzc2VkIGNvb3JkaW5hdGUgaGl0cyBhIHNoaXBcblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJFcXVhbENoZWNrIH0gZnJvbSBcIi4vYXJyRXF1YWxDaGVja1wiO1xuXG5jb25zdCBoaXRDaGVjayA9IGZ1bmN0aW9uIChnYW1lYm9hcmQsIGNvb3Jkcykge1xuICAvLyBDcmVhdGUgYXJyYXkgZm9yIHNoaXAgaGl0IGNoZWNrXG4gIGNvbnN0IG91dHB1dCA9IFtdO1xuXG4gIC8vIExvb3Agb3ZlciBzaGlwcyB0byBjaGVjayBpZiBjb29yZHMgaXMgYSBoaXQgZm9yIGFueVxuICBmb3IgKGxldCBzaGlwIGluIGdhbWVib2FyZC5zaGlwcykge1xuICAgIG91dHB1dC5wdXNoKFxuICAgICAgZ2FtZWJvYXJkLnNoaXBzW3NoaXBdLmxvY2F0aW9uXG4gICAgICAgIC5tYXAoKGNvb3JkKSA9PiBhcnJFcXVhbENoZWNrKGNvb3JkWzBdLCBjb29yZHMpKVxuICAgICAgICAuaW5jbHVkZXModHJ1ZSlcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn07XG5cbmV4cG9ydCB7IGhpdENoZWNrIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgZ2V0UmFuZG9tQ29vcmRzIH0gZnJvbSBcIi4vZ2V0UmFuZG9tQ29vcmRzXCI7XG5pbXBvcnQgeyBhcnJFcXVhbENoZWNrIH0gZnJvbSBcIi4vYXJyRXF1YWxDaGVja1wiO1xuaW1wb3J0IHsgYnVpbGRTaGlwQ29vcmRzLCBmaW5kUG9zc2libGVEaXJzIH0gZnJvbSBcIi4vY3JlYXRlUmFuZG9tU2hpcHNcIjtcblxuY29uc3QgbWFrZVNoaXAgPSBmdW5jdGlvbiAoYWxsU2hpcHMsIGxlbmd0aCkge1xuICBjb25zdCBhbGxTaGlwc0Nvb3JkcyA9IGFsbFNoaXBzLmZsYXQoKTtcblxuICAvLyBHZXQgZmlyc3QgY29vcmRpbmF0ZVxuICBsZXQgY29vcmQ7XG4gIGRvIHtcbiAgICBjb29yZCA9IGdldFJhbmRvbUNvb3JkcygpO1xuICB9IHdoaWxlIChhbGxTaGlwc0Nvb3Jkcy5tYXAoKGMpID0+IGFyckVxdWFsQ2hlY2soYywgY29vcmQpKS5pbmNsdWRlcyh0cnVlKSk7XG5cbiAgLy8gR2V0IHBvc3NpYmxlIGRpcmVjdGlvbnMgYWdhaW5zdCBlZGdlIG9mIGJvYXJkIGZyb20gY29vcmQuXG4gIGNvbnN0IHBvc3NpYmxlRGlycyA9IGZpbmRQb3NzaWJsZURpcnMoY29vcmQsIGxlbmd0aCk7XG5cbiAgLy8gQ3JlYXRlIGFycmF5IG9mIGFsbCBwb3NzaWJsZSBzaGlwc1xuICBjb25zdCBwb3NzaWJsZVNoaXBzID0gcG9zc2libGVEaXJzLm1hcCgoZGlyKSA9PlxuICAgIGJ1aWxkU2hpcENvb3JkcyhsZW5ndGgsIGRpciwgY29vcmQpXG4gICk7XG5cbiAgLy8gQ2hlY2sgZWFjaCBzaGlwIGZvciBjb25mbGljdCB3aXRoIHByZXZpb3VzIHNoaXAgcGxhY2VtZW50XG4gIGNvbnN0IHNoaXBDaG9pY2VzRmluYWwgPSBbXTtcblxuICAvLyBMb29wIG92ZXIgcG9zc2libGUgc2hpcHNcbiAgZm9yIChsZXQgc2hpcCBvZiBwb3NzaWJsZVNoaXBzKSB7XG4gICAgY29uc3QgY29vcmRDaGVja0FyciA9IFtdO1xuXG4gICAgLy8gTG9vcCBvdmVyIGNvb3JkaW5hdGVzIG9mIGVhY2ggcG9zc2libGUgc2hpcFxuICAgIGZvciAobGV0IHNoaXBDb29yZCBvZiBzaGlwKSB7XG4gICAgICBsZXQgbWF0Y2ggPSAwO1xuXG4gICAgICAvLyBMb29wIG92ZXIgcHJldmlvdXMgc2hpcHM7IGlmIG1hdGNoLCBtYXJrIHRoYXRcbiAgICAgIGFsbFNoaXBzQ29vcmRzLmZvckVhY2goKGFsbFNoaXBzQ29vcmQpID0+IHtcbiAgICAgICAgaWYgKGFyckVxdWFsQ2hlY2soc2hpcENvb3JkLCBhbGxTaGlwc0Nvb3JkKSkgbWF0Y2grKztcbiAgICAgIH0pO1xuXG4gICAgICAvLyBJZiBhIG1hdGNoIGlzIGZvdW5kLCBhZGQgdHJ1ZVxuICAgICAgY29vcmRDaGVja0Fyci5wdXNoKG1hdGNoID09PSAwID8gZmFsc2UgOiB0cnVlKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgdmFsaWQgc2hpcHMgdG8gY2hvaWNlIGFycmF5XG4gICAgaWYgKCFjb29yZENoZWNrQXJyLmluY2x1ZGVzKHRydWUpKSBzaGlwQ2hvaWNlc0ZpbmFsLnB1c2goc2hpcCk7XG4gIH1cblxuICAvLyBSYW5kb21seSBzZWxlY3QgZnJvbSByZW1haW5pbmcgb3B0aW9uc1xuICByZXR1cm4gc2hpcENob2ljZXNGaW5hbFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaGlwQ2hvaWNlc0ZpbmFsLmxlbmd0aCldO1xufTtcblxuZXhwb3J0IHsgbWFrZVNoaXAgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJFcXVhbENoZWNrIH0gZnJvbSBcIi4vYXJyRXF1YWxDaGVja1wiO1xuXG5jb25zdCBwcmV2R3Vlc3NDaGVjayA9IChnYW1lYm9hcmQsIGNvb3JkcykgPT4ge1xuICBjb25zdCBvdXRwdXQgPSBbXTtcblxuICBvdXRwdXQucHVzaChcbiAgICBnYW1lYm9hcmQubWlzc2VzLm1hcCgoY29vcmQpID0+IGFyckVxdWFsQ2hlY2soY29vcmQsIGNvb3JkcykpLmluY2x1ZGVzKHRydWUpXG4gICk7XG5cbiAgb3V0cHV0LnB1c2goXG4gICAgZ2FtZWJvYXJkLmhpdHMubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZCwgY29vcmRzKSkuaW5jbHVkZXModHJ1ZSlcbiAgKTtcblxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0IHsgcHJldkd1ZXNzQ2hlY2sgfTtcblxuLy8gY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vUGxheWVyXCI7XG5pbXBvcnQgeyBkaXNwbGF5Qm9hdHMsIHNxdWFyZXMsIGdhbWVib2FyZHMgfSBmcm9tIFwiLi9kb21JbnRlcmFjdGlvblwiO1xuaW1wb3J0IHsgZ2V0Q29tcFNoaXBDb29yZHMgfSBmcm9tIFwiLi9nZXRDb21wU2hpcENvb3Jkc1wiO1xuXG4vLyBjYXJyaWVyXG5jb25zdCBjb29yZHMwID0gW1xuICBbMiwgOV0sXG4gIFszLCA5XSxcbiAgWzQsIDldLFxuICBbNSwgOV0sXG4gIFs2LCA5XVxuXTtcbi8vIGJhdHRsZXNoaXBcbmNvbnN0IGNvb3JkczEgPSBbXG4gIFsyLCAwXSxcbiAgWzMsIDBdLFxuICBbNCwgMF0sXG4gIFs1LCAwXVxuXTtcbi8vIGRlc3Ryb3llclxuY29uc3QgY29vcmRzMiA9IFtcbiAgWzAsIDFdLFxuICBbMCwgMl0sXG4gIFswLCAzXVxuXTtcbi8vIHN1Ym1hcmluZVxuY29uc3QgY29vcmRzMyA9IFtcbiAgWzMsIDNdLFxuICBbMywgNF0sXG4gIFszLCA1XVxuXTtcbi8vIHBhdHJvbFxuY29uc3QgY29vcmRzNCA9IFtcbiAgWzcsIDRdLFxuICBbNywgNV1cbl07XG5cbi8vKiAjIyMjIyMjIyMjIyMjIEdBTUVGTE9XICMjIyMjIyMjIyMjIyMjIyMjI1xuY29uc3QgYm9hcmQgPSBnYW1lYm9hcmRzWzBdO1xuXG5sZXQgZ2FtZU92ZXIgPSBmYWxzZTtcblxuLy8gUGxheWVyIGNob29zZXMgc2hpcCBjb29yZGluYXRlc1xuY29uc3QgdGVzdENvb3JkczEgPSBbY29vcmRzMCwgY29vcmRzMSwgY29vcmRzMiwgY29vcmRzMywgY29vcmRzNF07XG5jb25zdCBwbGF5ZXIgPSBQbGF5ZXIoXCJwbGF5ZXJcIiwgdGVzdENvb3JkczEpO1xuXG4vLyBDb21wdXRlciByYW5kb21seSBjaG9vc2VzIHNoaXAgY29vcmRpbmF0ZXNcbmNvbnN0IGNvbXB1dGVyID0gUGxheWVyKFwiY29tcHV0ZXJcIiwgZ2V0Q29tcFNoaXBDb29yZHMoKSk7XG5cbmNvbnNvbGUubG9nKHBsYXllcik7XG5jb25zb2xlLmxvZyhjb21wdXRlcik7XG5cbi8vIERpc3BsYXkgYm9hdHMgb24gYm9hcmRcbmRpc3BsYXlCb2F0cyhwbGF5ZXIpO1xuZGlzcGxheUJvYXRzKGNvbXB1dGVyKTtcblxuYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IHNxdWFyZSA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuc3F1YXJlXCIpO1xuICBpZiAoIXNxdWFyZSkgcmV0dXJuO1xuICBjb25zb2xlLmxvZyhbXG4gICAgc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0WzFdLnNsaWNlKC0xKSxcbiAgICBzcXVhcmUuY2xhc3NMaXN0WzFdLnNsaWNlKC0xKVxuICBdKTtcblxuICAvLyBEaXNhbGxvdyBhbHJlYWR5IGNsaWNrZWQgc3F1YXJlc1xuICBpZiAoc3F1YXJlLmNsYXNzTGlzdC5jb250YWlucyhcInNxdWFyZS0taGl0XCIpKSByZXR1cm47XG4gIGlmIChzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwic3F1YXJlLS1taXNzXCIpKSByZXR1cm47XG5cbiAgLy8gUGxheWVyIHR1cm5cbiAgLy8gY29uc29sZS5sb2coXCJQbGF5ZXIgdHVyblwiKTtcbiAgcGxheWVyLmF0dGFjayhjb21wdXRlciwgc3F1YXJlKTtcbiAgLy8gY29uc29sZS5sb2cocGxheWVyKTtcblxuICAvLyAgQ2hlY2sgZm9yIGRlZmVhdFxuICBpZiAoY29tcHV0ZXIuZGVmZWF0ID09PSB0cnVlKSB7XG4gICAgY29uc29sZS5sb2coXCJQbGF5ZXIgd2lucyFcIik7XG4gICAgLy8hIEFkZCBkaXNwbGF5IGdhbWUgb3ZlciBhbmQgcmVzdGFydFxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vISBEZWFsIHdpdGggY29tcHV0ZXIgaW50ZWxsaWdlbmNlP1xuICAvLyBjb25zb2xlLmxvZyhcImNvbXB1dGVyIHR1cm5cIik7XG4gIGNvbXB1dGVyLmF0dGFjayhwbGF5ZXIpO1xuICAvLyBjb25zb2xlLmxvZyhjb21wdXRlcik7XG4gIGNvbnNvbGUubG9nKGNvbXB1dGVyLmd1ZXNzZXMpO1xuXG4gIGlmIChwbGF5ZXIuZGVmZWF0ID09PSB0cnVlKSB7XG4gICAgY29uc29sZS5sb2coXCJDb21wdXRlciBXaW5zIVwiKTtcbiAgICAvLyEgQWRkIGRpc3BsYXkgZ2FtZSBvdmVyIGFuZCByZXN0YXJ0XG4gICAgcmV0dXJuO1xuICB9XG59KTtcblxuLy8gY29uc3QgY2hlY2sxID0gW1xuLy8gICBbXG4vLyAgICAgWzEsIDZdLFxuLy8gICAgIFsyLCA2XSxcbi8vICAgICBbMywgNl1cbi8vICAgXSxcbi8vICAgW1xuLy8gICAgIFs3LCAyXSxcbi8vICAgICBbNywgM10sXG4vLyAgICAgWzcsIDRdLFxuLy8gICAgIFs3LCA1XVxuLy8gICBdLFxuLy8gICBbXG4vLyAgICAgWzAsIDBdLFxuLy8gICAgIFswLCAxXVxuLy8gICBdXG4vLyBdO1xuLy8gY29uc29sZS5sb2coY2hlY2sxKTtcbi8vIGNvbnNvbGUubG9nKGNoZWNrMS5mbGF0KCkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9