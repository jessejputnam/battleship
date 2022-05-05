const arrEqualCheck = function (arr1, arr2) {
  return arr1.every((val, index) => val === arr2[index]);
};

export { arrEqualCheck };
