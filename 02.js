
// --

function first(input) {
  let distance = 0;
  let depth = 0;
  
  for (instruction of input) {
    switch (instruction.direction) {
      case 'forward':
        distance += instruction.distance;
        break;
      case 'up':
        depth -= instruction.distance;
        break;
      case 'down':
        depth += instruction.distance;
        break;
    }
  }

  return distance * depth;
}

function second(input) {
  let distance = 0;
  let depth = 0;
  let aim = 0;
  
  for (instruction of input) {
    switch (instruction.direction) {
      case 'forward':
        distance += instruction.distance;
        depth += instruction.distance * aim;
        break;
      case 'up':
        aim -= instruction.distance;
        break;
      case 'down':
        aim += instruction.distance;
        break;
    }
  }

  return distance * depth;
}

function format(input) {
  return input
    .split('\n')
    .map((line) => {
      const [direction, distance] = line.split(' ');
      return { direction, distance: parseInt(distance) }; 
    });
}

// --

module.exports = { 
  first: (input) => first(format(input)),
  second: (input) => second(format(input))
};
