const fs = require('node:fs/promises');

function firstPart(rows) {
  let XMASCount = 0;
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      let char = rows[i][j];
      if (char === 'X') {
        //Orizzontalmente
        if (rows[i] != null && rows[i][j + 1] === 'M' && rows[i][j + 2] === 'A' && rows[i][j + 3] === 'S') {
          XMASCount++;
        }
        if (rows[i] != null && rows[i][j - 1] === 'M' && rows[i][j - 2] === 'A' && rows[i][j - 3] === 'S') {
          XMASCount++;
        }

        //Verticalmente
        if (rows[i + 1] != null && rows[i + 1][j] === 'M'
          && rows[i + 2] != null && rows[i + 2][j] === 'A'
          && rows[i + 3] != null && rows[i + 3][j] === 'S') {
          XMASCount++;
        }
        if (rows[i - 1] != null && rows[i - 1][j] === 'M'
          && rows[i - 2] != null && rows[i - 2][j] === 'A'
          && rows[i - 3] != null && rows[i - 3][j] === 'S') {
          XMASCount++;
        }

        //Diagonalmente
        if (rows[i + 1] != null && rows[i + 1][j + 1] === 'M'
          && rows[i + 2] != null && rows[i + 2][j + 2] === 'A'
          && rows[i + 3] != null && rows[i + 3][j + 3] === 'S') {
          XMASCount++;
        }
        if (rows[i - 1] != null && rows[i - 1][j - 1] === 'M'
          && rows[i - 2] != null && rows[i - 2][j - 2] === 'A'
          && rows[i - 3] != null && rows[i - 3][j - 3] === 'S') {
          XMASCount++;
        }
        if (rows[i - 1] != null && rows[i - 1][j + 1] === 'M'
          && rows[i - 2] != null && rows[i - 2][j + 2] === 'A'
          && rows[i - 3] != null && rows[i - 3][j + 3] === 'S') {
          XMASCount++;
        }
        if (rows[i + 1] != null && rows[i + 1][j - 1] === 'M'
          && rows[i + 2] != null && rows[i + 2][j - 2] === 'A'
          && rows[i + 3] != null && rows[i + 3][j - 3] === 'S') {
          XMASCount++;
        }
      }
    }
  }
  return XMASCount;
}

function secondPart(rows) {
  let coordsDict = {};

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      let char = rows[i][j];
      if (char === 'M') {
        //Diagonalmente
        if (rows[i + 1] != null && rows[i + 1][j + 1] === 'A'
          && rows[i + 2] != null && rows[i + 2][j + 2] === 'S') {
          let key = `${i + 1}_${j + 1}`;
          if (coordsDict[key] == null) coordsDict[key] = 0;
          coordsDict[key]++;
        }
        if (rows[i - 1] != null && rows[i - 1][j - 1] === 'A'
          && rows[i - 2] != null && rows[i - 2][j - 2] === 'S') {
          let key = `${i - 1}_${j - 1}`;
          if (coordsDict[key] == null) coordsDict[key] = 0;
          coordsDict[key]++;
        }
        if (rows[i - 1] != null && rows[i - 1][j + 1] === 'A'
          && rows[i - 2] != null && rows[i - 2][j + 2] === 'S') {
          let key = `${i - 1}_${j + 1}`;
          if (coordsDict[key] == null) coordsDict[key] = 0;
          coordsDict[key]++;

        }
        if (rows[i + 1] != null && rows[i + 1][j - 1] === 'A'
          && rows[i + 2] != null && rows[i + 2][j - 2] === 'S') {
          let key = `${i + 1}_${j - 1}`;
          if (coordsDict[key] == null) coordsDict[key] = 0;
          coordsDict[key]++;
        }
      }
    }
  }

  return Object.entries(coordsDict).filter(([coord, count]) => count > 1).length;
}

fs.readFile('./advent-of-code-2024/inputs/day-4.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');
  console.time('first part');
  let XMASCount = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let X_MASCount = secondPart(rows);
  console.timeEnd('second part');

  console.log(XMASCount, X_MASCount);
});