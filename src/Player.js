"use strict";

import { Gameboard } from "./Gameboard";

const Player = function (playerName, coords) {
  const gameboard = Gameboard(...coords);
  const guesses = [];

  const attack = function (enemyGameboard, coords) {
    const turn = enemyGameboard.receiveAttack(coords);

    // Exit if already guessed
    if (turn === false) return this;

    guesses.push(coords);

    //! NEED TO STORE GAME OVER INFORMATION SOMEWHERE (GAMEFLOW?)
    const defeatCheck = enemyGameboard.checkForDefeat();
    if (defeatCheck.defeat === true) {
      console.log(`Game over: ${this.playerName} wins`);
      return;
    }
  };

  //! CHANGE ACTIVE PLAYER

  return { playerName, guesses, attack, gameboard };
};

export { Player };
