"use strict";

const arrEqualCheck = function (arr1, arr2) {
  return arr1.every((val, index) => val === arr2[index]);
};

const isAlreadyGuessed = function (nestedArr, arr) {
  const output = [];
  nestedArr.forEach((nest) => {
    output.push(arrEqualCheck(nest, arr));
  });
  return output.includes(true);
};

export { arrEqualCheck, isAlreadyGuessed };
