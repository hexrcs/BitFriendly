function bitUnit(val) {
  switch (val) {
    case 1:
    case "1":
    case true:
      return true;
    case 0:
    case "0":
    case false:
      return false;
    default:
      return undefined;
  }
}

function bitArray(vals) {
  let arr = [];
  for (let val of vals) {
    arr.push(bitUnit(val));
  }
  return arr;
}

function format(arr = [], width = arr.length) {
  if (arr.length < width) {
    let paddingCount = width - arr.length;
    for (let i = 0; i < paddingCount; ++i) {
      arr.unshift(false);
    }
  } else {
    let trimmingCount = arr.length - width;
    for (let i = 0; i < trimmingCount; ++i) {
      arr.shift();
    }
  }
  return arr;
}

function operate(arr = [], width = arr.length, altWidth = width) {
  return {
    realArr: arr,
    formattedArr: format(arr, width),
    altFormattedArr: format(arr, altWidth),

    and(right = []) {

    }
  }
}

function isZero(arr) { // check if the array is all 0/false
  for (let val of arr) {
    if (val === true) {
      return false;
    }
  }
  return true;
}

function addOperation(left = [], right = []) {
  if (left.length !== right.length) {
    throw (new Error("Bitwise ADD can only be performed on 2 operands with same length"));
  }
  let tempArr;
  let carryArr;
  const width = left.length;

  // the operation completes when the right operand (the carry array) is zero
  while (!isZero(right)) {
    tempArr = [];
    carryArr = [false];  // preset the right most bit to 0/false
    for (let i = left.length - 1; i >= 0; --i) { // validate from right to left
      if (left[i] && right[i]) { // 1 + 1 = 0 carry 1
        tempArr.unshift(false);
        carryArr.unshift(true);
      } else if (!left[i] && !right[i]) { // 0 + 0 = 0 carry 0
        tempArr.unshift(false);
        carryArr.unshift(false);
      } else { // 1 + 0 = 1; 0 + 1 = 1 ===> carry 0
        tempArr.unshift(true);
        carryArr.unshift(false);
      }
    }

    left = tempArr.unshift(false);
    right = carryArr;
  }

  return format(left, width); // reformat array to original size - trim the extra unnecessary bits
}

function andOperation(left = [], right = []) {
  if (left.length !== right.length) {
    throw (new Error("Bitwise AND can only be performed on 2 operands with same length"));
  }
  let result = [];
  for (let i = left.length - 1; i >= 0; --i) { // validate from right to left
    if (left[i] && right[i]) { // if only the i-th values are both true, result is true
      result.unshift(true);
    } else {
      result.unshift(false);
    }
  }
  return result;
}

function orOperation(left = [], right = []) {
  if (left.length !== right.length) {
    throw (new Error("Bitwise OR can only be performed on 2 operands with same length"));
  }
  let result = [];
  for (let i = left.length - 1; i >= 0; --i) { // validate from right to left
    if (!left[i] && !right[i]) { // if only the i-th values are both false, result is false
      result.unshift(false);
    } else {
      result.unshift(true);
    }
  }
  return result;
}

function xorOperation(left = [], right = []) {
  if (left.length !== right.length) {
    throw (new Error("Bitwise XOR can only be performed on 2 operands with same length"));
  }
  let result = [];
  for (let i = left.length - 1; i >= 0; --i) { // validate from right to left
    if (left[i] === right[i]) { // if only the i-th values are same, result is true
      result.unshift(true);
    } else {
      result.unshift(false);
    }
  }
  return result;
}

function notOperation(left = []) {
  let result = [];
  for (let i = left.length - 1; i >= 0; --i) { // validate from right to left
    result.unshift(!left[i]);
  }
  return result;
}

function rcrOperation(left = []) {
  if (left.length === 0) {
    return [];
  }
  let result = [];
  for (let i = left.length - 2; i >= 0; --i) { // validate from right to left
    result.unshift(left[i]);
  }
  result.unshift(left[left.length - 1]);
  return result;
}
