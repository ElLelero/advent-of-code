const fs = require('node:fs/promises');

function getGalaxiesAndEmptyIndexes(rows) {
  let galaxies = [];
  let emptyRowIndexesSet = new Set(new Array(rows.length).fill(0).map((n, i) => i));
  let emptyColumnIndexesSet = new Set(new Array(rows[0].length).fill(0).map((n, i) => i));

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] === '#') {
        galaxies.push({
          rowIndex: i,
          colIndex: j
        });
        emptyRowIndexesSet.delete(i);
        emptyColumnIndexesSet.delete(j);
      }
    }
  }

  return [galaxies, [...emptyRowIndexesSet], [...emptyColumnIndexesSet]];
}

function firstPart(rows) {
  let factor = 2 - 1;
  let [galaxies, emptyRowIndexes, emptyColumnIndexes] = getGalaxiesAndEmptyIndexes(rows);

  let sumOfShortestDistances = 0;
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      let emptyColumnCount = emptyColumnIndexes.filter(c => (galaxies[i].colIndex > c && c > galaxies[j].colIndex) || (galaxies[j].colIndex > c && c > galaxies[i].colIndex)).length;
      let emptyRowCount = emptyRowIndexes.filter(r => (galaxies[i].rowIndex > r && r > galaxies[j].rowIndex) || (galaxies[j].rowIndex > r && r > galaxies[i].rowIndex)).length;

      let columnAbs = Math.abs(galaxies[i].colIndex - galaxies[j].colIndex) + (emptyColumnCount * factor);
      let rowAbs = Math.abs(galaxies[i].rowIndex - galaxies[j].rowIndex) + (emptyRowCount * factor);
      sumOfShortestDistances += rowAbs + columnAbs;
    }
  }

  return sumOfShortestDistances;
}

function secondPart(rows) {
  let factor = 1000000 - 1;
  let [galaxies, emptyRowIndexes, emptyColumnIndexes] = getGalaxiesAndEmptyIndexes(rows);

  let sumOfShortestDistances = 0;
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      let emptyColumnCount = emptyColumnIndexes.filter(c => (galaxies[i].colIndex > c && c > galaxies[j].colIndex) || (galaxies[j].colIndex > c && c > galaxies[i].colIndex)).length;
      let emptyRowCount = emptyRowIndexes.filter(r => (galaxies[i].rowIndex > r && r > galaxies[j].rowIndex) || (galaxies[j].rowIndex > r && r > galaxies[i].rowIndex)).length;

      let columnAbs = Math.abs(galaxies[i].colIndex - galaxies[j].colIndex) + (emptyColumnCount * factor);
      let rowAbs = Math.abs(galaxies[i].rowIndex - galaxies[j].rowIndex) + (emptyRowCount * factor);
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