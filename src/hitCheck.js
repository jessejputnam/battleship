// Check if a guessed coordinate hits a ship
"use strict";

import { arrEqualCheck } from "./arrEqualCheck";

const hitCheck = function (gameboard, coords) {
  // Create array for ship hit check
  const output = [];

  // Loop over ships to check if coords is a hit for any
  for (let ship in gameboard.ships) {
    output.push(
      gameboard.ships[ship].location
        .map((coord) => arrEqualCheck(coord[0], coords))
        .includes(true)
    );
  }

  return output;
};

export { hitCheck };
