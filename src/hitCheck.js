import { arrEqualCheck } from "./arrEqualCheck";

const hitCheck = function (gameboard, coords) {
  const output = [];

  output.push(
    gameboard.carrier.location
      .map((coord) => arrEqualCheck(coord[0], coords))
      .includes(true)
  );

  output.push(
    gameboard.battleship.location
      .map((coord) => arrEqualCheck(coord[0], coords))
      .includes(true)
  );

  output.push(
    gameboard.destroyer.location
      .map((coord) => arrEqualCheck(coord[0], coords))
      .includes(true)
  );

  output.push(
    gameboard.submarine.location
      .map((coord) => arrEqualCheck(coord[0], coords))
      .includes(true)
  );

  output.push(
    gameboard.patrol.location
      .map((coord) => arrEqualCheck(coord[0], coords))
      .includes(true)
  );

  return output;
};

export { hitCheck };

// carrier, battleship, destroyer, submarine, patrol
