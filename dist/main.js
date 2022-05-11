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
        ? (0,_getAttackCoords__WEBPACK_IMPORTED_MODULE_1__.getAttackCoordsComp)(guesses, enemy)
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
/* harmony export */   "arrEqualCheck": () => (/* binding */ arrEqualCheck),
/* harmony export */   "isAlreadyGuessed": () => (/* binding */ isAlreadyGuessed)
/* harmony export */ });


const arrEqualCheck = function (arr1, arr2) {
  return arr1.every((val, index) => val === arr2[index]);
};

const isAlreadyGuessed = function (nestedArr, arr) {
  const output = [];
  nestedArr.forEach((nest) => {
    output.push(arrEqualCheck(nest, arr));
  });
  return output.some((x) => x === true);
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

const getAttackCoordsComp = function (guesses, enemy) {
  let coord, checkPrevGuesses;

  // Implementing smarter AI
  do {
    if (enemy.gameboard.hits.length === 0) {
      // No hits yet :: random coord
      coord = (0,_getRandomCoords__WEBPACK_IMPORTED_MODULE_1__.getRandomCoords)();
    } else {
      // Create array of potential choices based on previous hits
      const validChoices = [];
      // Loop over array of hits
      enemy.gameboard.hits.forEach((hit) => {
        // Create possible choices of hits bassed on previous hit (+1 in all directions)
        const possibleChoices = [
          [hit[0] + 1, hit[1]],
          [hit[0] - 1, hit[1]],
          [hit[0], hit[1] + 1],
          [hit[0], hit[1] - 1]
        ];

        // Add valid choice to validChoice array
        possibleChoices.forEach((choice) => {
          if (
            choice[0] >= 0 &&
            choice[0] < 10 &&
            choice[1] >= 0 &&
            choice[1] < 10 &&
            !(0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__.isAlreadyGuessed)(guesses, choice)
          )
            validChoices.push(choice);
        });
      });

      if (validChoices.length === 0) {
        coord = (0,_getRandomCoords__WEBPACK_IMPORTED_MODULE_1__.getRandomCoords)();
      } else {
        coord = validChoices[Math.floor(Math.random() * validChoices.length)];
      }
    }
  } while ((0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__.isAlreadyGuessed)(guesses, coord) && guesses.length < 100);

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
/* harmony export */   "getRandomCoords": () => (/* binding */ getRandomCoords)
/* harmony export */ });


