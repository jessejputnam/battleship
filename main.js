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
/* harmony export */   "resetShipSelection": () => (/* binding */ resetShipSelection),
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
const selectionMenuShips = document.querySelectorAll(".ship");

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

const resetShipSelection = function () {
  selectionMenuShips.forEach((ship) => {
    ship.classList.remove("ship--placed");
    if (ship.classList.contains("ship--carrier"))
      ship.classList.add("ship--selected");
  });
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

  // Reset add ship menu if next game
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.resetShipSelection)();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsNkRBQVk7QUFDZCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFLHlEQUFROztBQUVWO0FBQ0E7QUFDQSxJQUFJLDREQUFXO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRSx5REFBUTtBQUNWLEVBQUUsa0VBQWlCOztBQUVuQjtBQUNBO0FBQ0EsSUFBSSw0REFBVztBQUNmO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwbHlIaXREYW1hZ2UuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcnJFcXVhbENoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY3JlYXRlUG90ZW50aWFsU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NyZWF0ZVJhbmRvbVNoaXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tSW50ZXJhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nZXRBdHRhY2tDb29yZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nZXRDb21wU2hpcENvb3Jkcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dldFJhbmRvbUNvb3Jkcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2hpdENoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaXNWYWxpZE1vdmUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tYWtlU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL25ld0dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wcmV2R3Vlc3NDaGVjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBHYW1lYm9hcmRcblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vU2hpcFwiO1xuaW1wb3J0IHsgcHJldkd1ZXNzQ2hlY2sgfSBmcm9tIFwiLi9wcmV2R3Vlc3NDaGVja1wiO1xuaW1wb3J0IHsgaGl0Q2hlY2sgfSBmcm9tIFwiLi9oaXRDaGVja1wiO1xuaW1wb3J0IHsgYXBwbHlIaXREYW1hZ2UgfSBmcm9tIFwiLi9hcHBseUhpdERhbWFnZVwiO1xuXG5jb25zdCBHYW1lYm9hcmQgPSBmdW5jdGlvbiAoY29vcmRzMCwgY29vcmRzMSwgY29vcmRzMiwgY29vcmRzMywgY29vcmRzNCkge1xuICAvLyBTaGlwc1xuICBjb25zdCBzaGlwcyA9IHtcbiAgICBjYXJyaWVyOiBTaGlwKGNvb3JkczApLFxuICAgIGJhdHRsZXNoaXA6IFNoaXAoY29vcmRzMSksXG4gICAgZGVzdHJveWVyOiBTaGlwKGNvb3JkczIpLFxuICAgIHN1Ym1hcmluZTogU2hpcChjb29yZHMzKSxcbiAgICBwYXRyb2w6IFNoaXAoY29vcmRzNClcbiAgfTtcblxuICAvLyBFbmVteSBHdWVzcyBBcnJheXNcbiAgY29uc3QgbWlzc2VzID0gW107XG4gIGNvbnN0IGhpdHMgPSBbXTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgIC8vIENoZWNrIGlmIGFscmVhZHkgZ3Vlc3NlZFxuICAgIGlmIChwcmV2R3Vlc3NDaGVjayh0aGlzLCBjb29yZHMpLmluY2x1ZGVzKHRydWUpKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBDaGVjayBpZiBndWVzcyBpcyBhIGhpdCBvbiBhIHNoaXBcbiAgICBjb25zdCBoaXRDaGVja0FyciA9IGhpdENoZWNrKHRoaXMsIGNvb3Jkcyk7XG5cbiAgICAvLyBJZiBub25lIHNob3cgaGl0LCBwdXQgaW50byBtaXNzZXMgYXJyYXlcbiAgICBpZiAoaGl0Q2hlY2tBcnIuZXZlcnkoKHgpID0+IHggPT09IGZhbHNlKSkge1xuICAgICAgbWlzc2VzLnB1c2goY29vcmRzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIElmIGd1ZXNzIHNob3dzIGhpdFxuICAgIGlmIChoaXRDaGVja0Fyci5zb21lKCh4KSA9PiB4ID09PSB0cnVlKSkge1xuICAgICAgaGl0cy5wdXNoKGNvb3Jkcyk7XG4gICAgICByZXR1cm4gYXBwbHlIaXREYW1hZ2UodGhpcywgaGl0Q2hlY2tBcnIsIGNvb3Jkcyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNoZWNrQWxsU3VuayA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBDcmVhdGUgYXJyYXkgb2YgYWxsIHN1bmsgY2hlY2tzXG4gICAgY29uc3Qgc3Vua0FyciA9IFtdO1xuXG4gICAgLy8gUG9wdWxhdGUgdGhlIGFycmF5IHdpdGggc3VuayBjaGVja3NcbiAgICBmb3IgKGxldCBzaGlwIGluIHRoaXMuc2hpcHMpIHtcbiAgICAgIHN1bmtBcnIucHVzaChzaGlwc1tzaGlwXS5zdW5rKTtcbiAgICB9XG5cbiAgICAvLyBFdmFsdWF0ZSB0aGUgYXJyYXkgZm9yIGFsbCBzdW5rIGNoZWNrcyA9PT0gdHJ1ZVxuICAgIHJldHVybiBzdW5rQXJyLmV2ZXJ5KChlbCkgPT4gZWwgPT09IHRydWUpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgc2hpcHMsXG4gICAgbWlzc2VzLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgaGl0cyxcbiAgICBjaGVja0FsbFN1bmtcbiAgfTtcbn07XG5cbmV4cG9ydCB7IEdhbWVib2FyZCB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuaW1wb3J0IHsgZ2V0QXR0YWNrQ29vcmRzQ29tcCwgZ2V0QXR0YWNrQ29vcmRzUGxheWVyIH0gZnJvbSBcIi4vZ2V0QXR0YWNrQ29vcmRzXCI7XG5cbmNvbnN0IFBsYXllciA9IGZ1bmN0aW9uIChwbGF5ZXJOYW1lLCBjb29yZHMpIHtcbiAgY29uc3QgZ2FtZWJvYXJkID0gR2FtZWJvYXJkKC4uLmNvb3Jkcyk7XG4gIGNvbnN0IGd1ZXNzZXMgPSBbXTtcbiAgbGV0IGRlZmVhdCA9IGZhbHNlO1xuXG4gIGNvbnN0IGF0dGFjayA9IGZ1bmN0aW9uIChlbmVteSwgc3F1YXJlKSB7XG4gICAgY29uc3QgY29vcmRzID1cbiAgICAgIGVuZW15LnBsYXllck5hbWUgPT09IFwicGxheWVyXCJcbiAgICAgICAgPyBnZXRBdHRhY2tDb29yZHNDb21wKGd1ZXNzZXMsIGVuZW15KVxuICAgICAgICA6IGdldEF0dGFja0Nvb3Jkc1BsYXllcihzcXVhcmUpO1xuXG4gICAgY29uc3QgdHVybiA9IGVuZW15LmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3Jkcyk7XG5cbiAgICAvLyBFeGl0IGlmIGFscmVhZHkgZ3Vlc3NlZFxuICAgIGlmICh0dXJuID09PSBmYWxzZSkgcmV0dXJuIHRoaXM7XG5cbiAgICAvLyBBZGQgZ3Vlc3MgdG8gYXJyYXlcbiAgICBndWVzc2VzLnB1c2goY29vcmRzKTtcblxuICAgIC8vIENoZWNrIGRlZmVhdFxuICAgIGVuZW15LmRlZmVhdCA9IGVuZW15LmdhbWVib2FyZC5jaGVja0FsbFN1bmsoKTtcbiAgfTtcblxuICByZXR1cm4geyBwbGF5ZXJOYW1lLCBndWVzc2VzLCBhdHRhY2ssIGdhbWVib2FyZCwgZGVmZWF0IH07XG59O1xuXG5leHBvcnQgeyBQbGF5ZXIgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBTaGlwID0gZnVuY3Rpb24gKGNvb3Jkcykge1xuICAvLyBDcmVhdGUgc2hpcCBjb29yZGluYXRlIGFycmF5ID0gW1tbY29vcmRzXSwgaGl0XSwgW1tjb29yZHNdLCBoaXRdLCBbW2Nvb3Jkc10sIGhpdF1dXG4gIGNvbnN0IGxvY2F0aW9uID0gY29vcmRzLm1hcCgoY29vcmQpID0+IFtjb29yZCwgZmFsc2VdKTtcbiAgbGV0IHN1bmsgPSBmYWxzZTtcblxuICBjb25zdCBoaXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICB0aGlzLmxvY2F0aW9uW2luZGV4XVsxXSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmxvY2F0aW9uLmV2ZXJ5KChjb29yZCkgPT4gY29vcmRbMV0gPT09IHRydWUpKSB0aGlzLnN1bmsgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiB7IGxvY2F0aW9uLCBzdW5rLCBoaXQsIGlzU3VuayB9O1xufTtcblxuZXhwb3J0IHsgU2hpcCB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGFyckVxdWFsQ2hlY2sgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5cbmNvbnN0IGdldEhpdFNoaXBJbmRleCA9IGZ1bmN0aW9uIChzaGlwLCBjb29yZHMpIHtcbiAgcmV0dXJuIHNoaXAubG9jYXRpb24uZmluZEluZGV4KChlbCkgPT4gYXJyRXF1YWxDaGVjayhlbFswXSwgY29vcmRzKSk7XG59O1xuXG5jb25zdCBhcHBseUhpdERhbWFnZSA9IGZ1bmN0aW9uIChnYW1lYm9hcmQsIGhpdENoZWNrQXJyLCBjb29yZHMpIHtcbiAgY29uc3Qgc2hpcHMgPSBbXCJjYXJyaWVyXCIsIFwiYmF0dGxlc2hpcFwiLCBcImRlc3Ryb3llclwiLCBcInN1Ym1hcmluZVwiLCBcInBhdHJvbFwiXTtcblxuICAvLyBJZGVudGlmeSB3aGljaCBzaGlwIHdhcyBoaXRcbiAgY29uc3QgaGl0U2hpcCA9IHNoaXBzW2hpdENoZWNrQXJyLmluZGV4T2YodHJ1ZSldO1xuXG4gIC8vIElkZW50aWZ5IGluZGV4IHdoZXJlIHNoaXAgd2FzIGhpdFxuICBjb25zdCBoaXRTaGlwSW5kZXggPSBnZXRIaXRTaGlwSW5kZXgoZ2FtZWJvYXJkLnNoaXBzW2hpdFNoaXBdLCBjb29yZHMpO1xuXG4gIC8vIEFwcGx5IGRhbWFnZSB3aXRoIG1ldGhvZFxuICBnYW1lYm9hcmQuc2hpcHNbaGl0U2hpcF0uaGl0KGhpdFNoaXBJbmRleCk7XG5cbiAgLy8gQ2hlY2sgaWYgc2hpcCBpcyBzdW5rXG4gIGdhbWVib2FyZC5zaGlwc1toaXRTaGlwXS5pc1N1bmsoKTtcblxuICByZXR1cm4gZ2FtZWJvYXJkO1xufTtcblxuZXhwb3J0IHsgYXBwbHlIaXREYW1hZ2UgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBhcnJFcXVhbENoZWNrID0gZnVuY3Rpb24gKGFycjEsIGFycjIpIHtcbiAgcmV0dXJuIGFycjEuZXZlcnkoKHZhbCwgaW5kZXgpID0+IHZhbCA9PT0gYXJyMltpbmRleF0pO1xufTtcblxuY29uc3QgaXNBbHJlYWR5R3Vlc3NlZCA9IGZ1bmN0aW9uIChuZXN0ZWRBcnIsIGFycikge1xuICBjb25zdCBvdXRwdXQgPSBbXTtcbiAgbmVzdGVkQXJyLmZvckVhY2goKG5lc3QpID0+IHtcbiAgICBvdXRwdXQucHVzaChhcnJFcXVhbENoZWNrKG5lc3QsIGFycikpO1xuICB9KTtcbiAgcmV0dXJuIG91dHB1dC5pbmNsdWRlcyh0cnVlKTtcbn07XG5cbmV4cG9ydCB7IGFyckVxdWFsQ2hlY2ssIGlzQWxyZWFkeUd1ZXNzZWQgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBjcmVhdGVQb3RlbnRpYWxTaGlwID0gZnVuY3Rpb24gKGxlbmd0aCwgdmVydEFsaWduLCBjb29yZHMpIHtcbiAgY29uc3QgcG90ZW50aWFsU2hpcCA9IFtdO1xuXG4gIGlmICh2ZXJ0QWxpZ24gPT09IGZhbHNlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcG90ZW50aWFsU2hpcC5wdXNoKFtjb29yZHNbMF0sIGNvb3Jkc1sxXSArIGldKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcG90ZW50aWFsU2hpcC5wdXNoKFtjb29yZHNbMF0gKyBpLCBjb29yZHNbMV1dKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcG90ZW50aWFsU2hpcDtcbn07XG5cbmNvbnN0IGdldFBvdGVudGlhbENvb3JkcyA9IGZ1bmN0aW9uIChlKSB7XG4gIHJldHVybiBbXG4gICAgcGFyc2VJbnQoZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3RbMV0uc2xpY2UoLTEpKSxcbiAgICBwYXJzZUludChlLnRhcmdldC5jbGFzc0xpc3RbMV0uc2xpY2UoLTEpKVxuICBdO1xufTtcblxuZXhwb3J0IHsgY3JlYXRlUG90ZW50aWFsU2hpcCwgZ2V0UG90ZW50aWFsQ29vcmRzIH07XG4iLCIvKipcbiAqIEFycmF5IGNoZWNrcyBpZiB4IGFuZCB5IGNhbiBmaXQgaW4gbmVnYXRpdmUgYW5kIHBvc2l0aXZlIGRpci5cbiAqIEluIHRoaXMgb3JkZXI6IFt4LXBvc2l0aXZlLCB4LW5lZ2F0aXZlLCB5LXBvc2l0aXZlLCB5LW5lZ2F0aXZlXVxuICogUmV0dXJucyBhbiBhcnJheSB3aXRoIHRoZSBpbmRleGVzIG9mIHZhbGlkIFswLCAxLCAyLCAzXVxuICovXG5jb25zdCBmaW5kUG9zc2libGVEaXJzID0gZnVuY3Rpb24gKGNvb3JkLCBsZW5ndGgpIHtcbiAgcmV0dXJuIFtcbiAgICBjb29yZFswXSArIChsZW5ndGggLSAxKSA+IDksXG4gICAgY29vcmRbMF0gLSAobGVuZ3RoIC0gMSkgPCAwLFxuICAgIGNvb3JkWzFdICsgKGxlbmd0aCAtIDEpID4gOSxcbiAgICBjb29yZFsxXSAtIChsZW5ndGggLSAxKSA8IDBcbiAgXVxuICAgIC5tYXAoKHgsIGkpID0+ICh4ID09PSBmYWxzZSA/IGkgOiBcIiBcIikpXG4gICAgLmZpbHRlcigoeCkgPT4geCAhPT0gXCIgXCIpO1xufTtcblxuLy8gQnVpbGQgcG9zc2libGUgc2hpcHMgYmFzZWQgb24gY29vcmRzIHcvci90IGJvYXJkIGVkZ2VzXG5jb25zdCBidWlsZFNoaXBDb29yZHMgPSBmdW5jdGlvbiAobGVuZ3RoLCBkaXIsIGNvb3JkKSB7XG4gIGNvbnN0IHNoaXAgPSBbXTtcblxuICBpZiAoZGlyID09PSAwKVxuICAgIGZvciAobGV0IGkgPSBjb29yZFswXTsgaSA8IGNvb3JkWzBdICsgbGVuZ3RoOyBpKyspIHNoaXAucHVzaChbaSwgY29vcmRbMV1dKTtcblxuICBpZiAoZGlyID09PSAxKVxuICAgIGZvciAobGV0IGkgPSBjb29yZFswXTsgaSA+IGNvb3JkWzBdIC0gbGVuZ3RoOyBpLS0pIHNoaXAucHVzaChbaSwgY29vcmRbMV1dKTtcblxuICBpZiAoZGlyID09PSAyKVxuICAgIGZvciAobGV0IGkgPSBjb29yZFsxXTsgaSA8IGNvb3JkWzFdICsgbGVuZ3RoOyBpKyspIHNoaXAucHVzaChbY29vcmRbMF0sIGldKTtcblxuICBpZiAoZGlyID09PSAzKVxuICAgIGZvciAobGV0IGkgPSBjb29yZFsxXTsgaSA+IGNvb3JkWzFdIC0gbGVuZ3RoOyBpLS0pIHNoaXAucHVzaChbY29vcmRbMF0sIGldKTtcblxuICByZXR1cm4gc2hpcDtcbn07XG5cbmV4cG9ydCB7IGJ1aWxkU2hpcENvb3JkcywgZmluZFBvc3NpYmxlRGlycyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIERPTSBWQVJJQUJMRVMgKi9cbmNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5fX3dyYXBwZXJcIik7XG5jb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVudV9fbW9kYWxcIik7XG5jb25zdCBtb2RhbFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnVfX3dpbm5lclwiKTtcbmNvbnN0IGdhbWVib2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdhbWVib2FyZFwiKTtcbmNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNxdWFyZVwiKTtcbmNvbnN0IHNlbGVjdGlvbk1lbnVTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcFwiKTtcblxuY29uc3QgaGlkZU1vZGFsID0gZnVuY3Rpb24gKCkge1xuICBtb2RhbC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuLS1vcGFjaXR5XCIpO1xuICBzZXRUaW1lb3V0KCgpID0+IG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW4tLXpcIiksIDEwMDApO1xufTtcblxuY29uc3QgcmV2ZWFsTW9kYWwgPSBmdW5jdGlvbiAod2lubmVyKSB7XG4gIG1vZGFsVGV4dC50ZXh0Q29udGVudCA9IGAke3dpbm5lcn0gd2lucyFgO1xuICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuLS16XCIpO1xuICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuLS1vcGFjaXR5XCIpO1xufTtcblxuY29uc3QgcmV2ZWFsR2FtZWJvYXJkcyA9IGZ1bmN0aW9uICgpIHtcbiAgbWFpbi5jbGFzc0xpc3QuYWRkKFwicmV2ZWFsLS1vcGFjaXR5XCIpO1xufTtcblxuY29uc3QgZGlzcGxheUJvYXRzID0gZnVuY3Rpb24gKHBsYXllcikge1xuICAvLyBMb29wIG92ZXIgZWFjaCBzaGlwIG9mIHBsYXllclxuICBmb3IgKGxldCBzaGlwIGluIHBsYXllci5nYW1lYm9hcmQuc2hpcHMpIHtcbiAgICAvLyBHZXQgc2hpcCBjb29yZGluYXRlc1xuICAgIHBsYXllci5nYW1lYm9hcmQuc2hpcHNbc2hpcF0ubG9jYXRpb24uZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIGNvbnN0IGdhbWVib2FyZCA9XG4gICAgICAgIHBsYXllci5wbGF5ZXJOYW1lID09PSBcImNvbXB1dGVyXCIgPyBnYW1lYm9hcmRzWzBdIDogZ2FtZWJvYXJkc1sxXTtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGdhbWVib2FyZC5jaGlsZHJlbltjb29yZFswXVswXV0uY2hpbGRyZW5bY29vcmRbMF1bMV1dO1xuXG4gICAgICAvLyBBZGQgc2hpcCBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNxdWFyZS0tc2hpcFwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGBzcXVhcmUtLSR7c2hpcH1gKTtcbiAgICB9KTtcbiAgfVxufTtcblxuY29uc3QgZGlzcGxheUJvYXQgPSBmdW5jdGlvbiAoY29vcmRzLCBzaGlwTmFtZSkge1xuICBjb29yZHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICBjb25zdCBzcXVhcmUgPSBnYW1lYm9hcmRzWzFdLmNoaWxkcmVuW2Nvb3JkWzBdXS5jaGlsZHJlbltjb29yZFsxXV07XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmUtLXNoaXBcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYHNxdWFyZS0tJHtzaGlwTmFtZX1gKTtcbiAgfSk7XG59O1xuXG5jb25zdCBkaXNwbGF5UG9zaXRpb25TZWxlY3Rpb24gPSBmdW5jdGlvbiAoY29vcmRzKSB7XG4gIGNvb3Jkcy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgIGNvbnN0IHNxdWFyZSA9IGdhbWVib2FyZHNbMV0uY2hpbGRyZW5bY29vcmRbMF1dLmNoaWxkcmVuW2Nvb3JkWzFdXTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNxdWFyZS0tc2hpcFwiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChgc3F1YXJlLS1wb3RlbnRpYWxgKTtcbiAgfSk7XG59O1xuXG5jb25zdCByZW1vdmVQb3NpdGlvblNlbGVjdGlvbiA9IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgY29vcmRzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgY29uc3Qgc3F1YXJlID0gZ2FtZWJvYXJkc1sxXS5jaGlsZHJlbltjb29yZFswXV0uY2hpbGRyZW5bY29vcmRbMV1dO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKFwic3F1YXJlLS1zaGlwXCIpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKGBzcXVhcmUtLXBvdGVudGlhbGApO1xuICB9KTtcbn07XG5cbmNvbnN0IHVwZGF0ZVVJID0gZnVuY3Rpb24gKHBsYXllcikge1xuICAvLyBMb29wIG92ZXIgaGl0c1xuICBwbGF5ZXIuZ2FtZWJvYXJkLmhpdHMuZm9yRWFjaCgoaGl0KSA9PiB7XG4gICAgY29uc3QgZ2FtZWJvYXJkID1cbiAgICAgIHBsYXllci5wbGF5ZXJOYW1lID09PSBcImNvbXB1dGVyXCIgPyBnYW1lYm9hcmRzWzBdIDogZ2FtZWJvYXJkc1sxXTtcbiAgICBjb25zdCByb3cgPSBnYW1lYm9hcmQuY2hpbGRyZW5baGl0WzBdXTtcbiAgICBjb25zdCBzcXVhcmUgPSByb3cuY2hpbGRyZW5baGl0WzFdXTtcblxuICAgIC8vIEFkZCBoaXQgYmFja2dyb3VuZCBjb2xvclxuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGBzcXVhcmUtLWhpdGApO1xuICB9KTtcblxuICAvLyBMb29wIG92ZXIgbWlzc2VzXG4gIHBsYXllci5nYW1lYm9hcmQubWlzc2VzLmZvckVhY2goKG1pc3MpID0+IHtcbiAgICBjb25zdCBnYW1lYm9hcmQgPVxuICAgICAgcGxheWVyLnBsYXllck5hbWUgPT09IFwiY29tcHV0ZXJcIiA/IGdhbWVib2FyZHNbMF0gOiBnYW1lYm9hcmRzWzFdO1xuICAgIGNvbnN0IHJvdyA9IGdhbWVib2FyZC5jaGlsZHJlblttaXNzWzBdXTtcbiAgICBjb25zdCBzcXVhcmUgPSByb3cuY2hpbGRyZW5bbWlzc1sxXV07XG5cbiAgICAvLyBBZGQgaGl0IGJhY2tncm91bmQgY29sb3JcbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChgc3F1YXJlLS1taXNzYCk7XG4gIH0pO1xufTtcblxuY29uc3QgcmVzZXRVSSA9IGZ1bmN0aW9uICgpIHtcbiAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcInNxdWFyZS0taGl0XCIpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKFwic3F1YXJlLS1taXNzXCIpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKFwiYW5pbWF0ZS1ndWVzc1wiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcInNxdWFyZS0tY2FycmllclwiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcInNxdWFyZS0tYmF0dGxlc2hpcFwiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcInNxdWFyZS0tZGVzdHJveWVyXCIpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKFwic3F1YXJlLS1zdWJtYXJpbmVcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzcXVhcmUtLXBhdHJvbFwiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcInNxdWFyZS0tcG90ZW50aWFsXCIpO1xuICB9KTtcbn07XG5cbmNvbnN0IHJlc2V0U2VsZWN0aW9uVUkgPSBmdW5jdGlvbiAoKSB7XG4gIHNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzcXVhcmUtLXBvdGVudGlhbFwiKTtcbiAgfSk7XG59O1xuXG5jb25zdCBhZGRHdWVzc0FuaW1hdGlvbiA9IGZ1bmN0aW9uIChlbmVteVBsYXllciwgY29vcmRzKSB7XG4gIGNvbnN0IGdhbWVib2FyZCA9XG4gICAgZW5lbXlQbGF5ZXIucGxheWVyTmFtZSA9PT0gXCJwbGF5ZXJcIiA/IGdhbWVib2FyZHNbMV0gOiBnYW1lYm9hcmRzWzBdO1xuICBjb25zdCByb3cgPSBnYW1lYm9hcmQuY2hpbGRyZW5bY29vcmRzWzBdXTtcbiAgY29uc3Qgc3F1YXJlID0gcm93LmNoaWxkcmVuW2Nvb3Jkc1sxXV07XG5cbiAgLy8gYWRkIGFuaW1hdGlvbiBjbGFzc1xuICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcImFuaW1hdGUtZ3Vlc3NcIik7XG59O1xuXG5jb25zdCByZXZlYWxBZGRTaGlwTWVudSA9IGZ1bmN0aW9uIChwbGFjZW1lbnRNb2RhbCkge1xuICBwbGFjZW1lbnRNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuLS16XCIpO1xuICBwbGFjZW1lbnRNb2RhbC5jbGFzc0xpc3QuYWRkKFwicmV2ZWFsLS1vcGFjaXR5XCIpO1xufTtcblxuY29uc3QgaGlkZUFkZFNoaXBNZW51ID0gZnVuY3Rpb24gKHBsYWNlbWVudE1vZGFsKSB7XG4gIHBsYWNlbWVudE1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJyZXZlYWwtLW9wYWNpdHlcIik7XG4gIHNldFRpbWVvdXQoKCkgPT4gcGxhY2VtZW50TW9kYWwuY2xhc3NMaXN0LmFkZChcImhpZGRlbi0telwiKSwgODAwKTtcbn07XG5cbmNvbnN0IHJlbW92ZVNlbGVjdGlvbkZyb21TaGlwID0gZnVuY3Rpb24gKHNoaXBTZWxlY3RlZCkge1xuICBzaGlwU2VsZWN0ZWQuY2xhc3NMaXN0LnJlbW92ZShcInNoaXAtLXNlbGVjdGVkXCIpO1xuICBzaGlwU2VsZWN0ZWQuY2xhc3NMaXN0LmFkZChcInNoaXAtLXBsYWNlZFwiKTtcbn07XG5cbmNvbnN0IHJlc2V0U2hpcFNlbGVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgc2VsZWN0aW9uTWVudVNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJzaGlwLS1wbGFjZWRcIik7XG4gICAgaWYgKHNoaXAuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcC0tY2FycmllclwiKSlcbiAgICAgIHNoaXAuY2xhc3NMaXN0LmFkZChcInNoaXAtLXNlbGVjdGVkXCIpO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7XG4gIGdhbWVib2FyZHMsXG4gIHJldmVhbEFkZFNoaXBNZW51LFxuICBkaXNwbGF5Qm9hdHMsXG4gIGRpc3BsYXlCb2F0LFxuICBkaXNwbGF5UG9zaXRpb25TZWxlY3Rpb24sXG4gIHJlbW92ZVBvc2l0aW9uU2VsZWN0aW9uLFxuICB1cGRhdGVVSSxcbiAgcmVzZXRVSSxcbiAgYWRkR3Vlc3NBbmltYXRpb24sXG4gIHJldmVhbEdhbWVib2FyZHMsXG4gIGhpZGVNb2RhbCxcbiAgcmV2ZWFsTW9kYWwsXG4gIHJlc2V0U2VsZWN0aW9uVUksXG4gIHJlbW92ZVNlbGVjdGlvbkZyb21TaGlwLFxuICBoaWRlQWRkU2hpcE1lbnUsXG4gIHJlc2V0U2hpcFNlbGVjdGlvblxufTtcbiIsImltcG9ydCB7IGFyckVxdWFsQ2hlY2ssIGlzQWxyZWFkeUd1ZXNzZWQgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5pbXBvcnQgeyBnZXRSYW5kb21Db29yZHMgfSBmcm9tIFwiLi9nZXRSYW5kb21Db29yZHNcIjtcblxuKFwidXNlIHN0cmljdFwiKTtcblxuY29uc3QgZ2V0QXR0YWNrQ29vcmRzUGxheWVyID0gZnVuY3Rpb24gKHNxdWFyZSkge1xuICBjb25zdCByb3cgPSBzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3RbMV0uc2xpY2UoLTEpO1xuICBjb25zdCBjb2wgPSBzcXVhcmUuY2xhc3NMaXN0WzFdLnNsaWNlKC0xKTtcbiAgcmV0dXJuIFtwYXJzZUludChyb3csIDEwKSwgcGFyc2VJbnQoY29sLCAxMCldO1xufTtcblxuY29uc3QgZ2V0QXR0YWNrQ29vcmRzQ29tcCA9IGZ1bmN0aW9uIChndWVzc2VzLCBlbmVteSkge1xuICBsZXQgY29vcmQsIGNoZWNrUHJldkd1ZXNzZXM7XG5cbiAgLy8gSW1wbGVtZW50aW5nIHNtYXJ0ZXIgQUlcbiAgZG8ge1xuICAgIGlmIChlbmVteS5nYW1lYm9hcmQuaGl0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIE5vIGhpdHMgeWV0IDo6IHJhbmRvbSBjb29yZFxuICAgICAgY29vcmQgPSBnZXRSYW5kb21Db29yZHMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ3JlYXRlIGFycmF5IG9mIHBvdGVudGlhbCBjaG9pY2VzIGJhc2VkIG9uIHByZXZpb3VzIGhpdHNcbiAgICAgIGNvbnN0IHZhbGlkQ2hvaWNlcyA9IFtdO1xuICAgICAgLy8gTG9vcCBvdmVyIGFycmF5IG9mIGhpdHNcbiAgICAgIGVuZW15LmdhbWVib2FyZC5oaXRzLmZvckVhY2goKGhpdCkgPT4ge1xuICAgICAgICAvLyBDcmVhdGUgcG9zc2libGUgY2hvaWNlcyBvZiBoaXRzIGJhc3NlZCBvbiBwcmV2aW91cyBoaXQgKCsxIGluIGFsbCBkaXJlY3Rpb25zKVxuICAgICAgICBjb25zdCBwb3NzaWJsZUNob2ljZXMgPSBbXG4gICAgICAgICAgW2hpdFswXSArIDEsIGhpdFsxXV0sXG4gICAgICAgICAgW2hpdFswXSAtIDEsIGhpdFsxXV0sXG4gICAgICAgICAgW2hpdFswXSwgaGl0WzFdICsgMV0sXG4gICAgICAgICAgW2hpdFswXSwgaGl0WzFdIC0gMV1cbiAgICAgICAgXTtcblxuICAgICAgICAvLyBBZGQgdmFsaWQgY2hvaWNlIHRvIHZhbGlkQ2hvaWNlIGFycmF5XG4gICAgICAgIHBvc3NpYmxlQ2hvaWNlcy5mb3JFYWNoKChjaG9pY2UpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjaG9pY2VbMF0gPj0gMCAmJlxuICAgICAgICAgICAgY2hvaWNlWzBdIDwgMTAgJiZcbiAgICAgICAgICAgIGNob2ljZVsxXSA+PSAwICYmXG4gICAgICAgICAgICBjaG9pY2VbMV0gPCAxMCAmJlxuICAgICAgICAgICAgIWlzQWxyZWFkeUd1ZXNzZWQoZ3Vlc3NlcywgY2hvaWNlKVxuICAgICAgICAgIClcbiAgICAgICAgICAgIHZhbGlkQ2hvaWNlcy5wdXNoKGNob2ljZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh2YWxpZENob2ljZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvb3JkID0gZ2V0UmFuZG9tQ29vcmRzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb29yZCA9IHZhbGlkQ2hvaWNlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB2YWxpZENob2ljZXMubGVuZ3RoKV07XG4gICAgICB9XG4gICAgfVxuICB9IHdoaWxlIChpc0FscmVhZHlHdWVzc2VkKGd1ZXNzZXMsIGNvb3JkKSAmJiBndWVzc2VzLmxlbmd0aCA8IDEwMCk7XG5cbiAgaWYgKGd1ZXNzZXMubGVuZ3RoID4gOTkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBtb3JlIGd1ZXNzZXMgYXZhaWxhYmxlXCIpO1xuICB9XG4gIHJldHVybiBjb29yZDtcbn07XG5cbmV4cG9ydCB7IGdldEF0dGFja0Nvb3Jkc1BsYXllciwgZ2V0QXR0YWNrQ29vcmRzQ29tcCB9O1xuIiwiaW1wb3J0IHsgbWFrZVJhbmRvbVNoaXAgfSBmcm9tIFwiLi9tYWtlU2hpcFwiO1xuXG4oXCJ1c2Ugc3RyaWN0XCIpO1xuXG5jb25zdCBnZXRDb21wU2hpcENvb3JkcyA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYWxsU2hpcHMgPSBbXTtcblxuICAvLyBDcmVhdGUgY2FycmllclxuICBhbGxTaGlwcy5wdXNoKG1ha2VSYW5kb21TaGlwKGFsbFNoaXBzLCA1KSk7XG5cbiAgLy8gQ3JlYXRlIGJhdHRsZXNoaXBcbiAgYWxsU2hpcHMucHVzaChtYWtlUmFuZG9tU2hpcChhbGxTaGlwcywgNCkpO1xuXG4gIC8vIENyZWF0ZSBkZXN0cm95ZXJcbiAgYWxsU2hpcHMucHVzaChtYWtlUmFuZG9tU2hpcChhbGxTaGlwcywgMykpO1xuXG4gIC8vIENyZWF0ZSBzdWJtYXJpbmVcbiAgYWxsU2hpcHMucHVzaChtYWtlUmFuZG9tU2hpcChhbGxTaGlwcywgMykpO1xuXG4gIC8vIENyZWF0ZSBwYXRyb2xcbiAgYWxsU2hpcHMucHVzaChtYWtlUmFuZG9tU2hpcChhbGxTaGlwcywgMikpO1xuXG4gIHJldHVybiBhbGxTaGlwcztcbn07XG5cbmV4cG9ydCB7IGdldENvbXBTaGlwQ29vcmRzIH07XG5cbi8vIFswXSBjYXJyaWVyLCBbMV0gYmF0dGxlc2hpcCwgWzJdIGRlc3Ryb3llciwgWzNdIHN1Ym1hcmluZSwgWzRdIHBhdHJvbFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGdldFJhbmRvbUNvb3JkcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCksIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKV07XG59O1xuXG5leHBvcnQgeyBnZXRSYW5kb21Db29yZHMgfTtcbiIsIi8vIENoZWNrIGlmIGEgZ3Vlc3NlZCBjb29yZGluYXRlIGhpdHMgYSBzaGlwXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyRXF1YWxDaGVjayB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcblxuY29uc3QgaGl0Q2hlY2sgPSBmdW5jdGlvbiAoZ2FtZWJvYXJkLCBjb29yZHMpIHtcbiAgLy8gQ3JlYXRlIGFycmF5IGZvciBzaGlwIGhpdCBjaGVja1xuICBjb25zdCBvdXRwdXQgPSBbXTtcblxuICAvLyBMb29wIG92ZXIgc2hpcHMgdG8gY2hlY2sgaWYgY29vcmRzIGlzIGEgaGl0IGZvciBhbnlcbiAgZm9yIChsZXQgc2hpcCBpbiBnYW1lYm9hcmQuc2hpcHMpIHtcbiAgICBvdXRwdXQucHVzaChcbiAgICAgIGdhbWVib2FyZC5zaGlwc1tzaGlwXS5sb2NhdGlvblxuICAgICAgICAubWFwKChjb29yZCkgPT4gYXJyRXF1YWxDaGVjayhjb29yZFswXSwgY29vcmRzKSlcbiAgICAgICAgLmluY2x1ZGVzKHRydWUpXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgeyBoaXRDaGVjayB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGlzQWxyZWFkeUd1ZXNzZWQgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5cbmNvbnN0IGlzVmFsaWRNb3ZlID0gZnVuY3Rpb24gKG5ld1NoaXAsIHBsYXllckNvb3Jkcykge1xuICBjb25zdCBjaGVja05ld1NoaXAgPSBuZXdTaGlwLm1hcCgoY29vcmQpID0+XG4gICAgaXNBbHJlYWR5R3Vlc3NlZChwbGF5ZXJDb29yZHMuZmxhdCgpLCBjb29yZClcbiAgKTtcblxuICBjb25zdCBjaGVja3MgPSBbXG4gICAgY2hlY2tOZXdTaGlwLmV2ZXJ5KCh4KSA9PiB4ID09PSBmYWxzZSksXG4gICAgbmV3U2hpcC5mbGF0KCkuZXZlcnkoKHgpID0+IHggPj0gMCAmJiB4IDwgMTApXG4gIF07XG5cbiAgcmV0dXJuICFjaGVja3MuaW5jbHVkZXMoZmFsc2UpO1xufTtcblxuZXhwb3J0IHsgaXNWYWxpZE1vdmUgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBnZXRSYW5kb21Db29yZHMgfSBmcm9tIFwiLi9nZXRSYW5kb21Db29yZHNcIjtcbmltcG9ydCB7IGFyckVxdWFsQ2hlY2sgfSBmcm9tIFwiLi9hcnJFcXVhbENoZWNrXCI7XG5pbXBvcnQgeyBidWlsZFNoaXBDb29yZHMsIGZpbmRQb3NzaWJsZURpcnMgfSBmcm9tIFwiLi9jcmVhdGVSYW5kb21TaGlwc1wiO1xuXG5jb25zdCBtYWtlUmFuZG9tU2hpcCA9IGZ1bmN0aW9uIChhbGxTaGlwcywgbGVuZ3RoKSB7XG4gIGNvbnN0IGFsbFNoaXBzQ29vcmRzID0gYWxsU2hpcHMuZmxhdCgpO1xuXG4gIC8vIEdldCBmaXJzdCBjb29yZGluYXRlXG4gIGxldCBjb29yZDtcbiAgZG8ge1xuICAgIGNvb3JkID0gZ2V0UmFuZG9tQ29vcmRzKCk7XG4gIH0gd2hpbGUgKGFsbFNoaXBzQ29vcmRzLm1hcCgoYykgPT4gYXJyRXF1YWxDaGVjayhjLCBjb29yZCkpLmluY2x1ZGVzKHRydWUpKTtcblxuICAvLyBHZXQgcG9zc2libGUgZGlyZWN0aW9ucyBhZ2FpbnN0IGVkZ2Ugb2YgYm9hcmQgZnJvbSBjb29yZC5cbiAgY29uc3QgcG9zc2libGVEaXJzID0gZmluZFBvc3NpYmxlRGlycyhjb29yZCwgbGVuZ3RoKTtcblxuICAvLyBDcmVhdGUgYXJyYXkgb2YgYWxsIHBvc3NpYmxlIHNoaXBzXG4gIGNvbnN0IHBvc3NpYmxlU2hpcHMgPSBwb3NzaWJsZURpcnMubWFwKChkaXIpID0+XG4gICAgYnVpbGRTaGlwQ29vcmRzKGxlbmd0aCwgZGlyLCBjb29yZClcbiAgKTtcblxuICAvLyBDaGVjayBlYWNoIHNoaXAgZm9yIGNvbmZsaWN0IHdpdGggcHJldmlvdXMgc2hpcCBwbGFjZW1lbnRcbiAgY29uc3Qgc2hpcENob2ljZXNGaW5hbCA9IFtdO1xuXG4gIC8vIExvb3Agb3ZlciBwb3NzaWJsZSBzaGlwc1xuICBmb3IgKGxldCBzaGlwIG9mIHBvc3NpYmxlU2hpcHMpIHtcbiAgICBjb25zdCBjb29yZENoZWNrQXJyID0gW107XG5cbiAgICAvLyBMb29wIG92ZXIgY29vcmRpbmF0ZXMgb2YgZWFjaCBwb3NzaWJsZSBzaGlwXG4gICAgZm9yIChsZXQgc2hpcENvb3JkIG9mIHNoaXApIHtcbiAgICAgIGxldCBtYXRjaCA9IDA7XG5cbiAgICAgIC8vIExvb3Agb3ZlciBwcmV2aW91cyBzaGlwczsgaWYgbWF0Y2gsIG1hcmsgdGhhdFxuICAgICAgYWxsU2hpcHNDb29yZHMuZm9yRWFjaCgoYWxsU2hpcHNDb29yZCkgPT4ge1xuICAgICAgICBpZiAoYXJyRXF1YWxDaGVjayhzaGlwQ29vcmQsIGFsbFNoaXBzQ29vcmQpKSBtYXRjaCsrO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIElmIGEgbWF0Y2ggaXMgZm91bmQsIGFkZCB0cnVlXG4gICAgICBjb29yZENoZWNrQXJyLnB1c2gobWF0Y2ggPT09IDAgPyBmYWxzZSA6IHRydWUpO1xuICAgIH1cblxuICAgIC8vIEFkZCB2YWxpZCBzaGlwcyB0byBjaG9pY2UgYXJyYXlcbiAgICBpZiAoIWNvb3JkQ2hlY2tBcnIuaW5jbHVkZXModHJ1ZSkpIHNoaXBDaG9pY2VzRmluYWwucHVzaChzaGlwKTtcbiAgfVxuXG4gIC8vIFJhbmRvbWx5IHNlbGVjdCBmcm9tIHJlbWFpbmluZyBvcHRpb25zXG4gIHJldHVybiBzaGlwQ2hvaWNlc0ZpbmFsW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNoaXBDaG9pY2VzRmluYWwubGVuZ3RoKV07XG59O1xuXG5leHBvcnQgeyBtYWtlUmFuZG9tU2hpcCB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL1BsYXllclwiO1xuaW1wb3J0IHsgZ2V0Q29tcFNoaXBDb29yZHMgfSBmcm9tIFwiLi9nZXRDb21wU2hpcENvb3Jkc1wiO1xuXG4vLyogIyMjIyMjIyMjIyMgTmV3IEdhbWUgIyMjIyMjIyMjIyMjIyMjXG5jb25zdCBuZXdHYW1lID0gZnVuY3Rpb24gKGNob3NlbkNvb3Jkcykge1xuICAvLyBQbGF5ZXIgY2hvb3NlcyBzaGlwIGNvb3JkaW5hdGVzXG4gIGNvbnN0IHBsYXllciA9IFBsYXllcihcInBsYXllclwiLCBjaG9zZW5Db29yZHMpO1xuXG4gIC8vIENvbXB1dGVyIHJhbmRvbWx5IGNob29zZXMgc2hpcCBjb29yZGluYXRlc1xuICBjb25zdCBjb21wdXRlciA9IFBsYXllcihcImNvbXB1dGVyXCIsIGdldENvbXBTaGlwQ29vcmRzKCkpO1xuXG4gIHJldHVybiBbcGxheWVyLCBjb21wdXRlcl07XG59O1xuXG5leHBvcnQgeyBuZXdHYW1lIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyRXF1YWxDaGVjayB9IGZyb20gXCIuL2FyckVxdWFsQ2hlY2tcIjtcblxuY29uc3QgcHJldkd1ZXNzQ2hlY2sgPSAoZ2FtZWJvYXJkLCBjb29yZHMpID0+IHtcbiAgY29uc3Qgb3V0cHV0ID0gW107XG5cbiAgb3V0cHV0LnB1c2goXG4gICAgZ2FtZWJvYXJkLm1pc3Nlcy5tYXAoKGNvb3JkKSA9PiBhcnJFcXVhbENoZWNrKGNvb3JkLCBjb29yZHMpKS5pbmNsdWRlcyh0cnVlKVxuICApO1xuXG4gIG91dHB1dC5wdXNoKFxuICAgIGdhbWVib2FyZC5oaXRzLm1hcCgoY29vcmQpID0+IGFyckVxdWFsQ2hlY2soY29vcmQsIGNvb3JkcykpLmluY2x1ZGVzKHRydWUpXG4gICk7XG5cbiAgcmV0dXJuIG91dHB1dDtcbn07XG5cbmV4cG9ydCB7IHByZXZHdWVzc0NoZWNrIH07XG5cbi8vIGNhcnJpZXIsIGJhdHRsZXNoaXAsIGRlc3Ryb3llciwgc3VibWFyaW5lLCBwYXRyb2xcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQge1xuICBnYW1lYm9hcmRzLFxuICBkaXNwbGF5Qm9hdHMsXG4gIGRpc3BsYXlCb2F0LFxuICBkaXNwbGF5UG9zaXRpb25TZWxlY3Rpb24sXG4gIHJlc2V0U2VsZWN0aW9uVUksXG4gIHVwZGF0ZVVJLFxuICByZXNldFVJLFxuICBhZGRHdWVzc0FuaW1hdGlvbixcbiAgcmV2ZWFsR2FtZWJvYXJkcyxcbiAgaGlkZU1vZGFsLFxuICByZXZlYWxNb2RhbCxcbiAgcmV2ZWFsQWRkU2hpcE1lbnUsXG4gIHJlbW92ZVNlbGVjdGlvbkZyb21TaGlwLFxuICBoaWRlQWRkU2hpcE1lbnUsXG4gIHJlc2V0U2hpcFNlbGVjdGlvblxufSBmcm9tIFwiLi9kb21JbnRlcmFjdGlvblwiO1xuaW1wb3J0IHsgbmV3R2FtZSB9IGZyb20gXCIuL25ld0dhbWVcIjtcbmltcG9ydCB7IGlzVmFsaWRNb3ZlIH0gZnJvbSBcIi4vaXNWYWxpZE1vdmVcIjtcbmltcG9ydCB7IGNyZWF0ZVBvdGVudGlhbFNoaXAsIGdldFBvdGVudGlhbENvb3JkcyB9IGZyb20gXCIuL2NyZWF0ZVBvdGVudGlhbFNoaXBcIjtcblxuLy8qICMjIyMjIyMjIyMjIyMgRE9NIFZhcmlhYmxlcyAjIyMjIyMjIyMjIyMjIyMjIyNcbmNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkc1swXTtcbmNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNxdWFyZVwiKTtcbmNvbnN0IG5ld0dhbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1nYW1lXCIpO1xuY29uc3QgcGxhY2VtZW50TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYWNlbWVudF9fbW9kYWxcIik7XG5jb25zdCBidG5Sb3RhdGVTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzcGluLXNoaXBcIik7XG5jb25zdCBiZWdpbkdhbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JlZ2luLWdhbWVcIik7XG5cbi8vKiAjIyMjIyMjIyMjIyMjIEdhbWVmbG93ICMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gR2FtZSBWYXJpYWJsZXNcbmNvbnN0IHNoaXBPcmRlciA9IFtcImNhcnJpZXJcIiwgXCJiYXR0bGVzaGlwXCIsIFwiZGVzdHJveWVyXCIsIFwic3VibWFyaW5lXCIsIFwicGF0cm9sXCJdO1xuY29uc3Qgc2hpcHNIZWFsdGggPSBbNSwgNCwgMywgMywgMl07XG5cbmxldCBwbGF5ZXI7XG5sZXQgY29tcHV0ZXI7XG5sZXQgcG90ZW50aWFsQ29vcmRzO1xubGV0IHBsYXllckNvb3JkcztcblxubGV0IHZlcnRBbGlnbiA9IGZhbHNlO1xuXG4vLyBSb3RhdGUgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCBzaGlwIGFsaWdubWVudCBvbiBzZWxlY3Rpb24gc2NyZWVuXG5idG5Sb3RhdGVTaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHZlcnRBbGlnbiA9ICF2ZXJ0QWxpZ247XG59KTtcblxuLy8gU3RhcnQgTmV3IEdhbWVcbm5ld0dhbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgLy8/IFJlc2V0IHZpc3VhbHNcbiAgcmV2ZWFsR2FtZWJvYXJkcygpO1xuICBoaWRlTW9kYWwoKTtcblxuICByZXNldFVJKCk7XG5cbiAgLy8gUmVzZXQgYWRkIHNoaXAgbWVudSBpZiBuZXh0IGdhbWVcbiAgcmVzZXRTaGlwU2VsZWN0aW9uKCk7XG5cbiAgLy8gUmV2ZWFsIGFkZCBzaGlwIG1lbnVcbiAgcmV2ZWFsQWRkU2hpcE1lbnUocGxhY2VtZW50TW9kYWwpO1xuXG4gIC8vPyBQbGF5ZXIgQ2hvb3NlIHNoaXAgcGxhY2VtZW50XG4gIC8vIFNldCBuZXcgUGxheWVyQ29vcmRzIGFycmF5XG4gIHBsYXllckNvb3JkcyA9IFtdO1xuXG4gIHNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgLy8gTU9VU0UgRU5URVIgLS0gSG92ZXIgb3ZlciB0byBzZWUgcG90ZW50aWFsIHNoaXAgcGxhY2VtZW50XG4gICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIChlKSA9PiB7XG4gICAgICAvLyBHZXQgY29vcmRpbmF0ZXNcbiAgICAgIGNvbnN0IGNvb3JkcyA9IGdldFBvdGVudGlhbENvb3JkcyhlKTtcblxuICAgICAgcG90ZW50aWFsQ29vcmRzID0gY3JlYXRlUG90ZW50aWFsU2hpcChcbiAgICAgICAgc2hpcHNIZWFsdGhbcGxheWVyQ29vcmRzLmxlbmd0aF0sXG4gICAgICAgIHZlcnRBbGlnbixcbiAgICAgICAgY29vcmRzXG4gICAgICApO1xuXG4gICAgICBpZiAoIWlzVmFsaWRNb3ZlKHBvdGVudGlhbENvb3JkcywgcGxheWVyQ29vcmRzKSkge1xuICAgICAgICByZXNldFNlbGVjdGlvblVJKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZGlzcGxheVBvc2l0aW9uU2VsZWN0aW9uKHBvdGVudGlhbENvb3Jkcyk7XG4gICAgfSk7XG5cbiAgICAvLyBNT1VTRSBDTElDSyAtLSBTdG9yZSBwb3RlbnRpYWwgc2hpcFxuICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgLy8gRXhpdCBpZiBhbGwgc2hpcHMgY2hvc2VuXG4gICAgICBpZiAocGxheWVyQ29vcmRzLmxlbmd0aCA9PT0gNSkgcmV0dXJuO1xuXG4gICAgICBpZiAoIWlzVmFsaWRNb3ZlKHBvdGVudGlhbENvb3JkcywgcGxheWVyQ29vcmRzKSkgcmV0dXJuO1xuXG4gICAgICAvLyBSZW1vdmUgcmVkIGJhY2tncm91bmQ7IGFkZCBncmF5IHRvIGNob3NlbiBzaGlwXG4gICAgICBjb25zdCBzaGlwU2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgI3NoaXAtc2VsZWN0LSR7cGxheWVyQ29vcmRzLmxlbmd0aH1gXG4gICAgICApO1xuXG4gICAgICByZW1vdmVTZWxlY3Rpb25Gcm9tU2hpcChzaGlwU2VsZWN0ZWQpO1xuXG4gICAgICAvLyBEaXNwbGF5IGJvYXQgb24gc2NyZWVuXG4gICAgICBkaXNwbGF5Qm9hdChwb3RlbnRpYWxDb29yZHMsIHNoaXBPcmRlcltwbGF5ZXJDb29yZHMubGVuZ3RoXSk7XG5cbiAgICAgIC8vIEFkZCBjaG9zZW4gc2hpcCB0byBhcnJheVxuICAgICAgcGxheWVyQ29vcmRzLnB1c2gocG90ZW50aWFsQ29vcmRzKTtcblxuICAgICAgLy8gRXhpdCBpZiBhbGwgc2hpcHMgY2hvc2VuXG4gICAgICBpZiAocGxheWVyQ29vcmRzLmxlbmd0aCA9PT0gNSkgcmV0dXJuO1xuXG4gICAgICAvLyBBZGQgcmVkIHNlbGVjdG9yIHRvIG5leHQgc2hpcFxuICAgICAgZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYCNzaGlwLXNlbGVjdC0ke3BsYXllckNvb3Jkcy5sZW5ndGh9YClcbiAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJzaGlwLS1zZWxlY3RlZFwiKTtcbiAgICB9KTtcblxuICAgIC8vIE1PVVNFIExFQVZFIC0tIEVyYXNlIHByZXZpb3VzIHBvdGVudGlhbCBzaGlwIHBsYWNlbWVudCBvbiBob3ZlciBleGl0XG4gICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIChlKSA9PiB7XG4gICAgICByZXNldFNlbGVjdGlvblVJKCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbmJlZ2luR2FtZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBpZiAocGxheWVyQ29vcmRzLmxlbmd0aCAhPT0gNSkgcmV0dXJuO1xuXG4gIGhpZGVBZGRTaGlwTWVudShwbGFjZW1lbnRNb2RhbCk7XG4gIGNvbnN0IGdhbWUgPSBuZXdHYW1lKHBsYXllckNvb3Jkcyk7XG5cbiAgcGxheWVyID0gZ2FtZVswXTtcbiAgY29tcHV0ZXIgPSBnYW1lWzFdO1xuXG4gIHJlc2V0VUkoKTtcbiAgZGlzcGxheUJvYXRzKHBsYXllcik7XG59KTtcblxuLy8gVHVybiBHYW1lcGxheVxuYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IHNxdWFyZSA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuc3F1YXJlXCIpO1xuICBpZiAoIXNxdWFyZSkgcmV0dXJuO1xuXG4gIC8vIERpc2FsbG93IGlmIGdhbWVvdmVyXG4gIGlmIChwbGF5ZXIuZGVmZWF0ID09PSB0cnVlIHx8IGNvbXB1dGVyLmRlZmVhdCA9PT0gdHJ1ZSkgcmV0dXJuO1xuXG4gIC8vIERpc2FsbG93IGFscmVhZHkgY2xpY2tlZCBzcXVhcmVzXG4gIGlmIChzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwic3F1YXJlLS1oaXRcIikpIHJldHVybjtcbiAgaWYgKHNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoXCJzcXVhcmUtLW1pc3NcIikpIHJldHVybjtcblxuICAvLyBQbGF5ZXIgdHVyblxuICBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyLCBzcXVhcmUpO1xuICB1cGRhdGVVSShjb21wdXRlcik7XG5cbiAgLy8gIENoZWNrIGZvciBkZWZlYXRcbiAgaWYgKGNvbXB1dGVyLmRlZmVhdCA9PT0gdHJ1ZSkge1xuICAgIHJldmVhbE1vZGFsKFwiUGxheWVyXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIENvbXB1dGVyIHR1cm5cbiAgY29tcHV0ZXIuYXR0YWNrKHBsYXllcik7XG4gIHVwZGF0ZVVJKHBsYXllcik7XG4gIGFkZEd1ZXNzQW5pbWF0aW9uKHBsYXllciwgY29tcHV0ZXIuZ3Vlc3Nlcy5zbGljZSgtMSlbMF0pO1xuXG4gIC8vIENoZWNrIGZvciBkZWZlYXRcbiAgaWYgKHBsYXllci5kZWZlYXQgPT09IHRydWUpIHtcbiAgICByZXZlYWxNb2RhbChcIkNvbXB1dGVyXCIpO1xuICAgIHJldHVybjtcbiAgfVxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=