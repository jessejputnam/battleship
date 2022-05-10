"use strict";

import { Player } from "./Player";
import { displayBoats, squares, gameboards } from "./domInteraction";
// import { getAttackCoords } from "./getAttackCoords";

// carrier
const coords0 = [
  [2, 9],
  [3, 9],
  [4, 9],
  [5, 9],
  [6, 9]
];
// battleship
const coords1 = [
  [2, 0],
  [3, 0],
  [4, 0],
  [5, 0]
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
  [7, 4],
  [7, 5]
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
  [6, 4],
  [6, 5],
  [6, 6]
];
const coords9 = [
  [8, 6],
  [8, 7]
];

//* ############# GAMEFLOW ##################
const board = gameboards[0];

let gameOver = false;

// Player chooses ship coordinates
const testCoords1 = [coords0, coords1, coords2, coords3, coords4];
const player = Player("player", testCoords1);

// Computer randomly chooses ship coordinates
const testCoords2 = [coords5, coords6, coords7, coords8, coords9];
const computer = Player("computer", testCoords2);

console.log(player);
console.log(computer);

// Display boats on board
displayBoats(player);
displayBoats(computer);

board.addEventListener("click", (e) => {
  const square = e.target.closest(".square");
  if (!square) return;

  // Disallow already clicked squares
  if (square.classList.contains("square--hit")) return;
  if (square.classList.contains("square--miss")) return;

  // Player turn
  console.log("Player turn");
  player.attack(computer, square);
  console.log(player);

  //  Check for defeat
  if (computer.defeat === true) {
    console.log("Player wins!");
    //! Add display game over and restart
    return;
  }

  //! Deal with computer double guess
  //! Deal with computer intelligence?
  console.log("computer turn");
  computer.attack(player);
  console.log(computer);

  if (player.defeat === true) {
    console.log("Computer Wins!");
    //! Add display game over and restart
    return;
  }
});

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
