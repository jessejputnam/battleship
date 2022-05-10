import { getRandomCoords, getNum } from "./getRandomCoords";

("use strict");

const getCompShipCoords = function () {
  const allShips = [[]];
  // let coords = getRandomCoords();
  // create ship(length)
  const makeShip = function (length) {
    const arr = [];
    for (let i = 0; i < length; i++) {}

    return arr;
  };
  return allShips;
};

export { getCompShipCoords };

// [0] carrier, [1] battleship, [2] destroyer, [3] submarine, [4] patrol
