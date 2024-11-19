const fs = require('node:fs/promises');

function generateWays(containers, total, originalTotal = undefined, currentConfig = []) {
  if (originalTotal == null) originalTotal = total;
  
  if (total < 0) return [];
  if (currentConfig.reduce((sum, a) => sum + a, 0) === originalTotal) {
    return [currentConfig];
  }
  let totalWays = [];
  for (let i = 0; i < containers.length; i++) {
    let container = containers[i];
    let newTotal = total - container;
    let newContainers = [...containers];
    for (let j = 0; j <= i; j++) newContainers.shift();
    let ways = generateWays(newContainers, newTotal, originalTotal, [...currentConfig, container]);
    if (ways.length > 0) {
      totalWays = [...totalWays, ...ways];
    }
  }
  return totalWays;
}


function firstPart(data) {
  let containers = data.split(`\n`).map(r => +(r));
  containers.sort((a, b) => b - a);
  let ways = generateWays(containers, 150);
  return ways.length;
}

function secondPart(data) {
  let containers = data.split(`\n`).map(r => +(r));
  containers.sort((a, b) => b - a);
  let ways = generateWays(containers, 150);
  let minLength = Math.min(...ways.map(way => way.length));
  return ways.filter(way => way.length === minLength).length;
}

fs.readFile('./advent-of-code-2015/inputs/day-17.txt', { encoding: 'utf8' }).then((data) => {
  console.time('first part');
  let waysNumber = firstPart(data);
  console.timeEnd('first part');

  console.time('second part');
  let uniqueWaysNumber = secondPart(data);
  console.timeEnd('second part');

  console.log(waysNumber, uniqueWaysNumber);
});