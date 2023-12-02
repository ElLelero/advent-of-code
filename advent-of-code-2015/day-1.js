const fs = require('node:fs/promises');

function firstPart(data) {
  let floor = 0;
  for (let i = 0; i < data.length; i++) {
    let char = data[i];
    if (char === '(') {
      floor++;
    } else {
      floor--;
    }
  }
  return floor;
}

function secondPart(data) {
  let floor = 0;
  for (let i = 0; i < data.length; i++) {
    let char = data[i];
    if (char === '(') {
      floor++;
    } else {
      floor--;
      if (floor < 0) {
        return i + 1;
      }
    }
  }
  return -1;
}

fs.readFile('./advent-of-code-2015/inputs/day-1.txt', { encoding: 'utf8' }).then((data) => {
  console.time('first part');
  let finalFloor = firstPart(data);
  console.timeEnd('first part');

  console.time('second part');
  let firstBasementPosition = secondPart(data);
  console.timeEnd('second part');

  console.log(finalFloor, firstBasementPosition);
});