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
  return output.includes(true);
};




/***/ }),

/***/ "./src/createPotentialShip.js":
/*!************************************!*\
  !*** ./src/createPotentialShip.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPotentialShip": () => (/* binding */ createPotentialShip),
/* harmony export */   "getPotentialCoords": () => (/* binding */ getPotentialCoords)
/* harmony export */ });


const createPotentialShip = function (length, vertAlign, coords) {
  const potentialShip = [];

  if (vertAlign === false) {
    for (let i = 0; i < length; i++) {
      potentialShip.push([coords[0], coords[1] + i]);
    }
  } else {
    for (let i = 0; i < length; i++) {
      potentialShip.push([coords[0] + i, coords[1]]);
    }
  }

  return potentialShip;
};

const getPotentialCoords = function (e) {
  return [
    parseInt(e.target.parentElement.classList[1].slice(-1)),
    parseInt(e.target.classList[1].slice(-1))
  ];
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
/* harmony export */   "hideAddShipMenu": () => (/* binding */ hideAddShipMenu),
/* harmony export */   "hideModal": () => (/* binding */ hideModal),
/* harmony export */   "removePositionSelection": () => (/* binding */ removePositionSelection),
/* harmony export */   "removeSelectionFromShip": () => (/* binding */ removeSelectionFromShip),
/* harmony export */   "resetSelectionUI": () => (/* binding */ resetSelectionUI),
/* harmony export */   "resetUI": () => (/* binding */ resetUI),
/* harmony export */   "revealAddShipMenu": () => (/* binding */ revealAddShipMenu),
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
  coords.forEach((coord) => {
    const square = gameboards[1].children[coord[0]].children[coord[1]];
    square.classList.add("square--ship");
    square.classList.add(`square--potential`);
  });
};

const removePositionSelection = function (coords) {
  coords.forEach((coord) => {
    const square = gameboards[1].children[coord[0]].children[coord[1]];
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

const resetSelectionUI = function () {
  squares.forEach((square) => {
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

const revealAddShipMenu = function (placementModal) {
  placementModal.classList.remove("hidden--z");
  placementModal.classList.add("reveal--opacity");
};

const hideAddShipMenu = function (placementModal) {
  placementModal.classList.remove("reveal--opacity");
  setTimeout(() => placementModal.classList.add("hidden--z"), 800);
};

const removeSelectionFromShip = function (shipSelected) {
  shipSelected.classList.remove("ship--selected");
  shipSelected.classList.add("ship--placed");
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

/***/ "./src/isValidMove.js":
/*!****************************!*\
  !*** ./src/isValidMove.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isValidMove": () => (/* binding */ isValidMove)
/* harmony export */ });
/* harmony import */ var _arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrEqualCheck */ "./src/arrEqualCheck.js");




const isValidMove = function (newShip, playerCoords) {
  const checkNewShip = newShip.map((coord) =>
    (0,_arrEqualCheck__WEBPACK_IMPORTED_MODULE_0__.isAlreadyGuessed)(playerCoords.flat(), coord)
  );

  const checks = [
    checkNewShip.every((x) => x === false),
    newShip.flat().every((x) => x >= 0 && x < 10)
  ];

  return !checks.includes(false);
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
/* harmony import */ var _isValidMove__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isValidMove */ "./src/isValidMove.js");
/* harmony import */ var _createPotentialShip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createPotentialShip */ "./src/createPotentialShip.js");






//* ############# DOM Variables ##################
const board = _domInteraction__WEBPACK_IMPORTED_MODULE_0__.gameboards[0];
const squares = document.querySelectorAll(".square");
const newGameBtn = document.querySelector("#new-game");
const placementModal = document.querySelector("#placement__modal");
const btnRotateShip = document.querySelector("#spin-ship");
const beginGameBtn = document.querySelector("#begin-game");

//* ############# Gameflow ##################
// Game Variables
const shipOrder = ["carrier", "battleship", "destroyer", "submarine", "patrol"];
const shipsHealth = [5, 4, 3, 3, 2];

let player;
let computer;
let potentialCoords;
let playerCoords;

let vertAlign = false;

// Rotate horizontal or vertical ship alignment on selection screen
btnRotateShip.addEventListener("click", () => {
  vertAlign = !vertAlign;
});

// Start New Game
newGameBtn.addEventListener("click", () => {
  //? Reset visuals
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.revealGameboards)();
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.hideModal)();

  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.resetUI)();

  // Reveal add ship menu
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.revealAddShipMenu)(placementModal);

  //? Player Choose ship placement
  // Set new PlayerCoords array
  playerCoords = [];

  squares.forEach((square) => {
    // MOUSE ENTER -- Hover over to see potential ship placement
    square.addEventListener("mouseenter", (e) => {
      // Get coordinates
      const coords = (0,_createPotentialShip__WEBPACK_IMPORTED_MODULE_3__.getPotentialCoords)(e);

      potentialCoords = (0,_createPotentialShip__WEBPACK_IMPORTED_MODULE_3__.createPotentialShip)(
        shipsHealth[playerCoords.length],
        vertAlign,
        coords
      );

      if (!(0,_isValidMove__WEBPACK_IMPORTED_MODULE_2__.isValidMove)(potentialCoords, playerCoords)) {
        (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.resetSelectionUI)();
        return;
      }

      (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.displayPositionSelection)(potentialCoords);
    });

    // MOUSE CLICK -- Store potential ship
    square.addEventListener("click", () => {
      // Exit if all ships chosen
      if (playerCoords.length === 5) return;

      if (!(0,_isValidMove__WEBPACK_IMPORTED_MODULE_2__.isValidMove)(potentialCoords, playerCoords)) return;

      // Remove red background; add gray to chosen ship
      const shipSelected = document.querySelector(
        `#ship-select-${playerCoords.length}`
      );

      (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.removeSelectionFromShip)(shipSelected);

      // Display boat on screen
      (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.displayBoat)(potentialCoords, shipOrder[playerCoords.length]);

      // Add chosen ship to array
      playerCoords.push(potentialCoords);

      // Exit if all ships chosen
      if (playerCoords.length === 5) return;

      // Add red selector to next ship
      document
        .querySelector(`#ship-select-${playerCoords.length}`)
        .classList.add("ship--selected");
    });

    // MOUSE LEAVE -- Erase previous potential ship placement on hover exit
    square.addEventListener("mouseleave", (e) => {
      (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.resetSelectionUI)();
    });
  });
});

