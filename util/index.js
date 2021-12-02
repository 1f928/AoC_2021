
module.exports = {
  sum,
  range
}

function sum(nums) {
  return nums.reduce((sum, num) => sum + num, 0);
}

function* range(start = 0, end, step) {
  // Validation and setup
  if (isNaN(end)) {
    end = start - 1;
    start = 0;
  }
  if (start === end) {
    yield start;
    return;
  }

  if (step === 0) throw "Step must not be 0";
  if (isNaN(step)) {
    start < end ? step = 1 : step = -1;
  } else if (start > end && step > 0 || start < end && step < 0) {
    throw "Infinite range";
  }

  // Actual range
  for (
    let i = start;
    (step > 0) ? (i <= end) : (i >= end);
    i += step
  ) {
    yield i;
  }
}
