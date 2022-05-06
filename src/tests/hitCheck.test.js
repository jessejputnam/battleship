import { hitCheck } from "../hitCheck";
import { testGame } from "./testGame";

test("Battleship should take damage from correct coordinate", () => {
  expect(hitCheck(testGame, [1, 1])[1]).toBe(true);
});
