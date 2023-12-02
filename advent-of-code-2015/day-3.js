const fs = require('node:fs/promises');

function getXY(char) {
  let x = 0, y = 0;
  switch (char) {
    case '>': {
      x++;
      break;
    }
    case '<': {
      x--;
      break;
    }
    case '^': {
      y++;
      break;
    }
    case 'v': {
      y--;
      break;
    }
  }
  return [x, y];
}

function firstPart(data) {
  let houses = new Set([`0_0`]);
  let santaX = 0, santaY = 0;
  for (let i = 0; i < data.length; i++) {
    let [x, y] = getXY(data[i]);
    santaX += x;
    santaY += y;
    houses.add(`${santaX}_${santaY}`);
  }
  return houses.size;
}

function secondPart(data) {
  let houses = new Set([`0_0`]);
  let santaX = 0, santaY = 0;
  let roboSantaX = 0, roboSantaY = 0;
  for (let i = 0; i < data.length; i++) {
    let [x, y] = getXY(data[i]);

    if (i % 2 === 0) {
      santaX += x;
      santaY += y;

      houses.add(`${santaX}_${santaY}`);
    } else {
      roboSantaX += x;
      roboSantaY += y;

      houses.add(`${roboSantaX}_${roboSantaY}`);
    }
  }
  return houses.size;
}

fs.readFile('./advent-of-code-2015/inputs/day-3.txt', { encoding: 'utf8' }).then((data) => {
  console.time('first part');
  let housesVisitedBySanta = firstPart(data);
  console.timeEnd('first part');

  console.time('second part');
  let housesVisitedBySantaAndRoboSanta = secondPart(data);
  console.timeEnd('second part');

  console.log(housesVisitedBySanta, housesVisitedBySantaAndRoboSanta);
});