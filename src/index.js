"use strict";
import {
  gameboards,
  displayBoats,
  updateUI,
  resetUI,
  addGuessAnimation
} from "./domInteraction";
import { newGame } from "./newGame";

//* ############# DOM Variables ##################
const board = gameboards[0];

//* ############# Gameflow ##################
// Player Variables
let player;
let computer;

// New Game
document.querySelector("#test").addEventListener("click", () => {
  resetUI();

  const game = newGame();

  player = game[0];
  computer = game[1];

  displayBoats(player);
});

// Play Game
board.addEventListener("click", (e) => {
  const square = e.target.closest(".square");
  if (!square) return;

  // Disallow if gameover
  if (player.defeat === true || computer.defeat === true) return;

  // Disallow already clicked squares
  if (square.classList.contains("square--hit")) return;
  if (square.classList.contains("square--miss")) return;

  // Player turn
  player.attack(computer, square);
  updateUI(computer);

  //  Check for defeat
  if (computer.defeat === true) {
    console.log("Player wins!");
    //! Add display game over and restart
    return;
  }

  // Computer turn
  computer.attack(player);
  updateUI(player);
  addGuessAnimation(player, computer.guesses.slice(-1)[0]);

  // Check for defeat
  if (player.defeat === true) {
    console.log("Computer Wins!");
    //! Add display game over and restart
    return;
  }
});
