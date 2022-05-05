import { arrEqualCheck } from "./arrEqualCheck";

const prevGuessCheck = (gameboard, coords) => {
  const output = [];

  output.push(
    gameboard.misses.map((coord) => arrEqualCheck(coord, coords)).includes(true)
  );

  return output;
};

export { prevGuessCheck };
