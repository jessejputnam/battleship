"use strict";

const getAttackCoordsPlayer = function (square) {
  const row = square.parentElement.classList[1].slice(-1);
  const col = square.classList[1].slice(-1);
  return [parseInt(row, 10), parseInt(col, 10)];
};

const getAttackCoordsComp = function () {
  return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
};

export { getAttackCoordsPlayer, getAttackCoordsComp };
