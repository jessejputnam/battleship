const Ship = function (length) {
  const health = new Array(length);
  health.fill("");
  let sunk = false;

  return { length, health, sunk };
};

export { Ship };
