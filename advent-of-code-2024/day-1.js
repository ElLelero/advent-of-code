const fs = require('node:fs/promises');

function parseRows(rows) {
  let leftList = [];
  let rightList = [];
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let elements = row.split(' ');

    leftList.push(+(elements[0]));
    rightList.push(+(elements[elements.length - 1]));
  }
  return [leftList, rightList];
}

function firstPart(leftList, rightList) {
  let l = [...leftList];
  l.sort((a, b) => a - b);
  let r = [...rightList];
  r.sort((a, b) => a - b);

  let distance = 0;
  for (let i = 0; i < l.length; i++) {
    distance += Math.abs(l[i] - r[i]);
  }
  return distance;
}

function secondPart(leftList, rightList) {
  let leftDict = {};
  let rightDict = {};

  let similarityScore = 0;

  for (let i = 0; i < leftList.length; i++) {
    if (leftDict[leftList[i]] == null) leftDict[leftList[i]] = 0;
    leftDict[leftList[i]]++;
  }

  for (let i = 0; i < rightList.length; i++) {
    if (rightDict[rightList[i]] == null) rightDict[rightList[i]] = 0;
    rightDict[rightList[i]]++;
  }

  for (let i = 0; i < leftList.length; i++) {
    let occurencies = rightDict[leftList[i]] ?? 0;
    similarityScore += (occurencies * leftList[i]);
  }

  return similarityScore;

}

fs.readFile('./advent-of-code-2024/inputs/day-1.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');
  let [leftList, rightList] = parseRows(rows);

  console.time('first part');
  let distance = firstPart(leftList, rightList);
  console.timeEnd('first part');

  console.time('second part');
  let similarityScore = secondPart(leftList, rightList);
  console.timeEnd('second part');

  console.log(distance, similarityScore);
});