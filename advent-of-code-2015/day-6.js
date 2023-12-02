const fs = require('node:fs/promises');

function getCommand(row) {
  if (row.startsWith('turn on')) {
    return 'turn on';
  }
  if (row.startsWith('turn off')) {
    return 'turn off';
  }
  return 'toggle';
}

function getCoords(row) {
  let coords = row.split(' through ');

  let [startingX, startingY] = coords[0].split(',');
  startingX = +startingX;
  startingY = +startingY;

  let [endingX, endingY] = coords[1].split(',');
  endingX = +endingX;
  endingY = +endingY;

  return [startingX, startingY, endingX, endingY];
}

function firstPart(rows) {
  let lights = new Array(1000 * 1000).fill(false);
  let lightsLit = 0;

  rows.forEach(row => {
    let command = getCommand(row);

    let [startingX, startingY, endingX, endingY] = getCoords(row.replace(command, ''));

    for (let i = startingX; i <= endingX; i++) {
      for (let j = startingY; j <= endingY; j++) {
        let arrayIndex = i * 1000 + j;
        if (command === 'turn on') {
          lights[arrayIndex] = true;
        } else {
          if (command === 'turn off') {
            lights[arrayIndex] = false;
          } else {
            lights[arrayIndex] = !lights[arrayIndex];
          }
        }
      }
    }
  });

  for (let i = 0; i < lights.length; i++) {
    if (lights[i] === true) {
      lightsLit++;
    }
  }
  return lightsLit;
}

function secondPart(rows) {
  let lights = new Array(1000 * 1000).fill(0);
  let totalBrightness = 0;

  rows.forEach(row => {
    let command = getCommand(row);

    let [startingX, startingY, endingX, endingY] = getCoords(row.replace(command, ''));

    for (let i = startingX; i <= endingX; i++) {
      for (let j = startingY; j <= endingY; j++) {
        let arrayIndex = i * 1000 + j;
        if (command === 'turn on') {
          lights[arrayIndex]++;
        } else {
          if (command === 'turn off') {
            lights[arrayIndex]--;
            if (lights[arrayIndex] < 0) lights[arrayIndex] = 0;
          } else {
            lights[arrayIndex] += 2;
          }
        }
      }
    }
  });

  for (let i = 0; i < lights.length; i++) {
    totalBrightness += lights[i];
  }
  return totalBrightness;
}

fs.readFile('./advent-of-code-2015/inputs/day-6.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');

  console.time('first part');
  let lightsLit = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let totalBrightness = secondPart(rows);
  console.timeEnd('second part');

  console.log(lightsLit, totalBrightness);
});