import { Gameboard } from "./Gameboard";

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

const testCoords = [coords0, coords1, coords2, coords3, coords4];

const newGameboard = Gameboard(...testCoords);
console.log(newGameboard);

// hit carrier
newGameboard.recieveAttack([2, 6]);
newGameboard.recieveAttack([0, 0]);
newGameboard.recieveAttack([1, 5]);
// hit patrol 1
newGameboard.recieveAttack([4, 4]);
// hit patrol 2
newGameboard.recieveAttack([4, 5]);
newGameboard.recieveAttack([2, 1]);
newGameboard.recieveAttack([0, 0]);
// hit battlehship
newGameboard.recieveAttack([1, 1]);
console.table(newGameboard.ships.carrier.location);
console.table(newGameboard.ships.battleship.location);
console.table(newGameboard.ships.destroyer.location);
console.table(newGameboard.ships.submarine.location);
console.table(newGameboard.ships.patrol.location);

newGameboard.checkForDefeat();

newGameboard.checkForDefeat();
