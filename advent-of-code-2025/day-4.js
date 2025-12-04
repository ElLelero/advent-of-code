const fs = require('node:fs/promises');

function getAdjacentsOfCell(rows, i, j) {
  if (rows[i][j] !== '@') return null;

  let left = (j + 1 >= 0 && j + 1 < rows[i].length ? rows[i][j + 1] : null);
  let right = (j - 1 >= 0 && j - 1 < rows[i].length ? rows[i][j - 1] : null);
  let up = (i - 1 >= 0 && i - 1 < rows.length ? rows[i - 1][j] : null);
  let down = (i + 1 >= 0 && i + 1 < rows.length ? rows[i + 1][j] : null);
  let upLeft = (j + 1 >= 0 && j + 1 < rows[i].length && i - 1 >= 0 && i - 1 < rows.length ? rows[i - 1][j + 1] : null);
  let upRight = (j - 1 >= 0 && j - 1 < rows[i].length && i - 1 >= 0 && i - 1 < rows.length ? rows[i - 1][j - 1] : null);
  let downLeft = (j + 1 >= 0 && j + 1 < rows[i].length && i + 1 >= 0 && i + 1 < rows.length ? rows[i + 1][j + 1] : null);
  let downRight = (j - 1 >= 0 && j - 1 < rows[i].length && i + 1 >= 0 && i + 1 < rows.length ? rows[i + 1][j - 1] : null);

  return (left === '@' ? 1 : 0) + (right === '@' ? 1 : 0) + (up === '@' ? 1 : 0) + (down === '@' ? 1 : 0) + (upLeft === '@' ? 1 : 0) + (upRight === '@' ? 1 : 0) + (downLeft === '@' ? 1 : 0) + (downRight === '@' ? 1 : 0);
}

function rebuildGrid(rows, coordinates) {
  let newRows = rows.map(row => row.split('').map(col => col));
  for (let k = 0; k < coordinates.length; k++) {
    let [i, j] = coordinates[k];
    newRows[i][j] = '.';
  }

  for (let i = 0; i < newRows.length; i++) {
    rows[i] = newRows[i].join('');
  }
  return rows;
}

function firstPart(rows) {
  let count = 0;

  let coordinates = [];
  for (let i = 0; i < rows.length; i++) {
    let cols = rows[i].split('');

    for (let j = 0; j < cols.length; j++) {
      if (rows[i][j] !== '@') continue;

      let adjacents = getAdjacentsOfCell(rows, i, j);
      if (adjacents < 4) {
        coordinates.push([i, j]);
      }
    }
  }

  count += coordinates.length;

  return count;
}


function secondPart(rows) {
  let count = 0;

  let proceed = true;
  do {
    let coordinates = [];
    for (let i = 0; i < rows.length; i++) {
      let cols = rows[i].split('');

      for (let j = 0; j < cols.length; j++) {
        if (rows[i][j] !== '@') continue;

        let adjacents = getAdjacentsOfCell(rows, i, j);
        if (adjacents < 4) {
          coordinates.push([i, j]);
        }
      }
    }

    if (coordinates.length === 0) {
      proceed = false;
    } else {
      rows = rebuildGrid(rows, coordinates);
    }
    count += coordinates.length;

  } while (proceed);

  return count;
}

fs.readFile('./advent-of-code-2025/inputs/day-4.txt', { encoding: 'utf8' }).then((data) => {
  console.time('first part');
  let count = firstPart(data.split('\n'));
  console.timeEnd('first part');

  console.time('second part');
  let count2 = secondPart(data.split('\n'));
  console.timeEnd('second part');

  console.log(count, count2);
});