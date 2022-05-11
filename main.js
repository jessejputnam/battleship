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
/* harmony export */   "hideModal": () => (/* binding */ hideModal),
/* harmony export */   "resetUI": () => (/* binding */ resetUI),
/* harmony export */   "revealGameboards": () => (/* binding */ revealGameboards),
/* harmony export */   "revealModal": () => (/* binding */ revealModal),
/* harmony export */   "updateUI": () => (/* binding */ updateUI)
/* harmony export */ });


/* DOM VARIABLES */
const main = document.querySelector(".main__wrapper");
const modal = document.querySelector("#menu__modal");
const modalText = document.querySelector(".menu__winner");
const gameboards = document.querySelectorAll(".gameboard");
const squares = document.querySelectorAll(".square");

const hideModal = function () {
  modal.classList.add("hidden--opacity");
  setTimeout(() => modal.classList.add("hidden--z"), 1000);
};

const revealModal = function (winner) {
  modalText.textContent = `${winner} wins!`;
  modal.classList.remove("hidden--z");
  modal.classList.remove("hidden--opacity");
};

const revealGameboards = function () {
  main.classList.add("reveal--opacity");
};

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
const newGameBtn = document.querySelector("#new-game");

//* ############# Gameflow ##################
// Player Variables
let player;
let computer;

// Start New Game
newGameBtn.addEventListener("click", () => {
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.revealGameboards)();
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.hideModal)();

  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.resetUI)();

  const game = (0,_newGame__WEBPACK_IMPORTED_MODULE_1__.newGame)();

  player = game[0];
  computer = game[1];

  console.log(computer);

  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.displayBoats)(player);
});

