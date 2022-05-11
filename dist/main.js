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
/* harmony export */   "addGuessAnimation": () => (/* binding */ addGuessAnimation),
/* harmony export */   "displayBoats": () => (/* binding */ displayBoats),
/* harmony export */   "gameboards": () => (/* binding */ gameboards),
/* harmony export */   "resetUI": () => (/* binding */ resetUI),
/* harmony export */   "updateUI": () => (/* binding */ updateUI)
/* harmony export */ });


/* DOM VARIABLES */
const gameboards = document.querySelectorAll(".gameboard");
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

const updateUI = function (player) {
  // Loop over hits
  player.gameboard.hits.forEach((hit) => {
    const gameboard =
      player.playerName === "computer" ? gameboards[0] : gameboards[1];
    const row = gameboard.children[hit[0]];
    const square = row.children[hit[1]];

    // Add hit background color
    square.classList.add(`square--hit`);
  });

  // Loop over misses
  player.gameboard.misses.forEach((miss) => {
    const gameboard =
      player.playerName === "computer" ? gameboards[0] : gameboards[1];
    const row = gameboard.children[miss[0]];
    const square = row.children[miss[1]];

    // Add hit background color
    square.classList.add(`square--miss`);
  });
};

const resetUI = function () {
  squares.forEach((square) => {
    square.classList.remove("square--hit");
    square.classList.remove("square--miss");
    square.classList.remove("animate-guess");
    square.classList.remove("square--carrier");
    square.classList.remove("square--battleship");
    square.classList.remove("square--destroyer");
    square.classList.remove("square--submarine");
    square.classList.remove("square--patrol");
  });
};

const addGuessAnimation = function (enemyPlayer, coords) {
  const gameboard =
    enemyPlayer.playerName === "player" ? gameboards[1] : gameboards[0];
  const row = gameboard.children[coords[0]];
  const square = row.children[coords[1]];

  // add animation class
  square.classList.add("animate-guess");
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

/***/ "./src/newGame.js":
/*!************************!*\
  !*** ./src/newGame.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newGame": () => (/* binding */ newGame)
/* harmony export */ });
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ "./src/Player.js");
/* harmony import */ var _getCompShipCoords__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getCompShipCoords */ "./src/getCompShipCoords.js");





//* ########### Initial Ship Coords ###############
// carrier
// prettier-ignore
const coords0 = [[2, 9], [3, 9], [4, 9], [5, 9], [6, 9]];

// battleship
// prettier-ignore
const coords1 = [[2, 0], [3, 0], [4, 0], [5, 0]];

// destroyer
// prettier-ignore
const coords2 = [[0, 1], [0, 2], [0, 3]];

// submarine
// prettier-ignore
const coords3 = [[3, 3], [3, 4], [3, 5]];

// patrol
// prettier-ignore
const coords4 = [[7, 4], [7, 5]];

//* ########### New Game ###############
const newGame = function () {
  // Player chooses ship coordinates
  const testCoords1 = [coords0, coords1, coords2, coords3, coords4];
  const player = (0,_Player__WEBPACK_IMPORTED_MODULE_0__.Player)("player", testCoords1);

  // Computer randomly chooses ship coordinates
  const computer = (0,_Player__WEBPACK_IMPORTED_MODULE_0__.Player)("computer", (0,_getCompShipCoords__WEBPACK_IMPORTED_MODULE_1__.getCompShipCoords)());

  return [player, computer];
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
/* harmony import */ var _domInteraction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domInteraction */ "./src/domInteraction.js");
/* harmony import */ var _newGame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./newGame */ "./src/newGame.js");




//* ############# DOM Variables ##################
const board = _domInteraction__WEBPACK_IMPORTED_MODULE_0__.gameboards[0];

//* ############# Gameflow ##################
// Player Variables
let player;
let computer;

// New Game
document.querySelector("#test").addEventListener("click", () => {
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.resetUI)();

  const game = (0,_newGame__WEBPACK_IMPORTED_MODULE_1__.newGame)();

  player = game[0];
  computer = game[1];

  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.displayBoats)(player);
});

