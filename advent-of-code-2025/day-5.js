const fs = require('node:fs/promises');

function firstPart(rows) {
  let ranges = [];
  let ids = [];
  let count = 0;

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i].toString().trim();
    if (row === '') continue;
    if (row.indexOf('-') > -1) {
      ranges.push(row.split('-').map(s => +(s)));
      continue;
    }

    let id = +(row);

    let compatibleRange = ranges.find(r => r[0] <= id && id <= r[1]);
    count += compatibleRange != null ? 1 : 0;
  }

  return count;
}


function secondPart(rows) {
  let rangesSet = new Set();
  let count = 0;

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i].toString().trim();
    if (row === '') break;
    rangesSet.add(row);
  }

  let ranges = [...rangesSet].map(row => row.split('-').map(s => +(s))).sort((a, b) => {
    let start = a[0] - b[0]
    if (start !== 0) return start;
    return a[1] - b[1];
  });

  for (let i = 0; i < ranges.length; i++) {
    if (i + 1 < ranges.length) {
      if (ranges[i][1] >= ranges[i + 1][0]) {
        if (ranges[i][1] <= ranges[i + 1][1]) {
          ranges[i][1] = ranges[i + 1][1];
        }
        ranges.splice(i + 1, 1);
        i--;
      }
    }
  }

  for (let i = 0; i < ranges.length; i++) {
    let [start, end] = ranges[i];
    count += (end - start) + 1;
  }

  return count;
}

fs.readFile('./advent-of-code-2025/inputs/day-5.txt', { encoding: 'utf8' }).then((data) => {
  console.time('first part');
  let count = firstPart(data.split('\n'));
  console.timeEnd('first part');

  console.time('second part');
  let count2 = secondPart(data.split('\n'));
  console.timeEnd('second part');

  console.log(count, count2);
});