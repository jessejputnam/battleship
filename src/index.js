"use strict";
import {
  gameboards,
  displayBoats,
  displayBoat,
  displayPositionSelection,
  resetSelectionUI,
  updateUI,
  resetUI,
  addGuessAnimation,
  revealGameboards,
  hideModal,
  revealModal,
  revealAddShipMenu,
  removeSelectionFromShip,
  hideAddShipMenu
} from "./domInteraction";
import { newGame } from "./newGame";
import { isValidMove } from "./isValidMove";
import { createPotentialShip, getPotentialCoords } from "./createPotentialShip";

//* ############# DOM Variables ##################
const board = gameboards[0];
const squares = document.querySelectorAll(".square");
const newGameBtn = document.querySelector("#new-game");
const placementModal = document.querySelector("#placement__modal");
const btnRotateShip = document.querySelector("#spin-ship");
const beginGameBtn = document.querySelector("#begin-game");

//* ############# Gameflow ##################
// Game Variables
const shipOrder = ["carrier", "battleship", "destroyer", "submarine", "patrol"];
const shipsHealth = [5, 4, 3, 3, 2];

let player;
let computer;
let potentialCoords;
let playerCoords;

let vertAlign = false;

// Rotate horizontal or vertical ship alignment on selection screen
btnRotateShip.addEventListener("click", () => {
  vertAlign = !vertAlign;
});

// Start New Game
newGameBtn.addEventListener("click", () => {
  //? Reset visuals
  revealGameboards();
  hideModal();

  resetUI();

  // Reveal add ship menu
  revealAddShipMenu(placementModal);

  //? Player Choose ship placement
  // Set new PlayerCoords array
  playerCoords = [];

  squares.forEach((square) => {
    // MOUSE ENTER -- Hover over to see potential ship placement
    square.addEventListener("mouseenter", (e) => {
      // Get coordinates
      const coords = getPotentialCoords(e);

      potentialCoords = createPotentialShip(
        shipsHealth[playerCoords.length],
        vertAlign,
        coords
      );

      if (!isValidMove(potentialCoords, playerCoords)) {
        resetSelectionUI();
        return;
      }

      displayPositionSelection(potentialCoords);
    });

    // MOUSE CLICK -- Store potential ship
    square.addEventListener("click", () => {
      // Exit if all ships chosen
      if (playerCoords.length === 5) return;

      if (!isValidMove(potentialCoords, playerCoords)) return;

      // Remove red background; add gray to chosen ship
      const shipSelected = document.querySelector(
        `#ship-select-${playerCoords.length}`
      );

      removeSelectionFromShip(shipSelected);

      // Display boat on screen
      displayBoat(potentialCoords, shipOrder[playerCoords.length]);

      // Add chosen ship to array
      playerCoords.push(potentialCoords);

      // Exit if all ships chosen
      if (playerCoords.length === 5) return;

      // Add red selector to next ship
      document
        .querySelector(`#ship-select-${playerCoords.length}`)
        .classList.add("ship--selected");
    });

    // MOUSE LEAVE -- Erase previous potential ship placement on hover exit
    square.addEventListener("mouseleave", (e) => {
      resetSelectionUI();
    });
  });
});

beginGameBtn.addEventListener("click", () => {
  if (playerCoords.length !== 5) return;

  hideAddShipMenu(placementModal);
  const game = newGame(playerCoords);

  player = game[0];
  computer = game[1];

  resetUI();
  displayBoats(player);
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
