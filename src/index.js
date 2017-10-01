// factory to create binary numbers with all info attached

function createBinaryNumber({isStrict = true, str, length = str.length}) {
  return {
    isStrict,
    str: assureLength(str, length),
    length: assureLength(str, length).length, // if given length is smaller than actual, this will be actual length
    value: createBitUnitsFromString(assureLength(str, length)),

    toString(format = "empty") {
      let binaryOutput = arrayToString(this.value);
      switch (format) {
        case "empty":
        case 2:
          return binaryOutput;
        case 16:
          return "0x" + parseInt(binaryOutput, 2).toString(16);
        case 10:
          return parseInt(binaryOutput, 2).toString(10);
        default:
          return "This is not working LOL your format argument is illegal!"
      }
    },

    // don't need to care isStrict first, consider both operands have same length for now
    // TODO make isStrict work

    add({value}) {
      let result = "";
      return createBinaryNumber({str: result});
    },

    and({value}) {
      let result = "";
      return createBinaryNumber({str: result});
    },

    or({value}) {
      let result = "";
      return createBinaryNumber({str: result});
    },

    xor({value}) {
      let result = "";
      return createBinaryNumber({str: result});
    },

    // 1's complement
    not() {
      let copiedValue = createBitUnitsFromString(this.toString());
      for (let i = 0; i < copiedValue.length; ++i) {
        copiedValue[i].flip();
      }
      return createBinaryNumber(arrayToString(copiedValue));
    },

    // rotate with carry to the right
    rcr() {
      let copiedValue = createBitUnitsFromString(this.toString());
      let originalLastBit = copiedValue[copiedValue.length - 1];
      copiedValue.pop();
      copiedValue.unshift(originalLastBit);
      // console.log(arrayToString(copiedValue));
      return createBinaryNumber(arrayToString(copiedValue));
    },

    idle() {
      return this;
    }
  }
}

// if given length is smaller than actual length, this function will do nothing
const assureLength = (str = "", length = str.length) => {
  let padding = "";
  for (let i = 0; i < length - str.length; ++i) {
    padding = padding + "0";
  }
  return padding + str;
};

const createBitUnitsFromString = (str = "") => {
  const bitUnits = [];
  for (let i = 0; i < str.length; ++i) {
    let newBitUnit = Number(str[i]); // exception (not 0 or 1) handling later
    bitUnits.push(createBitUnit(newBitUnit));
  }
  return bitUnits;
};

function arrayToString(arr = []) {
  let output = "";
  for (let i = 0; i < arr.length; ++i) {
    output = output + arr[i].toString();
  }
  return output;
}

function createBitUnit(initialState = 0) {
  return {
    state: initialState,
    flip() {
      if (this.state === 0) {
        return createBitUnit(1);
      } else return createBitUnit(0);
    },

    toString() {
      return this.state;
    }
  }
}

// tests
// createBinaryNumber({str: 1001}).rcr();