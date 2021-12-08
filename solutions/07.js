
const { sum } = require('../util');

// --

function first(input) {
  const alignPos = input.sort((a, b) => a - b)[input.length / 2];
  return sum(input.map((pos) => Math.abs(pos - alignPos)));
}

// I don't claim to understand why, but a simple Math.round()
// doesn't work here - I would have thought it would, but 447.5 was
// the mean value (which rounds up) while 447 was the correct alignPos.
// In the example scenario, 4.9 is the mean, and 5 is the alignPos.
// I'm sure there's a more efficient way of figuring out which side is
// the correct alignPos, but checking both ints was good enough for me.
function second(input) {
  const posFloat = sum(input) / input.length;
  const lowPos = Math.trunc(posFloat);
  const highPos = Math.ceil(posFloat);

  const getFuelCost = (alignPos) => sum(input.map((pos) => {
    const delta = Math.abs(pos - alignPos);
    return (delta * (delta + 1)) / 2
  }));

  return Math.min(getFuelCost(lowPos), getFuelCost(highPos));
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
