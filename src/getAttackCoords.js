import { arrEqualCheck } from "./arrEqualCheck";
import { getRandomCoords } from "./getRandomCoords";

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
    coord = getRandomCoords();

    // Check if coordinate was already guessed
    checkPrevGuesses = guesses.map((guess) => arrEqualCheck(coord, guess));
  } while (checkPrevGuesses.includes(true) && guesses.length < 100);

  if (guesses.length > 99) {
    throw new Error("No more guesses available");
  }
  return coord;
};

export { getAttackCoordsPlayer, getAttackCoordsComp };