// Turn Gameplay
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
    (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.revealModal)("Player");
    return;
  }

  // Computer turn
  computer.attack(player);
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.updateUI)(player);
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.addGuessAnimation)(player, computer.guesses.slice(-1)[0]);

  // Check for defeat
  if (player.defeat === true) {
    (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.revealModal)("Computer");
    return;
  }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyw2REFBYTtBQUNqRDs7QUFFQTtBQUNBLGtDQUFrQyw2REFBYTtBQUMvQzs7QUFFQTtBQUNBOztBQUUwQjs7QUFFMUI7Ozs7Ozs7VUNwQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOYTtBQVVhO0FBQ1U7O0FBRXBDO0FBQ0EsY0FBYywwREFBYTtBQUMzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRSxpRUFBZ0I7QUFDbEIsRUFBRSwwREFBUzs7QUFFWCxFQUFFLHdEQUFPOztBQUVULGVBQWUsaURBQU87O0FBRXRCO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRSw2REFBWTtBQUNkLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUUseURBQVE7O0FBRVY7QUFDQTtBQUNBLElBQUksNERBQVc7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFLHlEQUFRO0FBQ1YsRUFBRSxrRUFBaUI7O0FBRW5CO0FBQ0E7QUFDQSxJQUFJLDREQUFXO0FBQ2Y7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBseUhpdERhbWFnZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FyckVxdWFsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jcmVhdGVSYW5kb21TaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbUludGVyYWN0aW9uLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2V0QXR0YWNrQ29vcmRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2V0Q29tcFNoaXBDb29yZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nZXRSYW5kb21Db29yZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9oaXRDaGVjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21ha2VTaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbmV3R2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3ByZXZHdWVzc0NoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEdhbWVib2FyZFxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9TaGlwXCI7XG5pbXBvcnQgeyBwcmV2R3Vlc3NDaGVjayB9IGZyb20gXCIuL3ByZXZHdWVzc0NoZWNrXCI7XG5pbXBvcnQgeyBoaXRDaGVjayB9IGZyb20gXCIuL2hpdENoZWNrXCI7XG5pbXBvcnQgeyBhcHBseUhpdERhbWFnZSB9IGZyb20gXCIuL2FwcGx5SGl0RGFtYWdlXCI7XG5cbmNvbnN0IEdhbWVib2FyZCA9IGZ1bmN0aW9uIChjb29yZHMwLCBjb29yZHMxLCBjb29yZHMyLCBjb29yZHMzLCBjb29yZHM0KSB7XG4gIC8vIFNoaXBzXG4gIGNvbnN0IHNoaXBzID0ge1xuICAgIGNhcnJpZXI6IFNoaXAoY29vcmRzMCksXG4gICAgYmF0dGxlc2hpcDogU2hpcChjb29yZHMxKSxcbiAgICBkZXN0cm95ZXI6IFNoaXAoY29vcmRzMiksXG4gICAgc3VibWFyaW5lOiBTaGlwKGNvb3JkczMpLFxuICAgIHBhdHJvbDogU2hpcChjb29yZHM0KVxuICB9O1xuXG4gIC8vIEVuZW15IEd1ZXNzIEFycmF5c1xuICBjb25zdCBtaXNzZXMgPSBbXTtcbiAgY29uc3QgaGl0cyA9IFtdO1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBndWVzc2VkXG4gICAgaWYgKHByZXZHdWVzc0NoZWNrKHRoaXMsIGNvb3JkcykuaW5jbHVkZXModHJ1ZSkpIHJldHVybiBmYWxzZTtcblxuICAgIC8vIENoZWNrIGlmIGd1ZXNzIGlzIGEgaGl0IG9uIGEgc2hpcFxuICAgIGNvbnN0IGhpdENoZWNrQXJyID0gaGl0Q2hlY2sodGhpcywgY29vcmRzKTtcblxuICAgIC8vIElmIG5vbmUgc2hvdyBoaXQsIHB1dCBpbnRvIG1pc3NlcyBhcnJheVxuICAgIGlmIChoaXRDaGVja0Fyci5ldmVyeSgoeCkgPT4geCA9PT0gZmFsc2UpKSB7XG4gICAgICBtaXNzZXMucHVzaChjb29yZHMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gSWYgZ3Vlc3Mgc2hvd3MgaGl0XG4gICAgaWYgKGhpdENoZWNrQXJyLnNvbWUoKHgpID0+IHggPT09IHRydWUpKSB7XG4gICAgICBoaXRzLnB1c2goY29vcmRzKTtcbiAgICAgIHJldHVybiBhcHBseUhpdERhbWFnZSh0aGlzLCBoaXRDaGVja0FyciwgY29vcmRzKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2hlY2tBbGxTdW5rID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIENyZWF0ZSBhcnJheSBvZiBhbGwgc3VuayBjaGVja3NcbiAgICBjb25zdCBzdW5rQXJyID0gW107XG5cbiAgICAvLyBQb3B1bGF0ZSB0aGUgYXJyYXkgd2l0aCBzdW5rIGNoZWNrc1xuICAgIGZvciAobGV0IHNoaXAgaW4gdGhpcy5zaGlwcykge1xuICAgICAgc3Vua0Fyci5wdXNoKHNoaXBzW3NoaXBdLnN1bmspO1xuICAgIH1cblxuICAgIC8vIEV2YWx1YXRlIHRoZSBhcnJheSBmb3IgYWxsIHN1bmsgY2hlY2tzID09PSB0cnVlXG4gICAgcmV0dXJuIHN1bmtBcnIuZXZlcnkoKGVsKSA9PiBlbCA9PT0gdHJ1ZSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzaGlwcyxcbiAgICBtaXNzZXMsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBoaXRzLFxuICAgIGNoZWNrQWxsU3Vua1xuICB9O1xufTtcblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBnZXRBdHRhY2tDb29yZHNDb21wLCBnZXRBdHRhY2tDb29yZHNQbGF5ZXIgfSBmcm9tIFwiLi9nZXRBdHRhY2tDb29yZHNcIjtcblxuY29uc3QgUGxheWVyID0gZnVuY3Rpb24gKHBsYXllck5hbWUsIGNvb3Jkcykge1xuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoLi4uY29vcmRzKTtcbiAgY29uc3QgZ3Vlc3NlcyA9IFtdO1xuICBsZXQgZGVmZWF0ID0gZmFsc2U7XG5cbiAgY29uc3QgYXR0YWNrID0gZnVuY3Rpb24gKGVuZW15LCBzcXVhcmUpIHtcbiAgICBjb25zdCBjb29yZHMgPVxuICAgICAgZW5lbXkucGxheWVyTmFtZSA9PT0gXCJwbGF5ZXJcIlxuICAgICAgICA/IGdldEF0dGFja0Nvb3Jkc0NvbXAoZ3Vlc3NlcylcbiAgICAgICAgOiBnZXRBdHRhY2tDb29yZHNQbGF5ZXIoc3F1YXJlKTtcblxuICAgIGNvbnN0IHR1cm4gPSBlbmVteS5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuXG4gICAgLy8gRXhpdCBpZiBhbHJlYWR5IGd1ZXNzZWRcbiAgICBpZiAodHVybiA9PT0gZmFsc2UpIHJldHVybiB0aGlzO1xuXG4gICAgLy8gQWRkIGd1ZXNzIHRvIGFycmF5XG4gICAgZ3Vlc3Nlcy5wdXNoKGNvb3Jkcyk7XG5cbiAgICAvLyBDaGVjayBkZWZlYXRcbiAgICBlbmVteS5kZWZlYXQgPSBlbmVteS5nYW1lYm9hcmQuY2hlY2tBbGxTdW5rKCk7XG4gIH07XG5cbiAgcmV0dXJuIHsgcGxheWVyTmFtZSwgZ3Vlc3NlcywgYXR0YWNrLCBnYW1lYm9hcmQsIGRlZmVhdCB9O1xufTtcblxuZXhwb3J0IHsgUGxheWVyIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgU2hpcCA9IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgLy8gQ3JlYXRlIHNoaXAgY29vcmRpbmF0ZSBhcnJheSA9IFtbW2Nvb3Jkc10sIGhpdF0sIFtbY29vcmRzXSwgaGl0XSwgW1tjb29yZHNdLCBoaXRdXVxuICBjb25zdCBsb2NhdGlvbiA9IGNvb3Jkcy5tYXAoKGNvb3JkKSA9PiBbY29vcmQsIGZhbHNlXSk7XG4gIGxldCBzdW5rID0gZmFsc2U7XG5cbiAgY29uc3QgaGl0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgdGhpcy5sb2NhdGlvbltpbmRleF1bMV0gPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5sb2NhdGlvbi5ldmVyeSgoY29vcmQpID0+IGNvb3JkWzFdID09PSB0cnVlKSkgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4geyBsb2NhdGlvbiwgc3VuaywgaGl0LCBpc1N1bmsgfTtcbn07XG5cbmV4cG9ydCB7IFNoaXAgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJFcXVhbENoZWNrIH0gZnJvbSBcIi4vYXJyRXF1YWxDaGVja1wiO1xuXG5jb25zdCBnZXRIaXRTaGlwSW5kZXggPSBmdW5jdGlvbiAoc2hpcCwgY29vcmRzKSB7XG4gIHJldHVybiBzaGlwLmxvY2F0aW9uLmZpbmRJbmRleCgoZWwpID0+IGFyckVxdWFsQ2hlY2soZWxbMF0sIGNvb3JkcykpO1xufTtcblxuY29uc3QgYXBwbHlIaXREYW1hZ2UgPSBmdW5jdGlvbiAoZ2FtZWJvYXJkLCBoaXRDaGVja0FyciwgY29vcmRzKSB7XG4gIGNvbnN0IHNoaXBzID0gW1wiY2FycmllclwiLCBcImJhdHRsZXNoaXBcIiwgXCJkZXN0cm95ZXJcIiwgXCJzdWJtYXJpbmVcIiwgXCJwYXRyb2xcIl07XG5cbiAgLy8gSWRlbnRpZnkgd2hpY2ggc2hpcCB3YXMgaGl0XG4gIGNvbnN0IGhpdFNoaXAgPSBzaGlwc1toaXRDaGVja0Fyci5pbmRleE9mKHRydWUpXTtcblxuICAvLyBJZGVudGlmeSBpbmRleCB3aGVyZSBzaGlwIHdhcyBoaXRcbiAgY29uc3QgaGl0U2hpcEluZGV4ID0gZ2V0SGl0U2hpcEluZGV4KGdhbWVib2FyZC5zaGlwc1toaXRTaGlwXSwgY29vcmRzKTtcblxuICAvLyBBcHBseSBkYW1hZ2Ugd2l0aCBtZXRob2RcbiAgZ2FtZWJvYXJkLnNoaXBzW2hpdFNoaXBdLmhpdChoaXRTaGlwSW5kZXgpO1xuXG4gIC8vIENoZWNrIGlmIHNoaXAgaXMgc3Vua1xuICBnYW1lYm9hcmQuc2hpcHNbaGl0U2hpcF0uaXNTdW5rKCk7XG5cbiAgcmV0dXJuIGdhbWVib2FyZDtcbn07XG5cbmV4cG9ydCB7IGFwcGx5SGl0RGFtYWdlIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgYXJyRXF1YWxDaGVjayA9IGZ1bmN0aW9uIChhcnIxLCBhcnIyKSB7XG4gIHJldHVybiBhcnIxLmV2ZXJ5KCh2YWwsIGluZGV4KSA9PiB2YWwgPT09IGFycjJbaW5kZXhdKTtcbn07XG5cbmV4cG9ydCB7IGFyckVxdWFsQ2hlY2sgfTtcbiIsIi8qKlxuICogQXJyYXkgY2hlY2tzIGlmIHggYW5kIHkgY2FuIGZpdCBpbiBuZWdhdGl2ZSBhbmQgcG9zaXRpdmUgZGlyLlxuICogSW4gdGhpcyBvcmRlcjogW3gtcG9zaXRpdmUsIHgtbmVnYXRpdmUsIHktcG9zaXRpdmUsIHktbmVnYXRpdmVdXG4gKiBSZXR1cm5zIGFuIGFycmF5IHdpdGggdGhlIGluZGV4ZXMgb2YgdmFsaWQgWzAsIDEsIDIsIDNdXG4gKi9cbmNvbnN0IGZpbmRQb3NzaWJsZURpcnMgPSBmdW5jdGlvbiAoY29vcmQsIGxlbmd0aCkge1xuICByZXR1cm4gW1xuICAgIGNvb3JkWzBdICsgKGxlbmd0aCAtIDEpID4gOSxcbiAgICBjb29yZFswXSAtIChsZW5ndGggLSAxKSA8IDAsXG4gICAgY29vcmRbMV0gKyAobGVuZ3RoIC0gMSkgPiA5LFxuICAgIGNvb3JkWzFdIC0gKGxlbmd0aCAtIDEpIDwgMFxuICBdXG4gICAgLm1hcCgoeCwgaSkgPT4gKHggPT09IGZhbHNlID8gaSA6IFwiIFwiKSlcbiAgICAuZmlsdGVyKCh4KSA9PiB4ICE9PSBcIiBcIik7XG59O1xuXG4vLyBCdWlsZCBwb3NzaWJsZSBzaGlwcyBiYXNlZCBvbiBjb29yZHMgdy9yL3QgYm9hcmQgZWRnZXNcbmNvbnN0IGJ1aWxkU2hpcENvb3JkcyA9IGZ1bmN0aW9uIChsZW5ndGgsIGRpciwgY29vcmQpIHtcbiAgY29uc3Qgc2hpcCA9IFtdO1xuXG4gIGlmIChkaXIgPT09IDApXG4gICAgZm9yIChsZXQgaSA9IGNvb3JkWzBdOyBpIDwgY29vcmRbMF0gKyBsZW5ndGg7IGkrKykgc2hpcC5wdXNoKFtpLCBjb29yZFsxXV0pO1xuXG4gIGlmIChkaXIgPT09IDEpXG4gICAgZm9yIChsZXQgaSA9IGNvb3JkWzBdOyBpID4gY29vcmRbMF0gLSBsZW5ndGg7IGktLSkgc2hpcC5wdXNoKFtpLCBjb29yZFsxXV0pO1xuXG4gIGlmIChkaXIgPT09IDIpXG4gICAgZm9yIChsZXQgaSA9IGNvb3JkWzFdOyBpIDwgY29vcmRbMV0gKyBsZW5ndGg7IGkrKykgc2hpcC5wdXNoKFtjb29yZFswXSwgaV0pO1xuXG4gIGlmIChkaXIgPT09IDMpXG4gICAgZm9yIChsZXQgaSA9IGNvb3JkWzFdOyBpID4gY29vcmRbMV0gLSBsZW5ndGg7IGktLSkgc2hpcC5wdXNoKFtjb29yZFswXSwgaV0pO1xuXG4gIHJldHVybiBzaGlwO1xufTtcblxuZXhwb3J0IHsgYnVpbGRTaGlwQ29vcmRzLCBmaW5kUG9zc2libGVEaXJzIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLyogRE9NIFZBUklBQkxFUyAqL1xuY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbl9fd3JhcHBlclwiKTtcbmNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZW51X19tb2RhbFwiKTtcbmNvbnN0IG1vZGFsVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVudV9fd2lubmVyXCIpO1xuY29uc3QgZ2FtZWJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2FtZWJvYXJkXCIpO1xuY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3F1YXJlXCIpO1xuXG5jb25zdCBoaWRlTW9kYWwgPSBmdW5jdGlvbiAoKSB7XG4gIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW4tLW9wYWNpdHlcIik7XG4gIHNldFRpbWVvdXQoKCkgPT4gbW9kYWwuY2xhc3NMaXN0LmFkZChcImhpZGRlbi0telwiKSwgMTAwMCk7XG59O1xuXG5jb25zdCByZXZlYWxNb2RhbCA9IGZ1bmN0aW9uICh3aW5uZXIpIHtcbiAgbW9kYWxUZXh0LnRleHRDb250ZW50ID0gYCR7d2lubmVyfSB3aW5zIWA7XG4gIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW4tLXpcIik7XG4gIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW4tLW9wYWNpdHlcIik7XG59O1xuXG5jb25zdCByZXZlYWxHYW1lYm9hcmRzID0gZnVuY3Rpb24gKCkge1xuICBtYWluLmNsYXNzTGlzdC5hZGQoXCJyZXZlYWwtLW9wYWNpdHlcIik7XG59O1xuXG5jb25zdCBkaXNwbGF5Qm9hdHMgPSBmdW5jdGlvbiAocGxheWVyKSB7XG4gIC8vIExvb3Agb3ZlciBlYWNoIHNoaXAgb2YgcGxheWVyXG4gIGZvciAobGV0IHNoaXAgaW4gcGxheWVyLmdhbWVib2FyZC5zaGlwcykge1xuICAgIC8vIEdldCBzaGlwIGNvb3JkaW5hdGVzXG4gICAgcGxheWVyLmdhbWVib2FyZC5zaGlwc1tzaGlwXS5sb2NhdGlvbi5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgY29uc3QgZ2FtZWJvYXJkID1cbiAgICAgICAgcGxheWVyLnBsYXllck5hbWUgPT09IFwiY29tcHV0ZXJcIiA/IGdhbWVib2FyZHNbMF0gOiBnYW1lYm9hcmRzWzFdO1xuICAgICAgY29uc3Qgcm93ID0gZ2FtZWJvYXJkLmNoaWxkcmVuW2Nvb3JkWzBdWzBdXTtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IHJvdy5jaGlsZHJlbltjb29yZFswXVsxXV07XG5cbiAgICAgIC8vIEFkZCBzaGlwIGJhY2tncm91bmQgY29sb3JcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGBzcXVhcmUtLSR7c2hpcH1gKTtcbiAgICB9KTtcbiAgfVxufTtcblxuY29uc3QgdXBkYXRlVUkgPSBmdW5jdGlvbiAocGxheWVyKSB7XG4gIC8vIExvb3Agb3ZlciBoaXRzXG4gIHBsYXllci5nYW1lYm9hcmQuaGl0cy5mb3JFYWNoKChoaXQpID0+IHtcbiAgICBjb25zdCBnYW1lYm9hcmQgPVxuICAgICAgcGxheWVyLnBsYXllck5hbWUgPT09IFwiY29tcHV0ZXJcIiA/IGdhbWVib2FyZHNbMF0gOiBnYW1lYm9hcmRzWzFdO1xuICAgIGNvbnN0IHJvdyA9IGdhbWVib2FyZC5jaGlsZHJlbltoaXRbMF1dO1xuICAgIGNvbnN0IHNxdWFyZSA9IHJvdy5jaGlsZHJlbltoaXRbMV1dO1xuXG4gICAgLy8gQWRkIGhpdCBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYHNxdWFyZS0taGl0YCk7XG4gIH0pO1xuXG4gIC8vIExvb3Agb3ZlciBtaXNzZXNcbiAgcGxheWVyLmdhbWVib2FyZC5taXNzZXMuZm9yRWFjaCgobWlzcykgPT4ge1xuICAgIGNvbnN0IGdhbWVib2FyZCA9XG4gICAgICBwbGF5ZXIucGxheWVyTmFtZSA9PT0gXCJjb21wdXRlclwiID8gZ2FtZWJvYXJkc1swXSA6IGdhbWVib2FyZHNbMV07XG4gICAgY29uc3Qgcm93ID0gZ2FtZWJvYXJkLmNoaWxkcmVuW21pc3NbMF1dO1xuICAgIGNvbnN0IHNxdWFyZSA9IHJvdy5jaGlsZHJlblttaXNzWzFdXTtcblxuICAgIC8vIEFkZCBoaXQgYmFja2dyb3VuZCBjb2xvclxuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGBzcXVhcmUtLW1pc3NgKTtcbiAgfSk7XG59O1xuXG5jb25zdCByZXNldFVJID0gZnVuY3Rpb24gKCkge1xuICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKFwic3F1YXJlLS1oaXRcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzcXVhcmUtLW1pc3NcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJhbmltYXRlLWd1ZXNzXCIpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKFwic3F1YXJlLS1jYXJyaWVyXCIpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKFwic3F1YXJlLS1iYXR0bGVzaGlwXCIpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKFwic3F1YXJlLS1kZXN0cm95ZXJcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzcXVhcmUtLXN1Ym1hcmluZVwiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcInNxdWFyZS0tcGF0cm9sXCIpO1xuICB9KTtcbn07XG5cbmNvbnN0IGFkZEd1ZXNzQW5pbWF0aW9uID0gZnVuY3Rpb24gKGVuZW15UGxheWVyLCBjb29yZHMpIHtcbiAgY29uc3QgZ2FtZWJvYXJkID1cbiAgICBlbmVteVBsYXllci5wbGF5ZXJOYW1lID09PSBcInBsYXllclwiID8gZ2FtZWJvYXJkc1sxXSA6IGdhbWVib2FyZHNbMF07XG4gIGNvbnN0IHJvdyA9IGdhbWVib2FyZC5jaGlsZHJlbltjb29yZHNbMF1dO1xuICBjb25zdCBzcXVhcmUgPSByb3cuY2hpbGRyZW5bY29vcmRzWzFdXTtcblxuICAvLyBhZGQgYW5pbWF0aW9uIGNsYXNzXG4gIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiYW5pbWF0ZS1ndWVzc1wiKTtcbn07XG5cbmV4cG9ydCB7XG4gIGdhbWVib2FyZHMsXG4gIGRpc3BsYXlCb2F0cyxcbiAgdXBkYXRlVUksXG4gIHJlc2V0VUksXG4gIGFkZEd1ZXNzQW5pbWF0aW9uLFxuICByZXZlYWxHYW1lYm9hcmRzLFxuICBoaWRlTW9kYWwsXG4gIHJldmVhbE1vZGFsXG59O1xuIiwiaW1wb3J0IHsgYXJyRXF1YWxDaGVjayB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcbmltcG9ydCB7IGdldFJhbmRvbUNvb3JkcyB9IGZyb20gXCIuL2dldFJhbmRvbUNvb3Jkc1wiO1xuXG4oXCJ1c2Ugc3RyaWN0XCIpO1xuXG5jb25zdCBnZXRBdHRhY2tDb29yZHNQbGF5ZXIgPSBmdW5jdGlvbiAoc3F1YXJlKSB7XG4gIGNvbnN0IHJvdyA9IHNxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdFsxXS5zbGljZSgtMSk7XG4gIGNvbnN0IGNvbCA9IHNxdWFyZS5jbGFzc0xpc3RbMV0uc2xpY2UoLTEpO1xuICByZXR1cm4gW3BhcnNlSW50KHJvdywgMTApLCBwYXJzZUludChjb2wsIDEwKV07XG59O1xuXG5jb25zdCBnZXRBdHRhY2tDb29yZHNDb21wID0gZnVuY3Rpb24gKGd1ZXNzZXMpIHtcbiAgbGV0IGNvb3JkLCBjaGVja1ByZXZHdWVzc2VzO1xuXG4gIGRvIHtcbiAgICAvLyBDaG9vc2UgcmFuZG9tIGNvb3JkaW5hdGVcbiAgICBjb29yZCA9IGdldFJhbmRvbUNvb3JkcygpO1xuXG4gICAgLy8gQ2hlY2sgaWYgY29vcmRpbmF0ZSB3YXMgYWxyZWFkeSBndWVzc2VkXG4gICAgY2hlY2tQcmV2R3Vlc3NlcyA9IGd1ZXNzZXMubWFwKChndWVzcykgPT4gYXJyRXF1YWxDaGVjayhjb29yZCwgZ3Vlc3MpKTtcbiAgfSB3aGlsZSAoY2hlY2tQcmV2R3Vlc3Nlcy5pbmNsdWRlcyh0cnVlKSAmJiBndWVzc2VzLmxlbmd0aCA8IDEwMCk7XG5cbiAgaWYgKGd1ZXNzZXMubGVuZ3RoID4gOTkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBtb3JlIGd1ZXNzZXMgYXZhaWxhYmxlXCIpO1xuICB9XG4gIHJldHVybiBjb29yZDtcbn07XG5cbmV4cG9ydCB7IGdldEF0dGFja0Nvb3Jkc1BsYXllciwgZ2V0QXR0YWNrQ29vcmRzQ29tcCB9O1xuIiwiaW1wb3J0IHsgbWFrZVNoaXAgfSBmcm9tIFwiLi9tYWtlU2hpcFwiO1xuXG4oXCJ1c2Ugc3RyaWN0XCIpO1xuXG5jb25zdCBnZXRDb21wU2hpcENvb3JkcyA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYWxsU2hpcHMgPSBbXTtcblxuICAvLyBDcmVhdGUgY2FycmllclxuICBhbGxTaGlwcy5wdXNoKG1ha2VTaGlwKGFsbFNoaXBzLCA1KSk7XG5cbiAgLy8gQ3JlYXRlIGJhdHRsZXNoaXBcbiAgYWxsU2hpcHMucHVzaChtYWtlU2hpcChhbGxTaGlwcywgNCkpO1xuXG4gIC8vIENyZWF0ZSBkZXN0cm95ZXJcbiAgYWxsU2hpcHMucHVzaChtYWtlU2hpcChhbGxTaGlwcywgMykpO1xuXG4gIC8vIENyZWF0ZSBzdWJtYXJpbmVcbiAgYWxsU2hpcHMucHVzaChtYWtlU2hpcChhbGxTaGlwcywgMykpO1xuXG4gIC8vIENyZWF0ZSBwYXRyb2xcbiAgYWxsU2hpcHMucHVzaChtYWtlU2hpcChhbGxTaGlwcywgMikpO1xuXG4gIHJldHVybiBhbGxTaGlwcztcbn07XG5cbmV4cG9ydCB7IGdldENvbXBTaGlwQ29vcmRzIH07XG5cbi8vIFswXSBjYXJyaWVyLCBbMV0gYmF0dGxlc2hpcCwgWzJdIGRlc3Ryb3llciwgWzNdIHN1Ym1hcmluZSwgWzRdIHBhdHJvbFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGdldFJhbmRvbUNvb3JkcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCksIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKV07XG59O1xuXG5jb25zdCBnZXROdW0gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG59O1xuXG5leHBvcnQgeyBnZXRSYW5kb21Db29yZHMsIGdldE51bSB9O1xuIiwiLy8gQ2hlY2sgaWYgYSBndWVzc2VkIGNvb3JkaW5hdGUgaGl0cyBhIHNoaXBcblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJFcXVhbENoZWNrIH0gZnJvbSBcIi4vYXJyRXF1YWxDaGVja1wiO1xuXG5jb25zdCBoaXRDaGVjayA9IGZ1bmN0aW9uIChnYW1lYm9hcmQsIGNvb3Jkcykge1xuICAvLyBDcmVhdGUgYXJyYXkgZm9yIHNoaXAgaGl0IGNoZWNrXG4gIGNvbnN0IG91dHB1dCA9IFtdO1xuXG4gIC8vIExvb3Agb3ZlciBzaGlwcyB0byBjaGVjayBpZiBjb29yZHMgaXMgYSBoaXQgZm9yIGFueVxuICBmb3IgKGxldCBzaGlwIGluIGdhbWVib2FyZC5zaGlwcykge1xuICAgIG91dHB1dC5wdXNoKFxuICAgICAgZ2FtZWJvYXJkLnNoaXBzW3NoaXBdLmxvY2F0aW9uXG4gICAgICAgIC5tYXAoKGNvb3JkKSA9PiBhcnJFcXVhbENoZWNrKGNvb3JkWzBdLCBjb29yZHMpKVxuICAgICAgICAuaW5jbHVkZXModHJ1ZSlcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn07XG5cbmV4cG9ydCB7IGhpdENoZWNrIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgZ2V0UmFuZG9tQ29vcmRzIH0gZnJvbSBcIi4vZ2V0UmFuZG9tQ29vcmRzXCI7XG5pbXBvcnQgeyBhcnJFcXVhbENoZWNrIH0gZnJvbSBcIi4vYXJyRXF1YWxDaGVja1wiO1xuaW1wb3J0IHsgYnVpbGRTaGlwQ29vcmRzLCBmaW5kUG9zc2libGVEaXJzIH0gZnJvbSBcIi4vY3JlYXRlUmFuZG9tU2hpcHNcIjtcblxuY29uc3QgbWFrZVNoaXAgPSBmdW5jdGlvbiAoYWxsU2hpcHMsIGxlbmd0aCkge1xuICBjb25zdCBhbGxTaGlwc0Nvb3JkcyA9IGFsbFNoaXBzLmZsYXQoKTtcblxuICAvLyBHZXQgZmlyc3QgY29vcmRpbmF0ZVxuICBsZXQgY29vcmQ7XG4gIGRvIHtcbiAgICBjb29yZCA9IGdldFJhbmRvbUNvb3JkcygpO1xuICB9IHdoaWxlIChhbGxTaGlwc0Nvb3Jkcy5tYXAoKGMpID0+IGFyckVxdWFsQ2hlY2soYywgY29vcmQpKS5pbmNsdWRlcyh0cnVlKSk7XG5cbiAgLy8gR2V0IHBvc3NpYmxlIGRpcmVjdGlvbnMgYWdhaW5zdCBlZGdlIG9mIGJvYXJkIGZyb20gY29vcmQuXG4gIGNvbnN0IHBvc3NpYmxlRGlycyA9IGZpbmRQb3NzaWJsZURpcnMoY29vcmQsIGxlbmd0aCk7XG5cbiAgLy8gQ3JlYXRlIGFycmF5IG9mIGFsbCBwb3NzaWJsZSBzaGlwc1xuICBjb25zdCBwb3NzaWJsZVNoaXBzID0gcG9zc2libGVEaXJzLm1hcCgoZGlyKSA9PlxuICAgIGJ1aWxkU2hpcENvb3JkcyhsZW5ndGgsIGRpciwgY29vcmQpXG4gICk7XG5cbiAgLy8gQ2hlY2sgZWFjaCBzaGlwIGZvciBjb25mbGljdCB3aXRoIHByZXZpb3VzIHNoaXAgcGxhY2VtZW50XG4gIGNvbnN0IHNoaXBDaG9pY2VzRmluYWwgPSBbXTtcblxuICAvLyBMb29wIG92ZXIgcG9zc2libGUgc2hpcHNcbiAgZm9yIChsZXQgc2hpcCBvZiBwb3NzaWJsZVNoaXBzKSB7XG4gICAgY29uc3QgY29vcmRDaGVja0FyciA9IFtdO1xuXG4gICAgLy8gTG9vcCBvdmVyIGNvb3JkaW5hdGVzIG9mIGVhY2ggcG9zc2libGUgc2hpcFxuICAgIGZvciAobGV0IHNoaXBDb29yZCBvZiBzaGlwKSB7XG4gICAgICBsZXQgbWF0Y2ggPSAwO1xuXG4gICAgICAvLyBMb29wIG92ZXIgcHJldmlvdXMgc2hpcHM7IGlmIG1hdGNoLCBtYXJrIHRoYXRcbiAgICAgIGFsbFNoaXBzQ29vcmRzLmZvckVhY2goKGFsbFNoaXBzQ29vcmQpID0+IHtcbiAgICAgICAgaWYgKGFyckVxdWFsQ2hlY2soc2hpcENvb3JkLCBhbGxTaGlwc0Nvb3JkKSkgbWF0Y2grKztcbiAgICAgIH0pO1xuXG4gICAgICAvLyBJZiBhIG1hdGNoIGlzIGZvdW5kLCBhZGQgdHJ1ZVxuICAgICAgY29vcmRDaGVja0Fyci5wdXNoKG1hdGNoID09PSAwID8gZmFsc2UgOiB0cnVlKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgdmFsaWQgc2hpcHMgdG8gY2hvaWNlIGFycmF5XG4gICAgaWYgKCFjb29yZENoZWNrQXJyLmluY2x1ZGVzKHRydWUpKSBzaGlwQ2hvaWNlc0ZpbmFsLnB1c2goc2hpcCk7XG4gIH1cblxuICAvLyBSYW5kb21seSBzZWxlY3QgZnJvbSByZW1haW5pbmcgb3B0aW9uc1xuICByZXR1cm4gc2hpcENob2ljZXNGaW5hbFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaGlwQ2hvaWNlc0ZpbmFsLmxlbmd0aCldO1xufTtcblxuZXhwb3J0IHsgbWFrZVNoaXAgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9QbGF5ZXJcIjtcbmltcG9ydCB7IGdldENvbXBTaGlwQ29vcmRzIH0gZnJvbSBcIi4vZ2V0Q29tcFNoaXBDb29yZHNcIjtcblxuLy8qICMjIyMjIyMjIyMjIEluaXRpYWwgU2hpcCBDb29yZHMgIyMjIyMjIyMjIyMjIyMjXG4vLyBjYXJyaWVyXG4vLyBwcmV0dGllci1pZ25vcmVcbmNvbnN0IGNvb3JkczAgPSBbWzIsIDldLCBbMywgOV0sIFs0LCA5XSwgWzUsIDldLCBbNiwgOV1dO1xuXG4vLyBiYXR0bGVzaGlwXG4vLyBwcmV0dGllci1pZ25vcmVcbmNvbnN0IGNvb3JkczEgPSBbWzIsIDBdLCBbMywgMF0sIFs0LCAwXSwgWzUsIDBdXTtcblxuLy8gZGVzdHJveWVyXG4vLyBwcmV0dGllci1pZ25vcmVcbmNvbnN0IGNvb3JkczIgPSBbWzAsIDFdLCBbMCwgMl0sIFswLCAzXV07XG5cbi8vIHN1Ym1hcmluZVxuLy8gcHJldHRpZXItaWdub3JlXG5jb25zdCBjb29yZHMzID0gW1szLCAzXSwgWzMsIDRdLCBbMywgNV1dO1xuXG4vLyBwYXRyb2xcbi8vIHByZXR0aWVyLWlnbm9yZVxuY29uc3QgY29vcmRzNCA9IFtbNywgNF0sIFs3LCA1XV07XG5cbi8vKiAjIyMjIyMjIyMjIyBOZXcgR2FtZSAjIyMjIyMjIyMjIyMjIyNcbmNvbnN0IG5ld0dhbWUgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFBsYXllciBjaG9vc2VzIHNoaXAgY29vcmRpbmF0ZXNcbiAgY29uc3QgdGVzdENvb3JkczEgPSBbY29vcmRzMCwgY29vcmRzMSwgY29vcmRzMiwgY29vcmRzMywgY29vcmRzNF07XG4gIGNvbnN0IHBsYXllciA9IFBsYXllcihcInBsYXllclwiLCB0ZXN0Q29vcmRzMSk7XG5cbiAgLy8gQ29tcHV0ZXIgcmFuZG9tbHkgY2hvb3NlcyBzaGlwIGNvb3JkaW5hdGVzXG4gIGNvbnN0IGNvbXB1dGVyID0gUGxheWVyKFwiY29tcHV0ZXJcIiwgZ2V0Q29tcFNoaXBDb29yZHMoKSk7XG5cbiAgcmV0dXJuIFtwbGF5ZXIsIGNvbXB1dGVyXTtcbn07XG5cbmV4cG9ydCB7IG5ld0dhbWUgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJFcXVhbENoZWNrIH0gZnJvbSBcIi4vYXJyRXF1YWxDaGVja1wiO1xuXG5jb25zdCBwcmV2R3Vlc3NDaGVjayA9IChnYW1lYm9hcmQsIGNvb3JkcykgPT4ge1xuICBjb25zdCBvdXRwdXQgPSBbXTtcblxuICBvdXRwdXQucHVzaChcbiAgICBnYW1lYm9hcmQubWlzc2VzLm1hcCgoY29vcmQpID0+IGFyckVxdWFsQ2hlY2soY29vcmQsIGNvb3JkcykpLmluY2x1ZGVzKHRydWUpXG4gICk7XG5cbiAgb3V0cHV0LnB1c2goXG4gICAgZ2FtZWJvYXJkLmhpdHMubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZCwgY29vcmRzKSkuaW5jbHVkZXModHJ1ZSlcbiAgKTtcblxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0IHsgcHJldkd1ZXNzQ2hlY2sgfTtcblxuLy8gY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCB7XG4gIGdhbWVib2FyZHMsXG4gIGRpc3BsYXlCb2F0cyxcbiAgdXBkYXRlVUksXG4gIHJlc2V0VUksXG4gIGFkZEd1ZXNzQW5pbWF0aW9uLFxuICByZXZlYWxHYW1lYm9hcmRzLFxuICBoaWRlTW9kYWwsXG4gIHJldmVhbE1vZGFsXG59IGZyb20gXCIuL2RvbUludGVyYWN0aW9uXCI7XG5pbXBvcnQgeyBuZXdHYW1lIH0gZnJvbSBcIi4vbmV3R2FtZVwiO1xuXG4vLyogIyMjIyMjIyMjIyMjIyBET00gVmFyaWFibGVzICMjIyMjIyMjIyMjIyMjIyMjI1xuY29uc3QgYm9hcmQgPSBnYW1lYm9hcmRzWzBdO1xuY29uc3QgbmV3R2FtZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3LWdhbWVcIik7XG5cbi8vKiAjIyMjIyMjIyMjIyMjIEdhbWVmbG93ICMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gUGxheWVyIFZhcmlhYmxlc1xubGV0IHBsYXllcjtcbmxldCBjb21wdXRlcjtcblxuLy8gU3RhcnQgTmV3IEdhbWVcbm5ld0dhbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgcmV2ZWFsR2FtZWJvYXJkcygpO1xuICBoaWRlTW9kYWwoKTtcblxuICByZXNldFVJKCk7XG5cbiAgY29uc3QgZ2FtZSA9IG5ld0dhbWUoKTtcblxuICBwbGF5ZXIgPSBnYW1lWzBdO1xuICBjb21wdXRlciA9IGdhbWVbMV07XG5cbiAgY29uc29sZS5sb2coY29tcHV0ZXIpO1xuXG4gIGRpc3BsYXlCb2F0cyhwbGF5ZXIpO1xufSk7XG5cbi8vIFR1cm4gR2FtZXBsYXlcbmJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBjb25zdCBzcXVhcmUgPSBlLnRhcmdldC5jbG9zZXN0KFwiLnNxdWFyZVwiKTtcbiAgaWYgKCFzcXVhcmUpIHJldHVybjtcblxuICAvLyBEaXNhbGxvdyBpZiBnYW1lb3ZlclxuICBpZiAocGxheWVyLmRlZmVhdCA9PT0gdHJ1ZSB8fCBjb21wdXRlci5kZWZlYXQgPT09IHRydWUpIHJldHVybjtcblxuICAvLyBEaXNhbGxvdyBhbHJlYWR5IGNsaWNrZWQgc3F1YXJlc1xuICBpZiAoc3F1YXJlLmNsYXNzTGlzdC5jb250YWlucyhcInNxdWFyZS0taGl0XCIpKSByZXR1cm47XG4gIGlmIChzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwic3F1YXJlLS1taXNzXCIpKSByZXR1cm47XG5cbiAgLy8gUGxheWVyIHR1cm5cbiAgcGxheWVyLmF0dGFjayhjb21wdXRlciwgc3F1YXJlKTtcbiAgdXBkYXRlVUkoY29tcHV0ZXIpO1xuXG4gIC8vICBDaGVjayBmb3IgZGVmZWF0XG4gIGlmIChjb21wdXRlci5kZWZlYXQgPT09IHRydWUpIHtcbiAgICByZXZlYWxNb2RhbChcIlBsYXllclwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBDb21wdXRlciB0dXJuXG4gIGNvbXB1dGVyLmF0dGFjayhwbGF5ZXIpO1xuICB1cGRhdGVVSShwbGF5ZXIpO1xuICBhZGRHdWVzc0FuaW1hdGlvbihwbGF5ZXIsIGNvbXB1dGVyLmd1ZXNzZXMuc2xpY2UoLTEpWzBdKTtcblxuICAvLyBDaGVjayBmb3IgZGVmZWF0XG4gIGlmIChwbGF5ZXIuZGVmZWF0ID09PSB0cnVlKSB7XG4gICAgcmV2ZWFsTW9kYWwoXCJDb21wdXRlclwiKTtcbiAgICByZXR1cm47XG4gIH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9