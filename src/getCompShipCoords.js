import { makeRandomShip } from "./makeShip";

("use strict");

const getCompShipCoords = function () {
  const allShips = [];

  // Create carrier
  allShips.push(makeRandomShip(allShips, 5));

  // Create battleship
  allShips.push(makeRandomShip(allShips, 4));

  // Create destroyer
  allShips.push(makeRandomShip(allShips, 3));

  // Create submarine
  allShips.push(makeRandomShip(allShips, 3));

  // Create patrol
  allShips.push(makeRandomShip(allShips, 2));

  return allShips;
};

export { getCompShipCoords };

// [0] carrier, [1] battleship, [2] destroyer, [3] submarine, [4] patrol
