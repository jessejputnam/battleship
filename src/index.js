"use strict";

import { Player } from "./Player";
import { displayBoats, squares, gameboards } from "./domInteraction";
import { getCompShipCoords } from "./getCompShipCoords";

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

//* ############# GAMEFLOW ##################
const board = gameboards[0];

let gameOver = false;

// Player chooses ship coordinates
const testCoords1 = [coords0, coords1, coords2, coords3, coords4];
const player = Player("player", testCoords1);

// Computer randomly chooses ship coordinates
const computer = Player("computer", getCompShipCoords());

console.log(player);
console.log(computer);

// Display boats on board
displayBoats(player);
displayBoats(computer);

board.addEventListener("click", (e) => {
  const square = e.target.closest(".square");
  if (!square) return;
  console.log([
    square.parentElement.classList[1].slice(-1),
    square.classList[1].slice(-1)
  ]);

  // Disallow already clicked squares
  if (square.classList.contains("square--hit")) return;
  if (square.classList.contains("square--miss")) return;

  // Player turn
  // console.log("Player turn");
  player.attack(computer, square);
  // console.log(player);

  //  Check for defeat
  if (computer.defeat === true) {
    console.log("Player wins!");
    //! Add display game over and restart
    return;
  }

  //! Deal with computer intelligence?
  // console.log("computer turn");
  computer.attack(player);
  // console.log(computer);
  console.log(computer.guesses);

  if (player.defeat === true) {
    console.log("Computer Wins!");
    //! Add display game over and restart
    return;
  }
});

// const check1 = [
//   [
//     [1, 6],
//     [2, 6],
//     [3, 6]
//   ],
//   [
//     [7, 2],
//     [7, 3],
//     [7, 4],
//     [7, 5]
//   ],
//   [
//     [0, 0],
//     [0, 1]
//   ]
// ];
// console.log(check1);
// console.log(check1.flat());
