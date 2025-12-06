const fs = require('node:fs/promises');

function sumOfNumbers(elements) {
  return elements.reduce((sum, a) => sum + (+(a)), 0);
}

function productOfNumbers(elements) {
  return elements.reduce((sum, a) => sum * (+(a)), 1);
}

function firstPart(rows) {
  let cols = [];
  for (let i = 0; i < rows.length; i++) {
    let elements = rows[i].split(' ').filter(e => e !== '');
    for (let j = 0; j < elements.length; j++) {
      if (cols[j] == null) cols[j] = [];
      cols[j].push(elements[j]);
    }
  }

  let grandTotal = 0;

  for (let i = 0; i < cols.length; i++) {
    let elements = cols[i];
    let [sign] = elements.splice(elements.length - 1, 1);

    if (sign === '+') {
      grandTotal += sumOfNumbers(elements);
    } else {
      grandTotal += productOfNumbers(elements);
    }
  }

  return grandTotal;
}


function secondPart(rows) {
  let rowLength = rows[0].length;
  let grandTotal = 0;
  let elements = [];

  for (let i = rowLength - 1; i >= 0; i--) {
    let stringNumber = '';
    let sign = '';
    for (let j = 0; j < rows.length; j++) {
      let char = rows[j][i];
      if (char !== '+' && char !== '*') {
        stringNumber += char;
      } else {
        sign = char;
        elements.push(stringNumber);

        if (sign === '+') {
          grandTotal += sumOfNumbers(elements);
        } else {
          grandTotal += productOfNumbers(elements);
        }

        elements = [];
        stringNumber = '';
      }
    }
    if (stringNumber.toString().trim() !== '') {
      elements.push(stringNumber);
    }

  }
  return grandTotal;
}

fs.readFile('./advent-of-code-2025/inputs/day-6.txt', { encoding: 'utf8' }).then((data) => {
  console.time('first part');
  let total = firstPart(data.split('\n'));
  console.timeEnd('first part');

  console.time('second part');
  let total2 = secondPart(data.split('\n'));
  console.timeEnd('second part');

  console.log(total, total2);
});