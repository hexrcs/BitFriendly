// factory to create binary numbers with all info attached
const createBinaryNumber = ({isStrict = true, str, length = str.length}) => ({
  isStrict,
  str: assureLength(str, length),
  length: assureLength(str, length).length, // if given length is smaller than actual, this will be actual length
  value: createBitUnitsFromString(assureLength(str, length)),

  toString(format = "empty") {
    switch (format) {
      case "empty":
      case 2:
        return this.str;
      case 16:
        return "0x" + parseInt(this.str, 2).toString(16);
      case 10:
        return parseInt(this.str, 2).toString(10);
      default:
        return "This is not working LOL your format argument is illegal!"
    }
  }
});

// TODO const operation = ({});

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


const createBitUnit = (initialState = 0) => ({
  state: initialState,
  flip() {
    if (this.state === 0) {
      this.state = 1;
    } else this.state = 0;
  }
});
