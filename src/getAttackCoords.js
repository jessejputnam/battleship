import { arrEqualCheck, isAlreadyGuessed } from "./arrEqualCheck";
import { getRandomCoords } from "./getRandomCoords";

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
      coord = getRandomCoords();
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
            !isAlreadyGuessed(guesses, choice)
          )
            validChoices.push(choice);
        });
      });

      if (validChoices.length === 0) {
        coord = getRandomCoords();
      } else {
        coord = validChoices[Math.floor(Math.random() * validChoices.length)];
      }
    }
  } while (isAlreadyGuessed(guesses, coord) && guesses.length < 100);

  if (guesses.length > 99) {
    throw new Error("No more guesses available");
  }
  return coord;
};

export { getAttackCoordsPlayer, getAttackCoordsComp };
