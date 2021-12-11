
const { sum } = require('../util');

// --

const closeMatches = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<"
};

const openMatches = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">"
};

function first(input) {
  const illegalChars = [];

  for (line of input) {
    const syntaxStack = [];
    for (char of line) {
      if (char in closeMatches) {
        if (syntaxStack.pop() !== closeMatches[char]) {
          illegalChars.push(char);
          break;
        }
      } else {
        syntaxStack.push(char);
      }
    }
  }

  const points = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
  };

  return sum(illegalChars.map((char) => points[char]));
}

function second(input) {
  const remainders = [];

  outer:
  for (line of input) {
    const syntaxStack = [];
    for (char of line) {
      if (char in closeMatches) {
        if (syntaxStack.pop() !== closeMatches[char]) {
          continue outer;
        }
      } else {
        syntaxStack.push(char);
      }
    }
      
    remainders.push(syntaxStack.map((char) => openMatches[char]));
  }

  const points = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
  };

  return remainders
    .map((stack) => stack.reduceRight((sum, char) => sum * 5 + points[char], 0))
    .sort((a, b) => a - b)
    [Math.floor(remainders.length / 2)];
}

function format(input) {
  return input
    .split(/\r\n|\r|\n/)
    .map((line) => line.split(''));
}

// --

module.exports = { 
  first: (input) => first(format(input)),
  second: (input) => second(format(input))
};
