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

  let nodes = {};
  for (let i = 2; i < rows.length; i++) {
    let [node, destinationNodes] = rows[i].split(' = ');
    let [leftNode, rightNode] = destinationNodes.substring(1, destinationNodes.length - 1).split(', ');

    nodes[node] = [leftNode, rightNode];
  }

  let currentNodes = [...new Set(Object.keys(nodes))].filter(node => node.endsWith('A'));
  let endingSteps = new Array(currentNodes.length).fill(0);
  let steps = 0;
  while (true) {
    for (let i = 0; i < commands.length; i++) {
      for (let j = 0; j < currentNodes.length; j++) {
        let index = commands[i] === 'L' ? 0 : 1;
        currentNodes[j] = nodes[currentNodes[j]][index];
        if (endingSteps[j] === 0 && currentNodes[j].endsWith('Z')) {
          endingSteps[j] = steps + 1;
        }
      }
      steps++;
      if (!endingSteps.some(s => s === 0)) {
        let lcmEndingSteps = undefined;
        for (let j = 0; j < endingSteps.length - 1; j++) {
          lcmEndingSteps = lcm(lcmEndingSteps ?? endingSteps[j], endingSteps[j + 1]);
        }
        return lcmEndingSteps;
      }
    }
  }
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