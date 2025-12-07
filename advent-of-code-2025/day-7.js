const fs = require('node:fs/promises');

function firstPart(rows) {
  let startingCol = rows[0].indexOf('S');
  let rayPositions = new Set([startingCol]);
  let raySplitted = 0;
  for (let i = 1; i < rows.length; i++) {
    let newRayPositions = new Set(rayPositions);
    let splitterIndexes = rows[i].split('').map((s, index) => s === '^' ? index : null).filter(index => index != null);
    if (splitterIndexes.length > 0) {
      for (let j = 0; j < splitterIndexes.length; j++) {
        let index = splitterIndexes[j];
        if (rayPositions.has(index)) {
          raySplitted++;
          newRayPositions.delete(index);
          newRayPositions.add(index + 1);
          newRayPositions.add(index - 1);
        }
      }
    }
    rayPositions = new Set(newRayPositions);
  }
  return raySplitted;
}


function secondPart(rows) {
  let attuale = [];
  for (let i = 0; i < rows[0].length; i++) {
    if (rows[0][i] === 'S') {
      attuale.push(1);
    } else {
      attuale.push(0);
    }
  }
  for (let i = 1; i < rows.length; i++) {
    let nuovo = attuale.map(_ => 0);
    let elements = rows[i].split('');
    for (let j = 0; j < elements.length; j++) {
      if (elements[j] === '^') {
        nuovo[j - 1] += attuale[j];
        nuovo[j + 1] += attuale[j];
      } else {
        nuovo[j] += attuale[j];
      }
    }
    attuale = [...nuovo];
  }
  return attuale.reduce((sum, a) => sum + a, 0);
}

fs.readFile('./advent-of-code-2025/inputs/day-7.txt', { encoding: 'utf8' }).then((data) => {
  console.time('first part');
  let raySplittedCount = firstPart(data.split('\n'));
  console.timeEnd('first part');

  console.time('second part');
  let paths = secondPart(data.split('\n'));
  console.timeEnd('second part');

  console.log(raySplittedCount, paths);
});