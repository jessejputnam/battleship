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
/* harmony export */   "displayBoat": () => (/* binding */ displayBoat),
/* harmony export */   "displayBoats": () => (/* binding */ displayBoats),
/* harmony export */   "displayPositionSelection": () => (/* binding */ displayPositionSelection),
/* harmony export */   "gameboards": () => (/* binding */ gameboards),
/* harmony export */   "hideModal": () => (/* binding */ hideModal),
/* harmony export */   "removePositionSelection": () => (/* binding */ removePositionSelection),
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
      const square = gameboard.children[coord[0][0]].children[coord[0][1]];

      // Add ship background color
      square.classList.add("square--ship");
      square.classList.add(`square--${ship}`);
    });
  }
};

const displayBoat = function (coords, shipName) {
  coords.forEach((coord) => {
    const square = gameboards[1].children[coord[0]].children[coord[1]];
    square.classList.add("square--ship");
    square.classList.add(`square--${shipName}`);
  });
};

const displayPositionSelection = function (coords) {
  console.log(coords);
  coords.forEach((coord) => {
    const square = gameboards[1].children[coord[0]].children[coord[1]];
    square.classList.add("square--ship");
    square.classList.add(`square--potential`);
  });
};

const removePositionSelection = function (coords) {
  coords.forEach((coord) => {
    const square = gameboards[1].children[coord[0]].children[coord[1]];
    console.log(square);
    square.classList.remove("square--ship");
    square.classList.remove(`square--potential`);
  });
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
    square.classList.remove("square--potential");
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
  allShips.push((0,_makeShip__WEBPACK_IMPORTED_MODULE_0__.makeRandomShip)(allShips, 5));

  // Create battleship
  allShips.push((0,_makeShip__WEBPACK_IMPORTED_MODULE_0__.makeRandomShip)(allShips, 4));

  // Create destroyer
  allShips.push((0,_makeShip__WEBPACK_IMPORTED_MODULE_0__.makeRandomShip)(allShips, 3));

  // Create submarine
  allShips.push((0,_makeShip__WEBPACK_IMPORTED_MODULE_0__.makeRandomShip)(allShips, 3));

  // Create patrol
  allShips.push((0,_makeShip__WEBPACK_IMPORTED_MODULE_0__.makeRandomShip)(allShips, 2));

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
/* harmony export */   "makeRandomShip": () => (/* binding */ makeRandomShip)
/* harmony export */ });
/* harmony import */ var _getRandomCoords__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getRandomCoords */ "./src/getRandomCoords.js");
/* harmony import */ var _arrEqualCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrEqualCheck */ "./src/arrEqualCheck.js");
/* harmony import */ var _createRandomShips__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createRandomShips */ "./src/createRandomShips.js");






const makeRandomShip = function (allShips, length) {
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





//* ########### New Game ###############
const newGame = function (chosenCoords) {
  // Player chooses ship coordinates
  const player = (0,_Player__WEBPACK_IMPORTED_MODULE_0__.Player)("player", chosenCoords);

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
/* harmony import */ var _makeShip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./makeShip */ "./src/makeShip.js");
/* harmony import */ var _arrEqualCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./arrEqualCheck */ "./src/arrEqualCheck.js");






//* ########### Initial Ship Coords ###############
// carrier
// prettier-ignore
const coords0 = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]];

// battleship
// prettier-ignore
const coords1 = [[0, 1], [1, 1], [2, 1], [3, 1]];

// destroyer
// prettier-ignore
const coords2 = [[0, 2], [1, 2], [2, 2]];

// submarine
// prettier-ignore
const coords3 = [[0, 3], [1, 3], [2, 3]];

// patrol
// prettier-ignore
const coords4 = [[0, 4], [1, 4]];

const testCoords1 = [coords0, coords1, coords2, coords3, coords4];

//* ############# DOM Variables ##################
const board = _domInteraction__WEBPACK_IMPORTED_MODULE_0__.gameboards[0];
const squares = document.querySelectorAll(".square");
const newGameBtn = document.querySelector("#new-game");

//* ############# Gameflow ##################
// Player Variables
let player;
let computer;

const placementModal = document.querySelector("#placement__modal");
let shipCarrier, shipDestroyer, shipBattleship, shipPatrol, shipSubmarine;
let verticalAlignment = false;

const isValidMove = function (newShip, playerCoords) {
  const checkNewShip = newShip.map((coord) =>
    (0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_3__.isAlreadyGuessed)(playerCoords, coord)
  );
  const checks = [
    checkNewShip.every((x) => x === false),
    newShip.flat().every((x) => x >= 0 && x < 10)
  ];

  return !checks.includes(false);
};

