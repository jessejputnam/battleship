"use strict";

/* DOM VARIABLES */
const main = document.querySelector(".main__wrapper");
const modal = document.querySelector("#menu__modal");
const modalText = document.querySelector(".menu__winner");
const gameboards = document.querySelectorAll(".gameboard");
const squares = document.querySelectorAll(".square");

const hideModal = function () {
  modal.classList.add("hidden--opacity");
  setTimeout(() => modal.classList.add("hidden--z"), 1000);
};

const revealModal = function (winner) {
  modalText.textContent = `${winner} wins!`;
  modal.classList.remove("hidden--z");
  modal.classList.remove("hidden--opacity");
};

const revealGameboards = function () {
  main.classList.add("reveal--opacity");
};

const displayBoats = function (player) {
  // Loop over each ship of player
  for (let ship in player.gameboard.ships) {
    // Get ship coordinates
    player.gameboard.ships[ship].location.forEach((coord) => {
      const gameboard =
        player.playerName === "computer" ? gameboards[0] : gameboards[1];
      const square = gameboard.children[coord[0][0]].children[coord[0][1]];

      // Add ship background color
      square.classList.add("square--ship");
      square.classList.add(`square--${ship}`);
    });
  }
};

const displayBoat = function (coords, shipName) {
  coords.forEach((coord) => {
    const square = gameboards[1].children[coord[0]].children[coord[1]];
    square.classList.add("square--ship");
    square.classList.add(`square--${shipName}`);
  });
};

const displayPositionSelection = function (coords) {
  console.log(coords);
  coords.forEach((coord) => {
    const square = gameboards[1].children[coord[0]].children[coord[1]];
    square.classList.add("square--ship");
    square.classList.add(`square--potential`);
  });
};

const removePositionSelection = function (coords) {
  coords.forEach((coord) => {
    const square = gameboards[1].children[coord[0]].children[coord[1]];
    console.log(square);
    square.classList.remove("square--ship");
    square.classList.remove(`square--potential`);
  });
};

const updateUI = function (player) {
  // Loop over hits
  player.gameboard.hits.forEach((hit) => {
    const gameboard =
      player.playerName === "computer" ? gameboards[0] : gameboards[1];
    const row = gameboard.children[hit[0]];
    const square = row.children[hit[1]];

    // Add hit background color
    square.classList.add(`square--hit`);
  });

  // Loop over misses
  player.gameboard.misses.forEach((miss) => {
    const gameboard =
      player.playerName === "computer" ? gameboards[0] : gameboards[1];
    const row = gameboard.children[miss[0]];
    const square = row.children[miss[1]];

    // Add hit background color
    square.classList.add(`square--miss`);
  });
};

const resetUI = function () {
  squares.forEach((square) => {
    square.classList.remove("square--hit");
    square.classList.remove("square--miss");
    square.classList.remove("animate-guess");
    square.classList.remove("square--carrier");
    square.classList.remove("square--battleship");
    square.classList.remove("square--destroyer");
    square.classList.remove("square--submarine");
    square.classList.remove("square--patrol");
    square.classList.remove("square--potential");
  });
};

const addGuessAnimation = function (enemyPlayer, coords) {
  const gameboard =
    enemyPlayer.playerName === "player" ? gameboards[1] : gameboards[0];
  const row = gameboard.children[coords[0]];
  const square = row.children[coords[1]];

  // add animation class
  square.classList.add("animate-guess");
};

export {
  gameboards,
  displayBoats,
  displayBoat,
  displayPositionSelection,
  removePositionSelection,
  updateUI,
  resetUI,
  addGuessAnimation,
  revealGameboards,
  hideModal,
  revealModal
};
