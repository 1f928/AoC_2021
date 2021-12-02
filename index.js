
const getInput = require('./input');

const dayNumber = parseInt(process.argv[2]);

if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 25) {
  console.error('Please provide a number between 1 and 25');
  process.exit(1);
}

const formattedNum = dayNumber.toString().padStart(2, '0')

let first, second;
try {
  ({ first, second } = require(`./${formattedNum}`));
} catch (err) {
  console.error(`Day ${dayNumber} has not been completed yet!`)
  process.exit(1);
}

let input;
try {
  input = getInput(formattedNum)
} catch (err) {
  console.error(`Day ${dayNumber} does not have an input file!`)
  process.exit(1);
}

console.log(`First Solution: ${first(input)}`);
console.log(`Second Solution: ${second(input)}`);
