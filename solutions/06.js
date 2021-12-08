
const { range, sum } = require('../util');

// --

function first(input) {
  return getPopAtDay(input, 80);
}

function second(input) {
  return getPopAtDay(input, 256);
}

function getPopAtDay(startPop, numDays) {
  const ages = Array.from({ length: 9 }).map(_ => 0);
  startPop.forEach((age) => ages[age]++);

  for (i of range(numDays)) {
    const births = ages.shift();
    ages.push(births);
    ages[6] += births;
  }

  return sum(ages);
}

function format(input) {
  return input
    .split(',')
    .map((n) => parseInt(n));
}

// --

module.exports = { 
  first: (input) => first(format(input)),
  second: (input) => second(format(input))
};
