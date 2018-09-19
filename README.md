# BitFriendly

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

BitFriendly makes it easier to work with bitwise operations or bit shifts in Javascript on arbitrarily sized binary numbers, allowing more freedom than the built-in [32-bit numbers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) for fun and profit. ;)

## Installation

The preferred method of installation is using [**npm**](https://github.com/npm/npm):

```bash
$ npm i bitfriendly
```

You can also download the latest [zip file](https://github.com/hexrcs/BitFriendly/archive/master.zip) or copy and use the [Javascript file](https://github.com/hexrcs/BitFriendly/raw/master/src/index.js) directly.

## Features

- Binary numbers of arbitrary size
- Conventional bitwise operations and bit shifts
- More binary maths coming soon...

## Usage

```js
// First, require the library, this returns a object with two functions -
// "bitArray(vals)" for constructing an array of boolean values to represent our binary number...
// and "operate(arr)" for carrying out bitwise operations and bit shifts
const {operate, bitArray} = require ('bitfriendly')

// ... or with ES6 import statement
// import {operate, bitArray} from 'bitfriendly'

// Pure strings and arrays of mixed 1, 0, true, false are allowed for constructor
const binaryNumberFromString = bitArray('100101')
console.log(binaryNumberFromString)

const binaryNumberFromMixedArray = bitArray([1, false, false, true, '0', 1])
console.log(binaryNumberFromMixedArray)

console.log(
  operate(binaryNumberFromString)
    .eql(binaryNumberFromMixedArray)
    .toString()
)

// We can also alias the function for cleaner code (or use the `as` keyword when importing)
const bin = bitArray
const op = operate

// Now let's do some math!
const a = bin('11011101')
const b = bin('01000100')

const aPlusB = op(a).add(b)
// toString() converts the boolean array to a string consists of 0's and 1's
console.log(aPlusB.toString())

const awesome = (aNotPlusBThenRotateToRightWithCarry = op(a)
  .not()
  .add(b)
  .rcr())
console.log(awesome.toString())

const thenXorB = awesome.xor(b)
console.log(thenXorB.toString())

// More operators and toString(options) or toInt() functions are being added! ;)
```

## Why Create BitFriendly?

It's fun to explore the binary world. BitFriendly utilizes Javascript arrays and booleans to simulate bits, making binary operations more flexible.

BitFriendly is created for my own need for implementing a Javascript simulator of the [Minimal Machine (MIMA)](http://ti.ira.uka.de/Visualisierungen/Mima/mima-aufgaben.pdf) and [MIMA Simulator](http://ti.ira.uka.de/Visualisierungen/Mima/)), which is used in the [computer engineering lectures](http://ti.itec.uka.de/) at [Karlsruhe Institute of Technology](http://www.kit.edu/).

## Project Status

The current version of BitFriendly supports common operations `AND`, `OR`, `XOR`, `NOT`, `EQL` and `ADD`, as well as one kind of bit shift `RCR` (Rotate with Carry to the Right). Algorithmic operators like subtraction, division and more bit-shift operations are coming soon. Human-friendly toString and toInt functions are also on the roadmap.

## License

BitFriendly is distributed under the MIT License. For more information, read the file [LICENSE](LICENSE).