beginGameBtn.addEventListener("click", () => {
  if (playerCoords.length !== 5) return;

  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.hideAddShipMenu)(placementModal);
  const game = (0,_newGame__WEBPACK_IMPORTED_MODULE_1__.newGame)(playerCoords);

  player = game[0];
  computer = game[1];

  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.resetUI)();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0EsRUFBRSx5REFBUTs7QUFFVjtBQUNBO0FBQ0EsSUFBSSw0REFBVztBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUUseURBQVE7QUFDVixFQUFFLGtFQUFpQjs7QUFFbkI7QUFDQTtBQUNBLElBQUksNERBQVc7QUFDZjtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcGx5SGl0RGFtYWdlLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXJyRXF1YWxDaGVjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NyZWF0ZVBvdGVudGlhbFNoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jcmVhdGVSYW5kb21TaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbUludGVyYWN0aW9uLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2V0QXR0YWNrQ29vcmRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2V0Q29tcFNoaXBDb29yZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nZXRSYW5kb21Db29yZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9oaXRDaGVjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2lzVmFsaWRNb3ZlLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFrZVNoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9uZXdHYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcHJldkd1ZXNzQ2hlY2suanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gR2FtZWJvYXJkXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL1NoaXBcIjtcbmltcG9ydCB7IHByZXZHdWVzc0NoZWNrIH0gZnJvbSBcIi4vcHJldkd1ZXNzQ2hlY2tcIjtcbmltcG9ydCB7IGhpdENoZWNrIH0gZnJvbSBcIi4vaGl0Q2hlY2tcIjtcbmltcG9ydCB7IGFwcGx5SGl0RGFtYWdlIH0gZnJvbSBcIi4vYXBwbHlIaXREYW1hZ2VcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gZnVuY3Rpb24gKGNvb3JkczAsIGNvb3JkczEsIGNvb3JkczIsIGNvb3JkczMsIGNvb3JkczQpIHtcbiAgLy8gU2hpcHNcbiAgY29uc3Qgc2hpcHMgPSB7XG4gICAgY2FycmllcjogU2hpcChjb29yZHMwKSxcbiAgICBiYXR0bGVzaGlwOiBTaGlwKGNvb3JkczEpLFxuICAgIGRlc3Ryb3llcjogU2hpcChjb29yZHMyKSxcbiAgICBzdWJtYXJpbmU6IFNoaXAoY29vcmRzMyksXG4gICAgcGF0cm9sOiBTaGlwKGNvb3JkczQpXG4gIH07XG5cbiAgLy8gRW5lbXkgR3Vlc3MgQXJyYXlzXG4gIGNvbnN0IG1pc3NlcyA9IFtdO1xuICBjb25zdCBoaXRzID0gW107XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICAvLyBDaGVjayBpZiBhbHJlYWR5IGd1ZXNzZWRcbiAgICBpZiAocHJldkd1ZXNzQ2hlY2sodGhpcywgY29vcmRzKS5pbmNsdWRlcyh0cnVlKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gQ2hlY2sgaWYgZ3Vlc3MgaXMgYSBoaXQgb24gYSBzaGlwXG4gICAgY29uc3QgaGl0Q2hlY2tBcnIgPSBoaXRDaGVjayh0aGlzLCBjb29yZHMpO1xuXG4gICAgLy8gSWYgbm9uZSBzaG93IGhpdCwgcHV0IGludG8gbWlzc2VzIGFycmF5XG4gICAgaWYgKGhpdENoZWNrQXJyLmV2ZXJ5KCh4KSA9PiB4ID09PSBmYWxzZSkpIHtcbiAgICAgIG1pc3Nlcy5wdXNoKGNvb3Jkcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBJZiBndWVzcyBzaG93cyBoaXRcbiAgICBpZiAoaGl0Q2hlY2tBcnIuc29tZSgoeCkgPT4geCA9PT0gdHJ1ZSkpIHtcbiAgICAgIGhpdHMucHVzaChjb29yZHMpO1xuICAgICAgcmV0dXJuIGFwcGx5SGl0RGFtYWdlKHRoaXMsIGhpdENoZWNrQXJyLCBjb29yZHMpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGVja0FsbFN1bmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gQ3JlYXRlIGFycmF5IG9mIGFsbCBzdW5rIGNoZWNrc1xuICAgIGNvbnN0IHN1bmtBcnIgPSBbXTtcblxuICAgIC8vIFBvcHVsYXRlIHRoZSBhcnJheSB3aXRoIHN1bmsgY2hlY2tzXG4gICAgZm9yIChsZXQgc2hpcCBpbiB0aGlzLnNoaXBzKSB7XG4gICAgICBzdW5rQXJyLnB1c2goc2hpcHNbc2hpcF0uc3Vuayk7XG4gICAgfVxuXG4gICAgLy8gRXZhbHVhdGUgdGhlIGFycmF5IGZvciBhbGwgc3VuayBjaGVja3MgPT09IHRydWVcbiAgICByZXR1cm4gc3Vua0Fyci5ldmVyeSgoZWwpID0+IGVsID09PSB0cnVlKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNoaXBzLFxuICAgIG1pc3NlcyxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGhpdHMsXG4gICAgY2hlY2tBbGxTdW5rXG4gIH07XG59O1xuXG5leHBvcnQgeyBHYW1lYm9hcmQgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcbmltcG9ydCB7IGdldEF0dGFja0Nvb3Jkc0NvbXAsIGdldEF0dGFja0Nvb3Jkc1BsYXllciB9IGZyb20gXCIuL2dldEF0dGFja0Nvb3Jkc1wiO1xuXG5jb25zdCBQbGF5ZXIgPSBmdW5jdGlvbiAocGxheWVyTmFtZSwgY29vcmRzKSB7XG4gIGNvbnN0IGdhbWVib2FyZCA9IEdhbWVib2FyZCguLi5jb29yZHMpO1xuICBjb25zdCBndWVzc2VzID0gW107XG4gIGxldCBkZWZlYXQgPSBmYWxzZTtcblxuICBjb25zdCBhdHRhY2sgPSBmdW5jdGlvbiAoZW5lbXksIHNxdWFyZSkge1xuICAgIGNvbnN0IGNvb3JkcyA9XG4gICAgICBlbmVteS5wbGF5ZXJOYW1lID09PSBcInBsYXllclwiXG4gICAgICAgID8gZ2V0QXR0YWNrQ29vcmRzQ29tcChndWVzc2VzLCBlbmVteSlcbiAgICAgICAgOiBnZXRBdHRhY2tDb29yZHNQbGF5ZXIoc3F1YXJlKTtcblxuICAgIGNvbnN0IHR1cm4gPSBlbmVteS5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuXG4gICAgLy8gRXhpdCBpZiBhbHJlYWR5IGd1ZXNzZWRcbiAgICBpZiAodHVybiA9PT0gZmFsc2UpIHJldHVybiB0aGlzO1xuXG4gICAgLy8gQWRkIGd1ZXNzIHRvIGFycmF5XG4gICAgZ3Vlc3Nlcy5wdXNoKGNvb3Jkcyk7XG5cbiAgICAvLyBDaGVjayBkZWZlYXRcbiAgICBlbmVteS5kZWZlYXQgPSBlbmVteS5nYW1lYm9hcmQuY2hlY2tBbGxTdW5rKCk7XG4gIH07XG5cbiAgcmV0dXJuIHsgcGxheWVyTmFtZSwgZ3Vlc3NlcywgYXR0YWNrLCBnYW1lYm9hcmQsIGRlZmVhdCB9O1xufTtcblxuZXhwb3J0IHsgUGxheWVyIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgU2hpcCA9IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgLy8gQ3JlYXRlIHNoaXAgY29vcmRpbmF0ZSBhcnJheSA9IFtbW2Nvb3Jkc10sIGhpdF0sIFtbY29vcmRzXSwgaGl0XSwgW1tjb29yZHNdLCBoaXRdXVxuICBjb25zdCBsb2NhdGlvbiA9IGNvb3Jkcy5tYXAoKGNvb3JkKSA9PiBbY29vcmQsIGZhbHNlXSk7XG4gIGxldCBzdW5rID0gZmFsc2U7XG5cbiAgY29uc3QgaGl0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgdGhpcy5sb2NhdGlvbltpbmRleF1bMV0gPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5sb2NhdGlvbi5ldmVyeSgoY29vcmQpID0+IGNvb3JkWzFdID09PSB0cnVlKSkgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4geyBsb2NhdGlvbiwgc3VuaywgaGl0LCBpc1N1bmsgfTtcbn07XG5cbmV4cG9ydCB7IFNoaXAgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJFcXVhbENoZWNrIH0gZnJvbSBcIi4vYXJyRXF1YWxDaGVja1wiO1xuXG5jb25zdCBnZXRIaXRTaGlwSW5kZXggPSBmdW5jdGlvbiAoc2hpcCwgY29vcmRzKSB7XG4gIHJldHVybiBzaGlwLmxvY2F0aW9uLmZpbmRJbmRleCgoZWwpID0+IGFyckVxdWFsQ2hlY2soZWxbMF0sIGNvb3JkcykpO1xufTtcblxuY29uc3QgYXBwbHlIaXREYW1hZ2UgPSBmdW5jdGlvbiAoZ2FtZWJvYXJkLCBoaXRDaGVja0FyciwgY29vcmRzKSB7XG4gIGNvbnN0IHNoaXBzID0gW1wiY2FycmllclwiLCBcImJhdHRsZXNoaXBcIiwgXCJkZXN0cm95ZXJcIiwgXCJzdWJtYXJpbmVcIiwgXCJwYXRyb2xcIl07XG5cbiAgLy8gSWRlbnRpZnkgd2hpY2ggc2hpcCB3YXMgaGl0XG4gIGNvbnN0IGhpdFNoaXAgPSBzaGlwc1toaXRDaGVja0Fyci5pbmRleE9mKHRydWUpXTtcblxuICAvLyBJZGVudGlmeSBpbmRleCB3aGVyZSBzaGlwIHdhcyBoaXRcbiAgY29uc3QgaGl0U2hpcEluZGV4ID0gZ2V0SGl0U2hpcEluZGV4KGdhbWVib2FyZC5zaGlwc1toaXRTaGlwXSwgY29vcmRzKTtcblxuICAvLyBBcHBseSBkYW1hZ2Ugd2l0aCBtZXRob2RcbiAgZ2FtZWJvYXJkLnNoaXBzW2hpdFNoaXBdLmhpdChoaXRTaGlwSW5kZXgpO1xuXG4gIC8vIENoZWNrIGlmIHNoaXAgaXMgc3Vua1xuICBnYW1lYm9hcmQuc2hpcHNbaGl0U2hpcF0uaXNTdW5rKCk7XG5cbiAgcmV0dXJuIGdhbWVib2FyZDtcbn07XG5cbmV4cG9ydCB7IGFwcGx5SGl0RGFtYWdlIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgYXJyRXF1YWxDaGVjayA9IGZ1bmN0aW9uIChhcnIxLCBhcnIyKSB7XG4gIHJldHVybiBhcnIxLmV2ZXJ5KCh2YWwsIGluZGV4KSA9PiB2YWwgPT09IGFycjJbaW5kZXhdKTtcbn07XG5cbmNvbnN0IGlzQWxyZWFkeUd1ZXNzZWQgPSBmdW5jdGlvbiAobmVzdGVkQXJyLCBhcnIpIHtcbiAgY29uc3Qgb3V0cHV0ID0gW107XG4gIG5lc3RlZEFyci5mb3JFYWNoKChuZXN0KSA9PiB7XG4gICAgb3V0cHV0LnB1c2goYXJyRXF1YWxDaGVjayhuZXN0LCBhcnIpKTtcbiAgfSk7XG4gIHJldHVybiBvdXRwdXQuaW5jbHVkZXModHJ1ZSk7XG59O1xuXG5leHBvcnQgeyBhcnJFcXVhbENoZWNrLCBpc0FscmVhZHlHdWVzc2VkIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgY3JlYXRlUG90ZW50aWFsU2hpcCA9IGZ1bmN0aW9uIChsZW5ndGgsIHZlcnRBbGlnbiwgY29vcmRzKSB7XG4gIGNvbnN0IHBvdGVudGlhbFNoaXAgPSBbXTtcblxuICBpZiAodmVydEFsaWduID09PSBmYWxzZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHBvdGVudGlhbFNoaXAucHVzaChbY29vcmRzWzBdLCBjb29yZHNbMV0gKyBpXSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHBvdGVudGlhbFNoaXAucHVzaChbY29vcmRzWzBdICsgaSwgY29vcmRzWzFdXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBvdGVudGlhbFNoaXA7XG59O1xuXG5jb25zdCBnZXRQb3RlbnRpYWxDb29yZHMgPSBmdW5jdGlvbiAoZSkge1xuICByZXR1cm4gW1xuICAgIHBhcnNlSW50KGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0WzFdLnNsaWNlKC0xKSksXG4gICAgcGFyc2VJbnQoZS50YXJnZXQuY2xhc3NMaXN0WzFdLnNsaWNlKC0xKSlcbiAgXTtcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZVBvdGVudGlhbFNoaXAsIGdldFBvdGVudGlhbENvb3JkcyB9O1xuIiwiLyoqXG4gKiBBcnJheSBjaGVja3MgaWYgeCBhbmQgeSBjYW4gZml0IGluIG5lZ2F0aXZlIGFuZCBwb3NpdGl2ZSBkaXIuXG4gKiBJbiB0aGlzIG9yZGVyOiBbeC1wb3NpdGl2ZSwgeC1uZWdhdGl2ZSwgeS1wb3NpdGl2ZSwgeS1uZWdhdGl2ZV1cbiAqIFJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgaW5kZXhlcyBvZiB2YWxpZCBbMCwgMSwgMiwgM11cbiAqL1xuY29uc3QgZmluZFBvc3NpYmxlRGlycyA9IGZ1bmN0aW9uIChjb29yZCwgbGVuZ3RoKSB7XG4gIHJldHVybiBbXG4gICAgY29vcmRbMF0gKyAobGVuZ3RoIC0gMSkgPiA5LFxuICAgIGNvb3JkWzBdIC0gKGxlbmd0aCAtIDEpIDwgMCxcbiAgICBjb29yZFsxXSArIChsZW5ndGggLSAxKSA+IDksXG4gICAgY29vcmRbMV0gLSAobGVuZ3RoIC0gMSkgPCAwXG4gIF1cbiAgICAubWFwKCh4LCBpKSA9PiAoeCA9PT0gZmFsc2UgPyBpIDogXCIgXCIpKVxuICAgIC5maWx0ZXIoKHgpID0+IHggIT09IFwiIFwiKTtcbn07XG5cbi8vIEJ1aWxkIHBvc3NpYmxlIHNoaXBzIGJhc2VkIG9uIGNvb3JkcyB3L3IvdCBib2FyZCBlZGdlc1xuY29uc3QgYnVpbGRTaGlwQ29vcmRzID0gZnVuY3Rpb24gKGxlbmd0aCwgZGlyLCBjb29yZCkge1xuICBjb25zdCBzaGlwID0gW107XG5cbiAgaWYgKGRpciA9PT0gMClcbiAgICBmb3IgKGxldCBpID0gY29vcmRbMF07IGkgPCBjb29yZFswXSArIGxlbmd0aDsgaSsrKSBzaGlwLnB1c2goW2ksIGNvb3JkWzFdXSk7XG5cbiAgaWYgKGRpciA9PT0gMSlcbiAgICBmb3IgKGxldCBpID0gY29vcmRbMF07IGkgPiBjb29yZFswXSAtIGxlbmd0aDsgaS0tKSBzaGlwLnB1c2goW2ksIGNvb3JkWzFdXSk7XG5cbiAgaWYgKGRpciA9PT0gMilcbiAgICBmb3IgKGxldCBpID0gY29vcmRbMV07IGkgPCBjb29yZFsxXSArIGxlbmd0aDsgaSsrKSBzaGlwLnB1c2goW2Nvb3JkWzBdLCBpXSk7XG5cbiAgaWYgKGRpciA9PT0gMylcbiAgICBmb3IgKGxldCBpID0gY29vcmRbMV07IGkgPiBjb29yZFsxXSAtIGxlbmd0aDsgaS0tKSBzaGlwLnB1c2goW2Nvb3JkWzBdLCBpXSk7XG5cbiAgcmV0dXJuIHNoaXA7XG59O1xuXG5leHBvcnQgeyBidWlsZFNoaXBDb29yZHMsIGZpbmRQb3NzaWJsZURpcnMgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBET00gVkFSSUFCTEVTICovXG5jb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluX193cmFwcGVyXCIpO1xuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lbnVfX21vZGFsXCIpO1xuY29uc3QgbW9kYWxUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51X193aW5uZXJcIik7XG5jb25zdCBnYW1lYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5nYW1lYm9hcmRcIik7XG5jb25zdCBzcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zcXVhcmVcIik7XG5cbmNvbnN0IGhpZGVNb2RhbCA9IGZ1bmN0aW9uICgpIHtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZChcImhpZGRlbi0tb3BhY2l0eVwiKTtcbiAgc2V0VGltZW91dCgoKSA9PiBtb2RhbC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuLS16XCIpLCAxMDAwKTtcbn07XG5cbmNvbnN0IHJldmVhbE1vZGFsID0gZnVuY3Rpb24gKHdpbm5lcikge1xuICBtb2RhbFRleHQudGV4dENvbnRlbnQgPSBgJHt3aW5uZXJ9IHdpbnMhYDtcbiAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlbi0telwiKTtcbiAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlbi0tb3BhY2l0eVwiKTtcbn07XG5cbmNvbnN0IHJldmVhbEdhbWVib2FyZHMgPSBmdW5jdGlvbiAoKSB7XG4gIG1haW4uY2xhc3NMaXN0LmFkZChcInJldmVhbC0tb3BhY2l0eVwiKTtcbn07XG5cbmNvbnN0IGRpc3BsYXlCb2F0cyA9IGZ1bmN0aW9uIChwbGF5ZXIpIHtcbiAgLy8gTG9vcCBvdmVyIGVhY2ggc2hpcCBvZiBwbGF5ZXJcbiAgZm9yIChsZXQgc2hpcCBpbiBwbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzKSB7XG4gICAgLy8gR2V0IHNoaXAgY29vcmRpbmF0ZXNcbiAgICBwbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzW3NoaXBdLmxvY2F0aW9uLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBjb25zdCBnYW1lYm9hcmQgPVxuICAgICAgICBwbGF5ZXIucGxheWVyTmFtZSA9PT0gXCJjb21wdXRlclwiID8gZ2FtZWJvYXJkc1swXSA6IGdhbWVib2FyZHNbMV07XG4gICAgICBjb25zdCBzcXVhcmUgPSBnYW1lYm9hcmQuY2hpbGRyZW5bY29vcmRbMF1bMF1dLmNoaWxkcmVuW2Nvb3JkWzBdWzFdXTtcblxuICAgICAgLy8gQWRkIHNoaXAgYmFja2dyb3VuZCBjb2xvclxuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmUtLXNoaXBcIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChgc3F1YXJlLS0ke3NoaXB9YCk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmNvbnN0IGRpc3BsYXlCb2F0ID0gZnVuY3Rpb24gKGNvb3Jkcywgc2hpcE5hbWUpIHtcbiAgY29vcmRzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgY29uc3Qgc3F1YXJlID0gZ2FtZWJvYXJkc1sxXS5jaGlsZHJlbltjb29yZFswXV0uY2hpbGRyZW5bY29vcmRbMV1dO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic3F1YXJlLS1zaGlwXCIpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGBzcXVhcmUtLSR7c2hpcE5hbWV9YCk7XG4gIH0pO1xufTtcblxuY29uc3QgZGlzcGxheVBvc2l0aW9uU2VsZWN0aW9uID0gZnVuY3Rpb24gKGNvb3Jkcykge1xuICBjb29yZHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICBjb25zdCBzcXVhcmUgPSBnYW1lYm9hcmRzWzFdLmNoaWxkcmVuW2Nvb3JkWzBdXS5jaGlsZHJlbltjb29yZFsxXV07XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmUtLXNoaXBcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYHNxdWFyZS0tcG90ZW50aWFsYCk7XG4gIH0pO1xufTtcblxuY29uc3QgcmVtb3ZlUG9zaXRpb25TZWxlY3Rpb24gPSBmdW5jdGlvbiAoY29vcmRzKSB7XG4gIGNvb3Jkcy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgIGNvbnN0IHNxdWFyZSA9IGdhbWVib2FyZHNbMV0uY2hpbGRyZW5bY29vcmRbMF1dLmNoaWxkcmVuW2Nvb3JkWzFdXTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcInNxdWFyZS0tc2hpcFwiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShgc3F1YXJlLS1wb3RlbnRpYWxgKTtcbiAgfSk7XG59O1xuXG5jb25zdCB1cGRhdGVVSSA9IGZ1bmN0aW9uIChwbGF5ZXIpIHtcbiAgLy8gTG9vcCBvdmVyIGhpdHNcbiAgcGxheWVyLmdhbWVib2FyZC5oaXRzLmZvckVhY2goKGhpdCkgPT4ge1xuICAgIGNvbnN0IGdhbWVib2FyZCA9XG4gICAgICBwbGF5ZXIucGxheWVyTmFtZSA9PT0gXCJjb21wdXRlclwiID8gZ2FtZWJvYXJkc1swXSA6IGdhbWVib2FyZHNbMV07XG4gICAgY29uc3Qgcm93ID0gZ2FtZWJvYXJkLmNoaWxkcmVuW2hpdFswXV07XG4gICAgY29uc3Qgc3F1YXJlID0gcm93LmNoaWxkcmVuW2hpdFsxXV07XG5cbiAgICAvLyBBZGQgaGl0IGJhY2tncm91bmQgY29sb3JcbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChgc3F1YXJlLS1oaXRgKTtcbiAgfSk7XG5cbiAgLy8gTG9vcCBvdmVyIG1pc3Nlc1xuICBwbGF5ZXIuZ2FtZWJvYXJkLm1pc3Nlcy5mb3JFYWNoKChtaXNzKSA9PiB7XG4gICAgY29uc3QgZ2FtZWJvYXJkID1cbiAgICAgIHBsYXllci5wbGF5ZXJOYW1lID09PSBcImNvbXB1dGVyXCIgPyBnYW1lYm9hcmRzWzBdIDogZ2FtZWJvYXJkc1sxXTtcbiAgICBjb25zdCByb3cgPSBnYW1lYm9hcmQuY2hpbGRyZW5bbWlzc1swXV07XG4gICAgY29uc3Qgc3F1YXJlID0gcm93LmNoaWxkcmVuW21pc3NbMV1dO1xuXG4gICAgLy8gQWRkIGhpdCBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYHNxdWFyZS0tbWlzc2ApO1xuICB9KTtcbn07XG5cbmNvbnN0IHJlc2V0VUkgPSBmdW5jdGlvbiAoKSB7XG4gIHNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzcXVhcmUtLWhpdFwiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcInNxdWFyZS0tbWlzc1wiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcImFuaW1hdGUtZ3Vlc3NcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzcXVhcmUtLWNhcnJpZXJcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzcXVhcmUtLWJhdHRsZXNoaXBcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzcXVhcmUtLWRlc3Ryb3llclwiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcInNxdWFyZS0tc3VibWFyaW5lXCIpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKFwic3F1YXJlLS1wYXRyb2xcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzcXVhcmUtLXBvdGVudGlhbFwiKTtcbiAgfSk7XG59O1xuXG5jb25zdCByZXNldFNlbGVjdGlvblVJID0gZnVuY3Rpb24gKCkge1xuICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKFwic3F1YXJlLS1wb3RlbnRpYWxcIik7XG4gIH0pO1xufTtcblxuY29uc3QgYWRkR3Vlc3NBbmltYXRpb24gPSBmdW5jdGlvbiAoZW5lbXlQbGF5ZXIsIGNvb3Jkcykge1xuICBjb25zdCBnYW1lYm9hcmQgPVxuICAgIGVuZW15UGxheWVyLnBsYXllck5hbWUgPT09IFwicGxheWVyXCIgPyBnYW1lYm9hcmRzWzFdIDogZ2FtZWJvYXJkc1swXTtcbiAgY29uc3Qgcm93ID0gZ2FtZWJvYXJkLmNoaWxkcmVuW2Nvb3Jkc1swXV07XG4gIGNvbnN0IHNxdWFyZSA9IHJvdy5jaGlsZHJlbltjb29yZHNbMV1dO1xuXG4gIC8vIGFkZCBhbmltYXRpb24gY2xhc3NcbiAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJhbmltYXRlLWd1ZXNzXCIpO1xufTtcblxuY29uc3QgcmV2ZWFsQWRkU2hpcE1lbnUgPSBmdW5jdGlvbiAocGxhY2VtZW50TW9kYWwpIHtcbiAgcGxhY2VtZW50TW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlbi0telwiKTtcbiAgcGxhY2VtZW50TW9kYWwuY2xhc3NMaXN0LmFkZChcInJldmVhbC0tb3BhY2l0eVwiKTtcbn07XG5cbmNvbnN0IGhpZGVBZGRTaGlwTWVudSA9IGZ1bmN0aW9uIChwbGFjZW1lbnRNb2RhbCkge1xuICBwbGFjZW1lbnRNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwicmV2ZWFsLS1vcGFjaXR5XCIpO1xuICBzZXRUaW1lb3V0KCgpID0+IHBsYWNlbWVudE1vZGFsLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW4tLXpcIiksIDgwMCk7XG59O1xuXG5jb25zdCByZW1vdmVTZWxlY3Rpb25Gcm9tU2hpcCA9IGZ1bmN0aW9uIChzaGlwU2VsZWN0ZWQpIHtcbiAgc2hpcFNlbGVjdGVkLmNsYXNzTGlzdC5yZW1vdmUoXCJzaGlwLS1zZWxlY3RlZFwiKTtcbiAgc2hpcFNlbGVjdGVkLmNsYXNzTGlzdC5hZGQoXCJzaGlwLS1wbGFjZWRcIik7XG59O1xuXG5leHBvcnQge1xuICBnYW1lYm9hcmRzLFxuICByZXZlYWxBZGRTaGlwTWVudSxcbiAgZGlzcGxheUJvYXRzLFxuICBkaXNwbGF5Qm9hdCxcbiAgZGlzcGxheVBvc2l0aW9uU2VsZWN0aW9uLFxuICByZW1vdmVQb3NpdGlvblNlbGVjdGlvbixcbiAgdXBkYXRlVUksXG4gIHJlc2V0VUksXG4gIGFkZEd1ZXNzQW5pbWF0aW9uLFxuICByZXZlYWxHYW1lYm9hcmRzLFxuICBoaWRlTW9kYWwsXG4gIHJldmVhbE1vZGFsLFxuICByZXNldFNlbGVjdGlvblVJLFxuICByZW1vdmVTZWxlY3Rpb25Gcm9tU2hpcCxcbiAgaGlkZUFkZFNoaXBNZW51XG59O1xuIiwiaW1wb3J0IHsgYXJyRXF1YWxDaGVjaywgaXNBbHJlYWR5R3Vlc3NlZCB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcbmltcG9ydCB7IGdldFJhbmRvbUNvb3JkcyB9IGZyb20gXCIuL2dldFJhbmRvbUNvb3Jkc1wiO1xuXG4oXCJ1c2Ugc3RyaWN0XCIpO1xuXG5jb25zdCBnZXRBdHRhY2tDb29yZHNQbGF5ZXIgPSBmdW5jdGlvbiAoc3F1YXJlKSB7XG4gIGNvbnN0IHJvdyA9IHNxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdFsxXS5zbGljZSgtMSk7XG4gIGNvbnN0IGNvbCA9IHNxdWFyZS5jbGFzc0xpc3RbMV0uc2xpY2UoLTEpO1xuICByZXR1cm4gW3BhcnNlSW50KHJvdywgMTApLCBwYXJzZUludChjb2wsIDEwKV07XG59O1xuXG5jb25zdCBnZXRBdHRhY2tDb29yZHNDb21wID0gZnVuY3Rpb24gKGd1ZXNzZXMsIGVuZW15KSB7XG4gIGxldCBjb29yZCwgY2hlY2tQcmV2R3Vlc3NlcztcblxuICAvLyBJbXBsZW1lbnRpbmcgc21hcnRlciBBSVxuICBkbyB7XG4gICAgaWYgKGVuZW15LmdhbWVib2FyZC5oaXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gTm8gaGl0cyB5ZXQgOjogcmFuZG9tIGNvb3JkXG4gICAgICBjb29yZCA9IGdldFJhbmRvbUNvb3JkcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDcmVhdGUgYXJyYXkgb2YgcG90ZW50aWFsIGNob2ljZXMgYmFzZWQgb24gcHJldmlvdXMgaGl0c1xuICAgICAgY29uc3QgdmFsaWRDaG9pY2VzID0gW107XG4gICAgICAvLyBMb29wIG92ZXIgYXJyYXkgb2YgaGl0c1xuICAgICAgZW5lbXkuZ2FtZWJvYXJkLmhpdHMuZm9yRWFjaCgoaGl0KSA9PiB7XG4gICAgICAgIC8vIENyZWF0ZSBwb3NzaWJsZSBjaG9pY2VzIG9mIGhpdHMgYmFzc2VkIG9uIHByZXZpb3VzIGhpdCAoKzEgaW4gYWxsIGRpcmVjdGlvbnMpXG4gICAgICAgIGNvbnN0IHBvc3NpYmxlQ2hvaWNlcyA9IFtcbiAgICAgICAgICBbaGl0WzBdICsgMSwgaGl0WzFdXSxcbiAgICAgICAgICBbaGl0WzBdIC0gMSwgaGl0WzFdXSxcbiAgICAgICAgICBbaGl0WzBdLCBoaXRbMV0gKyAxXSxcbiAgICAgICAgICBbaGl0WzBdLCBoaXRbMV0gLSAxXVxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIEFkZCB2YWxpZCBjaG9pY2UgdG8gdmFsaWRDaG9pY2UgYXJyYXlcbiAgICAgICAgcG9zc2libGVDaG9pY2VzLmZvckVhY2goKGNob2ljZSkgPT4ge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGNob2ljZVswXSA+PSAwICYmXG4gICAgICAgICAgICBjaG9pY2VbMF0gPCAxMCAmJlxuICAgICAgICAgICAgY2hvaWNlWzFdID49IDAgJiZcbiAgICAgICAgICAgIGNob2ljZVsxXSA8IDEwICYmXG4gICAgICAgICAgICAhaXNBbHJlYWR5R3Vlc3NlZChndWVzc2VzLCBjaG9pY2UpXG4gICAgICAgICAgKVxuICAgICAgICAgICAgdmFsaWRDaG9pY2VzLnB1c2goY2hvaWNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHZhbGlkQ2hvaWNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29vcmQgPSBnZXRSYW5kb21Db29yZHMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvb3JkID0gdmFsaWRDaG9pY2VzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHZhbGlkQ2hvaWNlcy5sZW5ndGgpXTtcbiAgICAgIH1cbiAgICB9XG4gIH0gd2hpbGUgKGlzQWxyZWFkeUd1ZXNzZWQoZ3Vlc3NlcywgY29vcmQpICYmIGd1ZXNzZXMubGVuZ3RoIDwgMTAwKTtcblxuICBpZiAoZ3Vlc3Nlcy5sZW5ndGggPiA5OSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk5vIG1vcmUgZ3Vlc3NlcyBhdmFpbGFibGVcIik7XG4gIH1cbiAgcmV0dXJuIGNvb3JkO1xufTtcblxuZXhwb3J0IHsgZ2V0QXR0YWNrQ29vcmRzUGxheWVyLCBnZXRBdHRhY2tDb29yZHNDb21wIH07XG4iLCJpbXBvcnQgeyBtYWtlUmFuZG9tU2hpcCB9IGZyb20gXCIuL21ha2VTaGlwXCI7XG5cbihcInVzZSBzdHJpY3RcIik7XG5cbmNvbnN0IGdldENvbXBTaGlwQ29vcmRzID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBhbGxTaGlwcyA9IFtdO1xuXG4gIC8vIENyZWF0ZSBjYXJyaWVyXG4gIGFsbFNoaXBzLnB1c2gobWFrZVJhbmRvbVNoaXAoYWxsU2hpcHMsIDUpKTtcblxuICAvLyBDcmVhdGUgYmF0dGxlc2hpcFxuICBhbGxTaGlwcy5wdXNoKG1ha2VSYW5kb21TaGlwKGFsbFNoaXBzLCA0KSk7XG5cbiAgLy8gQ3JlYXRlIGRlc3Ryb3llclxuICBhbGxTaGlwcy5wdXNoKG1ha2VSYW5kb21TaGlwKGFsbFNoaXBzLCAzKSk7XG5cbiAgLy8gQ3JlYXRlIHN1Ym1hcmluZVxuICBhbGxTaGlwcy5wdXNoKG1ha2VSYW5kb21TaGlwKGFsbFNoaXBzLCAzKSk7XG5cbiAgLy8gQ3JlYXRlIHBhdHJvbFxuICBhbGxTaGlwcy5wdXNoKG1ha2VSYW5kb21TaGlwKGFsbFNoaXBzLCAyKSk7XG5cbiAgcmV0dXJuIGFsbFNoaXBzO1xufTtcblxuZXhwb3J0IHsgZ2V0Q29tcFNoaXBDb29yZHMgfTtcblxuLy8gWzBdIGNhcnJpZXIsIFsxXSBiYXR0bGVzaGlwLCBbMl0gZGVzdHJveWVyLCBbM10gc3VibWFyaW5lLCBbNF0gcGF0cm9sXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgZ2V0UmFuZG9tQ29vcmRzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXTtcbn07XG5cbmV4cG9ydCB7IGdldFJhbmRvbUNvb3JkcyB9O1xuIiwiLy8gQ2hlY2sgaWYgYSBndWVzc2VkIGNvb3JkaW5hdGUgaGl0cyBhIHNoaXBcblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJFcXVhbENoZWNrIH0gZnJvbSBcIi4vYXJyRXF1YWxDaGVja1wiO1xuXG5jb25zdCBoaXRDaGVjayA9IGZ1bmN0aW9uIChnYW1lYm9hcmQsIGNvb3Jkcykge1xuICAvLyBDcmVhdGUgYXJyYXkgZm9yIHNoaXAgaGl0IGNoZWNrXG4gIGNvbnN0IG91dHB1dCA9IFtdO1xuXG4gIC8vIExvb3Agb3ZlciBzaGlwcyB0byBjaGVjayBpZiBjb29yZHMgaXMgYSBoaXQgZm9yIGFueVxuICBmb3IgKGxldCBzaGlwIGluIGdhbWVib2FyZC5zaGlwcykge1xuICAgIG91dHB1dC5wdXNoKFxuICAgICAgZ2FtZWJvYXJkLnNoaXBzW3NoaXBdLmxvY2F0aW9uXG4gICAgICAgIC5tYXAoKGNvb3JkKSA9PiBhcnJFcXVhbENoZWNrKGNvb3JkWzBdLCBjb29yZHMpKVxuICAgICAgICAuaW5jbHVkZXModHJ1ZSlcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn07XG5cbmV4cG9ydCB7IGhpdENoZWNrIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgaXNBbHJlYWR5R3Vlc3NlZCB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcblxuY29uc3QgaXNWYWxpZE1vdmUgPSBmdW5jdGlvbiAobmV3U2hpcCwgcGxheWVyQ29vcmRzKSB7XG4gIGNvbnN0IGNoZWNrTmV3U2hpcCA9IG5ld1NoaXAubWFwKChjb29yZCkgPT5cbiAgICBpc0FscmVhZHlHdWVzc2VkKHBsYXllckNvb3Jkcy5mbGF0KCksIGNvb3JkKVxuICApO1xuXG4gIGNvbnN0IGNoZWNrcyA9IFtcbiAgICBjaGVja05ld1NoaXAuZXZlcnkoKHgpID0+IHggPT09IGZhbHNlKSxcbiAgICBuZXdTaGlwLmZsYXQoKS5ldmVyeSgoeCkgPT4geCA+PSAwICYmIHggPCAxMClcbiAgXTtcblxuICByZXR1cm4gIWNoZWNrcy5pbmNsdWRlcyhmYWxzZSk7XG59O1xuXG5leHBvcnQgeyBpc1ZhbGlkTW92ZSB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGdldFJhbmRvbUNvb3JkcyB9IGZyb20gXCIuL2dldFJhbmRvbUNvb3Jkc1wiO1xuaW1wb3J0IHsgYXJyRXF1YWxDaGVjayB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcbmltcG9ydCB7IGJ1aWxkU2hpcENvb3JkcywgZmluZFBvc3NpYmxlRGlycyB9IGZyb20gXCIuL2NyZWF0ZVJhbmRvbVNoaXBzXCI7XG5cbmNvbnN0IG1ha2VSYW5kb21TaGlwID0gZnVuY3Rpb24gKGFsbFNoaXBzLCBsZW5ndGgpIHtcbiAgY29uc3QgYWxsU2hpcHNDb29yZHMgPSBhbGxTaGlwcy5mbGF0KCk7XG5cbiAgLy8gR2V0IGZpcnN0IGNvb3JkaW5hdGVcbiAgbGV0IGNvb3JkO1xuICBkbyB7XG4gICAgY29vcmQgPSBnZXRSYW5kb21Db29yZHMoKTtcbiAgfSB3aGlsZSAoYWxsU2hpcHNDb29yZHMubWFwKChjKSA9PiBhcnJFcXVhbENoZWNrKGMsIGNvb3JkKSkuaW5jbHVkZXModHJ1ZSkpO1xuXG4gIC8vIEdldCBwb3NzaWJsZSBkaXJlY3Rpb25zIGFnYWluc3QgZWRnZSBvZiBib2FyZCBmcm9tIGNvb3JkLlxuICBjb25zdCBwb3NzaWJsZURpcnMgPSBmaW5kUG9zc2libGVEaXJzKGNvb3JkLCBsZW5ndGgpO1xuXG4gIC8vIENyZWF0ZSBhcnJheSBvZiBhbGwgcG9zc2libGUgc2hpcHNcbiAgY29uc3QgcG9zc2libGVTaGlwcyA9IHBvc3NpYmxlRGlycy5tYXAoKGRpcikgPT5cbiAgICBidWlsZFNoaXBDb29yZHMobGVuZ3RoLCBkaXIsIGNvb3JkKVxuICApO1xuXG4gIC8vIENoZWNrIGVhY2ggc2hpcCBmb3IgY29uZmxpY3Qgd2l0aCBwcmV2aW91cyBzaGlwIHBsYWNlbWVudFxuICBjb25zdCBzaGlwQ2hvaWNlc0ZpbmFsID0gW107XG5cbiAgLy8gTG9vcCBvdmVyIHBvc3NpYmxlIHNoaXBzXG4gIGZvciAobGV0IHNoaXAgb2YgcG9zc2libGVTaGlwcykge1xuICAgIGNvbnN0IGNvb3JkQ2hlY2tBcnIgPSBbXTtcblxuICAgIC8vIExvb3Agb3ZlciBjb29yZGluYXRlcyBvZiBlYWNoIHBvc3NpYmxlIHNoaXBcbiAgICBmb3IgKGxldCBzaGlwQ29vcmQgb2Ygc2hpcCkge1xuICAgICAgbGV0IG1hdGNoID0gMDtcblxuICAgICAgLy8gTG9vcCBvdmVyIHByZXZpb3VzIHNoaXBzOyBpZiBtYXRjaCwgbWFyayB0aGF0XG4gICAgICBhbGxTaGlwc0Nvb3Jkcy5mb3JFYWNoKChhbGxTaGlwc0Nvb3JkKSA9PiB7XG4gICAgICAgIGlmIChhcnJFcXVhbENoZWNrKHNoaXBDb29yZCwgYWxsU2hpcHNDb29yZCkpIG1hdGNoKys7XG4gICAgICB9KTtcblxuICAgICAgLy8gSWYgYSBtYXRjaCBpcyBmb3VuZCwgYWRkIHRydWVcbiAgICAgIGNvb3JkQ2hlY2tBcnIucHVzaChtYXRjaCA9PT0gMCA/IGZhbHNlIDogdHJ1ZSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHZhbGlkIHNoaXBzIHRvIGNob2ljZSBhcnJheVxuICAgIGlmICghY29vcmRDaGVja0Fyci5pbmNsdWRlcyh0cnVlKSkgc2hpcENob2ljZXNGaW5hbC5wdXNoKHNoaXApO1xuICB9XG5cbiAgLy8gUmFuZG9tbHkgc2VsZWN0IGZyb20gcmVtYWluaW5nIG9wdGlvbnNcbiAgcmV0dXJuIHNoaXBDaG9pY2VzRmluYWxbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc2hpcENob2ljZXNGaW5hbC5sZW5ndGgpXTtcbn07XG5cbmV4cG9ydCB7IG1ha2VSYW5kb21TaGlwIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vUGxheWVyXCI7XG5pbXBvcnQgeyBnZXRDb21wU2hpcENvb3JkcyB9IGZyb20gXCIuL2dldENvbXBTaGlwQ29vcmRzXCI7XG5cbi8vKiAjIyMjIyMjIyMjIyBOZXcgR2FtZSAjIyMjIyMjIyMjIyMjIyNcbmNvbnN0IG5ld0dhbWUgPSBmdW5jdGlvbiAoY2hvc2VuQ29vcmRzKSB7XG4gIC8vIFBsYXllciBjaG9vc2VzIHNoaXAgY29vcmRpbmF0ZXNcbiAgY29uc3QgcGxheWVyID0gUGxheWVyKFwicGxheWVyXCIsIGNob3NlbkNvb3Jkcyk7XG5cbiAgLy8gQ29tcHV0ZXIgcmFuZG9tbHkgY2hvb3NlcyBzaGlwIGNvb3JkaW5hdGVzXG4gIGNvbnN0IGNvbXB1dGVyID0gUGxheWVyKFwiY29tcHV0ZXJcIiwgZ2V0Q29tcFNoaXBDb29yZHMoKSk7XG5cbiAgcmV0dXJuIFtwbGF5ZXIsIGNvbXB1dGVyXTtcbn07XG5cbmV4cG9ydCB7IG5ld0dhbWUgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJFcXVhbENoZWNrIH0gZnJvbSBcIi4vYXJyRXF1YWxDaGVja1wiO1xuXG5jb25zdCBwcmV2R3Vlc3NDaGVjayA9IChnYW1lYm9hcmQsIGNvb3JkcykgPT4ge1xuICBjb25zdCBvdXRwdXQgPSBbXTtcblxuICBvdXRwdXQucHVzaChcbiAgICBnYW1lYm9hcmQubWlzc2VzLm1hcCgoY29vcmQpID0+IGFyckVxdWFsQ2hlY2soY29vcmQsIGNvb3JkcykpLmluY2x1ZGVzKHRydWUpXG4gICk7XG5cbiAgb3V0cHV0LnB1c2goXG4gICAgZ2FtZWJvYXJkLmhpdHMubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZCwgY29vcmRzKSkuaW5jbHVkZXModHJ1ZSlcbiAgKTtcblxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0IHsgcHJldkd1ZXNzQ2hlY2sgfTtcblxuLy8gY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCB7XG4gIGdhbWVib2FyZHMsXG4gIGRpc3BsYXlCb2F0cyxcbiAgZGlzcGxheUJvYXQsXG4gIGRpc3BsYXlQb3NpdGlvblNlbGVjdGlvbixcbiAgcmVzZXRTZWxlY3Rpb25VSSxcbiAgdXBkYXRlVUksXG4gIHJlc2V0VUksXG4gIGFkZEd1ZXNzQW5pbWF0aW9uLFxuICByZXZlYWxHYW1lYm9hcmRzLFxuICBoaWRlTW9kYWwsXG4gIHJldmVhbE1vZGFsLFxuICByZXZlYWxBZGRTaGlwTWVudSxcbiAgcmVtb3ZlU2VsZWN0aW9uRnJvbVNoaXAsXG4gIGhpZGVBZGRTaGlwTWVudVxufSBmcm9tIFwiLi9kb21JbnRlcmFjdGlvblwiO1xuaW1wb3J0IHsgbmV3R2FtZSB9IGZyb20gXCIuL25ld0dhbWVcIjtcbmltcG9ydCB7IGlzVmFsaWRNb3ZlIH0gZnJvbSBcIi4vaXNWYWxpZE1vdmVcIjtcbmltcG9ydCB7IGNyZWF0ZVBvdGVudGlhbFNoaXAsIGdldFBvdGVudGlhbENvb3JkcyB9IGZyb20gXCIuL2NyZWF0ZVBvdGVudGlhbFNoaXBcIjtcblxuLy8qICMjIyMjIyMjIyMjIyMgRE9NIFZhcmlhYmxlcyAjIyMjIyMjIyMjIyMjIyMjIyNcbmNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkc1swXTtcbmNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNxdWFyZVwiKTtcbmNvbnN0IG5ld0dhbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1nYW1lXCIpO1xuY29uc3QgcGxhY2VtZW50TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYWNlbWVudF9fbW9kYWxcIik7XG5jb25zdCBidG5Sb3RhdGVTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzcGluLXNoaXBcIik7XG5jb25zdCBiZWdpbkdhbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JlZ2luLWdhbWVcIik7XG5cbi8vKiAjIyMjIyMjIyMjIyMjIEdhbWVmbG93ICMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gR2FtZSBWYXJpYWJsZXNcbmNvbnN0IHNoaXBPcmRlciA9IFtcImNhcnJpZXJcIiwgXCJiYXR0bGVzaGlwXCIsIFwiZGVzdHJveWVyXCIsIFwic3VibWFyaW5lXCIsIFwicGF0cm9sXCJdO1xuY29uc3Qgc2hpcHNIZWFsdGggPSBbNSwgNCwgMywgMywgMl07XG5cbmxldCBwbGF5ZXI7XG5sZXQgY29tcHV0ZXI7XG5sZXQgcG90ZW50aWFsQ29vcmRzO1xubGV0IHBsYXllckNvb3JkcztcblxubGV0IHZlcnRBbGlnbiA9IGZhbHNlO1xuXG4vLyBSb3RhdGUgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCBzaGlwIGFsaWdubWVudCBvbiBzZWxlY3Rpb24gc2NyZWVuXG5idG5Sb3RhdGVTaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHZlcnRBbGlnbiA9ICF2ZXJ0QWxpZ247XG59KTtcblxuLy8gU3RhcnQgTmV3IEdhbWVcbm5ld0dhbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgLy8/IFJlc2V0IHZpc3VhbHNcbiAgcmV2ZWFsR2FtZWJvYXJkcygpO1xuICBoaWRlTW9kYWwoKTtcblxuICByZXNldFVJKCk7XG5cbiAgLy8gUmV2ZWFsIGFkZCBzaGlwIG1lbnVcbiAgcmV2ZWFsQWRkU2hpcE1lbnUocGxhY2VtZW50TW9kYWwpO1xuXG4gIC8vPyBQbGF5ZXIgQ2hvb3NlIHNoaXAgcGxhY2VtZW50XG4gIC8vIFNldCBuZXcgUGxheWVyQ29vcmRzIGFycmF5XG4gIHBsYXllckNvb3JkcyA9IFtdO1xuXG4gIHNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgLy8gTU9VU0UgRU5URVIgLS0gSG92ZXIgb3ZlciB0byBzZWUgcG90ZW50aWFsIHNoaXAgcGxhY2VtZW50XG4gICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIChlKSA9PiB7XG4gICAgICAvLyBHZXQgY29vcmRpbmF0ZXNcbiAgICAgIGNvbnN0IGNvb3JkcyA9IGdldFBvdGVudGlhbENvb3JkcyhlKTtcblxuICAgICAgcG90ZW50aWFsQ29vcmRzID0gY3JlYXRlUG90ZW50aWFsU2hpcChcbiAgICAgICAgc2hpcHNIZWFsdGhbcGxheWVyQ29vcmRzLmxlbmd0aF0sXG4gICAgICAgIHZlcnRBbGlnbixcbiAgICAgICAgY29vcmRzXG4gICAgICApO1xuXG4gICAgICBpZiAoIWlzVmFsaWRNb3ZlKHBvdGVudGlhbENvb3JkcywgcGxheWVyQ29vcmRzKSkge1xuICAgICAgICByZXNldFNlbGVjdGlvblVJKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZGlzcGxheVBvc2l0aW9uU2VsZWN0aW9uKHBvdGVudGlhbENvb3Jkcyk7XG4gICAgfSk7XG5cbiAgICAvLyBNT1VTRSBDTElDSyAtLSBTdG9yZSBwb3RlbnRpYWwgc2hpcFxuICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgLy8gRXhpdCBpZiBhbGwgc2hpcHMgY2hvc2VuXG4gICAgICBpZiAocGxheWVyQ29vcmRzLmxlbmd0aCA9PT0gNSkgcmV0dXJuO1xuXG4gICAgICBpZiAoIWlzVmFsaWRNb3ZlKHBvdGVudGlhbENvb3JkcywgcGxheWVyQ29vcmRzKSkgcmV0dXJuO1xuXG4gICAgICAvLyBSZW1vdmUgcmVkIGJhY2tncm91bmQ7IGFkZCBncmF5IHRvIGNob3NlbiBzaGlwXG4gICAgICBjb25zdCBzaGlwU2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgI3NoaXAtc2VsZWN0LSR7cGxheWVyQ29vcmRzLmxlbmd0aH1gXG4gICAgICApO1xuXG4gICAgICByZW1vdmVTZWxlY3Rpb25Gcm9tU2hpcChzaGlwU2VsZWN0ZWQpO1xuXG4gICAgICAvLyBEaXNwbGF5IGJvYXQgb24gc2NyZWVuXG4gICAgICBkaXNwbGF5Qm9hdChwb3RlbnRpYWxDb29yZHMsIHNoaXBPcmRlcltwbGF5ZXJDb29yZHMubGVuZ3RoXSk7XG5cbiAgICAgIC8vIEFkZCBjaG9zZW4gc2hpcCB0byBhcnJheVxuICAgICAgcGxheWVyQ29vcmRzLnB1c2gocG90ZW50aWFsQ29vcmRzKTtcblxuICAgICAgLy8gRXhpdCBpZiBhbGwgc2hpcHMgY2hvc2VuXG4gICAgICBpZiAocGxheWVyQ29vcmRzLmxlbmd0aCA9PT0gNSkgcmV0dXJuO1xuXG4gICAgICAvLyBBZGQgcmVkIHNlbGVjdG9yIHRvIG5leHQgc2hpcFxuICAgICAgZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYCNzaGlwLXNlbGVjdC0ke3BsYXllckNvb3Jkcy5sZW5ndGh9YClcbiAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJzaGlwLS1zZWxlY3RlZFwiKTtcbiAgICB9KTtcblxuICAgIC8vIE1PVVNFIExFQVZFIC0tIEVyYXNlIHByZXZpb3VzIHBvdGVudGlhbCBzaGlwIHBsYWNlbWVudCBvbiBob3ZlciBleGl0XG4gICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIChlKSA9PiB7XG4gICAgICByZXNldFNlbGVjdGlvblVJKCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbmJlZ2luR2FtZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBpZiAocGxheWVyQ29vcmRzLmxlbmd0aCAhPT0gNSkgcmV0dXJuO1xuXG4gIGhpZGVBZGRTaGlwTWVudShwbGFjZW1lbnRNb2RhbCk7XG4gIGNvbnN0IGdhbWUgPSBuZXdHYW1lKHBsYXllckNvb3Jkcyk7XG5cbiAgcGxheWVyID0gZ2FtZVswXTtcbiAgY29tcHV0ZXIgPSBnYW1lWzFdO1xuXG4gIHJlc2V0VUkoKTtcbiAgZGlzcGxheUJvYXRzKHBsYXllcik7XG59KTtcblxuLy8gVHVybiBHYW1lcGxheVxuYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IHNxdWFyZSA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuc3F1YXJlXCIpO1xuICBpZiAoIXNxdWFyZSkgcmV0dXJuO1xuXG4gIC8vIERpc2FsbG93IGlmIGdhbWVvdmVyXG4gIGlmIChwbGF5ZXIuZGVmZWF0ID09PSB0cnVlIHx8IGNvbXB1dGVyLmRlZmVhdCA9PT0gdHJ1ZSkgcmV0dXJuO1xuXG4gIC8vIERpc2FsbG93IGFscmVhZHkgY2xpY2tlZCBzcXVhcmVzXG4gIGlmIChzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwic3F1YXJlLS1oaXRcIikpIHJldHVybjtcbiAgaWYgKHNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoXCJzcXVhcmUtLW1pc3NcIikpIHJldHVybjtcblxuICAvLyBQbGF5ZXIgdHVyblxuICBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyLCBzcXVhcmUpO1xuICB1cGRhdGVVSShjb21wdXRlcik7XG5cbiAgLy8gIENoZWNrIGZvciBkZWZlYXRcbiAgaWYgKGNvbXB1dGVyLmRlZmVhdCA9PT0gdHJ1ZSkge1xuICAgIHJldmVhbE1vZGFsKFwiUGxheWVyXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIENvbXB1dGVyIHR1cm5cbiAgY29tcHV0ZXIuYXR0YWNrKHBsYXllcik7XG4gIHVwZGF0ZVVJKHBsYXllcik7XG4gIGFkZEd1ZXNzQW5pbWF0aW9uKHBsYXllciwgY29tcHV0ZXIuZ3Vlc3Nlcy5zbGljZSgtMSlbMF0pO1xuXG4gIC8vIENoZWNrIGZvciBkZWZlYXRcbiAgaWYgKHBsYXllci5kZWZlYXQgPT09IHRydWUpIHtcbiAgICByZXZlYWxNb2RhbChcIkNvbXB1dGVyXCIpO1xuICAgIHJldHVybjtcbiAgfVxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=