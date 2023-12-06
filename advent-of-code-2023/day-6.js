const fs = require('node:fs/promises');

function firstPart(rows) {
  let times = rows[0].substring(6).trim().split(' ').filter(n => n !== '').map(n => +n);
  let maxDistances = rows[1].substring(10).trim().split(' ').filter(n => n !== '').map(n => +n);

  let waysToBeatTheRecord = null;

  for (let i = 0; i < times.length; i++) {
    let time = times[i];

    let sqrtDelta = Math.sqrt(time * time - 4 * maxDistances[i]);
    let x1 = (-time + sqrtDelta) / -2.0;
    let x2 = (-time - sqrtDelta) / -2.0;

    waysToBeatTheRecord = (waysToBeatTheRecord ?? 1) * (Math.floor(x2) - Math.floor(x1));
  }
  return waysToBeatTheRecord;
}

function secondPart(rows) {
  let time = rows[0].substring(6).trim().split(' ').filter(n => n !== '').join('');
  let maxDistance = rows[1].substring(10).trim().split(' ').filter(n => n !== '').join('');

  let waysToBeatTheRecord = null;

  let sqrtDelta = Math.sqrt(time * time - 4 * maxDistance);

  let x1 = (-time + sqrtDelta) / -2.0;
  let x2 = (-time - sqrtDelta) / -2.0;

  waysToBeatTheRecord = Math.floor(x2) - Math.floor(x1);

  return waysToBeatTheRecord;
}

fs.readFile('./advent-of-code-2023/inputs/day-6.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');

  console.time('first part');
  let waysToBeatTheRecord = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let newWaysToBeatTheRecord = secondPart(rows);
  console.timeEnd('second part');

  console.log(waysToBeatTheRecord, newWaysToBeatTheRecord);

});