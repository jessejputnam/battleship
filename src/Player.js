import { Gameboard } from "./Gameboard";

const Player = function (playerName, coords, gameOver) {
  const gameboard = Gameboard(...coords);
  const guesses = [];
  const attack = function (enemyGameboard, coords) {
    const turn = enemyGameboard.receiveAttack(coords);

    // Exit if already guessed
    if (turn === false) return;

    //! NEED TO STORE GAME OVER INFORMATION SOMWHERE (GAMEFLOW?)
    const defeatCheck = enemyGameboard.checkForDefeat();
    if (defeatCheck.defeat === true) {
      console.log(`Game over: ${this.name} wins`);
      return;
    }

    //! CHANGE ACTIVE PLAYER
  };

  return { playerName, guesses, attack, gameboard };
};

export { Player };
