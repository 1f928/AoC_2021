
const { range, factsum } = require('../util');

// --

function first(input) {
  const [x1, x2, y1, y2] = input;

  let maxVY = 0;
  for (vX of range(0, x2 + 1)) {
    for (vY of range(-(y2 + 1), y2)) {
      if (hitsHole(vX, vY, x1, x2, y1, y2) && vY > maxVY) maxVY = vY;
    }
  }

  return factsum(maxVY);
}

function second(input) {
  const [x1, x2, y1, y2] = input;

  let hitCount = 0;
  for (vX of range(0, x2 + 1)) {
    for (vY of range(-(y2 + 1), y2)) {
      if (hitsHole(vX, vY, x1, x2, y1, y2)) hitCount++;
    }
  }

  return hitCount;
}

function hitsHole(vX, vY, x1, x2, y1, y2) {
  let x = 0;
  let y = 0;
  while (x <= x2 && y >= y2) {
    // Update position
    x += vX;
    y += vY;

    // Update velocity
    vX = vX === 0 ? 0 : vX - (Math.sign(vX));
    vY -= 1;

    // Check hitbox
    if (x >= x1 && x <= x2 && y <= y1 && y >= y2) return true;
  }

  return false;
}

function format(input) {
  const [x1, x2, y2, y1] = input
    .replace(/\D+/g, ' ')
    .trim()
    .split(' ')
    .map((n) => parseInt(n));

  return [x1, x2, y1 * -1, y2 * -1];
}

// --

module.exports = { 
  first: (input) => first(format(input)),
  second: (input) => second(format(input))
};
