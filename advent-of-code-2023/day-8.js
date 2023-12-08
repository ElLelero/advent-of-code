const fs = require('node:fs/promises');

function firstPart(rows) {
  let commands = rows[0];

  let nodes = {};
  for (let i = 2; i < rows.length; i++) {
    let [node, destinationNodes] = rows[i].split(' = ');
    let [leftNode, rightNode] = destinationNodes.substring(1, destinationNodes.length - 1).split(', ');

    nodes[node] = [leftNode, rightNode];
  }

  let currentNode = 'AAA';
  let steps = 0;
  while (true) {
    for (let i = 0; i < commands.length; i++) {
      let index = commands[i] === 'L' ? 0 : 1;
      currentNode = nodes[currentNode][index];
      steps++;
      if (currentNode === 'ZZZ') {
        return steps;
      }
    }
  }
}

function secondPart(rows) {
  let commands = rows[0];

  let currentNodes = [], nodesSteps = [];
  let nodes = {};
  for (let i = 2; i < rows.length; i++) {
    let [node, destinationNodes] = rows[i].split(' = ');
    let [leftNode, rightNode] = destinationNodes.substring(1, destinationNodes.length - 1).split(', ');

    nodes[node] = [leftNode, rightNode];

    if (node.endsWith('A')) {
      currentNodes.push(node);
      nodesSteps.push(0);
    }
  }

  for (let i = 0; i < currentNodes.length; i++) {
    let steps = 0;
    let found = false;
    while (!found) {
      for (let j = 0; j < commands.length && !found; j++) {
        let index = commands[j] === 'L' ? 0 : 1;
        currentNodes[i] = nodes[currentNodes[i]][index];
        nodesSteps[i] = ++steps;
        found = currentNodes[i].endsWith('Z');
      }
    }
  }
  let concurrentSteps = nodesSteps[0];
  for (let i = 1; i < nodesSteps.length; i++) {
    concurrentSteps = lcm(concurrentSteps, nodesSteps[i]);
  }
  return concurrentSteps;
}

function gcd(a, b) {
  let temp = b;
  while (b !== 0) {
    b = a % b;
    a = temp;
    temp = b;
  }
  return a;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}


fs.readFile('./advent-of-code-2023/inputs/day-8.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');

  console.time('first part');
  let steps = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let concurrentSteps = secondPart(rows);
  console.timeEnd('second part');

  console.log(steps, concurrentSteps);
});