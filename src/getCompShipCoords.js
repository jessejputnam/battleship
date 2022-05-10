import { getRandomCoords, getNum } from "./getRandomCoords";
import { arrEqualCheck } from "./arrEqualCheck";

("use strict");

const getCompShipCoords = function () {
  const allShips = [];
  // let coords = getRandomCoords();
  // create ship(length)
  const makeShip = function (length) {
    const shipArr = [];
    const allShipsFlat = allShips.flat();

    // Get first coordinate
    let coord;
    do {
      coord = getRandomCoords();
    } while (allShipsFlat.map((c) => arrEqualCheck(c, coord)).includes(true));

    // Add first coordinate to ship array
    shipArr.push(coord);

    // Building from first coordinate

    // Get possible directions against edge of board.
    /*
    Array will output which of the 4 would be valid.
    [x-positive, x-negative, y-positive, y-negative]
    */
    const possibleDirs = [
      shipArr[0][0] + 5 > 9,
      shipArr[0][0] - 5 < 0,
      shipArr[0][1] + 5 > 9,
      shipArr[0][1] - 5 < 0
    ]
      .map((x, i) => (x === false ? i : " "))
      .filter((x) => x !== " ");

    console.log(possibleDirs);
    // Filter for previous ship coordinate incompatability
    // allShipsFlat.

    const dirChoice =
      possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
    console.log(dirChoice);

    /*
    for (let i = 0; i < length; i++) {
      const allShipsCheck = allShips.flat().map((c) => arrEqualCheck(c, coord));

      // For first coordinate
      if (i === 0) {
        let coord;

        // Get random coordinate
        do {
          coord = getRandomCoords();
        } while (allShipsCheck.includes(true));

        shipArr.push(coord);
      }

      // For building from first coordinate
      if (i > 0) {
        shipArr.push(i);
        // Get possible directions against edge of board
        // Array will output which of the 4 would be valid
        // [x-positive, x-negative, y-positive, y-negative]
        const possibleDirs = [
          shipArr[0][0] + 5 > 9,
          shipArr[0][0] - 5 < 0,
          shipArr[0][1] + 5 > 9,
          shipArr[0][1] - 5 < 0
        ]
          .map((x, i) => (x === false ? i : " "))
          .filter((x) => x !== " ");

        const dirChoice =
          possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
        console.log(dirChoice);
      }
    }
    console.log(shipArr);
    return shipArr;
    */
  };

  allShips.push(makeShip(3));

  return allShips;
};

export { getCompShipCoords };

// [0] carrier, [1] battleship, [2] destroyer, [3] submarine, [4] patrol
