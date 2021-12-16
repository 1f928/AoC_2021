
const { range } = require('../util');

// --

function first({start, pairs, transforms}) {
  const numSteps = 10;
  const finalPairs = growPolymer(numSteps, pairs, transforms);
  const counts = countElements(start, finalPairs);

  return Math.max(...counts) - Math.min(...counts);
}

function second({start, pairs, transforms}) {
  const numSteps = 40;
  const finalPairs = growPolymer(numSteps, pairs, transforms);
  const counts = countElements(start, finalPairs);

  return Math.max(...counts) - Math.min(...counts);
}

function growPolymer(steps, pairs, transforms) {
  
  for (_ of range(steps)) {
    newPairs = {}

    Object.entries(pairs).forEach(([k, v]) => {
      const [split1, split2] = transforms[k];

      if (!newPairs[split1]) newPairs[split1] = 0;
      newPairs[split1] += v;

      if (!newPairs[split2]) newPairs[split2] = 0;
      newPairs[split2] += v;
    });

    pairs = newPairs;
  }

  return pairs;
}

function countElements(start, pairs) {
  const elements = {[start]: 1};
  for ([key, val] of Object.entries(pairs)) {
    const [_, ele] = key.split('');

    if (!elements[ele]) elements[ele] = 0;
    elements[ele] += val;
  }

  return Object.values(elements);
}

function format(input) {
  let [starter, rules] = input.split(/\r\n\r\n|\r\r|\n\n/);

  const pairs = {};
  const transforms = rules
    .split(/\r\n|\r|\n/)
    .reduce((map, line) => {
      const [key, val] = line.split(' -> ');
      pairs[key] = 0;

      const [left, right] = key.split('');
      map[key] = [left + val, val + right];
      return map;
    }, {});

  for (i of range(starter.length - 1)) pairs[starter.slice(i, i + 2)]++;

  return {start: starter.slice(0, 1), pairs, transforms};
}

// --

module.exports = { 
  first: (input) => first(format(input)),
  second: (input) => second(format(input))
};
