const fs = require('node:fs/promises');

function firstPart(row) {
  let sum = 0;
  for (let i = 0; i < row.length; i++) {
    if (row.substring(i, i + 4) === 'mul(') {
      let index = (row).indexOf(')', i + 4);
      if (index !== -1) {
        let argsRaw = row.substring(i + 4, index);
        let args = argsRaw.split(',');
        if (args.length === 2) {
          let argsLengthValid = !args.some(arg => arg.length > 3 || arg.length < 1);
          if (argsLengthValid === true) {
            sum += ((+args[0]) * (+args[1]));
          }
        }
      }
    }
  }
  return sum;
}

function secondPart(row) {
  let sum = 0;
  let enabled = true;
  for (let i = 0; i < row.length; i++) {
    if (row.substring(i, i + 4) === 'mul(') {
      let index = (row).indexOf(')', i + 4);
      if (index !== -1) {
        let argsRaw = row.substring(i + 4, index);
        let args = argsRaw.split(',');
        if (args.length === 2) {
          let argsLengthValid = !args.some(arg => arg.length > 3 || arg.length < 1);
          if (argsLengthValid === true) {
            if (enabled === true) {
              sum += ((+args[0]) * (+args[1]));
            }
          }
        }
      }
    }
    if (row.substring(i, i + 4) === 'do()') {
      enabled = true;
    }
    if (row.substring(i, i + 7) === `don't()`) {
      enabled = false;
    }
  }
  return sum;
}

fs.readFile('./advent-of-code-2024/inputs/day-3.txt', { encoding: 'utf8' }).then((data) => {
  console.time('first part');
  let sum = firstPart(data);
  console.timeEnd('first part');

  console.time('second part');
  let sum2 = secondPart(data);
  console.timeEnd('second part');

  console.log(sum, sum2);
});