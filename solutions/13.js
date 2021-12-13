
// --

function first({dots, folds}) {
  const foldedDots = fold(dots, folds[0]);

  return new Set(foldedDots.map((dot) => dot.toString())).size;
}

function second({dots: initialDots, folds}) {
  let dots = [...initialDots];

  for (f of folds) {
    dots = fold(dots, f);
  }

  const message = Array.from({ length: 6})
    .map(() => Array.from({ length: 40})
      .map(() => '░')
    );
  
  dots.forEach(([x, y]) => message[y][x] = '▓');

  return '\n' + message.map((line) => line.join('')).join('\n');
}

function fold(dots, fold) {
  const {axis, position} = fold;

  return dots.map(([x, y]) => {
    if (axis === 'x') {
      return (x > position) ? [position - (x - position), y] : [x, y];
    } else {
      return (y > position) ? [x, position - (y - position)] : [x, y];
    }
  });
}

function format(input) {
  const [dots, folds] = input.split(/\r\n\r\n|\r\r|\n\n/);

  return {
    dots: dots
      .split(/\r\n|\r|\n/)
      .map((line) => line
        .split(',')
        .map((n) => parseInt(n))),

    folds: folds
      .split(/\r\n|\r|\n/)
      .map((line) => {
          const [axis, n] = line.split(' ')[2].split('=');
          return { axis, position: parseInt(n) };
        })
  }
}

// --

module.exports = { 
  first: (input) => first(format(input)),
  second: (input) => second(format(input))
};
