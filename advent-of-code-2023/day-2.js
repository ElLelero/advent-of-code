const fs = require('node:fs/promises');

const maxAllowedCubes = {
  'red': 12,
  'green': 13,
  'blue': 14,
};

function getMinimumCubesSetForGame(turns) {
  let minimumCubesSet = {
    'red': 0,
    'green': 0,
    'blue': 0,
  };
  for (let i = 0; i < turns.length; i++) {
    let turn = turns[i];
    let extractedCubes = turn.split(', ');

    for (let j = 0; j < extractedCubes.length; j++) {
      let [cubes, cubeColor] = extractedCubes[j].split(' ');
      cubes = +cubes;
      if (minimumCubesSet[cubeColor] < cubes) {
        minimumCubesSet[cubeColor] = cubes;
      }
    }
  }
  return minimumCubesSet;
}

function isGameValid(turns) {
  for (let i = 0; i < turns.length; i++) {
    let maxCubes = {
      'red': 0,
      'green': 0,
      'blue': 0,
    };
    let turn = turns[i];
    let extractedCubes = turn.split(', ');

    for (let j = 0; j < extractedCubes.length; j++) {
      let [cubes, cubeColor] = extractedCubes[j].split(' ');
      cubes = +cubes;
      if (maxCubes[cubeColor] < cubes) {
        maxCubes[cubeColor] = cubes;
        if (maxCubes[cubeColor] > maxAllowedCubes[cubeColor]) {
          return false;
        }
      }
    }
  }
  return true;
}

function firstPart(rows) {
  let validGameIdsSum = 0;

  rows.forEach(row => {
    let [gameId, games] = row.split(': ');
    gameId = gameId.substring(5);

    let turns = games.split('; ');
    let gameValid = isGameValid(turns);

    if (gameValid === true) {
      validGameIdsSum += (+gameId);
    }
  });
  return validGameIdsSum;
}

function secondPart(rows) {
  let minimumSetsPowerSum = 0;

  rows.forEach(row => {
    let [gameId, games] = row.split(': ');

    let turns = games.split('; ');
    let maxCubesInGame = getMinimumCubesSetForGame(turns);

    minimumSetsPowerSum += maxCubesInGame['red'] * maxCubesInGame['green'] * maxCubesInGame['blue'];
  });
  return minimumSetsPowerSum;
}

fs.readFile('./advent-of-code-2023/inputs/day-2.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');

  console.time('first part');
  let validGameIdsSum = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let minimumSetsPowerSum = secondPart(rows);
  console.timeEnd('second part');

  console.log(validGameIdsSum, minimumSetsPowerSum);
});