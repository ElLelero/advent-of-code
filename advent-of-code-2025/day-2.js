const fs = require('node:fs/promises');

function firstPart(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    let [firstId, lastId] = data[i].split('-');

    let first = +(firstId);
    let last = +(lastId);

    let firstLength = Math.ceil(Math.log10(first));

    let start = Math.floor(first / Math.pow(10.0, Math.ceil(firstLength / 2)));
    let end = Math.floor(last / Math.pow(10.0, Math.ceil(firstLength / 2)));

    for (let j = start; j <= end; j++) {
      let s = `${j}${j}`;
      if (s.length % 2 !== 0) continue;
      let numberToCheck = +(s);
      if (numberToCheck >= first && numberToCheck <= last) {
        sum += numberToCheck;
      }
    }
  }
  return sum;
}

function secondPart(data) {
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    let [firstId, lastId] = data[i].split('-');
    let start = +(firstId);
    let end = +(lastId);

    let checkedNumbers = new Set();
    for (let j = start; j <= end; j++) {
      let s = j.toString();

      for (let k = 1; k <= s.length - 1; k++) {
        let numberToCheck = +(s.substring(0, k).repeat(Math.ceil(s.length / k)));
        if (!checkedNumbers.has(numberToCheck) && numberToCheck >= start && numberToCheck <= end) {
          sum += numberToCheck;
          checkedNumbers.add(numberToCheck);
          break;
        }
      }
    }
  }

  return sum;
}

fs.readFile('./advent-of-code-2025/inputs/day-2.txt', { encoding: 'utf8' }).then((data) => {
  console.time('first part');
  let sum = firstPart(data.split(','));
  console.timeEnd('first part');

  console.time('second part');
  let sum2 = secondPart(data.split(','));
  console.timeEnd('second part');

  console.log(sum, sum2);
});