"use strict";

import { Player } from "./Player";
import { displayBoats } from "./domInteraction";

// carrier
const coords0 = [
  [2, 2],
  [2, 3],
  [2, 4],
  [2, 5],
  [2, 6]
];
// battleship
const coords1 = [
  [1, 1],
  [1, 2],
  [1, 3],
  [1, 4]
];
// destroyer
const coords2 = [
  [0, 1],
  [0, 2],
  [0, 3]
];
// submarine
const coords3 = [
  [3, 3],
  [3, 4],
  [3, 5]
];
// patrol
const coords4 = [
  [4, 4],
  [4, 5]
];

const coords5 = [
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0]
];
const coords6 = [
  [4, 1],
  [5, 1],
  [6, 1],
  [7, 1]
];
const coords7 = [
  [2, 2],
  [2, 3],
  [2, 4]
];
const coords8 = [
  [6, 1],
  [7, 1],
  [8, 1]
];
const coords9 = [
  [8, 6],
  [8, 7]
];

const testCoords1 = [coords0, coords1, coords2, coords3, coords4];
const testCoords2 = [coords5, coords6, coords7, coords8, coords9];

//* ############# GAMEFLOW ##################

const player = Player("player", testCoords1);
const computer = Player("computer", testCoords2);

console.log(player);
console.log(computer);

displayBoats(player);
displayBoats(computer);

// player.attack(computer.gameboard, [0, 0]);
// computer.attack(player.gameboard, [5, 5]);
// player.attack(computer.gameboard, [0, 0]);
// player.attack(computer.gameboard, [0, 1]);
// player.attack(computer.gameboard, [1, 0]);
// player.attack(computer.gameboard, [2, 0]);
// player.attack(computer.gameboard, [3, 0]);
// player.attack(computer.gameboard, [4, 0]);

// console.log(computer);
// console.log(player);
