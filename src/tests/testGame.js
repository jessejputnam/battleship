import { Gameboard } from "../Gameboard";
// carrier
// prettier-ignore
const coords0 = [[2, 2], [2, 3], [2, 4], [2, 5], [2, 6]];
// battleship
// prettier-ignore
const coords1 = [[1, 1], [1, 2], [1, 3], [1, 4]];
// destroyer
// prettier-ignore
const coords2 = [[0, 1], [0, 2], [0, 3]];
// submarine
// prettier-ignore
const coords3 = [[3, 3], [3, 4], [3, 5]];
// patrol
// prettier-ignore
const coords4 = [[4, 4], [4, 5]];

const testCoords = [coords0, coords1, coords2, coords3, coords4];

const testGame = Gameboard(...testCoords);

export { testGame, testCoords };
