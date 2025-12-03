const fs = require('node:fs/promises');

function findMaxInRange(arr, startIndex, length) {
  let max = arr[startIndex];
  let index = 0;

  for (let j = startIndex + 1; j < startIndex + length; j++) {
    let element = arr[j];
    if (element > max) {
      max = element;
      index = j;
    }
  }
  return [max, index];
}

function firstPart(banks) {
  let sum = 0;

  for (let i = 0; i < banks.length; i++) {
    let batteries = banks[i].split('').map(battery => +(battery));
    let batteryValue = 0;
    for (let j = 2 - 1; j >= 0; j--) {
      let [max, index] = findMaxInRange(batteries, 0, batteries.length - j);
      batteries.splice(0, index + 1);
      batteryValue = (batteryValue * 10) + max;
    }
    sum = sum + batteryValue;
  }

  return sum;
}


function secondPart(banks) {
  let sum = 0;

  for (let i = 0; i < banks.length; i++) {
    let batteries = banks[i].split('').map(battery => +(battery));
    let batteryValue = (0);
    for (let j = 12 - 1; j >= 0; j--) {
      let [max, index] = findMaxInRange(batteries, 0, batteries.length - j);
      batteries.splice(0, index + 1);
      batteryValue = (batteryValue * 10) + max;
    }
    sum = sum + batteryValue;
  }

  return sum;
}

fs.readFile('./advent-of-code-2025/inputs/day-3.txt', { encoding: 'utf8' }).then((data) => {
  console.time('first part');
  let sum = firstPart(data.split('\n'));
  console.timeEnd('first part');

  console.time('second part');
  let sum2 = secondPart(data.split('\n'));
  console.timeEnd('second part');

  console.log(sum, sum2);
});