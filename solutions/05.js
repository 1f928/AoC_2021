
const { range, sum } = require('../util');

// --

function first(input) {
  const seaFloor = Array.from({ length: 1_000 }).map((line) => 
    Array.from({ length: 1_000 }).map(_ => 0)
  );

  for (line of input) {
    const x1 = line[0][0];
    const x2 = line [1][0];
    const y1 = line[0][1];
    const y2 = line [1][1];

    if (x1 === x2) {
      for (y of range(y1, y2, (y1 < y2) ? 1 : -1)) {
        seaFloor[x1][y]++
      }
    } else if (y1 === y2) {
      for (x of range(x1, x2, (x1 < x2) ? 1 : -1)) {
        seaFloor[x][y1]++
      }
    } else {
      // Skip diagonal lines
      continue;
    }
  }

  return sum(seaFloor.map((line) => sum(line.map((n) => n > 1 ? 1 : 0))));
}

// Slightly different, more homogeneous solution (vs. first)
function second(input) {
  const seaFloor = Array.from({ length: 1_000 }).map((line) => 
    Array.from({ length: 1_000 }).map(_ => 0)
  );

  const getIncrement = (n) => n === 0 ? 0 : n > 0 ? 1 : -1;

  for (line of input) {
    const x1 = line[0][0];
    const x2 = line[1][0];
    const y1 = line[0][1];
    const y2 = line[1][1];

    const xInc = getIncrement(x2 - x1);
    const yInc = getIncrement(y2 - y1);
    const points = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1)) + 1 // inclusive

    for (i of range(points)) {
      seaFloor[y1 + (yInc * i)][x1 + (xInc * i)]++
    }
  }

  return sum(seaFloor.map((line) => sum(line.map((n) => n > 1 ? 1 : 0))));
}

function format(input) {
  return input
    .split(/\r\n|\r|\n/)
    .map((line) => line.split(' -> ').map((point) => 
      point.split(',').map((n) => parseInt(n))
    ))
}

// --

module.exports = { 
  first: (input) => first(format(input)),
  second: (input) => second(format(input))
};
