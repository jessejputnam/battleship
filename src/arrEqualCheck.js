const arrEqualCheck = function (arr1, arr2) {
  return arr1.every((val, index) => val === arr2[index]);
};

const missCheck = (gameboard, coords) => {
  const output = [];

  output.push(
    gameboard.misses.map((coord) => arrEqualCheck(coord, coords)).includes(true)
  );

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

export { arrEqualCheck, missCheck };
