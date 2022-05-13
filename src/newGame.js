"use strict";

import { Player } from "./Player";
import { getCompShipCoords } from "./getCompShipCoords";

//* ########### New Game ###############
const newGame = function (chosenCoords) {
  // Player chooses ship coordinates
  const player = Player("player", chosenCoords);

  // Computer randomly chooses ship coordinates
  const computer = Player("computer", getCompShipCoords());

  return [player, computer];
};

export { newGame };
