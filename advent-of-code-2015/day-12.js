const fs = require('node:fs/promises');

function getSumOfJsonFirstPart(jsonData) {
  let sum = 0;
  if (Array.isArray(jsonData)) {
    for (let i = 0; i < jsonData.length; i++) {
      if (typeof jsonData[i] === 'number') {
        sum += +jsonData[i];
      } else {
        if (typeof jsonData[i] !== 'string') {
          sum += getSumOfJsonFirstPart(jsonData[i]);
        }
      }
    }
  } else {
    if (Object.keys(jsonData).length > 0) {
      Object.entries(jsonData).forEach(([key, j]) => {
        if (typeof key === 'number') {
          sum += key;
        }
        if (typeof j === 'number') {
          sum += +j;
        } else {
          if (typeof j !== 'string') {
            sum += getSumOfJsonFirstPart(j);
          }
        }
      });
    } else {
      if (typeof jsonData === 'number') {
        sum += +jsonData;
      }
    }
  }
  return sum;
}


function getSumOfJsonSecondPart(jsonData) {
  let sum = 0;
  if (Array.isArray(jsonData)) {
    for (let i = 0; i < jsonData.length; i++) {
      if (typeof jsonData[i] === 'number') {
        sum += +jsonData[i];
      } else {
        if (typeof jsonData[i] !== 'string') {
          sum += getSumOfJsonSecondPart(jsonData[i]) ?? 0;
        }
      }
    }
  } else {
    if (Object.keys(jsonData).length > 0) {
      let entries = Object.entries(jsonData);
      for (let i = 0; i < entries.length; i++) {
        let [key, j] = entries[i];
        if (key === 'red' || j === 'red') {
          sum = null;
          break;
        }
        if (typeof key === 'number') {
          sum += key;
        }
        if (typeof j === 'number') {
          sum += +j;
        } else {
          if (typeof j !== 'string') {
            sum += getSumOfJsonSecondPart(j) ?? 0;
          }
        }
      }

    } else {
      if (typeof jsonData === 'number') {
        sum += +jsonData;
      }
    }
  }
  return sum;
}


function firstPart(jsonData) {
  return getSumOfJsonFirstPart(jsonData);
}

function secondPart(jsonData) {
  return getSumOfJsonSecondPart(jsonData);
}

fs.readFile('./advent-of-code-2015/inputs/day-12.txt', { encoding: 'utf8' }).then((data) => {
  let jsonData = JSON.parse(data);

  console.time('first part');
  let sum = firstPart(jsonData);
  console.timeEnd('first part');

  console.time('second part');
  let newSum = secondPart(jsonData) ?? 0;
  console.timeEnd('second part');

  console.log(sum, newSum);
});