
// --

function first(input) {
  const counts = Array.from({ length: input[0].length }).map(() => 0);

  for (line of input) {
    for (index in line) {
      if (line[index]) counts[index]++;
    }
  }

  const gamma = counts.map((count) =>
    (count / input.length > 0.5) ? "1" : "0"
  );
  const epsilon = gamma.map((char) =>
    char === "0" ? "1" : "0"
  );

  return parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2);
}

function second(input) {
  let ogRating = [...input];
  let csRating = [...input];

  for (let i = 0; i < input[0].length; i++) {
    // ogRating
    const ogPct = ogRating.reduce((count, line) => count + (line[i] ? 1 : 0), 0) / ogRating.length;
    const csPct = csRating.reduce((count, line) => count + (line[i] ? 1 : 0), 0) / ogRating.length;

    ogRating = 
    console.log(ogPct, csPct);
  }
}

function format(input) {
  return input
    .split('\r\n')
    .map((line) => line.split('').map((char) =>
      char === "1" ? true : false
    ));
}

// --

module.exports = { 
  first: (input) => first(format(input)),
  second: (input) => second(format(input))
};
