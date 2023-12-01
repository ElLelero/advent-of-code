const fs = require('node:fs/promises');

function isNumber(char) {
  return /^\d$/.test(char);
}

function checkStringForSpelledDigit(row, index, mode) {
  let spelledDigits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  let digit = null;
  spelledDigits.forEach((spelledDigit, i) => {
    if (digit == null) {
      let startIndex = index;
      if (mode === 'backwards') startIndex -= spelledDigit.length;
      let endIndex = startIndex + spelledDigit.length;

      if (row.substring(startIndex, endIndex) === spelledDigit) {
        digit = `${i + 1}`;
      }
    }
  });
  return digit;
}

function firstPart(rows) {
  let totalCalibrationValue = 0;

  rows.forEach(row => {
    let firstDigit = undefined, lastDigit = undefined;

    let j = 0;
    while (j < row.length && (firstDigit == null || lastDigit == null)) {
      let startChar = row[j];
      let endChar = row[row.length - 1 - j];

      if (firstDigit == null) {
        if (isNumber(startChar)) {
          firstDigit = startChar;
        }
      }

      if (lastDigit == null) {
        if (isNumber(endChar)) {
          lastDigit = endChar;
        }
      }

      j++;
    }
    totalCalibrationValue += +(firstDigit + lastDigit);
  });
  return totalCalibrationValue;
}

function secondPart(rows) {
  let totalCalibrationValue = 0;

  rows.forEach(row => {
    let firstDigit = undefined, lastDigit = undefined;

    let j = 0;
    while (j < row.length && (firstDigit == null || lastDigit == null)) {
      let startChar = row[j];
      let endChar = row[row.length - 1 - j];

      if (firstDigit == null) {
        if (isNumber(startChar)) {
          firstDigit = startChar;
        } else {
          firstDigit = checkStringForSpelledDigit(row, j, 'forwards');
        }
      }

      if (lastDigit == null) {
        if (isNumber(endChar)) {
          lastDigit = endChar;
        } else {
          lastDigit = checkStringForSpelledDigit(row, row.length - j, 'backwards');
        }
      }

      j++;
    }
    totalCalibrationValue += +(firstDigit + lastDigit);
  });
  return totalCalibrationValue;
}

fs.readFile('./advent-of-code-2023/inputs/day-1.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');

  console.time('first part');
  let totalCalibrationValuePart1 = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let totalCalibrationValuePart2 = secondPart(rows);
  console.timeEnd('second part');

  console.log(totalCalibrationValuePart1, totalCalibrationValuePart2);
});