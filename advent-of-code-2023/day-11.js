const fs = require('node:fs/promises');

function getEmptyColumnIndexes(rows) {
  let emptyColIndexes = [];

  for (let i = 0; i < rows[0].length; i++) {
    let onlyPoints = true;
    for (let j = 0; j < rows.length; j++) {
      if (rows[j][i] !== '.') {
        onlyPoints = false;
        break;
      }
    }
    if (onlyPoints === true) {
      emptyColIndexes.push(i);
    }
  }
  return emptyColIndexes;
}

function getEmptyRowIndexes(rows) {
  return rows.map((row, i) => {
    if (new Set(row.split('')).size === 1) {
      return i;
    }
    return undefined;
  }).filter(index => index != null);
}

function firstPart(rows) {
  let emptyColumnIndexes = getEmptyColumnIndexes(rows);
  let emptyRowIndexes = getEmptyRowIndexes(rows);

  let galaxies = [];

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] === '#') {
        galaxies.push({
          rowIndex: i,
          colIndex: j
        });
      }
    }
  }

  let sumOfShortestDistances = 0;
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      let emptyColumnCount = emptyColumnIndexes.filter(c => (galaxies[i].colIndex > c && c > galaxies[j].colIndex) || (galaxies[j].colIndex > c && c > galaxies[i].colIndex)).length;
      let emptyRowCount = emptyRowIndexes.filter(r => (galaxies[i].rowIndex > r && r > galaxies[j].rowIndex) || (galaxies[j].rowIndex > r && r > galaxies[i].rowIndex)).length;

      let columnAbs = Math.abs(galaxies[i].colIndex - galaxies[j].colIndex) + (emptyColumnCount * (2 - 1));
      let rowAbs = Math.abs(galaxies[i].rowIndex - galaxies[j].rowIndex) + (emptyRowCount * (2 - 1));
      sumOfShortestDistances += rowAbs + columnAbs;
    }
  }

  return sumOfShortestDistances;
}

function secondPart(rows) {
  let emptyColumnIndexes = getEmptyColumnIndexes(rows);
  let emptyRowIndexes = getEmptyRowIndexes(rows);
  
  let galaxies = [];

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] === '#') {
        galaxies.push({
          rowIndex: i,
          colIndex: j
        });
      }
    }
  }

  let sumOfShortestDistances = 0;
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      let emptyColumnCount = emptyColumnIndexes.filter(c => (galaxies[i].colIndex > c && c > galaxies[j].colIndex) || (galaxies[j].colIndex > c && c > galaxies[i].colIndex)).length;
      let emptyRowCount = emptyRowIndexes.filter(r => (galaxies[i].rowIndex > r && r > galaxies[j].rowIndex) || (galaxies[j].rowIndex > r && r > galaxies[i].rowIndex)).length;

      let columnAbs = Math.abs(galaxies[i].colIndex - galaxies[j].colIndex) + (emptyColumnCount * (1000000 - 1));
      let rowAbs = Math.abs(galaxies[i].rowIndex - galaxies[j].rowIndex) + (emptyRowCount * (1000000 - 1));
      sumOfShortestDistances += rowAbs + columnAbs;
    }
  }

  return sumOfShortestDistances;
}

fs.readFile('./advent-of-code-2023/inputs/day-11.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');

  console.time('first part');
  let sumOfShortestDistances = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let newSumOfShortestDistances = secondPart(rows);
  console.timeEnd('second part');

  console.log(sumOfShortestDistances, newSumOfShortestDistances);
});