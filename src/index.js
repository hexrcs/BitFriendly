module.exports = {operate, bitArray};

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

function operate(arr = []) {
  return {
    left: arr,

    eql(right = []) {
      let result = eqlOperation(this.left, right);
      return operate(result);
    },

    and(right = []) {
      let result = andOperation(this.left, right);
      return operate(result);
    },

    add(right = []) {
      let result = addOperation(this.left, right);
      return operate(result);
    },

    or(right = []) {
      let result = orOperation(this.left, right);
      return operate(result);
    },

    xor(right = []) {
      let result = xorOperation(this.left, right);
      return operate(result);
    },

    not() {
      let result = notOperation(this.left);
      return operate(result);
    },

    rcr() {
      let result = rcrOperation(this.left);
      return operate(result);
    },

    toString() {
      let output = "";
      for (let val of this.left) {
        if (val) {
          output = output + "1";
        } else {
          output = output + "0";
        }
      }
      return output;
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

function eqlOperation(left = [], right = []) {
  if (left.length !== right.length) {
    throw (new Error("Bitwise EQL can only be performed on 2 operands with same length"));
  }
  let isEqual = true;
  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) {
      isEqual = false;
      break;
    }
  }

  // return -1 in two's complement if same, return 0 if not
  if (isEqual) {
    return new Array(left.length).fill(true);
  } else {
    return new Array(left.length).fill(false);
  }
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

    left = tempArr;
    // reformat carry array to original size - trim the extra unnecessary left-most bit
    right = format(carryArr, width);
  }

  return left;
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