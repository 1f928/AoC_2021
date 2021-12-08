
const { sum, zeroes, sortStr } = require('../util');

// --

function first(input) {
  return sum(input.flatMap(([_, four]) => four.filter((chars) => 
    chars.length === 2 ||
    chars.length === 3 ||
    chars.length === 4 ||
    chars.length === 7
  ).length ));
}

// Segments Map:
//  0
// 1 2
//  3
// 4 5
//  6
function second(input) {
  return sum(input.map(([ten, four]) => {
    const nums = zeroes(10); // Array to be populated with corresponding seqs
    const segments = {}; // To keep track of segment-character mappings
    const sizes = {}; // To keep track of unknown seqs by number of segments

    ten.forEach((seq) => {
      const len = seq.length;
      if (!sizes[len]) sizes[len] = [];
      sizes[len].push(seq);
    });

    // Identify 1, 4, 7, and 8 by unique sequence size
    nums[1] = sizes[2][0];
    nums[7] = sizes[3][0];
    nums[4] = sizes[4][0];
    nums[8] = sizes[7][0];

    // Identify s2 using 1 and 6
    sizes[6].forEach((seq) => {
      remainder = nums[1].split('').filter((char) => seq.indexOf(char) !== -1);
      if (remainder.length === 1) {
        segments[2] = remainder[0];
        nums[6] = seq;
        sizes[6] = sizes[6].filter((seq2) => seq2 !== seq);
      }
    });

    // Identify s5 using 1 and s2
    segments[5] = nums[1].split('').filter((char) => char !== segments[2])[0];
    
    // Identify 2, 3, and 5 using s2 and s5
    sizes[5].forEach((seq) => {
      const remainder = nums[1].split('').filter((char) => seq.indexOf(char) !== -1);
      if (remainder.length === 2) {
        nums[3] = seq;
      } else if (remainder.length === 1 && remainder[0] === segments[2]) {
        nums[5] = seq;
      } else if (remainder.length === 1 && remainder[0] === segments[5]) {
        nums[2] = seq;
      }
    });
    
    // Finish with identifying 0 & 9 using s4
    segments[4] = [...nums[2].split(''), segments[5]].filter((char) => 
      nums[3].indexOf(char) === -1
    )[0];
    nums[9] = sizes[6].filter((seq) => seq.indexOf(segments[4]) === -1)[0];
    nums[0] = sizes[6].filter((seq) => seq !== nums[9])[0];

    // --

    return parseInt(four.map((seq) => nums.findIndex(x => x === seq)).join(''));
  }));
}

function format(input) {
  return input
    .split(/\r\n|\r|\n/)
    .map((line) => line
      .split(' | ')
      .map((piece) => piece
        .split(' ')
        .map((seq) => sortStr(seq))
      )
    );
}

// --

module.exports = { 
  first: (input) => first(format(input)),
  second: (input) => second(format(input))
};
