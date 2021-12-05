
const { range, sum } = require('./util');

// --

function first({picks, boards}) {
  return solveByWinTime(picks, boards, Math.min);
}

function second({picks, boards}) {
  return solveByWinTime(picks, boards, Math.max);
}

function solveByWinTime(picks, boards, fn) {
  const solveTimes = boards.map((board) => solveTime(board));

  const time = fn(...solveTimes);
  const board = boards[solveTimes.indexOf(time)];
  const remainingValues = board.filter((n) => n > time).map((n) => picks[n]);
  
  return picks[time] * sum(remainingValues);
}

function solveTime(board) {
  const lines = [];
  
  // Diagonals
  lines.push([board[0], board[6], board[12], board[18], board[24]]);
  lines.push([board[4], board[8], board[12], board[16], board[20]]);

  // Columns and Rows
  for (i of range(5)) {
    lines.push(board.slice(i * 5, i * 5 + 5));
    lines.push([board[i], board[5 + i], board[10 + i], board[15 + i], board[20 + i]]);
  }

  return Math.min(...lines.map((line) => Math.max(...line)));
}

function format(input) {
  const [picks, ...boards] = input.split(/\r\n\r\n|\r\r|\n\n/);

  // Here, I use pickMap to map each board value to the index it's picked at
  const pickMap = {};
  picks.split(',').forEach((pick, i) => pickMap[pick] = i);

  return {
    picks: picks.split(',').map((n) => parseInt(n)),
    boards: boards.map((board) =>
      board.trim().split(/\s+/).map((n) => pickMap[n])
    )
  }
}

// --

module.exports = { 
  first: (input) => first(format(input)),
  second: (input) => second(format(input))
};
