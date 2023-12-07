const fs = require('node:fs/promises');

function firstPart(rows) {
  let total = 0;
  for (let i = 0; i < rows.length; i++) {
    let charCount = 2;
    let rowContent = rows[i].substring(1, rows[i].length - 1);
    let j = 0;
    while (j < rowContent.length) {
      let indexIncrease = 1;
      charCount++;
      if (rowContent[j] === `\\` && j < rowContent.length - 1) {
        if (rowContent[j + 1] === 'x' && rowContent[j + 2] < 'g' && rowContent[j + 3] < 'g') {
          indexIncrease = 4;
        } else {
          indexIncrease = 2;
        }
      }
      j += indexIncrease;
    }
    total += (rows[i].length - (charCount - 2));
  }
  return total;
}

function secondPart(rows) {
  return rows.reduce((sum, row) => sum + (`"${row.split('\\').join('\\\\').split('"').join('\\"')}"`.length - row.length), 0);
}

fs.readFile('./advent-of-code-2015/inputs/day-8.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');

  console.time('first part');
  let total = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let newTotal = secondPart(rows);
  console.timeEnd('second part');

  console.log(total, newTotal);
});