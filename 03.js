
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
  let ogValues = [...input];
  let csValues = [...input];

  for (let i = 0; i < input[0].length; i++) {
    if (ogValues.length > 1) {
      const ogPct = ogValues.reduce((count, line) => 
        count + (line[i] ? 1 : 0), 0) / ogValues.length;
      ogValues = ogValues.filter((line) => ogPct >= 0.5 ? line[i] : !line[i]);
    }

    if (csValues.length > 1) {
      const csPct = csValues.reduce((count, line) => 
        count + (line[i] ? 1 : 0), 0) / csValues.length;
      csValues = csValues.filter((line) => csPct < 0.5 ? line[i] : !line[i]);
    }
  }

  const toNum = (bools) => parseInt(bools
    .map((bool) => bool ? "1" : "0")
    .join(''), 2);
    
  return toNum(ogValues[0]) * toNum(csValues[0]);
}

function format(input) {
  return input
    .split(/\r\n|\r|\n/)
    .map((line) => line.split('').map((char) =>
      char === "1" ? true : false
    ));
}

// --

module.exports = { 
  first: (input) => first(format(input)),
  second: (input) => second(format(input))
};
