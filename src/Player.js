"use strict";

import { Gameboard } from "./Gameboard";
import { getAttackCoordsComp, getAttackCoordsPlayer } from "./getAttackCoords";

const Player = function (playerName, coords) {
  const gameboard = Gameboard(...coords);
  const guesses = [];
  let defeat = false;

  const attack = function (enemy, square) {
    // console.log(enemy);
    const coords =
      enemy.playerName === "player"
        ? getAttackCoordsComp(guesses)
        : getAttackCoordsPlayer(square);

    const turn = enemy.gameboard.receiveAttack(coords);

    // Exit if already guessed
    if (turn === false) return this;

    // Add guess to array
    guesses.push(coords);

    // Check defeat
    enemy.defeat = enemy.gameboard.checkAllSunk();
  };

  return { playerName, guesses, attack, gameboard, defeat };
};

export { Player };
