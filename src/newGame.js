"use strict";

import { Player } from "./Player";
import { getCompShipCoords } from "./getCompShipCoords";

//* ########### Initial Ship Coords ###############
// carrier
// prettier-ignore
const coords0 = [[2, 9], [3, 9], [4, 9], [5, 9], [6, 9]];

// battleship
// prettier-ignore
const coords1 = [[2, 0], [3, 0], [4, 0], [5, 0]];

// destroyer
// prettier-ignore
const coords2 = [[0, 1], [0, 2], [0, 3]];

// submarine
// prettier-ignore
const coords3 = [[3, 3], [3, 4], [3, 5]];

// patrol
// prettier-ignore
const coords4 = [[7, 4], [7, 5]];

//* ########### New Game ###############
const newGame = function () {
  // Player chooses ship coordinates
  const testCoords1 = [coords0, coords1, coords2, coords3, coords4];
  const player = Player("player", testCoords1);

  // Computer randomly chooses ship coordinates
  const computer = Player("computer", getCompShipCoords());

  return [player, computer];
};

export { newGame };