// Start New Game
newGameBtn.addEventListener("click", () => {
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.revealGameboards)();
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.hideModal)();

  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.resetUI)();

  // Create array to save as coords
  const playerCoords = [];

  // Reveal add ship menu
  placementModal.classList.remove("hidden--z");
  placementModal.classList.add("reveal--opacity");

  // Carrier
  squares.forEach((square) => {
    square.addEventListener("mouseenter", (e) => {
      const row = +e.target.parentElement.classList[1].slice(-1);
      const col = +e.target.classList[1].slice(-1);
      if (verticalAlignment === false) {
        const potentialCoords = [
          [row, col],
          [row, col + 1],
          [row, col + 2],
          [row, col + 3],
          [row, col + 4]
        ];

        if (!isValidMove(potentialCoords, playerCoords)) {
          (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.resetUI)();
          return;
        }

        (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.displayPositionSelection)(potentialCoords);

        // displayPositionSelection();
        // e.target.classList.add("square--potential");
      }
    });

    square.addEventListener("mouseleave", (e) => {
      const row = +e.target.parentElement.classList[1].slice(-1);
      const col = +e.target.classList[1].slice(-1);
      const potentialCoords = [
        [row, col],
        [row, col + 1],
        [row, col + 2],
        [row, col + 3],
        [row, col + 4]
      ];

      if (!isValidMove(potentialCoords, playerCoords)) {
        (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.resetUI)();
        return;
      }

      (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.removePositionSelection)(potentialCoords);
    });
  });

  // shipCarrier = makeRandomShip(playerCoords, 5);
  // displayPositionSelection(shipCarrier);

  // Battleship

  // Destroyer

  // Submarine

  // Patrol

  // displayBoat(shipCarrier, "carrier");

  // window.addEventListener("keydown", (e) => {
  //   const key = e.key;
  //   if (key === "ArrowLeft") {
  //     const newCarrier = shipCarrier.map((coord) => [coord[0], coord[1] - 1]);
  //     if (isValidMove(newCarrier, playerCoords)) shipCarrier = newCarrier;
  //   }

  //   if (key === "ArrowRight") {
  //     const newCarrier = shipCarrier.map((coord) => [coord[0], coord[1] + 1]);
  //     if (isValidMove(newCarrier, playerCoords)) shipCarrier = newCarrier;
  //   }

  //   if (key === "ArrowDown") {
  //     const newCarrier = shipCarrier.map((coord) => [coord[0] + 1, coord[1]]);
  //     if (isValidMove(newCarrier, playerCoords)) shipCarrier = newCarrier;
  //   }

  //   if (key === "ArrowUp") {
  //     const newCarrier = shipCarrier.map((coord) => [coord[0] - 1, coord[1]]);
  //     if (isValidMove(newCarrier, playerCoords)) shipCarrier = newCarrier;
  //   }

  //   resetUI();
  //   // if (playerCoords.length > 0)
  //   //   playerCoords.forEach((ship) => displayBoat(ship));
  //   displayBoat(shipCarrier, "carrier");
  //   // console.log(shipCarrier);
  // });

  // displayBoats();

  // Randomly place carrier

  // const game = newGame(testCoords1);

  // player = game[0];
  // computer = game[1];

  // displayBoats(player);

  // // Choose ship positions
  // shipCarrier = document.querySelectorAll(".square--carrier");
  // shipBattleship = document.querySelectorAll(".square--battleship");
  // shipDestroyer = document.querySelectorAll(".square--destroyer");
  // shipSubmarine = document.querySelectorAll(".square--submarine");
  // shipPatrol = document.querySelectorAll(".square--patrol");

  // shipCarrier.forEach((square) => {
  //   square.addEventListener("drag", (e) => {});
  // });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsRUFBRSxpRUFBZ0I7QUFDbEIsRUFBRSwwREFBUzs7QUFFWCxFQUFFLHdEQUFPOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSx3REFBTztBQUNqQjtBQUNBOztBQUVBLFFBQVEseUVBQXdCOztBQUVoQztBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSx3REFBTztBQUNmO0FBQ0E7O0FBRUEsTUFBTSx3RUFBdUI7QUFDN0IsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnREFBZ0Q7QUFDaEQsTUFBTTtBQUNOLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUUseURBQVE7O0FBRVY7QUFDQTtBQUNBLElBQUksNERBQVc7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFLHlEQUFRO0FBQ1YsRUFBRSxrRUFBaUI7O0FBRW5CO0FBQ0E7QUFDQSxJQUFJLDREQUFXO0FBQ2Y7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBseUhpdERhbWFnZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FyckVxdWFsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jcmVhdGVSYW5kb21TaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbUludGVyYWN0aW9uLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2V0QXR0YWNrQ29vcmRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2V0Q29tcFNoaXBDb29yZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nZXRSYW5kb21Db29yZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9oaXRDaGVjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21ha2VTaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbmV3R2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3ByZXZHdWVzc0NoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEdhbWVib2FyZFxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9TaGlwXCI7XG5pbXBvcnQgeyBwcmV2R3Vlc3NDaGVjayB9IGZyb20gXCIuL3ByZXZHdWVzc0NoZWNrXCI7XG5pbXBvcnQgeyBoaXRDaGVjayB9IGZyb20gXCIuL2hpdENoZWNrXCI7XG5pbXBvcnQgeyBhcHBseUhpdERhbWFnZSB9IGZyb20gXCIuL2FwcGx5SGl0RGFtYWdlXCI7XG5cbmNvbnN0IEdhbWVib2FyZCA9IGZ1bmN0aW9uIChjb29yZHMwLCBjb29yZHMxLCBjb29yZHMyLCBjb29yZHMzLCBjb29yZHM0KSB7XG4gIC8vIFNoaXBzXG4gIGNvbnN0IHNoaXBzID0ge1xuICAgIGNhcnJpZXI6IFNoaXAoY29vcmRzMCksXG4gICAgYmF0dGxlc2hpcDogU2hpcChjb29yZHMxKSxcbiAgICBkZXN0cm95ZXI6IFNoaXAoY29vcmRzMiksXG4gICAgc3VibWFyaW5lOiBTaGlwKGNvb3JkczMpLFxuICAgIHBhdHJvbDogU2hpcChjb29yZHM0KVxuICB9O1xuXG4gIC8vIEVuZW15IEd1ZXNzIEFycmF5c1xuICBjb25zdCBtaXNzZXMgPSBbXTtcbiAgY29uc3QgaGl0cyA9IFtdO1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBndWVzc2VkXG4gICAgaWYgKHByZXZHdWVzc0NoZWNrKHRoaXMsIGNvb3JkcykuaW5jbHVkZXModHJ1ZSkpIHJldHVybiBmYWxzZTtcblxuICAgIC8vIENoZWNrIGlmIGd1ZXNzIGlzIGEgaGl0IG9uIGEgc2hpcFxuICAgIGNvbnN0IGhpdENoZWNrQXJyID0gaGl0Q2hlY2sodGhpcywgY29vcmRzKTtcblxuICAgIC8vIElmIG5vbmUgc2hvdyBoaXQsIHB1dCBpbnRvIG1pc3NlcyBhcnJheVxuICAgIGlmIChoaXRDaGVja0Fyci5ldmVyeSgoeCkgPT4geCA9PT0gZmFsc2UpKSB7XG4gICAgICBtaXNzZXMucHVzaChjb29yZHMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gSWYgZ3Vlc3Mgc2hvd3MgaGl0XG4gICAgaWYgKGhpdENoZWNrQXJyLnNvbWUoKHgpID0+IHggPT09IHRydWUpKSB7XG4gICAgICBoaXRzLnB1c2goY29vcmRzKTtcbiAgICAgIHJldHVybiBhcHBseUhpdERhbWFnZSh0aGlzLCBoaXRDaGVja0FyciwgY29vcmRzKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2hlY2tBbGxTdW5rID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIENyZWF0ZSBhcnJheSBvZiBhbGwgc3VuayBjaGVja3NcbiAgICBjb25zdCBzdW5rQXJyID0gW107XG5cbiAgICAvLyBQb3B1bGF0ZSB0aGUgYXJyYXkgd2l0aCBzdW5rIGNoZWNrc1xuICAgIGZvciAobGV0IHNoaXAgaW4gdGhpcy5zaGlwcykge1xuICAgICAgc3Vua0Fyci5wdXNoKHNoaXBzW3NoaXBdLnN1bmspO1xuICAgIH1cblxuICAgIC8vIEV2YWx1YXRlIHRoZSBhcnJheSBmb3IgYWxsIHN1bmsgY2hlY2tzID09PSB0cnVlXG4gICAgcmV0dXJuIHN1bmtBcnIuZXZlcnkoKGVsKSA9PiBlbCA9PT0gdHJ1ZSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzaGlwcyxcbiAgICBtaXNzZXMsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBoaXRzLFxuICAgIGNoZWNrQWxsU3Vua1xuICB9O1xufTtcblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBnZXRBdHRhY2tDb29yZHNDb21wLCBnZXRBdHRhY2tDb29yZHNQbGF5ZXIgfSBmcm9tIFwiLi9nZXRBdHRhY2tDb29yZHNcIjtcblxuY29uc3QgUGxheWVyID0gZnVuY3Rpb24gKHBsYXllck5hbWUsIGNvb3Jkcykge1xuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoLi4uY29vcmRzKTtcbiAgY29uc3QgZ3Vlc3NlcyA9IFtdO1xuICBsZXQgZGVmZWF0ID0gZmFsc2U7XG5cbiAgY29uc3QgYXR0YWNrID0gZnVuY3Rpb24gKGVuZW15LCBzcXVhcmUpIHtcbiAgICBjb25zdCBjb29yZHMgPVxuICAgICAgZW5lbXkucGxheWVyTmFtZSA9PT0gXCJwbGF5ZXJcIlxuICAgICAgICA/IGdldEF0dGFja0Nvb3Jkc0NvbXAoZ3Vlc3NlcywgZW5lbXkpXG4gICAgICAgIDogZ2V0QXR0YWNrQ29vcmRzUGxheWVyKHNxdWFyZSk7XG5cbiAgICBjb25zdCB0dXJuID0gZW5lbXkuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcblxuICAgIC8vIEV4aXQgaWYgYWxyZWFkeSBndWVzc2VkXG4gICAgaWYgKHR1cm4gPT09IGZhbHNlKSByZXR1cm4gdGhpcztcblxuICAgIC8vIEFkZCBndWVzcyB0byBhcnJheVxuICAgIGd1ZXNzZXMucHVzaChjb29yZHMpO1xuXG4gICAgLy8gQ2hlY2sgZGVmZWF0XG4gICAgZW5lbXkuZGVmZWF0ID0gZW5lbXkuZ2FtZWJvYXJkLmNoZWNrQWxsU3VuaygpO1xuICB9O1xuXG4gIHJldHVybiB7IHBsYXllck5hbWUsIGd1ZXNzZXMsIGF0dGFjaywgZ2FtZWJvYXJkLCBkZWZlYXQgfTtcbn07XG5cbmV4cG9ydCB7IFBsYXllciB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IFNoaXAgPSBmdW5jdGlvbiAoY29vcmRzKSB7XG4gIC8vIENyZWF0ZSBzaGlwIGNvb3JkaW5hdGUgYXJyYXkgPSBbW1tjb29yZHNdLCBoaXRdLCBbW2Nvb3Jkc10sIGhpdF0sIFtbY29vcmRzXSwgaGl0XV1cbiAgY29uc3QgbG9jYXRpb24gPSBjb29yZHMubWFwKChjb29yZCkgPT4gW2Nvb3JkLCBmYWxzZV0pO1xuICBsZXQgc3VuayA9IGZhbHNlO1xuXG4gIGNvbnN0IGhpdCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIHRoaXMubG9jYXRpb25baW5kZXhdWzFdID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMubG9jYXRpb24uZXZlcnkoKGNvb3JkKSA9PiBjb29yZFsxXSA9PT0gdHJ1ZSkpIHRoaXMuc3VuayA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIHsgbG9jYXRpb24sIHN1bmssIGhpdCwgaXNTdW5rIH07XG59O1xuXG5leHBvcnQgeyBTaGlwIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyRXF1YWxDaGVjayB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcblxuY29uc3QgZ2V0SGl0U2hpcEluZGV4ID0gZnVuY3Rpb24gKHNoaXAsIGNvb3Jkcykge1xuICByZXR1cm4gc2hpcC5sb2NhdGlvbi5maW5kSW5kZXgoKGVsKSA9PiBhcnJFcXVhbENoZWNrKGVsWzBdLCBjb29yZHMpKTtcbn07XG5cbmNvbnN0IGFwcGx5SGl0RGFtYWdlID0gZnVuY3Rpb24gKGdhbWVib2FyZCwgaGl0Q2hlY2tBcnIsIGNvb3Jkcykge1xuICBjb25zdCBzaGlwcyA9IFtcImNhcnJpZXJcIiwgXCJiYXR0bGVzaGlwXCIsIFwiZGVzdHJveWVyXCIsIFwic3VibWFyaW5lXCIsIFwicGF0cm9sXCJdO1xuXG4gIC8vIElkZW50aWZ5IHdoaWNoIHNoaXAgd2FzIGhpdFxuICBjb25zdCBoaXRTaGlwID0gc2hpcHNbaGl0Q2hlY2tBcnIuaW5kZXhPZih0cnVlKV07XG5cbiAgLy8gSWRlbnRpZnkgaW5kZXggd2hlcmUgc2hpcCB3YXMgaGl0XG4gIGNvbnN0IGhpdFNoaXBJbmRleCA9IGdldEhpdFNoaXBJbmRleChnYW1lYm9hcmQuc2hpcHNbaGl0U2hpcF0sIGNvb3Jkcyk7XG5cbiAgLy8gQXBwbHkgZGFtYWdlIHdpdGggbWV0aG9kXG4gIGdhbWVib2FyZC5zaGlwc1toaXRTaGlwXS5oaXQoaGl0U2hpcEluZGV4KTtcblxuICAvLyBDaGVjayBpZiBzaGlwIGlzIHN1bmtcbiAgZ2FtZWJvYXJkLnNoaXBzW2hpdFNoaXBdLmlzU3VuaygpO1xuXG4gIHJldHVybiBnYW1lYm9hcmQ7XG59O1xuXG5leHBvcnQgeyBhcHBseUhpdERhbWFnZSB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGFyckVxdWFsQ2hlY2sgPSBmdW5jdGlvbiAoYXJyMSwgYXJyMikge1xuICByZXR1cm4gYXJyMS5ldmVyeSgodmFsLCBpbmRleCkgPT4gdmFsID09PSBhcnIyW2luZGV4XSk7XG59O1xuXG5jb25zdCBpc0FscmVhZHlHdWVzc2VkID0gZnVuY3Rpb24gKG5lc3RlZEFyciwgYXJyKSB7XG4gIGNvbnN0IG91dHB1dCA9IFtdO1xuICBuZXN0ZWRBcnIuZm9yRWFjaCgobmVzdCkgPT4ge1xuICAgIG91dHB1dC5wdXNoKGFyckVxdWFsQ2hlY2sobmVzdCwgYXJyKSk7XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0LnNvbWUoKHgpID0+IHggPT09IHRydWUpO1xufTtcblxuZXhwb3J0IHsgYXJyRXF1YWxDaGVjaywgaXNBbHJlYWR5R3Vlc3NlZCB9O1xuIiwiLyoqXG4gKiBBcnJheSBjaGVja3MgaWYgeCBhbmQgeSBjYW4gZml0IGluIG5lZ2F0aXZlIGFuZCBwb3NpdGl2ZSBkaXIuXG4gKiBJbiB0aGlzIG9yZGVyOiBbeC1wb3NpdGl2ZSwgeC1uZWdhdGl2ZSwgeS1wb3NpdGl2ZSwgeS1uZWdhdGl2ZV1cbiAqIFJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgaW5kZXhlcyBvZiB2YWxpZCBbMCwgMSwgMiwgM11cbiAqL1xuY29uc3QgZmluZFBvc3NpYmxlRGlycyA9IGZ1bmN0aW9uIChjb29yZCwgbGVuZ3RoKSB7XG4gIHJldHVybiBbXG4gICAgY29vcmRbMF0gKyAobGVuZ3RoIC0gMSkgPiA5LFxuICAgIGNvb3JkWzBdIC0gKGxlbmd0aCAtIDEpIDwgMCxcbiAgICBjb29yZFsxXSArIChsZW5ndGggLSAxKSA+IDksXG4gICAgY29vcmRbMV0gLSAobGVuZ3RoIC0gMSkgPCAwXG4gIF1cbiAgICAubWFwKCh4LCBpKSA9PiAoeCA9PT0gZmFsc2UgPyBpIDogXCIgXCIpKVxuICAgIC5maWx0ZXIoKHgpID0+IHggIT09IFwiIFwiKTtcbn07XG5cbi8vIEJ1aWxkIHBvc3NpYmxlIHNoaXBzIGJhc2VkIG9uIGNvb3JkcyB3L3IvdCBib2FyZCBlZGdlc1xuY29uc3QgYnVpbGRTaGlwQ29vcmRzID0gZnVuY3Rpb24gKGxlbmd0aCwgZGlyLCBjb29yZCkge1xuICBjb25zdCBzaGlwID0gW107XG5cbiAgaWYgKGRpciA9PT0gMClcbiAgICBmb3IgKGxldCBpID0gY29vcmRbMF07IGkgPCBjb29yZFswXSArIGxlbmd0aDsgaSsrKSBzaGlwLnB1c2goW2ksIGNvb3JkWzFdXSk7XG5cbiAgaWYgKGRpciA9PT0gMSlcbiAgICBmb3IgKGxldCBpID0gY29vcmRbMF07IGkgPiBjb29yZFswXSAtIGxlbmd0aDsgaS0tKSBzaGlwLnB1c2goW2ksIGNvb3JkWzFdXSk7XG5cbiAgaWYgKGRpciA9PT0gMilcbiAgICBmb3IgKGxldCBpID0gY29vcmRbMV07IGkgPCBjb29yZFsxXSArIGxlbmd0aDsgaSsrKSBzaGlwLnB1c2goW2Nvb3JkWzBdLCBpXSk7XG5cbiAgaWYgKGRpciA9PT0gMylcbiAgICBmb3IgKGxldCBpID0gY29vcmRbMV07IGkgPiBjb29yZFsxXSAtIGxlbmd0aDsgaS0tKSBzaGlwLnB1c2goW2Nvb3JkWzBdLCBpXSk7XG5cbiAgcmV0dXJuIHNoaXA7XG59O1xuXG5leHBvcnQgeyBidWlsZFNoaXBDb29yZHMsIGZpbmRQb3NzaWJsZURpcnMgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBET00gVkFSSUFCTEVTICovXG5jb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluX193cmFwcGVyXCIpO1xuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lbnVfX21vZGFsXCIpO1xuY29uc3QgbW9kYWxUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51X193aW5uZXJcIik7XG5jb25zdCBnYW1lYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5nYW1lYm9hcmRcIik7XG5jb25zdCBzcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zcXVhcmVcIik7XG5cbmNvbnN0IGhpZGVNb2RhbCA9IGZ1bmN0aW9uICgpIHtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZChcImhpZGRlbi0tb3BhY2l0eVwiKTtcbiAgc2V0VGltZW91dCgoKSA9PiBtb2RhbC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuLS16XCIpLCAxMDAwKTtcbn07XG5cbmNvbnN0IHJldmVhbE1vZGFsID0gZnVuY3Rpb24gKHdpbm5lcikge1xuICBtb2RhbFRleHQudGV4dENvbnRlbnQgPSBgJHt3aW5uZXJ9IHdpbnMhYDtcbiAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlbi0telwiKTtcbiAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlbi0tb3BhY2l0eVwiKTtcbn07XG5cbmNvbnN0IHJldmVhbEdhbWVib2FyZHMgPSBmdW5jdGlvbiAoKSB7XG4gIG1haW4uY2xhc3NMaXN0LmFkZChcInJldmVhbC0tb3BhY2l0eVwiKTtcbn07XG5cbmNvbnN0IGRpc3BsYXlCb2F0cyA9IGZ1bmN0aW9uIChwbGF5ZXIpIHtcbiAgLy8gTG9vcCBvdmVyIGVhY2ggc2hpcCBvZiBwbGF5ZXJcbiAgZm9yIChsZXQgc2hpcCBpbiBwbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzKSB7XG4gICAgLy8gR2V0IHNoaXAgY29vcmRpbmF0ZXNcbiAgICBwbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzW3NoaXBdLmxvY2F0aW9uLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBjb25zdCBnYW1lYm9hcmQgPVxuICAgICAgICBwbGF5ZXIucGxheWVyTmFtZSA9PT0gXCJjb21wdXRlclwiID8gZ2FtZWJvYXJkc1swXSA6IGdhbWVib2FyZHNbMV07XG4gICAgICBjb25zdCBzcXVhcmUgPSBnYW1lYm9hcmQuY2hpbGRyZW5bY29vcmRbMF1bMF1dLmNoaWxkcmVuW2Nvb3JkWzBdWzFdXTtcblxuICAgICAgLy8gQWRkIHNoaXAgYmFja2dyb3VuZCBjb2xvclxuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmUtLXNoaXBcIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChgc3F1YXJlLS0ke3NoaXB9YCk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmNvbnN0IGRpc3BsYXlCb2F0ID0gZnVuY3Rpb24gKGNvb3Jkcywgc2hpcE5hbWUpIHtcbiAgY29vcmRzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgY29uc3Qgc3F1YXJlID0gZ2FtZWJvYXJkc1sxXS5jaGlsZHJlbltjb29yZFswXV0uY2hpbGRyZW5bY29vcmRbMV1dO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic3F1YXJlLS1zaGlwXCIpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGBzcXVhcmUtLSR7c2hpcE5hbWV9YCk7XG4gIH0pO1xufTtcblxuY29uc3QgZGlzcGxheVBvc2l0aW9uU2VsZWN0aW9uID0gZnVuY3Rpb24gKGNvb3Jkcykge1xuICBjb25zb2xlLmxvZyhjb29yZHMpO1xuICBjb29yZHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICBjb25zdCBzcXVhcmUgPSBnYW1lYm9hcmRzWzFdLmNoaWxkcmVuW2Nvb3JkWzBdXS5jaGlsZHJlbltjb29yZFsxXV07XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmUtLXNoaXBcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYHNxdWFyZS0tcG90ZW50aWFsYCk7XG4gIH0pO1xufTtcblxuY29uc3QgcmVtb3ZlUG9zaXRpb25TZWxlY3Rpb24gPSBmdW5jdGlvbiAoY29vcmRzKSB7XG4gIGNvb3Jkcy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgIGNvbnN0IHNxdWFyZSA9IGdhbWVib2FyZHNbMV0uY2hpbGRyZW5bY29vcmRbMF1dLmNoaWxkcmVuW2Nvb3JkWzFdXTtcbiAgICBjb25zb2xlLmxvZyhzcXVhcmUpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKFwic3F1YXJlLS1zaGlwXCIpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKGBzcXVhcmUtLXBvdGVudGlhbGApO1xuICB9KTtcbn07XG5cbmNvbnN0IHVwZGF0ZVVJID0gZnVuY3Rpb24gKHBsYXllcikge1xuICAvLyBMb29wIG92ZXIgaGl0c1xuICBwbGF5ZXIuZ2FtZWJvYXJkLmhpdHMuZm9yRWFjaCgoaGl0KSA9PiB7XG4gICAgY29uc3QgZ2FtZWJvYXJkID1cbiAgICAgIHBsYXllci5wbGF5ZXJOYW1lID09PSBcImNvbXB1dGVyXCIgPyBnYW1lYm9hcmRzWzBdIDogZ2FtZWJvYXJkc1sxXTtcbiAgICBjb25zdCByb3cgPSBnYW1lYm9hcmQuY2hpbGRyZW5baGl0WzBdXTtcbiAgICBjb25zdCBzcXVhcmUgPSByb3cuY2hpbGRyZW5baGl0WzFdXTtcblxuICAgIC8vIEFkZCBoaXQgYmFja2dyb3VuZCBjb2xvclxuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGBzcXVhcmUtLWhpdGApO1xuICB9KTtcblxuICAvLyBMb29wIG92ZXIgbWlzc2VzXG4gIHBsYXllci5nYW1lYm9hcmQubWlzc2VzLmZvckVhY2goKG1pc3MpID0+IHtcbiAgICBjb25zdCBnYW1lYm9hcmQgPVxuICAgICAgcGxheWVyLnBsYXllck5hbWUgPT09IFwiY29tcHV0ZXJcIiA/IGdhbWVib2FyZHNbMF0gOiBnYW1lYm9hcmRzWzFdO1xuICAgIGNvbnN0IHJvdyA9IGdhbWVib2FyZC5jaGlsZHJlblttaXNzWzBdXTtcbiAgICBjb25zdCBzcXVhcmUgPSByb3cuY2hpbGRyZW5bbWlzc1sxXV07XG5cbiAgICAvLyBBZGQgaGl0IGJhY2tncm91bmQgY29sb3JcbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChgc3F1YXJlLS1taXNzYCk7XG4gIH0pO1xufTtcblxuY29uc3QgcmVzZXRVSSA9IGZ1bmN0aW9uICgpIHtcbiAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcInNxdWFyZS0taGl0XCIpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKFwic3F1YXJlLS1taXNzXCIpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKFwiYW5pbWF0ZS1ndWVzc1wiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcInNxdWFyZS0tY2FycmllclwiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcInNxdWFyZS0tYmF0dGxlc2hpcFwiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcInNxdWFyZS0tZGVzdHJveWVyXCIpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKFwic3F1YXJlLS1zdWJtYXJpbmVcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzcXVhcmUtLXBhdHJvbFwiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcInNxdWFyZS0tcG90ZW50aWFsXCIpO1xuICB9KTtcbn07XG5cbmNvbnN0IGFkZEd1ZXNzQW5pbWF0aW9uID0gZnVuY3Rpb24gKGVuZW15UGxheWVyLCBjb29yZHMpIHtcbiAgY29uc3QgZ2FtZWJvYXJkID1cbiAgICBlbmVteVBsYXllci5wbGF5ZXJOYW1lID09PSBcInBsYXllclwiID8gZ2FtZWJvYXJkc1sxXSA6IGdhbWVib2FyZHNbMF07XG4gIGNvbnN0IHJvdyA9IGdhbWVib2FyZC5jaGlsZHJlbltjb29yZHNbMF1dO1xuICBjb25zdCBzcXVhcmUgPSByb3cuY2hpbGRyZW5bY29vcmRzWzFdXTtcblxuICAvLyBhZGQgYW5pbWF0aW9uIGNsYXNzXG4gIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiYW5pbWF0ZS1ndWVzc1wiKTtcbn07XG5cbmV4cG9ydCB7XG4gIGdhbWVib2FyZHMsXG4gIGRpc3BsYXlCb2F0cyxcbiAgZGlzcGxheUJvYXQsXG4gIGRpc3BsYXlQb3NpdGlvblNlbGVjdGlvbixcbiAgcmVtb3ZlUG9zaXRpb25TZWxlY3Rpb24sXG4gIHVwZGF0ZVVJLFxuICByZXNldFVJLFxuICBhZGRHdWVzc0FuaW1hdGlvbixcbiAgcmV2ZWFsR2FtZWJvYXJkcyxcbiAgaGlkZU1vZGFsLFxuICByZXZlYWxNb2RhbFxufTtcbiIsImltcG9ydCB7IGFyckVxdWFsQ2hlY2ssIGlzQWxyZWFkeUd1ZXNzZWQgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5pbXBvcnQgeyBnZXRSYW5kb21Db29yZHMgfSBmcm9tIFwiLi9nZXRSYW5kb21Db29yZHNcIjtcblxuKFwidXNlIHN0cmljdFwiKTtcblxuY29uc3QgZ2V0QXR0YWNrQ29vcmRzUGxheWVyID0gZnVuY3Rpb24gKHNxdWFyZSkge1xuICBjb25zdCByb3cgPSBzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3RbMV0uc2xpY2UoLTEpO1xuICBjb25zdCBjb2wgPSBzcXVhcmUuY2xhc3NMaXN0WzFdLnNsaWNlKC0xKTtcbiAgcmV0dXJuIFtwYXJzZUludChyb3csIDEwKSwgcGFyc2VJbnQoY29sLCAxMCldO1xufTtcblxuY29uc3QgZ2V0QXR0YWNrQ29vcmRzQ29tcCA9IGZ1bmN0aW9uIChndWVzc2VzLCBlbmVteSkge1xuICBsZXQgY29vcmQsIGNoZWNrUHJldkd1ZXNzZXM7XG5cbiAgLy8gSW1wbGVtZW50aW5nIHNtYXJ0ZXIgQUlcbiAgZG8ge1xuICAgIGlmIChlbmVteS5nYW1lYm9hcmQuaGl0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIE5vIGhpdHMgeWV0IDo6IHJhbmRvbSBjb29yZFxuICAgICAgY29vcmQgPSBnZXRSYW5kb21Db29yZHMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ3JlYXRlIGFycmF5IG9mIHBvdGVudGlhbCBjaG9pY2VzIGJhc2VkIG9uIHByZXZpb3VzIGhpdHNcbiAgICAgIGNvbnN0IHZhbGlkQ2hvaWNlcyA9IFtdO1xuICAgICAgLy8gTG9vcCBvdmVyIGFycmF5IG9mIGhpdHNcbiAgICAgIGVuZW15LmdhbWVib2FyZC5oaXRzLmZvckVhY2goKGhpdCkgPT4ge1xuICAgICAgICAvLyBDcmVhdGUgcG9zc2libGUgY2hvaWNlcyBvZiBoaXRzIGJhc3NlZCBvbiBwcmV2aW91cyBoaXQgKCsxIGluIGFsbCBkaXJlY3Rpb25zKVxuICAgICAgICBjb25zdCBwb3NzaWJsZUNob2ljZXMgPSBbXG4gICAgICAgICAgW2hpdFswXSArIDEsIGhpdFsxXV0sXG4gICAgICAgICAgW2hpdFswXSAtIDEsIGhpdFsxXV0sXG4gICAgICAgICAgW2hpdFswXSwgaGl0WzFdICsgMV0sXG4gICAgICAgICAgW2hpdFswXSwgaGl0WzFdIC0gMV1cbiAgICAgICAgXTtcblxuICAgICAgICAvLyBBZGQgdmFsaWQgY2hvaWNlIHRvIHZhbGlkQ2hvaWNlIGFycmF5XG4gICAgICAgIHBvc3NpYmxlQ2hvaWNlcy5mb3JFYWNoKChjaG9pY2UpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjaG9pY2VbMF0gPj0gMCAmJlxuICAgICAgICAgICAgY2hvaWNlWzBdIDwgMTAgJiZcbiAgICAgICAgICAgIGNob2ljZVsxXSA+PSAwICYmXG4gICAgICAgICAgICBjaG9pY2VbMV0gPCAxMCAmJlxuICAgICAgICAgICAgIWlzQWxyZWFkeUd1ZXNzZWQoZ3Vlc3NlcywgY2hvaWNlKVxuICAgICAgICAgIClcbiAgICAgICAgICAgIHZhbGlkQ2hvaWNlcy5wdXNoKGNob2ljZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh2YWxpZENob2ljZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvb3JkID0gZ2V0UmFuZG9tQ29vcmRzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb29yZCA9IHZhbGlkQ2hvaWNlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB2YWxpZENob2ljZXMubGVuZ3RoKV07XG4gICAgICB9XG4gICAgfVxuICB9IHdoaWxlIChpc0FscmVhZHlHdWVzc2VkKGd1ZXNzZXMsIGNvb3JkKSAmJiBndWVzc2VzLmxlbmd0aCA8IDEwMCk7XG5cbiAgaWYgKGd1ZXNzZXMubGVuZ3RoID4gOTkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBtb3JlIGd1ZXNzZXMgYXZhaWxhYmxlXCIpO1xuICB9XG4gIHJldHVybiBjb29yZDtcbn07XG5cbmV4cG9ydCB7IGdldEF0dGFja0Nvb3Jkc1BsYXllciwgZ2V0QXR0YWNrQ29vcmRzQ29tcCB9O1xuIiwiaW1wb3J0IHsgbWFrZVJhbmRvbVNoaXAgfSBmcm9tIFwiLi9tYWtlU2hpcFwiO1xuXG4oXCJ1c2Ugc3RyaWN0XCIpO1xuXG5jb25zdCBnZXRDb21wU2hpcENvb3JkcyA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYWxsU2hpcHMgPSBbXTtcblxuICAvLyBDcmVhdGUgY2FycmllclxuICBhbGxTaGlwcy5wdXNoKG1ha2VSYW5kb21TaGlwKGFsbFNoaXBzLCA1KSk7XG5cbiAgLy8gQ3JlYXRlIGJhdHRsZXNoaXBcbiAgYWxsU2hpcHMucHVzaChtYWtlUmFuZG9tU2hpcChhbGxTaGlwcywgNCkpO1xuXG4gIC8vIENyZWF0ZSBkZXN0cm95ZXJcbiAgYWxsU2hpcHMucHVzaChtYWtlUmFuZG9tU2hpcChhbGxTaGlwcywgMykpO1xuXG4gIC8vIENyZWF0ZSBzdWJtYXJpbmVcbiAgYWxsU2hpcHMucHVzaChtYWtlUmFuZG9tU2hpcChhbGxTaGlwcywgMykpO1xuXG4gIC8vIENyZWF0ZSBwYXRyb2xcbiAgYWxsU2hpcHMucHVzaChtYWtlUmFuZG9tU2hpcChhbGxTaGlwcywgMikpO1xuXG4gIHJldHVybiBhbGxTaGlwcztcbn07XG5cbmV4cG9ydCB7IGdldENvbXBTaGlwQ29vcmRzIH07XG5cbi8vIFswXSBjYXJyaWVyLCBbMV0gYmF0dGxlc2hpcCwgWzJdIGRlc3Ryb3llciwgWzNdIHN1Ym1hcmluZSwgWzRdIHBhdHJvbFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGdldFJhbmRvbUNvb3JkcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCksIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKV07XG59O1xuXG5leHBvcnQgeyBnZXRSYW5kb21Db29yZHMgfTtcbiIsIi8vIENoZWNrIGlmIGEgZ3Vlc3NlZCBjb29yZGluYXRlIGhpdHMgYSBzaGlwXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyRXF1YWxDaGVjayB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcblxuY29uc3QgaGl0Q2hlY2sgPSBmdW5jdGlvbiAoZ2FtZWJvYXJkLCBjb29yZHMpIHtcbiAgLy8gQ3JlYXRlIGFycmF5IGZvciBzaGlwIGhpdCBjaGVja1xuICBjb25zdCBvdXRwdXQgPSBbXTtcblxuICAvLyBMb29wIG92ZXIgc2hpcHMgdG8gY2hlY2sgaWYgY29vcmRzIGlzIGEgaGl0IGZvciBhbnlcbiAgZm9yIChsZXQgc2hpcCBpbiBnYW1lYm9hcmQuc2hpcHMpIHtcbiAgICBvdXRwdXQucHVzaChcbiAgICAgIGdhbWVib2FyZC5zaGlwc1tzaGlwXS5sb2NhdGlvblxuICAgICAgICAubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZFswXSwgY29vcmRzKSlcbiAgICAgICAgLmluY2x1ZGVzKHRydWUpXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgeyBoaXRDaGVjayB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGdldFJhbmRvbUNvb3JkcyB9IGZyb20gXCIuL2dldFJhbmRvbUNvb3Jkc1wiO1xuaW1wb3J0IHsgYXJyRXF1YWxDaGVjayB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcbmltcG9ydCB7IGJ1aWxkU2hpcENvb3JkcywgZmluZFBvc3NpYmxlRGlycyB9IGZyb20gXCIuL2NyZWF0ZVJhbmRvbVNoaXBzXCI7XG5cbmNvbnN0IG1ha2VSYW5kb21TaGlwID0gZnVuY3Rpb24gKGFsbFNoaXBzLCBsZW5ndGgpIHtcbiAgY29uc3QgYWxsU2hpcHNDb29yZHMgPSBhbGxTaGlwcy5mbGF0KCk7XG5cbiAgLy8gR2V0IGZpcnN0IGNvb3JkaW5hdGVcbiAgbGV0IGNvb3JkO1xuICBkbyB7XG4gICAgY29vcmQgPSBnZXRSYW5kb21Db29yZHMoKTtcbiAgfSB3aGlsZSAoYWxsU2hpcHNDb29yZHMubWFwKChjKSA9PiBhcnJFcXVhbENoZWNrKGMsIGNvb3JkKSkuaW5jbHVkZXModHJ1ZSkpO1xuXG4gIC8vIEdldCBwb3NzaWJsZSBkaXJlY3Rpb25zIGFnYWluc3QgZWRnZSBvZiBib2FyZCBmcm9tIGNvb3JkLlxuICBjb25zdCBwb3NzaWJsZURpcnMgPSBmaW5kUG9zc2libGVEaXJzKGNvb3JkLCBsZW5ndGgpO1xuXG4gIC8vIENyZWF0ZSBhcnJheSBvZiBhbGwgcG9zc2libGUgc2hpcHNcbiAgY29uc3QgcG9zc2libGVTaGlwcyA9IHBvc3NpYmxlRGlycy5tYXAoKGRpcikgPT5cbiAgICBidWlsZFNoaXBDb29yZHMobGVuZ3RoLCBkaXIsIGNvb3JkKVxuICApO1xuXG4gIC8vIENoZWNrIGVhY2ggc2hpcCBmb3IgY29uZmxpY3Qgd2l0aCBwcmV2aW91cyBzaGlwIHBsYWNlbWVudFxuICBjb25zdCBzaGlwQ2hvaWNlc0ZpbmFsID0gW107XG5cbiAgLy8gTG9vcCBvdmVyIHBvc3NpYmxlIHNoaXBzXG4gIGZvciAobGV0IHNoaXAgb2YgcG9zc2libGVTaGlwcykge1xuICAgIGNvbnN0IGNvb3JkQ2hlY2tBcnIgPSBbXTtcblxuICAgIC8vIExvb3Agb3ZlciBjb29yZGluYXRlcyBvZiBlYWNoIHBvc3NpYmxlIHNoaXBcbiAgICBmb3IgKGxldCBzaGlwQ29vcmQgb2Ygc2hpcCkge1xuICAgICAgbGV0IG1hdGNoID0gMDtcblxuICAgICAgLy8gTG9vcCBvdmVyIHByZXZpb3VzIHNoaXBzOyBpZiBtYXRjaCwgbWFyayB0aGF0XG4gICAgICBhbGxTaGlwc0Nvb3Jkcy5mb3JFYWNoKChhbGxTaGlwc0Nvb3JkKSA9PiB7XG4gICAgICAgIGlmIChhcnJFcXVhbENoZWNrKHNoaXBDb29yZCwgYWxsU2hpcHNDb29yZCkpIG1hdGNoKys7XG4gICAgICB9KTtcblxuICAgICAgLy8gSWYgYSBtYXRjaCBpcyBmb3VuZCwgYWRkIHRydWVcbiAgICAgIGNvb3JkQ2hlY2tBcnIucHVzaChtYXRjaCA9PT0gMCA/IGZhbHNlIDogdHJ1ZSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHZhbGlkIHNoaXBzIHRvIGNob2ljZSBhcnJheVxuICAgIGlmICghY29vcmRDaGVja0Fyci5pbmNsdWRlcyh0cnVlKSkgc2hpcENob2ljZXNGaW5hbC5wdXNoKHNoaXApO1xuICB9XG5cbiAgLy8gUmFuZG9tbHkgc2VsZWN0IGZyb20gcmVtYWluaW5nIG9wdGlvbnNcbiAgcmV0dXJuIHNoaXBDaG9pY2VzRmluYWxbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc2hpcENob2ljZXNGaW5hbC5sZW5ndGgpXTtcbn07XG5cbmV4cG9ydCB7IG1ha2VSYW5kb21TaGlwIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vUGxheWVyXCI7XG5pbXBvcnQgeyBnZXRDb21wU2hpcENvb3JkcyB9IGZyb20gXCIuL2dldENvbXBTaGlwQ29vcmRzXCI7XG5cbi8vKiAjIyMjIyMjIyMjIyBOZXcgR2FtZSAjIyMjIyMjIyMjIyMjIyNcbmNvbnN0IG5ld0dhbWUgPSBmdW5jdGlvbiAoY2hvc2VuQ29vcmRzKSB7XG4gIC8vIFBsYXllciBjaG9vc2VzIHNoaXAgY29vcmRpbmF0ZXNcbiAgY29uc3QgcGxheWVyID0gUGxheWVyKFwicGxheWVyXCIsIGNob3NlbkNvb3Jkcyk7XG5cbiAgLy8gQ29tcHV0ZXIgcmFuZG9tbHkgY2hvb3NlcyBzaGlwIGNvb3JkaW5hdGVzXG4gIGNvbnN0IGNvbXB1dGVyID0gUGxheWVyKFwiY29tcHV0ZXJcIiwgZ2V0Q29tcFNoaXBDb29yZHMoKSk7XG5cbiAgcmV0dXJuIFtwbGF5ZXIsIGNvbXB1dGVyXTtcbn07XG5cbmV4cG9ydCB7IG5ld0dhbWUgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJFcXVhbENoZWNrIH0gZnJvbSBcIi4vYXJyRXF1YWxDaGVja1wiO1xuXG5jb25zdCBwcmV2R3Vlc3NDaGVjayA9IChnYW1lYm9hcmQsIGNvb3JkcykgPT4ge1xuICBjb25zdCBvdXRwdXQgPSBbXTtcblxuICBvdXRwdXQucHVzaChcbiAgICBnYW1lYm9hcmQubWlzc2VzLm1hcCgoY29vcmQpID0+IGFyckVxdWFsQ2hlY2soY29vcmQsIGNvb3JkcykpLmluY2x1ZGVzKHRydWUpXG4gICk7XG5cbiAgb3V0cHV0LnB1c2goXG4gICAgZ2FtZWJvYXJkLmhpdHMubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZCwgY29vcmRzKSkuaW5jbHVkZXModHJ1ZSlcbiAgKTtcblxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0IHsgcHJldkd1ZXNzQ2hlY2sgfTtcblxuLy8gY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCB7XG4gIGdhbWVib2FyZHMsXG4gIGRpc3BsYXlCb2F0cyxcbiAgZGlzcGxheUJvYXQsXG4gIGRpc3BsYXlQb3NpdGlvblNlbGVjdGlvbixcbiAgcmVtb3ZlUG9zaXRpb25TZWxlY3Rpb24sXG4gIHVwZGF0ZVVJLFxuICByZXNldFVJLFxuICBhZGRHdWVzc0FuaW1hdGlvbixcbiAgcmV2ZWFsR2FtZWJvYXJkcyxcbiAgaGlkZU1vZGFsLFxuICByZXZlYWxNb2RhbFxufSBmcm9tIFwiLi9kb21JbnRlcmFjdGlvblwiO1xuaW1wb3J0IHsgbmV3R2FtZSB9IGZyb20gXCIuL25ld0dhbWVcIjtcbmltcG9ydCB7IG1ha2VSYW5kb21TaGlwIH0gZnJvbSBcIi4vbWFrZVNoaXBcIjtcbmltcG9ydCB7IGlzQWxyZWFkeUd1ZXNzZWQgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5cbi8vKiAjIyMjIyMjIyMjIyBJbml0aWFsIFNoaXAgQ29vcmRzICMjIyMjIyMjIyMjIyMjI1xuLy8gY2FycmllclxuLy8gcHJldHRpZXItaWdub3JlXG5jb25zdCBjb29yZHMwID0gW1swLCAwXSwgWzEsIDBdLCBbMiwgMF0sIFszLCAwXSwgWzQsIDBdXTtcblxuLy8gYmF0dGxlc2hpcFxuLy8gcHJldHRpZXItaWdub3JlXG5jb25zdCBjb29yZHMxID0gW1swLCAxXSwgWzEsIDFdLCBbMiwgMV0sIFszLCAxXV07XG5cbi8vIGRlc3Ryb3llclxuLy8gcHJldHRpZXItaWdub3JlXG5jb25zdCBjb29yZHMyID0gW1swLCAyXSwgWzEsIDJdLCBbMiwgMl1dO1xuXG4vLyBzdWJtYXJpbmVcbi8vIHByZXR0aWVyLWlnbm9yZVxuY29uc3QgY29vcmRzMyA9IFtbMCwgM10sIFsxLCAzXSwgWzIsIDNdXTtcblxuLy8gcGF0cm9sXG4vLyBwcmV0dGllci1pZ25vcmVcbmNvbnN0IGNvb3JkczQgPSBbWzAsIDRdLCBbMSwgNF1dO1xuXG5jb25zdCB0ZXN0Q29vcmRzMSA9IFtjb29yZHMwLCBjb29yZHMxLCBjb29yZHMyLCBjb29yZHMzLCBjb29yZHM0XTtcblxuLy8qICMjIyMjIyMjIyMjIyMgRE9NIFZhcmlhYmxlcyAjIyMjIyMjIyMjIyMjIyMjIyNcbmNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkc1swXTtcbmNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNxdWFyZVwiKTtcbmNvbnN0IG5ld0dhbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1nYW1lXCIpO1xuXG4vLyogIyMjIyMjIyMjIyMjIyBHYW1lZmxvdyAjIyMjIyMjIyMjIyMjIyMjIyNcbi8vIFBsYXllciBWYXJpYWJsZXNcbmxldCBwbGF5ZXI7XG5sZXQgY29tcHV0ZXI7XG5cbmNvbnN0IHBsYWNlbWVudE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGFjZW1lbnRfX21vZGFsXCIpO1xubGV0IHNoaXBDYXJyaWVyLCBzaGlwRGVzdHJveWVyLCBzaGlwQmF0dGxlc2hpcCwgc2hpcFBhdHJvbCwgc2hpcFN1Ym1hcmluZTtcbmxldCB2ZXJ0aWNhbEFsaWdubWVudCA9IGZhbHNlO1xuXG5jb25zdCBpc1ZhbGlkTW92ZSA9IGZ1bmN0aW9uIChuZXdTaGlwLCBwbGF5ZXJDb29yZHMpIHtcbiAgY29uc3QgY2hlY2tOZXdTaGlwID0gbmV3U2hpcC5tYXAoKGNvb3JkKSA9PlxuICAgIGlzQWxyZWFkeUd1ZXNzZWQocGxheWVyQ29vcmRzLCBjb29yZClcbiAgKTtcbiAgY29uc3QgY2hlY2tzID0gW1xuICAgIGNoZWNrTmV3U2hpcC5ldmVyeSgoeCkgPT4geCA9PT0gZmFsc2UpLFxuICAgIG5ld1NoaXAuZmxhdCgpLmV2ZXJ5KCh4KSA9PiB4ID49IDAgJiYgeCA8IDEwKVxuICBdO1xuXG4gIHJldHVybiAhY2hlY2tzLmluY2x1ZGVzKGZhbHNlKTtcbn07XG5cbi8vIFN0YXJ0IE5ldyBHYW1lXG5uZXdHYW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHJldmVhbEdhbWVib2FyZHMoKTtcbiAgaGlkZU1vZGFsKCk7XG5cbiAgcmVzZXRVSSgpO1xuXG4gIC8vIENyZWF0ZSBhcnJheSB0byBzYXZlIGFzIGNvb3Jkc1xuICBjb25zdCBwbGF5ZXJDb29yZHMgPSBbXTtcblxuICAvLyBSZXZlYWwgYWRkIHNoaXAgbWVudVxuICBwbGFjZW1lbnRNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuLS16XCIpO1xuICBwbGFjZW1lbnRNb2RhbC5jbGFzc0xpc3QuYWRkKFwicmV2ZWFsLS1vcGFjaXR5XCIpO1xuXG4gIC8vIENhcnJpZXJcbiAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKGUpID0+IHtcbiAgICAgIGNvbnN0IHJvdyA9ICtlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdFsxXS5zbGljZSgtMSk7XG4gICAgICBjb25zdCBjb2wgPSArZS50YXJnZXQuY2xhc3NMaXN0WzFdLnNsaWNlKC0xKTtcbiAgICAgIGlmICh2ZXJ0aWNhbEFsaWdubWVudCA9PT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgcG90ZW50aWFsQ29vcmRzID0gW1xuICAgICAgICAgIFtyb3csIGNvbF0sXG4gICAgICAgICAgW3JvdywgY29sICsgMV0sXG4gICAgICAgICAgW3JvdywgY29sICsgMl0sXG4gICAgICAgICAgW3JvdywgY29sICsgM10sXG4gICAgICAgICAgW3JvdywgY29sICsgNF1cbiAgICAgICAgXTtcblxuICAgICAgICBpZiAoIWlzVmFsaWRNb3ZlKHBvdGVudGlhbENvb3JkcywgcGxheWVyQ29vcmRzKSkge1xuICAgICAgICAgIHJlc2V0VUkoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBkaXNwbGF5UG9zaXRpb25TZWxlY3Rpb24ocG90ZW50aWFsQ29vcmRzKTtcblxuICAgICAgICAvLyBkaXNwbGF5UG9zaXRpb25TZWxlY3Rpb24oKTtcbiAgICAgICAgLy8gZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcInNxdWFyZS0tcG90ZW50aWFsXCIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIChlKSA9PiB7XG4gICAgICBjb25zdCByb3cgPSArZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3RbMV0uc2xpY2UoLTEpO1xuICAgICAgY29uc3QgY29sID0gK2UudGFyZ2V0LmNsYXNzTGlzdFsxXS5zbGljZSgtMSk7XG4gICAgICBjb25zdCBwb3RlbnRpYWxDb29yZHMgPSBbXG4gICAgICAgIFtyb3csIGNvbF0sXG4gICAgICAgIFtyb3csIGNvbCArIDFdLFxuICAgICAgICBbcm93LCBjb2wgKyAyXSxcbiAgICAgICAgW3JvdywgY29sICsgM10sXG4gICAgICAgIFtyb3csIGNvbCArIDRdXG4gICAgICBdO1xuXG4gICAgICBpZiAoIWlzVmFsaWRNb3ZlKHBvdGVudGlhbENvb3JkcywgcGxheWVyQ29vcmRzKSkge1xuICAgICAgICByZXNldFVJKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVtb3ZlUG9zaXRpb25TZWxlY3Rpb24ocG90ZW50aWFsQ29vcmRzKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gc2hpcENhcnJpZXIgPSBtYWtlUmFuZG9tU2hpcChwbGF5ZXJDb29yZHMsIDUpO1xuICAvLyBkaXNwbGF5UG9zaXRpb25TZWxlY3Rpb24oc2hpcENhcnJpZXIpO1xuXG4gIC8vIEJhdHRsZXNoaXBcblxuICAvLyBEZXN0cm95ZXJcblxuICAvLyBTdWJtYXJpbmVcblxuICAvLyBQYXRyb2xcblxuICAvLyBkaXNwbGF5Qm9hdChzaGlwQ2FycmllciwgXCJjYXJyaWVyXCIpO1xuXG4gIC8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICAvLyAgIGNvbnN0IGtleSA9IGUua2V5O1xuICAvLyAgIGlmIChrZXkgPT09IFwiQXJyb3dMZWZ0XCIpIHtcbiAgLy8gICAgIGNvbnN0IG5ld0NhcnJpZXIgPSBzaGlwQ2Fycmllci5tYXAoKGNvb3JkKSA9PiBbY29vcmRbMF0sIGNvb3JkWzFdIC0gMV0pO1xuICAvLyAgICAgaWYgKGlzVmFsaWRNb3ZlKG5ld0NhcnJpZXIsIHBsYXllckNvb3JkcykpIHNoaXBDYXJyaWVyID0gbmV3Q2FycmllcjtcbiAgLy8gICB9XG5cbiAgLy8gICBpZiAoa2V5ID09PSBcIkFycm93UmlnaHRcIikge1xuICAvLyAgICAgY29uc3QgbmV3Q2FycmllciA9IHNoaXBDYXJyaWVyLm1hcCgoY29vcmQpID0+IFtjb29yZFswXSwgY29vcmRbMV0gKyAxXSk7XG4gIC8vICAgICBpZiAoaXNWYWxpZE1vdmUobmV3Q2FycmllciwgcGxheWVyQ29vcmRzKSkgc2hpcENhcnJpZXIgPSBuZXdDYXJyaWVyO1xuICAvLyAgIH1cblxuICAvLyAgIGlmIChrZXkgPT09IFwiQXJyb3dEb3duXCIpIHtcbiAgLy8gICAgIGNvbnN0IG5ld0NhcnJpZXIgPSBzaGlwQ2Fycmllci5tYXAoKGNvb3JkKSA9PiBbY29vcmRbMF0gKyAxLCBjb29yZFsxXV0pO1xuICAvLyAgICAgaWYgKGlzVmFsaWRNb3ZlKG5ld0NhcnJpZXIsIHBsYXllckNvb3JkcykpIHNoaXBDYXJyaWVyID0gbmV3Q2FycmllcjtcbiAgLy8gICB9XG5cbiAgLy8gICBpZiAoa2V5ID09PSBcIkFycm93VXBcIikge1xuICAvLyAgICAgY29uc3QgbmV3Q2FycmllciA9IHNoaXBDYXJyaWVyLm1hcCgoY29vcmQpID0+IFtjb29yZFswXSAtIDEsIGNvb3JkWzFdXSk7XG4gIC8vICAgICBpZiAoaXNWYWxpZE1vdmUobmV3Q2FycmllciwgcGxheWVyQ29vcmRzKSkgc2hpcENhcnJpZXIgPSBuZXdDYXJyaWVyO1xuICAvLyAgIH1cblxuICAvLyAgIHJlc2V0VUkoKTtcbiAgLy8gICAvLyBpZiAocGxheWVyQ29vcmRzLmxlbmd0aCA+IDApXG4gIC8vICAgLy8gICBwbGF5ZXJDb29yZHMuZm9yRWFjaCgoc2hpcCkgPT4gZGlzcGxheUJvYXQoc2hpcCkpO1xuICAvLyAgIGRpc3BsYXlCb2F0KHNoaXBDYXJyaWVyLCBcImNhcnJpZXJcIik7XG4gIC8vICAgLy8gY29uc29sZS5sb2coc2hpcENhcnJpZXIpO1xuICAvLyB9KTtcblxuICAvLyBkaXNwbGF5Qm9hdHMoKTtcblxuICAvLyBSYW5kb21seSBwbGFjZSBjYXJyaWVyXG5cbiAgLy8gY29uc3QgZ2FtZSA9IG5ld0dhbWUodGVzdENvb3JkczEpO1xuXG4gIC8vIHBsYXllciA9IGdhbWVbMF07XG4gIC8vIGNvbXB1dGVyID0gZ2FtZVsxXTtcblxuICAvLyBkaXNwbGF5Qm9hdHMocGxheWVyKTtcblxuICAvLyAvLyBDaG9vc2Ugc2hpcCBwb3NpdGlvbnNcbiAgLy8gc2hpcENhcnJpZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNxdWFyZS0tY2FycmllclwiKTtcbiAgLy8gc2hpcEJhdHRsZXNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNxdWFyZS0tYmF0dGxlc2hpcFwiKTtcbiAgLy8gc2hpcERlc3Ryb3llciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3F1YXJlLS1kZXN0cm95ZXJcIik7XG4gIC8vIHNoaXBTdWJtYXJpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNxdWFyZS0tc3VibWFyaW5lXCIpO1xuICAvLyBzaGlwUGF0cm9sID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zcXVhcmUtLXBhdHJvbFwiKTtcblxuICAvLyBzaGlwQ2Fycmllci5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgLy8gICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdcIiwgKGUpID0+IHt9KTtcbiAgLy8gfSk7XG59KTtcblxuLy8gVHVybiBHYW1lcGxheVxuYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IHNxdWFyZSA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuc3F1YXJlXCIpO1xuICBpZiAoIXNxdWFyZSkgcmV0dXJuO1xuXG4gIC8vIERpc2FsbG93IGlmIGdhbWVvdmVyXG4gIGlmIChwbGF5ZXIuZGVmZWF0ID09PSB0cnVlIHx8IGNvbXB1dGVyLmRlZmVhdCA9PT0gdHJ1ZSkgcmV0dXJuO1xuXG4gIC8vIERpc2FsbG93IGFscmVhZHkgY2xpY2tlZCBzcXVhcmVzXG4gIGlmIChzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwic3F1YXJlLS1oaXRcIikpIHJldHVybjtcbiAgaWYgKHNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoXCJzcXVhcmUtLW1pc3NcIikpIHJldHVybjtcblxuICAvLyBQbGF5ZXIgdHVyblxuICBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyLCBzcXVhcmUpO1xuICB1cGRhdGVVSShjb21wdXRlcik7XG5cbiAgLy8gIENoZWNrIGZvciBkZWZlYXRcbiAgaWYgKGNvbXB1dGVyLmRlZmVhdCA9PT0gdHJ1ZSkge1xuICAgIHJldmVhbE1vZGFsKFwiUGxheWVyXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIENvbXB1dGVyIHR1cm5cbiAgY29tcHV0ZXIuYXR0YWNrKHBsYXllcik7XG4gIHVwZGF0ZVVJKHBsYXllcik7XG4gIGFkZEd1ZXNzQW5pbWF0aW9uKHBsYXllciwgY29tcHV0ZXIuZ3Vlc3Nlcy5zbGljZSgtMSlbMF0pO1xuXG4gIC8vIENoZWNrIGZvciBkZWZlYXRcbiAgaWYgKHBsYXllci5kZWZlYXQgPT09IHRydWUpIHtcbiAgICByZXZlYWxNb2RhbChcIkNvbXB1dGVyXCIpO1xuICAgIHJldHVybjtcbiAgfVxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=