// Play Game
board.addEventListener("click", (e) => {
  const square = e.target.closest(".square");
  if (!square) return;

  // Disallow if gameover
  if (player.defeat === true || computer.defeat === true) return;

  // Disallow already clicked squares
  if (square.classList.contains("square--hit")) return;
  if (square.classList.contains("square--miss")) return;

  // Player turn
  player.attack(computer, square);
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.updateUI)(computer);

  //  Check for defeat
  if (computer.defeat === true) {
    console.log("Player wins!");
    //! Add display game over and restart
    return;
  }

  // Computer turn
  computer.attack(player);
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.updateUI)(player);
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.addGuessAnimation)(player, computer.guesses.slice(-1)[0]);

  // Check for defeat
  if (player.defeat === true) {
    console.log("Computer Wins!");
    //! Add display game over and restart
    return;
  }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7VUNwQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOYTtBQU9hO0FBQ1U7O0FBRXBDO0FBQ0EsY0FBYywwREFBYTs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUUsd0RBQU87O0FBRVQsZUFBZSxpREFBTzs7QUFFdEI7QUFDQTs7QUFFQSxFQUFFLDZEQUFZO0FBQ2QsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRSx5REFBUTs7QUFFVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUUseURBQVE7QUFDVixFQUFFLGtFQUFpQjs7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcGx5SGl0RGFtYWdlLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXJyRXF1YWxDaGVjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NyZWF0ZVJhbmRvbVNoaXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tSW50ZXJhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nZXRBdHRhY2tDb29yZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nZXRDb21wU2hpcENvb3Jkcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dldFJhbmRvbUNvb3Jkcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2hpdENoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFrZVNoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9uZXdHYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcHJldkd1ZXNzQ2hlY2suanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gR2FtZWJvYXJkXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL1NoaXBcIjtcbmltcG9ydCB7IHByZXZHdWVzc0NoZWNrIH0gZnJvbSBcIi4vcHJldkd1ZXNzQ2hlY2tcIjtcbmltcG9ydCB7IGhpdENoZWNrIH0gZnJvbSBcIi4vaGl0Q2hlY2tcIjtcbmltcG9ydCB7IGFwcGx5SGl0RGFtYWdlIH0gZnJvbSBcIi4vYXBwbHlIaXREYW1hZ2VcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gZnVuY3Rpb24gKGNvb3JkczAsIGNvb3JkczEsIGNvb3JkczIsIGNvb3JkczMsIGNvb3JkczQpIHtcbiAgLy8gU2hpcHNcbiAgY29uc3Qgc2hpcHMgPSB7XG4gICAgY2FycmllcjogU2hpcChjb29yZHMwKSxcbiAgICBiYXR0bGVzaGlwOiBTaGlwKGNvb3JkczEpLFxuICAgIGRlc3Ryb3llcjogU2hpcChjb29yZHMyKSxcbiAgICBzdWJtYXJpbmU6IFNoaXAoY29vcmRzMyksXG4gICAgcGF0cm9sOiBTaGlwKGNvb3JkczQpXG4gIH07XG5cbiAgLy8gRW5lbXkgR3Vlc3MgQXJyYXlzXG4gIGNvbnN0IG1pc3NlcyA9IFtdO1xuICBjb25zdCBoaXRzID0gW107XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICAvLyBDaGVjayBpZiBhbHJlYWR5IGd1ZXNzZWRcbiAgICBpZiAocHJldkd1ZXNzQ2hlY2sodGhpcywgY29vcmRzKS5pbmNsdWRlcyh0cnVlKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gQ2hlY2sgaWYgZ3Vlc3MgaXMgYSBoaXQgb24gYSBzaGlwXG4gICAgY29uc3QgaGl0Q2hlY2tBcnIgPSBoaXRDaGVjayh0aGlzLCBjb29yZHMpO1xuXG4gICAgLy8gSWYgbm9uZSBzaG93IGhpdCwgcHV0IGludG8gbWlzc2VzIGFycmF5XG4gICAgaWYgKGhpdENoZWNrQXJyLmV2ZXJ5KCh4KSA9PiB4ID09PSBmYWxzZSkpIHtcbiAgICAgIG1pc3Nlcy5wdXNoKGNvb3Jkcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBJZiBndWVzcyBzaG93cyBoaXRcbiAgICBpZiAoaGl0Q2hlY2tBcnIuc29tZSgoeCkgPT4geCA9PT0gdHJ1ZSkpIHtcbiAgICAgIGhpdHMucHVzaChjb29yZHMpO1xuICAgICAgcmV0dXJuIGFwcGx5SGl0RGFtYWdlKHRoaXMsIGhpdENoZWNrQXJyLCBjb29yZHMpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGVja0FsbFN1bmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gQ3JlYXRlIGFycmF5IG9mIGFsbCBzdW5rIGNoZWNrc1xuICAgIGNvbnN0IHN1bmtBcnIgPSBbXTtcblxuICAgIC8vIFBvcHVsYXRlIHRoZSBhcnJheSB3aXRoIHN1bmsgY2hlY2tzXG4gICAgZm9yIChsZXQgc2hpcCBpbiB0aGlzLnNoaXBzKSB7XG4gICAgICBzdW5rQXJyLnB1c2goc2hpcHNbc2hpcF0uc3Vuayk7XG4gICAgfVxuXG4gICAgLy8gRXZhbHVhdGUgdGhlIGFycmF5IGZvciBhbGwgc3VuayBjaGVja3MgPT09IHRydWVcbiAgICByZXR1cm4gc3Vua0Fyci5ldmVyeSgoZWwpID0+IGVsID09PSB0cnVlKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNoaXBzLFxuICAgIG1pc3NlcyxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGhpdHMsXG4gICAgY2hlY2tBbGxTdW5rXG4gIH07XG59O1xuXG5leHBvcnQgeyBHYW1lYm9hcmQgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcbmltcG9ydCB7IGdldEF0dGFja0Nvb3Jkc0NvbXAsIGdldEF0dGFja0Nvb3Jkc1BsYXllciB9IGZyb20gXCIuL2dldEF0dGFja0Nvb3Jkc1wiO1xuXG5jb25zdCBQbGF5ZXIgPSBmdW5jdGlvbiAocGxheWVyTmFtZSwgY29vcmRzKSB7XG4gIGNvbnN0IGdhbWVib2FyZCA9IEdhbWVib2FyZCguLi5jb29yZHMpO1xuICBjb25zdCBndWVzc2VzID0gW107XG4gIGxldCBkZWZlYXQgPSBmYWxzZTtcblxuICBjb25zdCBhdHRhY2sgPSBmdW5jdGlvbiAoZW5lbXksIHNxdWFyZSkge1xuICAgIGNvbnN0IGNvb3JkcyA9XG4gICAgICBlbmVteS5wbGF5ZXJOYW1lID09PSBcInBsYXllclwiXG4gICAgICAgID8gZ2V0QXR0YWNrQ29vcmRzQ29tcChndWVzc2VzKVxuICAgICAgICA6IGdldEF0dGFja0Nvb3Jkc1BsYXllcihzcXVhcmUpO1xuXG4gICAgY29uc3QgdHVybiA9IGVuZW15LmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3Jkcyk7XG5cbiAgICAvLyBFeGl0IGlmIGFscmVhZHkgZ3Vlc3NlZFxuICAgIGlmICh0dXJuID09PSBmYWxzZSkgcmV0dXJuIHRoaXM7XG5cbiAgICAvLyBBZGQgZ3Vlc3MgdG8gYXJyYXlcbiAgICBndWVzc2VzLnB1c2goY29vcmRzKTtcblxuICAgIC8vIENoZWNrIGRlZmVhdFxuICAgIGVuZW15LmRlZmVhdCA9IGVuZW15LmdhbWVib2FyZC5jaGVja0FsbFN1bmsoKTtcbiAgfTtcblxuICByZXR1cm4geyBwbGF5ZXJOYW1lLCBndWVzc2VzLCBhdHRhY2ssIGdhbWVib2FyZCwgZGVmZWF0IH07XG59O1xuXG5leHBvcnQgeyBQbGF5ZXIgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBTaGlwID0gZnVuY3Rpb24gKGNvb3Jkcykge1xuICAvLyBDcmVhdGUgc2hpcCBjb29yZGluYXRlIGFycmF5ID0gW1tbY29vcmRzXSwgaGl0XSwgW1tjb29yZHNdLCBoaXRdLCBbW2Nvb3Jkc10sIGhpdF1dXG4gIGNvbnN0IGxvY2F0aW9uID0gY29vcmRzLm1hcCgoY29vcmQpID0+IFtjb29yZCwgZmFsc2VdKTtcbiAgbGV0IHN1bmsgPSBmYWxzZTtcblxuICBjb25zdCBoaXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICB0aGlzLmxvY2F0aW9uW2luZGV4XVsxXSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmxvY2F0aW9uLmV2ZXJ5KChjb29yZCkgPT4gY29vcmRbMV0gPT09IHRydWUpKSB0aGlzLnN1bmsgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiB7IGxvY2F0aW9uLCBzdW5rLCBoaXQsIGlzU3VuayB9O1xufTtcblxuZXhwb3J0IHsgU2hpcCB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGFyckVxdWFsQ2hlY2sgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5cbmNvbnN0IGdldEhpdFNoaXBJbmRleCA9IGZ1bmN0aW9uIChzaGlwLCBjb29yZHMpIHtcbiAgcmV0dXJuIHNoaXAubG9jYXRpb24uZmluZEluZGV4KChlbCkgPT4gYXJyRXF1YWxDaGVjayhlbFswXSwgY29vcmRzKSk7XG59O1xuXG5jb25zdCBhcHBseUhpdERhbWFnZSA9IGZ1bmN0aW9uIChnYW1lYm9hcmQsIGhpdENoZWNrQXJyLCBjb29yZHMpIHtcbiAgY29uc3Qgc2hpcHMgPSBbXCJjYXJyaWVyXCIsIFwiYmF0dGxlc2hpcFwiLCBcImRlc3Ryb3llclwiLCBcInN1Ym1hcmluZVwiLCBcInBhdHJvbFwiXTtcblxuICAvLyBJZGVudGlmeSB3aGljaCBzaGlwIHdhcyBoaXRcbiAgY29uc3QgaGl0U2hpcCA9IHNoaXBzW2hpdENoZWNrQXJyLmluZGV4T2YodHJ1ZSldO1xuXG4gIC8vIElkZW50aWZ5IGluZGV4IHdoZXJlIHNoaXAgd2FzIGhpdFxuICBjb25zdCBoaXRTaGlwSW5kZXggPSBnZXRIaXRTaGlwSW5kZXgoZ2FtZWJvYXJkLnNoaXBzW2hpdFNoaXBdLCBjb29yZHMpO1xuXG4gIC8vIEFwcGx5IGRhbWFnZSB3aXRoIG1ldGhvZFxuICBnYW1lYm9hcmQuc2hpcHNbaGl0U2hpcF0uaGl0KGhpdFNoaXBJbmRleCk7XG5cbiAgLy8gQ2hlY2sgaWYgc2hpcCBpcyBzdW5rXG4gIGdhbWVib2FyZC5zaGlwc1toaXRTaGlwXS5pc1N1bmsoKTtcblxuICByZXR1cm4gZ2FtZWJvYXJkO1xufTtcblxuZXhwb3J0IHsgYXBwbHlIaXREYW1hZ2UgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBhcnJFcXVhbENoZWNrID0gZnVuY3Rpb24gKGFycjEsIGFycjIpIHtcbiAgcmV0dXJuIGFycjEuZXZlcnkoKHZhbCwgaW5kZXgpID0+IHZhbCA9PT0gYXJyMltpbmRleF0pO1xufTtcblxuZXhwb3J0IHsgYXJyRXF1YWxDaGVjayB9O1xuIiwiLyoqXG4gKiBBcnJheSBjaGVja3MgaWYgeCBhbmQgeSBjYW4gZml0IGluIG5lZ2F0aXZlIGFuZCBwb3NpdGl2ZSBkaXIuXG4gKiBJbiB0aGlzIG9yZGVyOiBbeC1wb3NpdGl2ZSwgeC1uZWdhdGl2ZSwgeS1wb3NpdGl2ZSwgeS1uZWdhdGl2ZV1cbiAqIFJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgaW5kZXhlcyBvZiB2YWxpZCBbMCwgMSwgMiwgM11cbiAqL1xuY29uc3QgZmluZFBvc3NpYmxlRGlycyA9IGZ1bmN0aW9uIChjb29yZCwgbGVuZ3RoKSB7XG4gIHJldHVybiBbXG4gICAgY29vcmRbMF0gKyAobGVuZ3RoIC0gMSkgPiA5LFxuICAgIGNvb3JkWzBdIC0gKGxlbmd0aCAtIDEpIDwgMCxcbiAgICBjb29yZFsxXSArIChsZW5ndGggLSAxKSA+IDksXG4gICAgY29vcmRbMV0gLSAobGVuZ3RoIC0gMSkgPCAwXG4gIF1cbiAgICAubWFwKCh4LCBpKSA9PiAoeCA9PT0gZmFsc2UgPyBpIDogXCIgXCIpKVxuICAgIC5maWx0ZXIoKHgpID0+IHggIT09IFwiIFwiKTtcbn07XG5cbi8vIEJ1aWxkIHBvc3NpYmxlIHNoaXBzIGJhc2VkIG9uIGNvb3JkcyB3L3IvdCBib2FyZCBlZGdlc1xuY29uc3QgYnVpbGRTaGlwQ29vcmRzID0gZnVuY3Rpb24gKGxlbmd0aCwgZGlyLCBjb29yZCkge1xuICBjb25zdCBzaGlwID0gW107XG5cbiAgaWYgKGRpciA9PT0gMClcbiAgICBmb3IgKGxldCBpID0gY29vcmRbMF07IGkgPCBjb29yZFswXSArIGxlbmd0aDsgaSsrKSBzaGlwLnB1c2goW2ksIGNvb3JkWzFdXSk7XG5cbiAgaWYgKGRpciA9PT0gMSlcbiAgICBmb3IgKGxldCBpID0gY29vcmRbMF07IGkgPiBjb29yZFswXSAtIGxlbmd0aDsgaS0tKSBzaGlwLnB1c2goW2ksIGNvb3JkWzFdXSk7XG5cbiAgaWYgKGRpciA9PT0gMilcbiAgICBmb3IgKGxldCBpID0gY29vcmRbMV07IGkgPCBjb29yZFsxXSArIGxlbmd0aDsgaSsrKSBzaGlwLnB1c2goW2Nvb3JkWzBdLCBpXSk7XG5cbiAgaWYgKGRpciA9PT0gMylcbiAgICBmb3IgKGxldCBpID0gY29vcmRbMV07IGkgPiBjb29yZFsxXSAtIGxlbmd0aDsgaS0tKSBzaGlwLnB1c2goW2Nvb3JkWzBdLCBpXSk7XG5cbiAgcmV0dXJuIHNoaXA7XG59O1xuXG5leHBvcnQgeyBidWlsZFNoaXBDb29yZHMsIGZpbmRQb3NzaWJsZURpcnMgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBET00gVkFSSUFCTEVTICovXG5jb25zdCBnYW1lYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5nYW1lYm9hcmRcIik7XG5jb25zdCBzcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zcXVhcmVcIik7XG5cbmNvbnN0IGRpc3BsYXlCb2F0cyA9IGZ1bmN0aW9uIChwbGF5ZXIpIHtcbiAgLy8gTG9vcCBvdmVyIGVhY2ggc2hpcCBvZiBwbGF5ZXJcbiAgZm9yIChsZXQgc2hpcCBpbiBwbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzKSB7XG4gICAgLy8gR2V0IHNoaXAgY29vcmRpbmF0ZXNcbiAgICBwbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzW3NoaXBdLmxvY2F0aW9uLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBjb25zdCBnYW1lYm9hcmQgPVxuICAgICAgICBwbGF5ZXIucGxheWVyTmFtZSA9PT0gXCJjb21wdXRlclwiID8gZ2FtZWJvYXJkc1swXSA6IGdhbWVib2FyZHNbMV07XG4gICAgICBjb25zdCByb3cgPSBnYW1lYm9hcmQuY2hpbGRyZW5bY29vcmRbMF1bMF1dO1xuICAgICAgY29uc3Qgc3F1YXJlID0gcm93LmNoaWxkcmVuW2Nvb3JkWzBdWzFdXTtcblxuICAgICAgLy8gQWRkIHNoaXAgYmFja2dyb3VuZCBjb2xvclxuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYHNxdWFyZS0tJHtzaGlwfWApO1xuICAgIH0pO1xuICB9XG59O1xuXG5jb25zdCB1cGRhdGVVSSA9IGZ1bmN0aW9uIChwbGF5ZXIpIHtcbiAgLy8gTG9vcCBvdmVyIGhpdHNcbiAgcGxheWVyLmdhbWVib2FyZC5oaXRzLmZvckVhY2goKGhpdCkgPT4ge1xuICAgIGNvbnN0IGdhbWVib2FyZCA9XG4gICAgICBwbGF5ZXIucGxheWVyTmFtZSA9PT0gXCJjb21wdXRlclwiID8gZ2FtZWJvYXJkc1swXSA6IGdhbWVib2FyZHNbMV07XG4gICAgY29uc3Qgcm93ID0gZ2FtZWJvYXJkLmNoaWxkcmVuW2hpdFswXV07XG4gICAgY29uc3Qgc3F1YXJlID0gcm93LmNoaWxkcmVuW2hpdFsxXV07XG5cbiAgICAvLyBBZGQgaGl0IGJhY2tncm91bmQgY29sb3JcbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChgc3F1YXJlLS1oaXRgKTtcbiAgfSk7XG5cbiAgLy8gTG9vcCBvdmVyIG1pc3Nlc1xuICBwbGF5ZXIuZ2FtZWJvYXJkLm1pc3Nlcy5mb3JFYWNoKChtaXNzKSA9PiB7XG4gICAgY29uc3QgZ2FtZWJvYXJkID1cbiAgICAgIHBsYXllci5wbGF5ZXJOYW1lID09PSBcImNvbXB1dGVyXCIgPyBnYW1lYm9hcmRzWzBdIDogZ2FtZWJvYXJkc1sxXTtcbiAgICBjb25zdCByb3cgPSBnYW1lYm9hcmQuY2hpbGRyZW5bbWlzc1swXV07XG4gICAgY29uc3Qgc3F1YXJlID0gcm93LmNoaWxkcmVuW21pc3NbMV1dO1xuXG4gICAgLy8gQWRkIGhpdCBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYHNxdWFyZS0tbWlzc2ApO1xuICB9KTtcbn07XG5cbmNvbnN0IHJlc2V0VUkgPSBmdW5jdGlvbiAoKSB7XG4gIHNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzcXVhcmUtLWhpdFwiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcInNxdWFyZS0tbWlzc1wiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcImFuaW1hdGUtZ3Vlc3NcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzcXVhcmUtLWNhcnJpZXJcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzcXVhcmUtLWJhdHRsZXNoaXBcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzcXVhcmUtLWRlc3Ryb3llclwiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcInNxdWFyZS0tc3VibWFyaW5lXCIpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKFwic3F1YXJlLS1wYXRyb2xcIik7XG4gIH0pO1xufTtcblxuY29uc3QgYWRkR3Vlc3NBbmltYXRpb24gPSBmdW5jdGlvbiAoZW5lbXlQbGF5ZXIsIGNvb3Jkcykge1xuICBjb25zdCBnYW1lYm9hcmQgPVxuICAgIGVuZW15UGxheWVyLnBsYXllck5hbWUgPT09IFwicGxheWVyXCIgPyBnYW1lYm9hcmRzWzFdIDogZ2FtZWJvYXJkc1swXTtcbiAgY29uc3Qgcm93ID0gZ2FtZWJvYXJkLmNoaWxkcmVuW2Nvb3Jkc1swXV07XG4gIGNvbnN0IHNxdWFyZSA9IHJvdy5jaGlsZHJlbltjb29yZHNbMV1dO1xuXG4gIC8vIGFkZCBhbmltYXRpb24gY2xhc3NcbiAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJhbmltYXRlLWd1ZXNzXCIpO1xufTtcblxuZXhwb3J0IHsgZ2FtZWJvYXJkcywgZGlzcGxheUJvYXRzLCB1cGRhdGVVSSwgcmVzZXRVSSwgYWRkR3Vlc3NBbmltYXRpb24gfTtcbiIsImltcG9ydCB7IGFyckVxdWFsQ2hlY2sgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5pbXBvcnQgeyBnZXRSYW5kb21Db29yZHMgfSBmcm9tIFwiLi9nZXRSYW5kb21Db29yZHNcIjtcblxuKFwidXNlIHN0cmljdFwiKTtcblxuY29uc3QgZ2V0QXR0YWNrQ29vcmRzUGxheWVyID0gZnVuY3Rpb24gKHNxdWFyZSkge1xuICBjb25zdCByb3cgPSBzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3RbMV0uc2xpY2UoLTEpO1xuICBjb25zdCBjb2wgPSBzcXVhcmUuY2xhc3NMaXN0WzFdLnNsaWNlKC0xKTtcbiAgcmV0dXJuIFtwYXJzZUludChyb3csIDEwKSwgcGFyc2VJbnQoY29sLCAxMCldO1xufTtcblxuY29uc3QgZ2V0QXR0YWNrQ29vcmRzQ29tcCA9IGZ1bmN0aW9uIChndWVzc2VzKSB7XG4gIGxldCBjb29yZCwgY2hlY2tQcmV2R3Vlc3NlcztcblxuICBkbyB7XG4gICAgLy8gQ2hvb3NlIHJhbmRvbSBjb29yZGluYXRlXG4gICAgY29vcmQgPSBnZXRSYW5kb21Db29yZHMoKTtcblxuICAgIC8vIENoZWNrIGlmIGNvb3JkaW5hdGUgd2FzIGFscmVhZHkgZ3Vlc3NlZFxuICAgIGNoZWNrUHJldkd1ZXNzZXMgPSBndWVzc2VzLm1hcCgoZ3Vlc3MpID0+IGFyckVxdWFsQ2hlY2soY29vcmQsIGd1ZXNzKSk7XG4gIH0gd2hpbGUgKGNoZWNrUHJldkd1ZXNzZXMuaW5jbHVkZXModHJ1ZSkgJiYgZ3Vlc3Nlcy5sZW5ndGggPCAxMDApO1xuXG4gIGlmIChndWVzc2VzLmxlbmd0aCA+IDk5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gbW9yZSBndWVzc2VzIGF2YWlsYWJsZVwiKTtcbiAgfVxuICByZXR1cm4gY29vcmQ7XG59O1xuXG5leHBvcnQgeyBnZXRBdHRhY2tDb29yZHNQbGF5ZXIsIGdldEF0dGFja0Nvb3Jkc0NvbXAgfTtcbiIsImltcG9ydCB7IG1ha2VTaGlwIH0gZnJvbSBcIi4vbWFrZVNoaXBcIjtcblxuKFwidXNlIHN0cmljdFwiKTtcblxuY29uc3QgZ2V0Q29tcFNoaXBDb29yZHMgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGFsbFNoaXBzID0gW107XG5cbiAgLy8gQ3JlYXRlIGNhcnJpZXJcbiAgYWxsU2hpcHMucHVzaChtYWtlU2hpcChhbGxTaGlwcywgNSkpO1xuXG4gIC8vIENyZWF0ZSBiYXR0bGVzaGlwXG4gIGFsbFNoaXBzLnB1c2gobWFrZVNoaXAoYWxsU2hpcHMsIDQpKTtcblxuICAvLyBDcmVhdGUgZGVzdHJveWVyXG4gIGFsbFNoaXBzLnB1c2gobWFrZVNoaXAoYWxsU2hpcHMsIDMpKTtcblxuICAvLyBDcmVhdGUgc3VibWFyaW5lXG4gIGFsbFNoaXBzLnB1c2gobWFrZVNoaXAoYWxsU2hpcHMsIDMpKTtcblxuICAvLyBDcmVhdGUgcGF0cm9sXG4gIGFsbFNoaXBzLnB1c2gobWFrZVNoaXAoYWxsU2hpcHMsIDIpKTtcblxuICByZXR1cm4gYWxsU2hpcHM7XG59O1xuXG5leHBvcnQgeyBnZXRDb21wU2hpcENvb3JkcyB9O1xuXG4vLyBbMF0gY2FycmllciwgWzFdIGJhdHRsZXNoaXAsIFsyXSBkZXN0cm95ZXIsIFszXSBzdWJtYXJpbmUsIFs0XSBwYXRyb2xcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBnZXRSYW5kb21Db29yZHMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCldO1xufTtcblxuY29uc3QgZ2V0TnVtID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xufTtcblxuZXhwb3J0IHsgZ2V0UmFuZG9tQ29vcmRzLCBnZXROdW0gfTtcbiIsIi8vIENoZWNrIGlmIGEgZ3Vlc3NlZCBjb29yZGluYXRlIGhpdHMgYSBzaGlwXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyRXF1YWxDaGVjayB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcblxuY29uc3QgaGl0Q2hlY2sgPSBmdW5jdGlvbiAoZ2FtZWJvYXJkLCBjb29yZHMpIHtcbiAgLy8gQ3JlYXRlIGFycmF5IGZvciBzaGlwIGhpdCBjaGVja1xuICBjb25zdCBvdXRwdXQgPSBbXTtcblxuICAvLyBMb29wIG92ZXIgc2hpcHMgdG8gY2hlY2sgaWYgY29vcmRzIGlzIGEgaGl0IGZvciBhbnlcbiAgZm9yIChsZXQgc2hpcCBpbiBnYW1lYm9hcmQuc2hpcHMpIHtcbiAgICBvdXRwdXQucHVzaChcbiAgICAgIGdhbWVib2FyZC5zaGlwc1tzaGlwXS5sb2NhdGlvblxuICAgICAgICAubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZFswXSwgY29vcmRzKSlcbiAgICAgICAgLmluY2x1ZGVzKHRydWUpXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgeyBoaXRDaGVjayB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGdldFJhbmRvbUNvb3JkcyB9IGZyb20gXCIuL2dldFJhbmRvbUNvb3Jkc1wiO1xuaW1wb3J0IHsgYXJyRXF1YWxDaGVjayB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcbmltcG9ydCB7IGJ1aWxkU2hpcENvb3JkcywgZmluZFBvc3NpYmxlRGlycyB9IGZyb20gXCIuL2NyZWF0ZVJhbmRvbVNoaXBzXCI7XG5cbmNvbnN0IG1ha2VTaGlwID0gZnVuY3Rpb24gKGFsbFNoaXBzLCBsZW5ndGgpIHtcbiAgY29uc3QgYWxsU2hpcHNDb29yZHMgPSBhbGxTaGlwcy5mbGF0KCk7XG5cbiAgLy8gR2V0IGZpcnN0IGNvb3JkaW5hdGVcbiAgbGV0IGNvb3JkO1xuICBkbyB7XG4gICAgY29vcmQgPSBnZXRSYW5kb21Db29yZHMoKTtcbiAgfSB3aGlsZSAoYWxsU2hpcHNDb29yZHMubWFwKChjKSA9PiBhcnJFcXVhbENoZWNrKGMsIGNvb3JkKSkuaW5jbHVkZXModHJ1ZSkpO1xuXG4gIC8vIEdldCBwb3NzaWJsZSBkaXJlY3Rpb25zIGFnYWluc3QgZWRnZSBvZiBib2FyZCBmcm9tIGNvb3JkLlxuICBjb25zdCBwb3NzaWJsZURpcnMgPSBmaW5kUG9zc2libGVEaXJzKGNvb3JkLCBsZW5ndGgpO1xuXG4gIC8vIENyZWF0ZSBhcnJheSBvZiBhbGwgcG9zc2libGUgc2hpcHNcbiAgY29uc3QgcG9zc2libGVTaGlwcyA9IHBvc3NpYmxlRGlycy5tYXAoKGRpcikgPT5cbiAgICBidWlsZFNoaXBDb29yZHMobGVuZ3RoLCBkaXIsIGNvb3JkKVxuICApO1xuXG4gIC8vIENoZWNrIGVhY2ggc2hpcCBmb3IgY29uZmxpY3Qgd2l0aCBwcmV2aW91cyBzaGlwIHBsYWNlbWVudFxuICBjb25zdCBzaGlwQ2hvaWNlc0ZpbmFsID0gW107XG5cbiAgLy8gTG9vcCBvdmVyIHBvc3NpYmxlIHNoaXBzXG4gIGZvciAobGV0IHNoaXAgb2YgcG9zc2libGVTaGlwcykge1xuICAgIGNvbnN0IGNvb3JkQ2hlY2tBcnIgPSBbXTtcblxuICAgIC8vIExvb3Agb3ZlciBjb29yZGluYXRlcyBvZiBlYWNoIHBvc3NpYmxlIHNoaXBcbiAgICBmb3IgKGxldCBzaGlwQ29vcmQgb2Ygc2hpcCkge1xuICAgICAgbGV0IG1hdGNoID0gMDtcblxuICAgICAgLy8gTG9vcCBvdmVyIHByZXZpb3VzIHNoaXBzOyBpZiBtYXRjaCwgbWFyayB0aGF0XG4gICAgICBhbGxTaGlwc0Nvb3Jkcy5mb3JFYWNoKChhbGxTaGlwc0Nvb3JkKSA9PiB7XG4gICAgICAgIGlmIChhcnJFcXVhbENoZWNrKHNoaXBDb29yZCwgYWxsU2hpcHNDb29yZCkpIG1hdGNoKys7XG4gICAgICB9KTtcblxuICAgICAgLy8gSWYgYSBtYXRjaCBpcyBmb3VuZCwgYWRkIHRydWVcbiAgICAgIGNvb3JkQ2hlY2tBcnIucHVzaChtYXRjaCA9PT0gMCA/IGZhbHNlIDogdHJ1ZSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHZhbGlkIHNoaXBzIHRvIGNob2ljZSBhcnJheVxuICAgIGlmICghY29vcmRDaGVja0Fyci5pbmNsdWRlcyh0cnVlKSkgc2hpcENob2ljZXNGaW5hbC5wdXNoKHNoaXApO1xuICB9XG5cbiAgLy8gUmFuZG9tbHkgc2VsZWN0IGZyb20gcmVtYWluaW5nIG9wdGlvbnNcbiAgcmV0dXJuIHNoaXBDaG9pY2VzRmluYWxbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc2hpcENob2ljZXNGaW5hbC5sZW5ndGgpXTtcbn07XG5cbmV4cG9ydCB7IG1ha2VTaGlwIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vUGxheWVyXCI7XG5pbXBvcnQgeyBnZXRDb21wU2hpcENvb3JkcyB9IGZyb20gXCIuL2dldENvbXBTaGlwQ29vcmRzXCI7XG5cbi8vKiAjIyMjIyMjIyMjIyBJbml0aWFsIFNoaXAgQ29vcmRzICMjIyMjIyMjIyMjIyMjI1xuLy8gY2FycmllclxuLy8gcHJldHRpZXItaWdub3JlXG5jb25zdCBjb29yZHMwID0gW1syLCA5XSwgWzMsIDldLCBbNCwgOV0sIFs1LCA5XSwgWzYsIDldXTtcblxuLy8gYmF0dGxlc2hpcFxuLy8gcHJldHRpZXItaWdub3JlXG5jb25zdCBjb29yZHMxID0gW1syLCAwXSwgWzMsIDBdLCBbNCwgMF0sIFs1LCAwXV07XG5cbi8vIGRlc3Ryb3llclxuLy8gcHJldHRpZXItaWdub3JlXG5jb25zdCBjb29yZHMyID0gW1swLCAxXSwgWzAsIDJdLCBbMCwgM11dO1xuXG4vLyBzdWJtYXJpbmVcbi8vIHByZXR0aWVyLWlnbm9yZVxuY29uc3QgY29vcmRzMyA9IFtbMywgM10sIFszLCA0XSwgWzMsIDVdXTtcblxuLy8gcGF0cm9sXG4vLyBwcmV0dGllci1pZ25vcmVcbmNvbnN0IGNvb3JkczQgPSBbWzcsIDRdLCBbNywgNV1dO1xuXG4vLyogIyMjIyMjIyMjIyMgTmV3IEdhbWUgIyMjIyMjIyMjIyMjIyMjXG5jb25zdCBuZXdHYW1lID0gZnVuY3Rpb24gKCkge1xuICAvLyBQbGF5ZXIgY2hvb3NlcyBzaGlwIGNvb3JkaW5hdGVzXG4gIGNvbnN0IHRlc3RDb29yZHMxID0gW2Nvb3JkczAsIGNvb3JkczEsIGNvb3JkczIsIGNvb3JkczMsIGNvb3JkczRdO1xuICBjb25zdCBwbGF5ZXIgPSBQbGF5ZXIoXCJwbGF5ZXJcIiwgdGVzdENvb3JkczEpO1xuXG4gIC8vIENvbXB1dGVyIHJhbmRvbWx5IGNob29zZXMgc2hpcCBjb29yZGluYXRlc1xuICBjb25zdCBjb21wdXRlciA9IFBsYXllcihcImNvbXB1dGVyXCIsIGdldENvbXBTaGlwQ29vcmRzKCkpO1xuXG4gIHJldHVybiBbcGxheWVyLCBjb21wdXRlcl07XG59O1xuXG5leHBvcnQgeyBuZXdHYW1lIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyRXF1YWxDaGVjayB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcblxuY29uc3QgcHJldkd1ZXNzQ2hlY2sgPSAoZ2FtZWJvYXJkLCBjb29yZHMpID0+IHtcbiAgY29uc3Qgb3V0cHV0ID0gW107XG5cbiAgb3V0cHV0LnB1c2goXG4gICAgZ2FtZWJvYXJkLm1pc3Nlcy5tYXAoKGNvb3JkKSA9PiBhcnJFcXVhbENoZWNrKGNvb3JkLCBjb29yZHMpKS5pbmNsdWRlcyh0cnVlKVxuICApO1xuXG4gIG91dHB1dC5wdXNoKFxuICAgIGdhbWVib2FyZC5oaXRzLm1hcCgoY29vcmQpID0+IGFyckVxdWFsQ2hlY2soY29vcmQsIGNvb3JkcykpLmluY2x1ZGVzKHRydWUpXG4gICk7XG5cbiAgcmV0dXJuIG91dHB1dDtcbn07XG5cbmV4cG9ydCB7IHByZXZHdWVzc0NoZWNrIH07XG5cbi8vIGNhcnJpZXIsIGJhdHRsZXNoaXAsIGRlc3Ryb3llciwgc3VibWFyaW5lLCBwYXRyb2xcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQge1xuICBnYW1lYm9hcmRzLFxuICBkaXNwbGF5Qm9hdHMsXG4gIHVwZGF0ZVVJLFxuICByZXNldFVJLFxuICBhZGRHdWVzc0FuaW1hdGlvblxufSBmcm9tIFwiLi9kb21JbnRlcmFjdGlvblwiO1xuaW1wb3J0IHsgbmV3R2FtZSB9IGZyb20gXCIuL25ld0dhbWVcIjtcblxuLy8qICMjIyMjIyMjIyMjIyMgRE9NIFZhcmlhYmxlcyAjIyMjIyMjIyMjIyMjIyMjIyNcbmNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkc1swXTtcblxuLy8qICMjIyMjIyMjIyMjIyMgR2FtZWZsb3cgIyMjIyMjIyMjIyMjIyMjIyMjXG4vLyBQbGF5ZXIgVmFyaWFibGVzXG5sZXQgcGxheWVyO1xubGV0IGNvbXB1dGVyO1xuXG4vLyBOZXcgR2FtZVxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZXN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHJlc2V0VUkoKTtcblxuICBjb25zdCBnYW1lID0gbmV3R2FtZSgpO1xuXG4gIHBsYXllciA9IGdhbWVbMF07XG4gIGNvbXB1dGVyID0gZ2FtZVsxXTtcblxuICBkaXNwbGF5Qm9hdHMocGxheWVyKTtcbn0pO1xuXG4vLyBQbGF5IEdhbWVcbmJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBjb25zdCBzcXVhcmUgPSBlLnRhcmdldC5jbG9zZXN0KFwiLnNxdWFyZVwiKTtcbiAgaWYgKCFzcXVhcmUpIHJldHVybjtcblxuICAvLyBEaXNhbGxvdyBpZiBnYW1lb3ZlclxuICBpZiAocGxheWVyLmRlZmVhdCA9PT0gdHJ1ZSB8fCBjb21wdXRlci5kZWZlYXQgPT09IHRydWUpIHJldHVybjtcblxuICAvLyBEaXNhbGxvdyBhbHJlYWR5IGNsaWNrZWQgc3F1YXJlc1xuICBpZiAoc3F1YXJlLmNsYXNzTGlzdC5jb250YWlucyhcInNxdWFyZS0taGl0XCIpKSByZXR1cm47XG4gIGlmIChzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwic3F1YXJlLS1taXNzXCIpKSByZXR1cm47XG5cbiAgLy8gUGxheWVyIHR1cm5cbiAgcGxheWVyLmF0dGFjayhjb21wdXRlciwgc3F1YXJlKTtcbiAgdXBkYXRlVUkoY29tcHV0ZXIpO1xuXG4gIC8vICBDaGVjayBmb3IgZGVmZWF0XG4gIGlmIChjb21wdXRlci5kZWZlYXQgPT09IHRydWUpIHtcbiAgICBjb25zb2xlLmxvZyhcIlBsYXllciB3aW5zIVwiKTtcbiAgICAvLyEgQWRkIGRpc3BsYXkgZ2FtZSBvdmVyIGFuZCByZXN0YXJ0XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gQ29tcHV0ZXIgdHVyblxuICBjb21wdXRlci5hdHRhY2socGxheWVyKTtcbiAgdXBkYXRlVUkocGxheWVyKTtcbiAgYWRkR3Vlc3NBbmltYXRpb24ocGxheWVyLCBjb21wdXRlci5ndWVzc2VzLnNsaWNlKC0xKVswXSk7XG5cbiAgLy8gQ2hlY2sgZm9yIGRlZmVhdFxuICBpZiAocGxheWVyLmRlZmVhdCA9PT0gdHJ1ZSkge1xuICAgIGNvbnNvbGUubG9nKFwiQ29tcHV0ZXIgV2lucyFcIik7XG4gICAgLy8hIEFkZCBkaXNwbGF5IGdhbWUgb3ZlciBhbmQgcmVzdGFydFxuICAgIHJldHVybjtcbiAgfVxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=