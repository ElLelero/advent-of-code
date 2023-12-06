const fs = require('node:fs/promises');

function getWaysToBeatRecord(time, maxDistance) {
  let delta = time * time - 4 * maxDistance;
  if (delta >= 0) {
    let sqrtDelta = Math.sqrt(delta);

    let x1 = (time - sqrtDelta) / 2.0;
    let x2 = (time + sqrtDelta) / 2.0;

    return Math.floor(x2) - Math.floor(x1);
  }
  return 0;
}

function firstPart(rows) {
  let times = rows[0].substring(6).trim().split(' ').filter(n => n !== '').map(n => +n);
  let maxDistances = rows[1].substring(10).trim().split(' ').filter(n => n !== '').map(n => +n);

  let waysToBeatTheRecord = null;

  for (let i = 0; i < times.length; i++) {
    waysToBeatTheRecord = (waysToBeatTheRecord ?? 1) * getWaysToBeatRecord(times[i], maxDistances[i]);
  }
  return waysToBeatTheRecord ?? 0;
}

function secondPart(rows) {
  let time = +(rows[0].substring(6).trim().split(' ').join(''));
  let maxDistance = +(rows[1].substring(10).trim().split(' ').join(''));

  return getWaysToBeatRecord(time, maxDistance);
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