const fs = require('node:fs/promises');

function isNumber(char) {
  return /^\d$/.test(char);
}

function getNumbersAndSymbolsForRow(row, rowIndex, numbers, symbols) {
  let number = '', startColIndex = -1;
  for (let i = 0; i < row.length; i++) {
    if (row[i] !== '.') {
      if (!isNumber(row[i])) {
        if (number !== '') {
          numbers.push({
            number: +number,
            rowIndex,
            startColIndex,
            endColIndex: i - 1,
          });
          number = '';
        }
        symbols.push({
          rowIndex,
          colIndex: i
        });
      } else {
        if (number === '') {
          startColIndex = i;
        }
        number += `${row[i]}`;
      }
    } else {
      if (number !== '') {
        numbers.push({
          number: +number,
          rowIndex,
          startColIndex,
          endColIndex: i - 1
        });
        number = '';
      }
    }
  }

  if (number !== '') {
    numbers.push({
      number: +number,
      rowIndex,
      startColIndex,
      endColIndex: row.length - 1
    });
  }
}

function firstPart(rows) {
  let numbers = [], symbols = [];
  rows.forEach((row, rowIndex) => {
    getNumbersAndSymbolsForRow(row, rowIndex, numbers, symbols);
  });

  let sumPartNumbers = 0;
  numbers.forEach(({ number, rowIndex, startColIndex, endColIndex }) => {
    let hasAdjacentSymbols = false;
    let i = 0;
    while (i < symbols.length && hasAdjacentSymbols === false) {
      let symbol = symbols[i];
      if (symbol.rowIndex >= rowIndex - 1 && symbol.rowIndex <= rowIndex + 1 && symbol.colIndex >= startColIndex - 1 && symbol.colIndex <= endColIndex + 1) {
        sumPartNumbers += number;
        hasAdjacentSymbols = true;
      }
      i++;
    }
  });
  return sumPartNumbers;
}

function secondPart(rows) {
  let numbers = [], symbols = [];
  rows.forEach((row, rowIndex) => {
    getNumbersAndSymbolsForRow(row, rowIndex, numbers, symbols);
  });

  let gearRatioSum = 0;
  symbols.forEach(symbol => {
    let count = 0;
    let product = 1;
    let i = 0;
    while (i < numbers.length && count <= 2) {
      let { rowIndex, startColIndex, endColIndex, number } = numbers[i];
      if (symbol.rowIndex >= rowIndex - 1 && symbol.rowIndex <= rowIndex + 1 && symbol.colIndex >= startColIndex - 1 && symbol.colIndex <= endColIndex + 1) {
        count++;
        product *= number;
      }
      i++;
    }

    if (count === 2) {
      gearRatioSum += product;
    }
  });
  return gearRatioSum;
}

fs.readFile('./advent-of-code-2023/inputs/day-3.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');

  console.time('first part');
  let sumPartNumbers = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let gearRatioSum = secondPart(rows);
  console.timeEnd('second part');

  console.log(sumPartNumbers, gearRatioSum);
});