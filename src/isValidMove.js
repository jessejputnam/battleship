"use strict";

import { isAlreadyGuessed } from "./arrEqualCheck";

const isValidMove = function (newShip, playerCoords) {
  const checkNewShip = newShip.map((coord) =>
    isAlreadyGuessed(playerCoords.flat(), coord)
  );

  const checks = [
    checkNewShip.every((x) => x === false),
    newShip.flat().every((x) => x >= 0 && x < 10)
  ];

  return !checks.includes(false);
};

export { isValidMove };
