"use strict";

import { getRandomCoords } from "./getRandomCoords";
import { arrEqualCheck } from "./arrEqualCheck";
import { buildShipCoords, findPossibleDirs } from "./createRandomShips";

const makeRandomShip = function (allShips, length) {
  const allShipsCoords = allShips.flat();

  // Get first coordinate
  let coord;
  do {
    coord = getRandomCoords();
  } while (allShipsCoords.map((c) => arrEqualCheck(c, coord)).includes(true));

  // Get possible directions against edge of board from coord.
  const possibleDirs = findPossibleDirs(coord, length);

  // Create array of all possible ships
  const possibleShips = possibleDirs.map((dir) =>
    buildShipCoords(length, dir, coord)
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
        if (arrEqualCheck(shipCoord, allShipsCoord)) match++;
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

export { makeRandomShip };
