import { Gameboard } from "../Gameboard";
import { testCoords } from "./testGame";

test("Hit on destroyer causes hit in correct location", () => {
  expect(
    Gameboard(...testCoords).receiveAttack([0, 2]).ships.destroyer
      .location[1][1]
  ).toBe(true);
});

test("Miss is added to array", () => {
  expect(Gameboard(...testCoords).receiveAttack([0, 0]).misses.length).toBe(1);
});

test("Hit is added to array", () => {
  expect(Gameboard(...testCoords).receiveAttack([3, 3]).hits.length).toBe(1);
});

test("Do not allow previous guess of miss to be added to array", () => {
  expect(
    Gameboard(...testCoords)
      .receiveAttack([0, 0])
      .receiveAttack([0, 0])
  ).toBe(false);
});

test("Do not allow previous guess of hit to be added to array", () => {
  expect(
    Gameboard(...testCoords)
      .receiveAttack([3, 3])
      .receiveAttack([3, 3])
  ).toBe(false);
});

test("Patrol is sunk after 2 hits", () => {
  expect(
    Gameboard(...testCoords)
      .receiveAttack([4, 4])
      .receiveAttack([4, 5]).ships.patrol.sunk
  ).toBe(true);
});

test("Sinking all ships triggers defeat", () => {
  expect(
    Gameboard(...testCoords)
      .receiveAttack([2, 2])
      .receiveAttack([2, 3])
      .receiveAttack([2, 4])
      .receiveAttack([2, 5])
      .receiveAttack([2, 6])
      .receiveAttack([1, 1])
      .receiveAttack([1, 2])
      .receiveAttack([1, 3])
      .receiveAttack([1, 4])
      .receiveAttack([0, 1])
      .receiveAttack([0, 2])
      .receiveAttack([0, 3])
      .receiveAttack([3, 3])
      .receiveAttack([3, 4])
      .receiveAttack([3, 5])
      .receiveAttack([4, 4])
      .receiveAttack([4, 5])
      .checkForDefeat().defeat
  ).toBe(true);
});

test("All ships must be sunk for defeat", () => {
  expect(
    Gameboard(...testCoords)
      .receiveAttack([2, 2])
      .receiveAttack([2, 3])
      .receiveAttack([2, 4])
      .receiveAttack([2, 5])
      .receiveAttack([2, 6])
      .receiveAttack([1, 1])
      .receiveAttack([1, 2])
      .receiveAttack([1, 3])
      .receiveAttack([1, 4])
      .receiveAttack([0, 1])
      .receiveAttack([0, 2])
      .receiveAttack([0, 3])
      .receiveAttack([3, 3])
      .receiveAttack([3, 4])
      .receiveAttack([3, 5])
      .receiveAttack([4, 4])
      .checkForDefeat().defeat
  ).toBe(false);
});
