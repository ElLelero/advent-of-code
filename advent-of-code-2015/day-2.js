const fs = require('node:fs/promises');

function firstPart(rows) {
  let totalSurfaceArea = 0;
  rows.forEach(dimensions => {
    let [l, w, h] = dimensions.split('x').map(n => +n);
    let surfaceArea = 2 * (l * w + w * h + h * l);
    let extraPaperArea = Math.min(l * w, w * h, h * l);

    totalSurfaceArea += surfaceArea + extraPaperArea;
  });
  return totalSurfaceArea;
}

function secondPart(rows) {
  let totalLength = 0;
  rows.forEach(dimensions => {
    let [l, w, h] = dimensions.split('x').map(n => +n);

    let minimumPermieter = Math.min(2 * (l + w), 2 * (w + h), 2 * (h + l));
    let volume = l * w * h;

    totalLength += minimumPermieter + volume;
  });
  return totalLength;
}

fs.readFile('./advent-of-code-2015/inputs/day-2.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');

  console.time('first part');
  let totalSurfaceArea = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let totalLength = secondPart(rows);
  console.timeEnd('second part');

  console.log(totalSurfaceArea, totalLength);
});