// Gameboard
"use strict";

import { Ship } from "./Ship";
import { prevGuessCheck } from "./prevGuessCheck";
import { hitCheck } from "./hitCheck";
import { applyHitDamage } from "./applyHitDamage";

const Gameboard = function (coords0, coords1, coords2, coords3, coords4) {
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

  const receiveAttack = function (coords) {
    // Check if already guessed
    if (prevGuessCheck(this, coords).includes(true)) return false;

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

export { Gameboard };
