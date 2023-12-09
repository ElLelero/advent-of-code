const fs = require('node:fs/promises');

function getNextFromNumbers(numbers) {
  let intervals = [];
  let intervalsSet = new Set();
  for (let i = 0; i < numbers.length - 1; i++) {
    let temp = numbers[i + 1] - numbers[i];
    intervals.push(temp);
    intervalsSet.add(temp);
  }
  if (intervalsSet.size === 1) {
    return numbers[numbers.length - 1] + intervals[0];
  }

  return numbers[numbers.length - 1] + getNextFromNumbers(intervals);
}

function firstPart(rows) {
  return rows.reduce((sum, row) => {
    let numbers = row.split(' ').map(n => +n);
    return sum + getNextFromNumbers(numbers);
  }, 0);
}

function secondPart(rows) {
  return rows.reduce((sum, row) => {
    let numbers = row.split(' ').map(n => +n);
    numbers.reverse();
    return sum + getNextFromNumbers(numbers);
  }, 0);
}

fs.readFile('./advent-of-code-2023/inputs/day-9.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');

  console.time('first part');
  let sumOfExtrapolatedValues = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let newSumOfExtrapolatedValues = secondPart(rows);
  console.timeEnd('second part');

  console.log(sumOfExtrapolatedValues, newSumOfExtrapolatedValues);
});