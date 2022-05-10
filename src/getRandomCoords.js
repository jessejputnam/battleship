"use strict";

const getRandomCoords = function () {
  return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
};

const getNum = function () {
  return Math.floor(Math.random() * 10);
};

export { getRandomCoords, getNum };
