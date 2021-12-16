
module.exports = {
  sum,
  range,
  zeroes,
  sortStr,
  countElements,
  zip
}

function sum(nums) {
  return nums.reduce((sum, num) => sum + num, 0);
}

function* range(start = 0, end, step) {
  // Validation and setup
  if (isNaN(end)) {
    if (start === 0) {
      return;
    }
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

function zeroes(len) {
  return Array(len).fill(0);
}

function sortStr(str) {
  return str.split('').sort((a, b) => a.localeCompare(b)).join('');
}

function countElements(eles) {
  groups = {}
  for (ele of eles) {
    if (!groups[ele]) groups[ele] = 1;
    else groups[ele]++; 
  }
  return groups;
}

function zip(arrs) {
  const len = arrs[0].length;
  const zipped = Array.from({ length: len }).map(_ => []);
  for (i of range(len)) {
    for (arr of arrs) {
      zipped[i].push(...arr[i]);
    }
  }

  return zipped;
}
