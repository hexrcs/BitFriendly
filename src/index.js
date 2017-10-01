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
      let copiedValue = createBitUnitsFromString(this.toString());
      let result = createBitUnitsFromString(createZeroBitUnits(copiedValue));
      // 0 + 0 = 0
      // 0 + 1 = 1
      // 1 + 0 = 1
      // 1 + 1 = 0 carry 1
      return createBinaryNumber({isStrict: this.isStrict, str: arrayToString(result)});
    },

    and({value}) {
      let copiedValue = createBitUnitsFromString(this.toString());
      // initialize an all 0 BitUnits
      let result = createBitUnitsFromString(createZeroBitUnits(copiedValue));
      // if both bits in the compared position are 1,
      // the bit in the resulting binary representation is 1,
      // otherwise it's 0
      for (let i = 0; i < copiedValue.length; ++i) {
        if (copiedValue[i].state === 1 && value[i] === 1)
          result[i].flip();
      } // TODO consider when not same length
      return createBinaryNumber({isStrict: this.isStrict, str: arrayToString(result)});
    },

    or({value}) {
      let copiedValue = createBitUnitsFromString(this.toString());
      let result = createBitUnitsFromString(createZeroBitUnits(copiedValue));
      // if not both bits are 0, the result is 1.
      for (let i = 0; i < copiedValue.length; ++i) {
        if (!(copiedValue[i].state === 0 && value[i] === 0)) {
          result[i].flip();
        }
      } // TODO consider when not same length
      return createBinaryNumber({isStrict: this.isStrict, str: arrayToString(result)});
    },

    xor({value}) {
      let copiedValue = createBitUnitsFromString(this.toString());
      let result = createBitUnitsFromString(createZeroBitUnits(copiedValue));
      // 1 if the two bits are different, and 0 if they are the same.
      for (let i = 0; i < copiedValue.length; ++i) {
        if (!(copiedValue[i].state === value[i])) {
          result[i].flip();
        }
      } // TODO consider when not same length
      return createBinaryNumber({isStrict: this.isStrict, str: arrayToString(result)});
    },

    // 1's complement
    not() {
      let copiedValue = createBitUnitsFromString(this.toString());
      for (let i = 0; i < copiedValue.length; ++i) {
        copiedValue[i].flip();
      }
      return createBinaryNumber({isStrict: this.isStrict, str: arrayToString(copiedValue)});
    },

    // rotate with carry to the right
    rcr() {
      let copiedValue = createBitUnitsFromString(this.toString());
      let originalLastBit = copiedValue[copiedValue.length - 1];
      copiedValue.pop();
      copiedValue.unshift(originalLastBit);
      // console.log(arrayToString(copiedValue));
      return createBinaryNumber({isStrict: this.isStrict, str: arrayToString(copiedValue)});
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

function createZeroBitUnits(value = []) {
  let zeroStr = "";
  for (let i = 0; i < value.length; ++i) {
    zeroStr = 0 + zeroStr;
  }
  return zeroStr;
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