const getRandomCoords = function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q1YsRUFBRSxrRUFBaUI7O0FBRW5CO0FBQ0E7QUFDQSxJQUFJLDREQUFXO0FBQ2Y7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBseUhpdERhbWFnZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FyckVxdWFsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jcmVhdGVSYW5kb21TaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbUludGVyYWN0aW9uLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2V0QXR0YWNrQ29vcmRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2V0Q29tcFNoaXBDb29yZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nZXRSYW5kb21Db29yZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9oaXRDaGVjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21ha2VTaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbmV3R2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3ByZXZHdWVzc0NoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEdhbWVib2FyZFxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9TaGlwXCI7XG5pbXBvcnQgeyBwcmV2R3Vlc3NDaGVjayB9IGZyb20gXCIuL3ByZXZHdWVzc0NoZWNrXCI7XG5pbXBvcnQgeyBoaXRDaGVjayB9IGZyb20gXCIuL2hpdENoZWNrXCI7XG5pbXBvcnQgeyBhcHBseUhpdERhbWFnZSB9IGZyb20gXCIuL2FwcGx5SGl0RGFtYWdlXCI7XG5cbmNvbnN0IEdhbWVib2FyZCA9IGZ1bmN0aW9uIChjb29yZHMwLCBjb29yZHMxLCBjb29yZHMyLCBjb29yZHMzLCBjb29yZHM0KSB7XG4gIC8vIFNoaXBzXG4gIGNvbnN0IHNoaXBzID0ge1xuICAgIGNhcnJpZXI6IFNoaXAoY29vcmRzMCksXG4gICAgYmF0dGxlc2hpcDogU2hpcChjb29yZHMxKSxcbiAgICBkZXN0cm95ZXI6IFNoaXAoY29vcmRzMiksXG4gICAgc3VibWFyaW5lOiBTaGlwKGNvb3JkczMpLFxuICAgIHBhdHJvbDogU2hpcChjb29yZHM0KVxuICB9O1xuXG4gIC8vIEVuZW15IEd1ZXNzIEFycmF5c1xuICBjb25zdCBtaXNzZXMgPSBbXTtcbiAgY29uc3QgaGl0cyA9IFtdO1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBndWVzc2VkXG4gICAgaWYgKHByZXZHdWVzc0NoZWNrKHRoaXMsIGNvb3JkcykuaW5jbHVkZXModHJ1ZSkpIHJldHVybiBmYWxzZTtcblxuICAgIC8vIENoZWNrIGlmIGd1ZXNzIGlzIGEgaGl0IG9uIGEgc2hpcFxuICAgIGNvbnN0IGhpdENoZWNrQXJyID0gaGl0Q2hlY2sodGhpcywgY29vcmRzKTtcblxuICAgIC8vIElmIG5vbmUgc2hvdyBoaXQsIHB1dCBpbnRvIG1pc3NlcyBhcnJheVxuICAgIGlmIChoaXRDaGVja0Fyci5ldmVyeSgoeCkgPT4geCA9PT0gZmFsc2UpKSB7XG4gICAgICBtaXNzZXMucHVzaChjb29yZHMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gSWYgZ3Vlc3Mgc2hvd3MgaGl0XG4gICAgaWYgKGhpdENoZWNrQXJyLnNvbWUoKHgpID0+IHggPT09IHRydWUpKSB7XG4gICAgICBoaXRzLnB1c2goY29vcmRzKTtcbiAgICAgIHJldHVybiBhcHBseUhpdERhbWFnZSh0aGlzLCBoaXRDaGVja0FyciwgY29vcmRzKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2hlY2tBbGxTdW5rID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIENyZWF0ZSBhcnJheSBvZiBhbGwgc3VuayBjaGVja3NcbiAgICBjb25zdCBzdW5rQXJyID0gW107XG5cbiAgICAvLyBQb3B1bGF0ZSB0aGUgYXJyYXkgd2l0aCBzdW5rIGNoZWNrc1xuICAgIGZvciAobGV0IHNoaXAgaW4gdGhpcy5zaGlwcykge1xuICAgICAgc3Vua0Fyci5wdXNoKHNoaXBzW3NoaXBdLnN1bmspO1xuICAgIH1cblxuICAgIC8vIEV2YWx1YXRlIHRoZSBhcnJheSBmb3IgYWxsIHN1bmsgY2hlY2tzID09PSB0cnVlXG4gICAgcmV0dXJuIHN1bmtBcnIuZXZlcnkoKGVsKSA9PiBlbCA9PT0gdHJ1ZSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzaGlwcyxcbiAgICBtaXNzZXMsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBoaXRzLFxuICAgIGNoZWNrQWxsU3Vua1xuICB9O1xufTtcblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBnZXRBdHRhY2tDb29yZHNDb21wLCBnZXRBdHRhY2tDb29yZHNQbGF5ZXIgfSBmcm9tIFwiLi9nZXRBdHRhY2tDb29yZHNcIjtcblxuY29uc3QgUGxheWVyID0gZnVuY3Rpb24gKHBsYXllck5hbWUsIGNvb3Jkcykge1xuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoLi4uY29vcmRzKTtcbiAgY29uc3QgZ3Vlc3NlcyA9IFtdO1xuICBsZXQgZGVmZWF0ID0gZmFsc2U7XG5cbiAgY29uc3QgYXR0YWNrID0gZnVuY3Rpb24gKGVuZW15LCBzcXVhcmUpIHtcbiAgICBjb25zdCBjb29yZHMgPVxuICAgICAgZW5lbXkucGxheWVyTmFtZSA9PT0gXCJwbGF5ZXJcIlxuICAgICAgICA/IGdldEF0dGFja0Nvb3Jkc0NvbXAoZ3Vlc3NlcywgZW5lbXkpXG4gICAgICAgIDogZ2V0QXR0YWNrQ29vcmRzUGxheWVyKHNxdWFyZSk7XG5cbiAgICBjb25zdCB0dXJuID0gZW5lbXkuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcblxuICAgIC8vIEV4aXQgaWYgYWxyZWFkeSBndWVzc2VkXG4gICAgaWYgKHR1cm4gPT09IGZhbHNlKSByZXR1cm4gdGhpcztcblxuICAgIC8vIEFkZCBndWVzcyB0byBhcnJheVxuICAgIGd1ZXNzZXMucHVzaChjb29yZHMpO1xuXG4gICAgLy8gQ2hlY2sgZGVmZWF0XG4gICAgZW5lbXkuZGVmZWF0ID0gZW5lbXkuZ2FtZWJvYXJkLmNoZWNrQWxsU3VuaygpO1xuICB9O1xuXG4gIHJldHVybiB7IHBsYXllck5hbWUsIGd1ZXNzZXMsIGF0dGFjaywgZ2FtZWJvYXJkLCBkZWZlYXQgfTtcbn07XG5cbmV4cG9ydCB7IFBsYXllciB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IFNoaXAgPSBmdW5jdGlvbiAoY29vcmRzKSB7XG4gIC8vIENyZWF0ZSBzaGlwIGNvb3JkaW5hdGUgYXJyYXkgPSBbW1tjb29yZHNdLCBoaXRdLCBbW2Nvb3Jkc10sIGhpdF0sIFtbY29vcmRzXSwgaGl0XV1cbiAgY29uc3QgbG9jYXRpb24gPSBjb29yZHMubWFwKChjb29yZCkgPT4gW2Nvb3JkLCBmYWxzZV0pO1xuICBsZXQgc3VuayA9IGZhbHNlO1xuXG4gIGNvbnN0IGhpdCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIHRoaXMubG9jYXRpb25baW5kZXhdWzFdID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMubG9jYXRpb24uZXZlcnkoKGNvb3JkKSA9PiBjb29yZFsxXSA9PT0gdHJ1ZSkpIHRoaXMuc3VuayA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIHsgbG9jYXRpb24sIHN1bmssIGhpdCwgaXNTdW5rIH07XG59O1xuXG5leHBvcnQgeyBTaGlwIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyRXF1YWxDaGVjayB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcblxuY29uc3QgZ2V0SGl0U2hpcEluZGV4ID0gZnVuY3Rpb24gKHNoaXAsIGNvb3Jkcykge1xuICByZXR1cm4gc2hpcC5sb2NhdGlvbi5maW5kSW5kZXgoKGVsKSA9PiBhcnJFcXVhbENoZWNrKGVsWzBdLCBjb29yZHMpKTtcbn07XG5cbmNvbnN0IGFwcGx5SGl0RGFtYWdlID0gZnVuY3Rpb24gKGdhbWVib2FyZCwgaGl0Q2hlY2tBcnIsIGNvb3Jkcykge1xuICBjb25zdCBzaGlwcyA9IFtcImNhcnJpZXJcIiwgXCJiYXR0bGVzaGlwXCIsIFwiZGVzdHJveWVyXCIsIFwic3VibWFyaW5lXCIsIFwicGF0cm9sXCJdO1xuXG4gIC8vIElkZW50aWZ5IHdoaWNoIHNoaXAgd2FzIGhpdFxuICBjb25zdCBoaXRTaGlwID0gc2hpcHNbaGl0Q2hlY2tBcnIuaW5kZXhPZih0cnVlKV07XG5cbiAgLy8gSWRlbnRpZnkgaW5kZXggd2hlcmUgc2hpcCB3YXMgaGl0XG4gIGNvbnN0IGhpdFNoaXBJbmRleCA9IGdldEhpdFNoaXBJbmRleChnYW1lYm9hcmQuc2hpcHNbaGl0U2hpcF0sIGNvb3Jkcyk7XG5cbiAgLy8gQXBwbHkgZGFtYWdlIHdpdGggbWV0aG9kXG4gIGdhbWVib2FyZC5zaGlwc1toaXRTaGlwXS5oaXQoaGl0U2hpcEluZGV4KTtcblxuICAvLyBDaGVjayBpZiBzaGlwIGlzIHN1bmtcbiAgZ2FtZWJvYXJkLnNoaXBzW2hpdFNoaXBdLmlzU3VuaygpO1xuXG4gIHJldHVybiBnYW1lYm9hcmQ7XG59O1xuXG5leHBvcnQgeyBhcHBseUhpdERhbWFnZSB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGFyckVxdWFsQ2hlY2sgPSBmdW5jdGlvbiAoYXJyMSwgYXJyMikge1xuICByZXR1cm4gYXJyMS5ldmVyeSgodmFsLCBpbmRleCkgPT4gdmFsID09PSBhcnIyW2luZGV4XSk7XG59O1xuXG5jb25zdCBpc0FscmVhZHlHdWVzc2VkID0gZnVuY3Rpb24gKG5lc3RlZEFyciwgYXJyKSB7XG4gIGNvbnN0IG91dHB1dCA9IFtdO1xuICBuZXN0ZWRBcnIuZm9yRWFjaCgobmVzdCkgPT4ge1xuICAgIG91dHB1dC5wdXNoKGFyckVxdWFsQ2hlY2sobmVzdCwgYXJyKSk7XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0LnNvbWUoKHgpID0+IHggPT09IHRydWUpO1xufTtcblxuZXhwb3J0IHsgYXJyRXF1YWxDaGVjaywgaXNBbHJlYWR5R3Vlc3NlZCB9O1xuIiwiLyoqXG4gKiBBcnJheSBjaGVja3MgaWYgeCBhbmQgeSBjYW4gZml0IGluIG5lZ2F0aXZlIGFuZCBwb3NpdGl2ZSBkaXIuXG4gKiBJbiB0aGlzIG9yZGVyOiBbeC1wb3NpdGl2ZSwgeC1uZWdhdGl2ZSwgeS1wb3NpdGl2ZSwgeS1uZWdhdGl2ZV1cbiAqIFJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgaW5kZXhlcyBvZiB2YWxpZCBbMCwgMSwgMiwgM11cbiAqL1xuY29uc3QgZmluZFBvc3NpYmxlRGlycyA9IGZ1bmN0aW9uIChjb29yZCwgbGVuZ3RoKSB7XG4gIHJldHVybiBbXG4gICAgY29vcmRbMF0gKyAobGVuZ3RoIC0gMSkgPiA5LFxuICAgIGNvb3JkWzBdIC0gKGxlbmd0aCAtIDEpIDwgMCxcbiAgICBjb29yZFsxXSArIChsZW5ndGggLSAxKSA+IDksXG4gICAgY29vcmRbMV0gLSAobGVuZ3RoIC0gMSkgPCAwXG4gIF1cbiAgICAubWFwKCh4LCBpKSA9PiAoeCA9PT0gZmFsc2UgPyBpIDogXCIgXCIpKVxuICAgIC5maWx0ZXIoKHgpID0+IHggIT09IFwiIFwiKTtcbn07XG5cbi8vIEJ1aWxkIHBvc3NpYmxlIHNoaXBzIGJhc2VkIG9uIGNvb3JkcyB3L3IvdCBib2FyZCBlZGdlc1xuY29uc3QgYnVpbGRTaGlwQ29vcmRzID0gZnVuY3Rpb24gKGxlbmd0aCwgZGlyLCBjb29yZCkge1xuICBjb25zdCBzaGlwID0gW107XG5cbiAgaWYgKGRpciA9PT0gMClcbiAgICBmb3IgKGxldCBpID0gY29vcmRbMF07IGkgPCBjb29yZFswXSArIGxlbmd0aDsgaSsrKSBzaGlwLnB1c2goW2ksIGNvb3JkWzFdXSk7XG5cbiAgaWYgKGRpciA9PT0gMSlcbiAgICBmb3IgKGxldCBpID0gY29vcmRbMF07IGkgPiBjb29yZFswXSAtIGxlbmd0aDsgaS0tKSBzaGlwLnB1c2goW2ksIGNvb3JkWzFdXSk7XG5cbiAgaWYgKGRpciA9PT0gMilcbiAgICBmb3IgKGxldCBpID0gY29vcmRbMV07IGkgPCBjb29yZFsxXSArIGxlbmd0aDsgaSsrKSBzaGlwLnB1c2goW2Nvb3JkWzBdLCBpXSk7XG5cbiAgaWYgKGRpciA9PT0gMylcbiAgICBmb3IgKGxldCBpID0gY29vcmRbMV07IGkgPiBjb29yZFsxXSAtIGxlbmd0aDsgaS0tKSBzaGlwLnB1c2goW2Nvb3JkWzBdLCBpXSk7XG5cbiAgcmV0dXJuIHNoaXA7XG59O1xuXG5leHBvcnQgeyBidWlsZFNoaXBDb29yZHMsIGZpbmRQb3NzaWJsZURpcnMgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBET00gVkFSSUFCTEVTICovXG5jb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluX193cmFwcGVyXCIpO1xuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lbnVfX21vZGFsXCIpO1xuY29uc3QgbW9kYWxUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51X193aW5uZXJcIik7XG5jb25zdCBnYW1lYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5nYW1lYm9hcmRcIik7XG5jb25zdCBzcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zcXVhcmVcIik7XG5cbmNvbnN0IGhpZGVNb2RhbCA9IGZ1bmN0aW9uICgpIHtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZChcImhpZGRlbi0tb3BhY2l0eVwiKTtcbiAgc2V0VGltZW91dCgoKSA9PiBtb2RhbC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuLS16XCIpLCAxMDAwKTtcbn07XG5cbmNvbnN0IHJldmVhbE1vZGFsID0gZnVuY3Rpb24gKHdpbm5lcikge1xuICBtb2RhbFRleHQudGV4dENvbnRlbnQgPSBgJHt3aW5uZXJ9IHdpbnMhYDtcbiAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlbi0telwiKTtcbiAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlbi0tb3BhY2l0eVwiKTtcbn07XG5cbmNvbnN0IHJldmVhbEdhbWVib2FyZHMgPSBmdW5jdGlvbiAoKSB7XG4gIG1haW4uY2xhc3NMaXN0LmFkZChcInJldmVhbC0tb3BhY2l0eVwiKTtcbn07XG5cbmNvbnN0IGRpc3BsYXlCb2F0cyA9IGZ1bmN0aW9uIChwbGF5ZXIpIHtcbiAgLy8gTG9vcCBvdmVyIGVhY2ggc2hpcCBvZiBwbGF5ZXJcbiAgZm9yIChsZXQgc2hpcCBpbiBwbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzKSB7XG4gICAgLy8gR2V0IHNoaXAgY29vcmRpbmF0ZXNcbiAgICBwbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzW3NoaXBdLmxvY2F0aW9uLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBjb25zdCBnYW1lYm9hcmQgPVxuICAgICAgICBwbGF5ZXIucGxheWVyTmFtZSA9PT0gXCJjb21wdXRlclwiID8gZ2FtZWJvYXJkc1swXSA6IGdhbWVib2FyZHNbMV07XG4gICAgICBjb25zdCByb3cgPSBnYW1lYm9hcmQuY2hpbGRyZW5bY29vcmRbMF1bMF1dO1xuICAgICAgY29uc3Qgc3F1YXJlID0gcm93LmNoaWxkcmVuW2Nvb3JkWzBdWzFdXTtcblxuICAgICAgLy8gQWRkIHNoaXAgYmFja2dyb3VuZCBjb2xvclxuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYHNxdWFyZS0tJHtzaGlwfWApO1xuICAgIH0pO1xuICB9XG59O1xuXG5jb25zdCB1cGRhdGVVSSA9IGZ1bmN0aW9uIChwbGF5ZXIpIHtcbiAgLy8gTG9vcCBvdmVyIGhpdHNcbiAgcGxheWVyLmdhbWVib2FyZC5oaXRzLmZvckVhY2goKGhpdCkgPT4ge1xuICAgIGNvbnN0IGdhbWVib2FyZCA9XG4gICAgICBwbGF5ZXIucGxheWVyTmFtZSA9PT0gXCJjb21wdXRlclwiID8gZ2FtZWJvYXJkc1swXSA6IGdhbWVib2FyZHNbMV07XG4gICAgY29uc3Qgcm93ID0gZ2FtZWJvYXJkLmNoaWxkcmVuW2hpdFswXV07XG4gICAgY29uc3Qgc3F1YXJlID0gcm93LmNoaWxkcmVuW2hpdFsxXV07XG5cbiAgICAvLyBBZGQgaGl0IGJhY2tncm91bmQgY29sb3JcbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChgc3F1YXJlLS1oaXRgKTtcbiAgfSk7XG5cbiAgLy8gTG9vcCBvdmVyIG1pc3Nlc1xuICBwbGF5ZXIuZ2FtZWJvYXJkLm1pc3Nlcy5mb3JFYWNoKChtaXNzKSA9PiB7XG4gICAgY29uc3QgZ2FtZWJvYXJkID1cbiAgICAgIHBsYXllci5wbGF5ZXJOYW1lID09PSBcImNvbXB1dGVyXCIgPyBnYW1lYm9hcmRzWzBdIDogZ2FtZWJvYXJkc1sxXTtcbiAgICBjb25zdCByb3cgPSBnYW1lYm9hcmQuY2hpbGRyZW5bbWlzc1swXV07XG4gICAgY29uc3Qgc3F1YXJlID0gcm93LmNoaWxkcmVuW21pc3NbMV1dO1xuXG4gICAgLy8gQWRkIGhpdCBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYHNxdWFyZS0tbWlzc2ApO1xuICB9KTtcbn07XG5cbmNvbnN0IHJlc2V0VUkgPSBmdW5jdGlvbiAoKSB7XG4gIHNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzcXVhcmUtLWhpdFwiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcInNxdWFyZS0tbWlzc1wiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcImFuaW1hdGUtZ3Vlc3NcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzcXVhcmUtLWNhcnJpZXJcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzcXVhcmUtLWJhdHRsZXNoaXBcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzcXVhcmUtLWRlc3Ryb3llclwiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcInNxdWFyZS0tc3VibWFyaW5lXCIpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKFwic3F1YXJlLS1wYXRyb2xcIik7XG4gIH0pO1xufTtcblxuY29uc3QgYWRkR3Vlc3NBbmltYXRpb24gPSBmdW5jdGlvbiAoZW5lbXlQbGF5ZXIsIGNvb3Jkcykge1xuICBjb25zdCBnYW1lYm9hcmQgPVxuICAgIGVuZW15UGxheWVyLnBsYXllck5hbWUgPT09IFwicGxheWVyXCIgPyBnYW1lYm9hcmRzWzFdIDogZ2FtZWJvYXJkc1swXTtcbiAgY29uc3Qgcm93ID0gZ2FtZWJvYXJkLmNoaWxkcmVuW2Nvb3Jkc1swXV07XG4gIGNvbnN0IHNxdWFyZSA9IHJvdy5jaGlsZHJlbltjb29yZHNbMV1dO1xuXG4gIC8vIGFkZCBhbmltYXRpb24gY2xhc3NcbiAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJhbmltYXRlLWd1ZXNzXCIpO1xufTtcblxuZXhwb3J0IHtcbiAgZ2FtZWJvYXJkcyxcbiAgZGlzcGxheUJvYXRzLFxuICB1cGRhdGVVSSxcbiAgcmVzZXRVSSxcbiAgYWRkR3Vlc3NBbmltYXRpb24sXG4gIHJldmVhbEdhbWVib2FyZHMsXG4gIGhpZGVNb2RhbCxcbiAgcmV2ZWFsTW9kYWxcbn07XG4iLCJpbXBvcnQgeyBhcnJFcXVhbENoZWNrLCBpc0FscmVhZHlHdWVzc2VkIH0gZnJvbSBcIi4vYXJyRXF1YWxDaGVja1wiO1xuaW1wb3J0IHsgZ2V0UmFuZG9tQ29vcmRzIH0gZnJvbSBcIi4vZ2V0UmFuZG9tQ29vcmRzXCI7XG5cbihcInVzZSBzdHJpY3RcIik7XG5cbmNvbnN0IGdldEF0dGFja0Nvb3Jkc1BsYXllciA9IGZ1bmN0aW9uIChzcXVhcmUpIHtcbiAgY29uc3Qgcm93ID0gc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0WzFdLnNsaWNlKC0xKTtcbiAgY29uc3QgY29sID0gc3F1YXJlLmNsYXNzTGlzdFsxXS5zbGljZSgtMSk7XG4gIHJldHVybiBbcGFyc2VJbnQocm93LCAxMCksIHBhcnNlSW50KGNvbCwgMTApXTtcbn07XG5cbmNvbnN0IGdldEF0dGFja0Nvb3Jkc0NvbXAgPSBmdW5jdGlvbiAoZ3Vlc3NlcywgZW5lbXkpIHtcbiAgbGV0IGNvb3JkLCBjaGVja1ByZXZHdWVzc2VzO1xuXG4gIC8vIEltcGxlbWVudGluZyBzbWFydGVyIEFJXG4gIGRvIHtcbiAgICBpZiAoZW5lbXkuZ2FtZWJvYXJkLmhpdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBObyBoaXRzIHlldCA6OiByYW5kb20gY29vcmRcbiAgICAgIGNvb3JkID0gZ2V0UmFuZG9tQ29vcmRzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIENyZWF0ZSBhcnJheSBvZiBwb3RlbnRpYWwgY2hvaWNlcyBiYXNlZCBvbiBwcmV2aW91cyBoaXRzXG4gICAgICBjb25zdCB2YWxpZENob2ljZXMgPSBbXTtcbiAgICAgIC8vIExvb3Agb3ZlciBhcnJheSBvZiBoaXRzXG4gICAgICBlbmVteS5nYW1lYm9hcmQuaGl0cy5mb3JFYWNoKChoaXQpID0+IHtcbiAgICAgICAgLy8gQ3JlYXRlIHBvc3NpYmxlIGNob2ljZXMgb2YgaGl0cyBiYXNzZWQgb24gcHJldmlvdXMgaGl0ICgrMSBpbiBhbGwgZGlyZWN0aW9ucylcbiAgICAgICAgY29uc3QgcG9zc2libGVDaG9pY2VzID0gW1xuICAgICAgICAgIFtoaXRbMF0gKyAxLCBoaXRbMV1dLFxuICAgICAgICAgIFtoaXRbMF0gLSAxLCBoaXRbMV1dLFxuICAgICAgICAgIFtoaXRbMF0sIGhpdFsxXSArIDFdLFxuICAgICAgICAgIFtoaXRbMF0sIGhpdFsxXSAtIDFdXG4gICAgICAgIF07XG5cbiAgICAgICAgLy8gQWRkIHZhbGlkIGNob2ljZSB0byB2YWxpZENob2ljZSBhcnJheVxuICAgICAgICBwb3NzaWJsZUNob2ljZXMuZm9yRWFjaCgoY2hvaWNlKSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgY2hvaWNlWzBdID49IDAgJiZcbiAgICAgICAgICAgIGNob2ljZVswXSA8IDEwICYmXG4gICAgICAgICAgICBjaG9pY2VbMV0gPj0gMCAmJlxuICAgICAgICAgICAgY2hvaWNlWzFdIDwgMTAgJiZcbiAgICAgICAgICAgICFpc0FscmVhZHlHdWVzc2VkKGd1ZXNzZXMsIGNob2ljZSlcbiAgICAgICAgICApXG4gICAgICAgICAgICB2YWxpZENob2ljZXMucHVzaChjaG9pY2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodmFsaWRDaG9pY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb29yZCA9IGdldFJhbmRvbUNvb3JkcygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29vcmQgPSB2YWxpZENob2ljZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdmFsaWRDaG9pY2VzLmxlbmd0aCldO1xuICAgICAgfVxuICAgIH1cbiAgfSB3aGlsZSAoaXNBbHJlYWR5R3Vlc3NlZChndWVzc2VzLCBjb29yZCkgJiYgZ3Vlc3Nlcy5sZW5ndGggPCAxMDApO1xuXG4gIGlmIChndWVzc2VzLmxlbmd0aCA+IDk5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gbW9yZSBndWVzc2VzIGF2YWlsYWJsZVwiKTtcbiAgfVxuICByZXR1cm4gY29vcmQ7XG59O1xuXG5leHBvcnQgeyBnZXRBdHRhY2tDb29yZHNQbGF5ZXIsIGdldEF0dGFja0Nvb3Jkc0NvbXAgfTtcbiIsImltcG9ydCB7IG1ha2VTaGlwIH0gZnJvbSBcIi4vbWFrZVNoaXBcIjtcblxuKFwidXNlIHN0cmljdFwiKTtcblxuY29uc3QgZ2V0Q29tcFNoaXBDb29yZHMgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGFsbFNoaXBzID0gW107XG5cbiAgLy8gQ3JlYXRlIGNhcnJpZXJcbiAgYWxsU2hpcHMucHVzaChtYWtlU2hpcChhbGxTaGlwcywgNSkpO1xuXG4gIC8vIENyZWF0ZSBiYXR0bGVzaGlwXG4gIGFsbFNoaXBzLnB1c2gobWFrZVNoaXAoYWxsU2hpcHMsIDQpKTtcblxuICAvLyBDcmVhdGUgZGVzdHJveWVyXG4gIGFsbFNoaXBzLnB1c2gobWFrZVNoaXAoYWxsU2hpcHMsIDMpKTtcblxuICAvLyBDcmVhdGUgc3VibWFyaW5lXG4gIGFsbFNoaXBzLnB1c2gobWFrZVNoaXAoYWxsU2hpcHMsIDMpKTtcblxuICAvLyBDcmVhdGUgcGF0cm9sXG4gIGFsbFNoaXBzLnB1c2gobWFrZVNoaXAoYWxsU2hpcHMsIDIpKTtcblxuICByZXR1cm4gYWxsU2hpcHM7XG59O1xuXG5leHBvcnQgeyBnZXRDb21wU2hpcENvb3JkcyB9O1xuXG4vLyBbMF0gY2FycmllciwgWzFdIGJhdHRsZXNoaXAsIFsyXSBkZXN0cm95ZXIsIFszXSBzdWJtYXJpbmUsIFs0XSBwYXRyb2xcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBnZXRSYW5kb21Db29yZHMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCldO1xufTtcblxuZXhwb3J0IHsgZ2V0UmFuZG9tQ29vcmRzIH07XG4iLCIvLyBDaGVjayBpZiBhIGd1ZXNzZWQgY29vcmRpbmF0ZSBoaXRzIGEgc2hpcFxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGFyckVxdWFsQ2hlY2sgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5cbmNvbnN0IGhpdENoZWNrID0gZnVuY3Rpb24gKGdhbWVib2FyZCwgY29vcmRzKSB7XG4gIC8vIENyZWF0ZSBhcnJheSBmb3Igc2hpcCBoaXQgY2hlY2tcbiAgY29uc3Qgb3V0cHV0ID0gW107XG5cbiAgLy8gTG9vcCBvdmVyIHNoaXBzIHRvIGNoZWNrIGlmIGNvb3JkcyBpcyBhIGhpdCBmb3IgYW55XG4gIGZvciAobGV0IHNoaXAgaW4gZ2FtZWJvYXJkLnNoaXBzKSB7XG4gICAgb3V0cHV0LnB1c2goXG4gICAgICBnYW1lYm9hcmQuc2hpcHNbc2hpcF0ubG9jYXRpb25cbiAgICAgICAgLm1hcCgoY29vcmQpID0+IGFyckVxdWFsQ2hlY2soY29vcmRbMF0sIGNvb3JkcykpXG4gICAgICAgIC5pbmNsdWRlcyh0cnVlKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0IHsgaGl0Q2hlY2sgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBnZXRSYW5kb21Db29yZHMgfSBmcm9tIFwiLi9nZXRSYW5kb21Db29yZHNcIjtcbmltcG9ydCB7IGFyckVxdWFsQ2hlY2sgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5pbXBvcnQgeyBidWlsZFNoaXBDb29yZHMsIGZpbmRQb3NzaWJsZURpcnMgfSBmcm9tIFwiLi9jcmVhdGVSYW5kb21TaGlwc1wiO1xuXG5jb25zdCBtYWtlU2hpcCA9IGZ1bmN0aW9uIChhbGxTaGlwcywgbGVuZ3RoKSB7XG4gIGNvbnN0IGFsbFNoaXBzQ29vcmRzID0gYWxsU2hpcHMuZmxhdCgpO1xuXG4gIC8vIEdldCBmaXJzdCBjb29yZGluYXRlXG4gIGxldCBjb29yZDtcbiAgZG8ge1xuICAgIGNvb3JkID0gZ2V0UmFuZG9tQ29vcmRzKCk7XG4gIH0gd2hpbGUgKGFsbFNoaXBzQ29vcmRzLm1hcCgoYykgPT4gYXJyRXF1YWxDaGVjayhjLCBjb29yZCkpLmluY2x1ZGVzKHRydWUpKTtcblxuICAvLyBHZXQgcG9zc2libGUgZGlyZWN0aW9ucyBhZ2FpbnN0IGVkZ2Ugb2YgYm9hcmQgZnJvbSBjb29yZC5cbiAgY29uc3QgcG9zc2libGVEaXJzID0gZmluZFBvc3NpYmxlRGlycyhjb29yZCwgbGVuZ3RoKTtcblxuICAvLyBDcmVhdGUgYXJyYXkgb2YgYWxsIHBvc3NpYmxlIHNoaXBzXG4gIGNvbnN0IHBvc3NpYmxlU2hpcHMgPSBwb3NzaWJsZURpcnMubWFwKChkaXIpID0+XG4gICAgYnVpbGRTaGlwQ29vcmRzKGxlbmd0aCwgZGlyLCBjb29yZClcbiAgKTtcblxuICAvLyBDaGVjayBlYWNoIHNoaXAgZm9yIGNvbmZsaWN0IHdpdGggcHJldmlvdXMgc2hpcCBwbGFjZW1lbnRcbiAgY29uc3Qgc2hpcENob2ljZXNGaW5hbCA9IFtdO1xuXG4gIC8vIExvb3Agb3ZlciBwb3NzaWJsZSBzaGlwc1xuICBmb3IgKGxldCBzaGlwIG9mIHBvc3NpYmxlU2hpcHMpIHtcbiAgICBjb25zdCBjb29yZENoZWNrQXJyID0gW107XG5cbiAgICAvLyBMb29wIG92ZXIgY29vcmRpbmF0ZXMgb2YgZWFjaCBwb3NzaWJsZSBzaGlwXG4gICAgZm9yIChsZXQgc2hpcENvb3JkIG9mIHNoaXApIHtcbiAgICAgIGxldCBtYXRjaCA9IDA7XG5cbiAgICAgIC8vIExvb3Agb3ZlciBwcmV2aW91cyBzaGlwczsgaWYgbWF0Y2gsIG1hcmsgdGhhdFxuICAgICAgYWxsU2hpcHNDb29yZHMuZm9yRWFjaCgoYWxsU2hpcHNDb29yZCkgPT4ge1xuICAgICAgICBpZiAoYXJyRXF1YWxDaGVjayhzaGlwQ29vcmQsIGFsbFNoaXBzQ29vcmQpKSBtYXRjaCsrO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIElmIGEgbWF0Y2ggaXMgZm91bmQsIGFkZCB0cnVlXG4gICAgICBjb29yZENoZWNrQXJyLnB1c2gobWF0Y2ggPT09IDAgPyBmYWxzZSA6IHRydWUpO1xuICAgIH1cblxuICAgIC8vIEFkZCB2YWxpZCBzaGlwcyB0byBjaG9pY2UgYXJyYXlcbiAgICBpZiAoIWNvb3JkQ2hlY2tBcnIuaW5jbHVkZXModHJ1ZSkpIHNoaXBDaG9pY2VzRmluYWwucHVzaChzaGlwKTtcbiAgfVxuXG4gIC8vIFJhbmRvbWx5IHNlbGVjdCBmcm9tIHJlbWFpbmluZyBvcHRpb25zXG4gIHJldHVybiBzaGlwQ2hvaWNlc0ZpbmFsW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNoaXBDaG9pY2VzRmluYWwubGVuZ3RoKV07XG59O1xuXG5leHBvcnQgeyBtYWtlU2hpcCB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL1BsYXllclwiO1xuaW1wb3J0IHsgZ2V0Q29tcFNoaXBDb29yZHMgfSBmcm9tIFwiLi9nZXRDb21wU2hpcENvb3Jkc1wiO1xuXG4vLyogIyMjIyMjIyMjIyMgSW5pdGlhbCBTaGlwIENvb3JkcyAjIyMjIyMjIyMjIyMjIyNcbi8vIGNhcnJpZXJcbi8vIHByZXR0aWVyLWlnbm9yZVxuY29uc3QgY29vcmRzMCA9IFtbMiwgOV0sIFszLCA5XSwgWzQsIDldLCBbNSwgOV0sIFs2LCA5XV07XG5cbi8vIGJhdHRsZXNoaXBcbi8vIHByZXR0aWVyLWlnbm9yZVxuY29uc3QgY29vcmRzMSA9IFtbMiwgMF0sIFszLCAwXSwgWzQsIDBdLCBbNSwgMF1dO1xuXG4vLyBkZXN0cm95ZXJcbi8vIHByZXR0aWVyLWlnbm9yZVxuY29uc3QgY29vcmRzMiA9IFtbMCwgMV0sIFswLCAyXSwgWzAsIDNdXTtcblxuLy8gc3VibWFyaW5lXG4vLyBwcmV0dGllci1pZ25vcmVcbmNvbnN0IGNvb3JkczMgPSBbWzMsIDNdLCBbMywgNF0sIFszLCA1XV07XG5cbi8vIHBhdHJvbFxuLy8gcHJldHRpZXItaWdub3JlXG5jb25zdCBjb29yZHM0ID0gW1s3LCA0XSwgWzcsIDVdXTtcblxuLy8qICMjIyMjIyMjIyMjIE5ldyBHYW1lICMjIyMjIyMjIyMjIyMjI1xuY29uc3QgbmV3R2FtZSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gUGxheWVyIGNob29zZXMgc2hpcCBjb29yZGluYXRlc1xuICBjb25zdCB0ZXN0Q29vcmRzMSA9IFtjb29yZHMwLCBjb29yZHMxLCBjb29yZHMyLCBjb29yZHMzLCBjb29yZHM0XTtcbiAgY29uc3QgcGxheWVyID0gUGxheWVyKFwicGxheWVyXCIsIHRlc3RDb29yZHMxKTtcblxuICAvLyBDb21wdXRlciByYW5kb21seSBjaG9vc2VzIHNoaXAgY29vcmRpbmF0ZXNcbiAgY29uc3QgY29tcHV0ZXIgPSBQbGF5ZXIoXCJjb21wdXRlclwiLCBnZXRDb21wU2hpcENvb3JkcygpKTtcblxuICByZXR1cm4gW3BsYXllciwgY29tcHV0ZXJdO1xufTtcblxuZXhwb3J0IHsgbmV3R2FtZSB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGFyckVxdWFsQ2hlY2sgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5cbmNvbnN0IHByZXZHdWVzc0NoZWNrID0gKGdhbWVib2FyZCwgY29vcmRzKSA9PiB7XG4gIGNvbnN0IG91dHB1dCA9IFtdO1xuXG4gIG91dHB1dC5wdXNoKFxuICAgIGdhbWVib2FyZC5taXNzZXMubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZCwgY29vcmRzKSkuaW5jbHVkZXModHJ1ZSlcbiAgKTtcblxuICBvdXRwdXQucHVzaChcbiAgICBnYW1lYm9hcmQuaGl0cy5tYXAoKGNvb3JkKSA9PiBhcnJFcXVhbENoZWNrKGNvb3JkLCBjb29yZHMpKS5pbmNsdWRlcyh0cnVlKVxuICApO1xuXG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgeyBwcmV2R3Vlc3NDaGVjayB9O1xuXG4vLyBjYXJyaWVyLCBiYXR0bGVzaGlwLCBkZXN0cm95ZXIsIHN1Ym1hcmluZSwgcGF0cm9sXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHtcbiAgZ2FtZWJvYXJkcyxcbiAgZGlzcGxheUJvYXRzLFxuICB1cGRhdGVVSSxcbiAgcmVzZXRVSSxcbiAgYWRkR3Vlc3NBbmltYXRpb24sXG4gIHJldmVhbEdhbWVib2FyZHMsXG4gIGhpZGVNb2RhbCxcbiAgcmV2ZWFsTW9kYWxcbn0gZnJvbSBcIi4vZG9tSW50ZXJhY3Rpb25cIjtcbmltcG9ydCB7IG5ld0dhbWUgfSBmcm9tIFwiLi9uZXdHYW1lXCI7XG5cbi8vKiAjIyMjIyMjIyMjIyMjIERPTSBWYXJpYWJsZXMgIyMjIyMjIyMjIyMjIyMjIyMjXG5jb25zdCBib2FyZCA9IGdhbWVib2FyZHNbMF07XG5jb25zdCBuZXdHYW1lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctZ2FtZVwiKTtcblxuLy8qICMjIyMjIyMjIyMjIyMgR2FtZWZsb3cgIyMjIyMjIyMjIyMjIyMjIyMjXG4vLyBQbGF5ZXIgVmFyaWFibGVzXG5sZXQgcGxheWVyO1xubGV0IGNvbXB1dGVyO1xuXG4vLyBTdGFydCBOZXcgR2FtZVxubmV3R2FtZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICByZXZlYWxHYW1lYm9hcmRzKCk7XG4gIGhpZGVNb2RhbCgpO1xuXG4gIHJlc2V0VUkoKTtcblxuICBjb25zdCBnYW1lID0gbmV3R2FtZSgpO1xuXG4gIHBsYXllciA9IGdhbWVbMF07XG4gIGNvbXB1dGVyID0gZ2FtZVsxXTtcblxuICBjb25zb2xlLmxvZyhjb21wdXRlcik7XG5cbiAgZGlzcGxheUJvYXRzKHBsYXllcik7XG59KTtcblxuLy8gVHVybiBHYW1lcGxheVxuYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IHNxdWFyZSA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuc3F1YXJlXCIpO1xuICBpZiAoIXNxdWFyZSkgcmV0dXJuO1xuXG4gIC8vIERpc2FsbG93IGlmIGdhbWVvdmVyXG4gIGlmIChwbGF5ZXIuZGVmZWF0ID09PSB0cnVlIHx8IGNvbXB1dGVyLmRlZmVhdCA9PT0gdHJ1ZSkgcmV0dXJuO1xuXG4gIC8vIERpc2FsbG93IGFscmVhZHkgY2xpY2tlZCBzcXVhcmVzXG4gIGlmIChzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwic3F1YXJlLS1oaXRcIikpIHJldHVybjtcbiAgaWYgKHNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoXCJzcXVhcmUtLW1pc3NcIikpIHJldHVybjtcblxuICAvLyBQbGF5ZXIgdHVyblxuICBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyLCBzcXVhcmUpO1xuICB1cGRhdGVVSShjb21wdXRlcik7XG5cbiAgLy8gIENoZWNrIGZvciBkZWZlYXRcbiAgaWYgKGNvbXB1dGVyLmRlZmVhdCA9PT0gdHJ1ZSkge1xuICAgIHJldmVhbE1vZGFsKFwiUGxheWVyXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIENvbXB1dGVyIHR1cm5cbiAgY29tcHV0ZXIuYXR0YWNrKHBsYXllcik7XG4gIHVwZGF0ZVVJKHBsYXllcik7XG4gIGFkZEd1ZXNzQW5pbWF0aW9uKHBsYXllciwgY29tcHV0ZXIuZ3Vlc3Nlcy5zbGljZSgtMSlbMF0pO1xuXG4gIC8vIENoZWNrIGZvciBkZWZlYXRcbiAgaWYgKHBsYXllci5kZWZlYXQgPT09IHRydWUpIHtcbiAgICByZXZlYWxNb2RhbChcIkNvbXB1dGVyXCIpO1xuICAgIHJldHVybjtcbiAgfVxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=