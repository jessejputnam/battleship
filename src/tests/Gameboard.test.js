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

test("Hit on destroyer causes hit in correct location", () => {
  expect(
    Gameboard(...testCoords).recieveAttack([0, 2]).ships.destroyer
      .location[1][1]
  ).toBe(true);
});

test("Miss is added to array", () => {
  expect(Gameboard(...testCoords).recieveAttack([0, 0]).misses.length).toBe(1);
});

test("Hit is added to array", () => {
  expect(Gameboard(...testCoords).recieveAttack([3, 3]).hits.length).toBe(1);
});

test("Do not allow previous guess of miss to be added to array", () => {
  expect(
    Gameboard(...testCoords)
      .recieveAttack([0, 0])
      .recieveAttack([0, 0]).misses.length
  ).toBe(1);
});

test("Do not allow previous guess of hit to be added to array", () => {
  expect(
    Gameboard(...testCoords)
      .recieveAttack([3, 3])
      .recieveAttack([3, 3]).hits.length
  ).toBe(1);
});

test("Patrol is sunk after 2 hits", () => {
  expect(
    Gameboard(...testCoords)
      .recieveAttack([4, 4])
      .recieveAttack([4, 5]).ships.patrol.sunk
  ).toBe(true);
});

test("Sinking all ships triggers defeat", () => {
  expect(
    Gameboard(...testCoords)
      .recieveAttack([2, 2])
      .recieveAttack([2, 3])
      .recieveAttack([2, 4])
      .recieveAttack([2, 5])
      .recieveAttack([2, 6])
      .recieveAttack([1, 1])
      .recieveAttack([1, 2])
      .recieveAttack([1, 3])
      .recieveAttack([1, 4])
      .recieveAttack([0, 1])
      .recieveAttack([0, 2])
      .recieveAttack([0, 3])
      .recieveAttack([3, 3])
      .recieveAttack([3, 4])
      .recieveAttack([3, 5])
      .recieveAttack([4, 4])
      .recieveAttack([4, 5])
      .checkForDefeat().defeat
  ).toBe(true);
});

test("All ships must be sunk for defeat", () => {
  expect(
    Gameboard(...testCoords)
      .recieveAttack([2, 2])
      .recieveAttack([2, 3])
      .recieveAttack([2, 4])
      .recieveAttack([2, 5])
      .recieveAttack([2, 6])
      .recieveAttack([1, 1])
      .recieveAttack([1, 2])
      .recieveAttack([1, 3])
      .recieveAttack([1, 4])
      .recieveAttack([0, 1])
      .recieveAttack([0, 2])
      .recieveAttack([0, 3])
      .recieveAttack([3, 3])
      .recieveAttack([3, 4])
      .recieveAttack([3, 5])
      .recieveAttack([4, 4])
      .checkForDefeat().defeat
  ).toBe(false);
});
