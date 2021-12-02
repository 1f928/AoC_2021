const { range } = require('./util');

function first(input) {
  let prev = input.shift();
  let count = 0;
  
  for (num of input) {
    if (num > prev) count++;
    prev = num;
  }

  return count;
}

function second(input) {
  let count = 0
  for (i of range(input.length - 3)) {
    const cur = input[i];
    const plus3 = input[i + 3];

    if (plus3 - cur > 0) count++;
    else console.log(plus3 - cur)
  }

  return count;
}

// --

const input = require('./input')('01')
  .split('\n')
  .map((numStr) => parseInt(numStr));

console.log(first([...input]));
console.log(second([...input]));

