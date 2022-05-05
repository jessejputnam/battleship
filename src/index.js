import { Ship } from "./Ship";
import { Gameboard } from "./Gameboard";

const newShip = Ship([
  [0, 0],
  [0, 1],
  [0, 2]
]);

console.log(newShip.hit(0).hit(1).isSunk().sunk);

console.log(newShip);

// console.log(newShip);

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

const newGameboard = Gameboard(coords0, coords1, coords2, coords3, coords4);
console.log(newGameboard);

newGameboard.recieveAttack([1, 4]);
