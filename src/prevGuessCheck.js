"use strict";

import { arrEqualCheck } from "./arrEqualCheck";

const prevGuessCheck = (gameboard, coords) => {
  const output = [];

  output.push(
    gameboard.misses.map((coord) => arrEqualCheck(coord, coords)).includes(true)
  );

  output.push(
    gameboard.hits.map((coord) => arrEqualCheck(coord, coords)).includes(true)
  );

  return output;
};

export { prevGuessCheck };

// carrier, battleship, destroyer, submarine, patrol
