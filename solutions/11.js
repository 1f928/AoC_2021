
const { range } = require('../util');

// --

function first(input) {
  const steps = 100;
  let flashCount = 0;

  const flash = (x, y) => {
    flashCount++;
    input[y][x] = NaN; // cannot flash more than once per turn

    for (adj of [
      [-1,-1],
      [-1, 0],
      [-1, 1],
      [ 0,-1],
      [ 0, 1],
      [ 1,-1],
      [ 1, 0],
      [ 1, 1]
    ]) {
      const nY = y + adj[0];
      const nX = x + adj[1];
      if (input[nY]?.[nX] && ++input[nY][nX] > 9) flash(nX, nY);
    }
  }

  for (i of range(steps)) {
    // Increase by all by one
    input.forEach((line, y) => line.forEach((val, x) => {
      input[y][x]++
    }));

    // Flash if > 9, and propagate.
    input.forEach((line, y) => line.forEach((val, x) => {
      if (input[y][x] > 9) flash(x, y);
    }));

    // Turn NaN (flashed) into 0.
    input.forEach((line, y) => line.forEach((val, x) => {
      if (isNaN(val)) input[y][x] = 0;
    }));
  }

  return flashCount;
}

function second(input) {
  let step = 0;
  let flashCount = 0;

  const flash = (x, y) => {
    flashCount++;
    input[y][x] = NaN; // cannot flash more than once per turn

    for (adj of [
      [-1,-1],
      [-1, 0],
      [-1, 1],
      [ 0,-1],
      [ 0, 1],
      [ 1,-1],
      [ 1, 0],
      [ 1, 1]
    ]) {
      const nY = y + adj[0];
      const nX = x + adj[1];
      if (input[nY]?.[nX] && ++input[nY][nX] > 9) flash(nX, nY);
    }
  }

  while (flashCount < 100) {
    flashCount = 0;
    step++;

    // Increase by all by one
    input.forEach((line, y) => line.forEach((val, x) => {
      input[y][x]++
    }));

    // Flash if > 9, and propagate.
    input.forEach((line, y) => line.forEach((val, x) => {
      if (input[y][x] > 9) flash(x, y);
    }));

    // Turn NaN (flashed) into 0.
    input.forEach((line, y) => line.forEach((val, x) => {
      if (isNaN(val)) input[y][x] = 0;
    }));
  }

  return step;
}

function format(input) {
  return input
    .split(/\r\n|\r|\n/)
    .map((line) => line
      .split('')
      .map((n) => parseInt(n)));
}

// --

module.exports = { 
  first: (input) => first(format(input)),
  second: (input) => second(format(input))
};
