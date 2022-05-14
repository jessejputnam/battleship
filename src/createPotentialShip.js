"use strict";

const createPotentialShip = function (length, vertAlign, coords) {
  const potentialShip = [];

  if (vertAlign === false) {
    for (let i = 0; i < length; i++) {
      potentialShip.push([coords[0], coords[1] + i]);
    }
  } else {
    for (let i = 0; i < length; i++) {
      potentialShip.push([coords[0] + i, coords[1]]);
    }
  }

  return potentialShip;
};

const getPotentialCoords = function (e) {
  return [
    parseInt(e.target.parentElement.classList[1].slice(-1)),
    parseInt(e.target.classList[1].slice(-1))
  ];
};

export { createPotentialShip, getPotentialCoords };
