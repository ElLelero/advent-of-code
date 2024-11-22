const fs = require('node:fs/promises');

function getLightNextState(light, onNeighbors) {
  if (light === '#' && onNeighbors === 2 || onNeighbors === 3) {
    return '#';
  }
  return '.';
}

function getOnNeighbors(grid, row, column) {
  let isUpperLeftNeighborOn = (row === 0 ? undefined : column === 0 ? undefined : grid[row - 1][column - 1]) === '#';
  let isUpperMiddleNeighborOn = (row === 0 ? undefined : grid[row - 1][column]) === '#';
  let isUpperRightNeighborOn = (row === 0 ? undefined : column === grid[row].length - 1 ? undefined : grid[row - 1][column + 1]) === '#';
  let isMiddleRightNeighborOn = (column === 0 ? undefined : grid[row][column - 1]) === '#';
  let isMiddleLeftNeighborOn = (column === grid[row].length - 1 ? undefined : grid[row][column + 1]) === '#';
  let isLowerLeftNeighborOn = (row === grid.length - 1 ? undefined : column === 0 ? undefined : grid[row + 1][column - 1]) === '#';
  let isLowerMiddleNeighborOn = (row === grid.length - 1 ? undefined : grid[row + 1][column]) === '#';
  let isLowerRightNeighborOn = (row === grid.length - 1 ? undefined : column === grid[row].length - 1 ? undefined : grid[row + 1][column + 1]) === '#';

  return (isUpperLeftNeighborOn === true ? 1 : 0) +
    (isUpperMiddleNeighborOn === true ? 1 : 0) +
    (isUpperRightNeighborOn === true ? 1 : 0) +
    (isMiddleRightNeighborOn === true ? 1 : 0) +
    (isMiddleLeftNeighborOn === true ? 1 : 0) +
    (isLowerLeftNeighborOn === true ? 1 : 0) +
    (isLowerMiddleNeighborOn === true ? 1 : 0) +
    (isLowerRightNeighborOn === true ? 1 : 0);
}

function getGridCopy(grid) {
  return [...grid.map(row => [...row.map(column => column)])];
}

function countOnLight(grid) {
  return grid.map(row => row.filter(column => column === '#').length).reduce((sum, a) => sum + a, 0);
}

function firstPart(data) {
  let grid = [];
  let rows = data.split(`\n`);
  for (let i = 0; i < rows.length; i++) {
    grid.push(rows[i].split(''));
  }
  for (let iteration = 0; iteration < 100; iteration++) {
    let newGrid = getGridCopy(grid);

    for (let row = 0; row < grid.length; row++) {
      for (let column = 0; column < grid[row].length; column++) {
        let light = grid[row][column];
        let onNeighbors = getOnNeighbors(grid, row, column);
        light = getLightNextState(light, onNeighbors);

        newGrid[row][column] = light;
      }
    }
    grid = getGridCopy(newGrid);
  }
  return countOnLight(grid);
}

function secondPart(data) {
  let grid = [];
  let rows = data.split(`\n`);
  for (let i = 0; i < rows.length; i++) {
    grid.push(rows[i].split(''));
  }
  grid[0][0] = '#';
  grid[0][grid[0].length - 1] = '#';
  grid[grid.length - 1][0] = '#';
  grid[grid.length - 1][grid[0].length - 1] = '#';

  for (let iteration = 0; iteration < 100; iteration++) {
    let newGrid = getGridCopy(grid);

    for (let row = 0; row < grid.length; row++) {
      for (let column = 0; column < grid[row].length; column++) {
        let light = grid[row][column];
        let onNeighbors = getOnNeighbors(grid, row, column);
        light = getLightNextState(light, onNeighbors);

        newGrid[row][column] = light;

        newGrid[0][0] = '#';
        newGrid[0][newGrid[0].length - 1] = '#';
        newGrid[newGrid.length - 1][0] = '#';
        newGrid[newGrid.length - 1][newGrid[0].length - 1] = '#';
      }
    }
    grid = getGridCopy(newGrid);
  }
  return countOnLight(grid);
}

fs.readFile('./advent-of-code-2015/inputs/day-18.txt', { encoding: 'utf8' }).then((data) => {
  console.time('first part');
  let onLights = firstPart(data);
  console.timeEnd('first part');

  console.time('second part');
  let onLights2 = secondPart(data);
  console.timeEnd('second part');

  console.log(onLights, onLights2);
});