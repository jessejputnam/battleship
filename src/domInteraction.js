"use strict";

/* DOM VARIABLES */
const gameboards = document.querySelectorAll(".gameboard");
const rows = document.querySelectorAll(".row");
const squares = document.querySelectorAll(".square");

const displayBoats = function (player) {
  // Loop over each ship of player
  for (let ship in player.gameboard.ships) {
    // Get ship coordinates
    player.gameboard.ships[ship].location.forEach((coord) => {
      const gameboard =
        player.playerName === "computer" ? gameboards[0] : gameboards[1];
      const row = gameboard.children[coord[0][0]];
      const square = row.children[coord[0][1]];

      // Add ship background color
      square.classList.add(`square--${ship}`);
    });
  }
};

export { displayBoats, squares, rows, gameboards };
