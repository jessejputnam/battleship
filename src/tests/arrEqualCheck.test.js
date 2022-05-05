import { arrEqualCheck } from "../arrEqualCheck";

test("Array 1 and 2 should be equal", () => {
  expect(arrEqualCheck([0, 1], [0, 1])).toBe(true);
});

test("Array 1 and 2 should be equal", () => {
  expect(arrEqualCheck([0, 1], [1, 1])).toBe(false);
});
