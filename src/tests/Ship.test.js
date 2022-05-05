import { Ship } from "../Ship";

const cruiser = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5]
];

const sub = [
  [0, 1],
  [0, 2]
];

const destroyer = [
  [0, 1],
  [0, 2],
  [0, 3]
];

test("Ship length 5 has 5 health", () => {
  expect(Ship(cruiser).location.length).toEqual(5);
});

test("Hit causes a hit in position 1", () => {
  expect(Ship(sub).hit(1).location[1][1]).toEqual(true);
});

test("If all health is gone, sunk is true", () => {
  expect(Ship(destroyer).hit(0).hit(1).hit(2).isSunk().sunk).toEqual(true);
});
