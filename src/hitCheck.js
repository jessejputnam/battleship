import { arrEqualCheck } from "./arrEqualCheck";

const hitCheck = function (gameboard, coords) {
  const output = [];

  output.push(
    gameboard.ships.carrier.location
      .map((coord) => arrEqualCheck(coord[0], coords))
      .includes(true)
  );

  output.push(
    gameboard.ships.battleship.location
      .map((coord) => arrEqualCheck(coord[0], coords))
      .includes(true)
  );

  output.push(
    gameboard.ships.destroyer.location
      .map((coord) => arrEqualCheck(coord[0], coords))
      .includes(true)
  );

  output.push(
    gameboard.ships.submarine.location
      .map((coord) => arrEqualCheck(coord[0], coords))
      .includes(true)
  );

  output.push(
    gameboard.ships.patrol.location
      .map((coord) => arrEqualCheck(coord[0], coords))
      .includes(true)
  );

  return output;
};

export { hitCheck };

// carrier, battleship, destroyer, submarine, patrol
