import { Ship } from "../Ship";

test("Ship length 5 has 5 health", () => {
  expect(Ship(5).health).toEqual(["", "", "", "", ""]);
});

// test("Hit causes a hit in correct position", () => {
//   expect(Ship.hit(2))
// })
