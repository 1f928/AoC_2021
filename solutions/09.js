
const { range, sum } = require('../util');

// --

function first(input) {
  const lowPoints = getLowPoints(input);

  return sum(lowPoints.map(([x, y]) => input[y][x])) + lowPoints.length;
}

function second(input) {
  const fill = (x, y) => {
    const val = input[y]?.[x];
    if (val === 9 || val === undefined) return 0; 
    input[y][x] = 9;

    const adjacents = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1]
    ];

    return 1 + sum(adjacents.map(([x, y]) => fill(x, y)));
  };

  const lowPoints = getLowPoints(input);
  const basins = lowPoints.map(([x, y]) => fill(x, y));

  return basins
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((prod, n) => prod *= n);
}

function getLowPoints(map) {
  const lowPoints = [];

  for (y of range(map.length)) {
    for (x of range(map[0].length)) {
      const current = map[y][x];
      const adjacents = [
        map[y + 1]?.[x],
        map[y - 1]?.[x],
        map[y]?.[x + 1],
        map[y]?.[x - 1]
      ];

      const testLow = adjacents.filter((n) => isNaN(n) || n > current);
      if (testLow.length === adjacents.length) lowPoints.push([x, y]);
    }
  }

  return lowPoints
}

function format(input) {
  return input
    .split(/\r\n|\r|\n/)
    .map((line) => line
      .split('')
      .map((n) => parseInt(n))
    );
}

// --

module.exports = { 
  first: (input) => first(format(input)),
  second: (input) => second(format(input))
};
