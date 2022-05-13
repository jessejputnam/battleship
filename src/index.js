"use strict";
import {
  gameboards,
  displayBoats,
  displayBoat,
  updateUI,
  resetUI,
  addGuessAnimation,
  revealGameboards,
  hideModal,
  revealModal
} from "./domInteraction";
import { newGame } from "./newGame";
import { makeShip } from "./makeShip";
import { isAlreadyGuessed } from "./arrEqualCheck";

//* ########### Initial Ship Coords ###############
// carrier
// prettier-ignore
const coords0 = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]];

// battleship
// prettier-ignore
const coords1 = [[0, 1], [1, 1], [2, 1], [3, 1]];

// destroyer
// prettier-ignore
const coords2 = [[0, 2], [1, 2], [2, 2]];

// submarine
// prettier-ignore
const coords3 = [[0, 3], [1, 3], [2, 3]];

// patrol
// prettier-ignore
const coords4 = [[0, 4], [1, 4]];

const testCoords1 = [coords0, coords1, coords2, coords3, coords4];

//* ############# DOM Variables ##################
const board = gameboards[0];
const newGameBtn = document.querySelector("#new-game");

//* ############# Gameflow ##################
// Player Variables
let player;
let computer;

const placementModal = document.querySelector("#placement__modal");
let shipCarrier, shipDestroyer, shipBattleship, shipPatrol, shipSubmarine;

const isValidMove = function (newShip, playerCoords) {
  const checkNewShip = newShip.map((coord) =>
    isAlreadyGuessed(playerCoords, coord)
  );
  const checks = [
    checkNewShip.every((x) => x === false),
    newShip.flat().every((x) => x >= 0 && x < 10)
  ];

  return !checks.includes(false);
};

// Start New Game
newGameBtn.addEventListener("click", () => {
  revealGameboards();
  hideModal();

  resetUI();

  // Create array to save as coords
  const playerCoords = [];

  // Reveal add ship menu
  placementModal.classList.remove("hidden--z");
  placementModal.classList.add("reveal--opacity");

  shipCarrier = makeShip(playerCoords, 5);
  displayBoat(shipCarrier, "carrier");

  window.addEventListener("keydown", (e) => {
    const key = e.key;
    if (key === "ArrowLeft") {
      const newCarrier = shipCarrier.map((coord) => [coord[0], coord[1] - 1]);
      if (isValidMove(newCarrier, playerCoords)) shipCarrier = newCarrier;
    }

    if (key === "ArrowRight") {
      const newCarrier = shipCarrier.map((coord) => [coord[0], coord[1] + 1]);
      if (isValidMove(newCarrier, playerCoords)) shipCarrier = newCarrier;
    }

    if (key === "ArrowDown") {
      const newCarrier = shipCarrier.map((coord) => [coord[0] + 1, coord[1]]);
      if (isValidMove(newCarrier, playerCoords)) shipCarrier = newCarrier;
    }

    if (key === "ArrowUp") {
      const newCarrier = shipCarrier.map((coord) => [coord[0] - 1, coord[1]]);
      if (isValidMove(newCarrier, playerCoords)) shipCarrier = newCarrier;
    }

    resetUI();
    // if (playerCoords.length > 0)
    //   playerCoords.forEach((ship) => displayBoat(ship));
    displayBoat(shipCarrier, "carrier");
    // console.log(shipCarrier);
  });

  // displayBoats();

  // Randomly place carrier

  // const game = newGame(testCoords1);

  // player = game[0];
  // computer = game[1];

  // displayBoats(player);

  // // Choose ship positions
  // shipCarrier = document.querySelectorAll(".square--carrier");
  // shipBattleship = document.querySelectorAll(".square--battleship");
  // shipDestroyer = document.querySelectorAll(".square--destroyer");
  // shipSubmarine = document.querySelectorAll(".square--submarine");
  // shipPatrol = document.querySelectorAll(".square--patrol");

  // shipCarrier.forEach((square) => {
  //   square.addEventListener("drag", (e) => {});
  // });
});

// Turn Gameplay
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
    revealModal("Player");
    return;
  }

  // Computer turn
  computer.attack(player);
  updateUI(player);
  addGuessAnimation(player, computer.guesses.slice(-1)[0]);

  // Check for defeat
  if (player.defeat === true) {
    revealModal("Computer");
    return;
  }
});
