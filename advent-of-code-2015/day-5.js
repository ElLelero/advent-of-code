const fs = require('node:fs/promises');

function hasPairRepeatingNowOverlapping(row) {
  for (let j = 0; j < row.length - 1; j++) {
    let substring = row.substring(j, j + 2);
    let index = row.indexOf(substring, j + 2);
    if (index > -1) {
      return true;
    }
  }
  return false;
}

function firstPart(rows) {
  return rows.filter(row => {
    let vowelsCount = 0;
    let letterTwiceInARow = false;
    for (let i = 0; i < row.length; i++) {
      if (['a', 'e', 'i', 'o', 'u'].includes(row[i])) vowelsCount++;
      if (i < row.length - 1 && row[i] === row[i + 1]) letterTwiceInARow = true;
    }

    return vowelsCount >= 3
      && letterTwiceInARow
      && row.indexOf('ab') === -1
      && row.indexOf('cd') === -1
      && row.indexOf('pq') === -1
      && row.indexOf('xy') === -1;
  }).length;
}

function secondPart(rows) {
  return rows.filter(row => {
    for (let i = 0; i < row.length; i++) {
      if (i < row.length - 2) {
        if (row[i] === row[i + 2]) {
          return true;
        }
      }
    }
    return false;
  }).filter(row => hasPairRepeatingNowOverlapping(row)).length;
}

fs.readFile('./advent-of-code-2015/inputs/day-5.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');

  console.time('first part');
  let niceStringsFirstPart = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let niceStringsSecondPart = secondPart(rows);
  console.timeEnd('second part');

  console.log(niceStringsFirstPart, niceStringsSecondPart);
});