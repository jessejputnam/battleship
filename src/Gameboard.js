import { Ship } from "./Ship";
import { prevGuessCheck } from "./prevGuessCheck";
import { hitCheck } from "./hitCheck";
import { applyHitDamage } from "./applyHitDamage";

const Gameboard = function (coords0, coords1, coords2, coords3, coords4) {
  let defeat = false;

  // Ships
  const ships = {
    carrier: Ship(coords0),
    battleship: Ship(coords1),
    destroyer: Ship(coords2),
    submarine: Ship(coords3),
    patrol: Ship(coords4)
  };

  // Enemy Guess Arrays
  const misses = [];
  const hits = [];

  const recieveAttack = function (coords) {
    // Check if already guessed
    if (prevGuessCheck(this, coords).includes(true)) return this;

    // Check if guess is a hit on a ship
    const hitCheckArr = hitCheck(this, coords);

    // If none show hit, put into misses array
    if (hitCheckArr.every((x) => x === false)) {
      misses.push(coords);
      return this;
    }

    // If guess shows hit
    if (hitCheckArr.some((x) => x === true)) {
      hits.push(coords);
      return applyHitDamage(this, hitCheckArr, coords);
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
    // carrier,
    // battleship,
    // destroyer,
    // submarine,
    // patrol,
    defeat,
    ships,
    misses,
    recieveAttack,
    hits,
    checkForDefeat
  };
};

export { Gameboard };

// BOATS:
//
// Carrier     : C -- 5
// Battleship  : B -- 4
// Destroyer   : D -- 3
// Submarine   : S -- 3
// Patrol      : P -- 2
//
// Boat hit    : lowercase (i.e. D => d)

// PLAY:
//
// Hit   : 1
// Miss  : 0
