const fs = require('node:fs/promises');

function parse(row) {
  let words = row.split(' ');
  let reindeer = words[0];
  let speed = +(words[3]);
  let speedTime = +(words[6]);
  let restTime = +(words[words.length - 2]);
  return {
    name: reindeer,
    speed,
    speedTime,
    restTime,
  };
}

function calcDistance(time, speed, speedTime, restTime) {
  let cycleTime = speedTime + restTime;
  let cycles = Math.floor(time / cycleTime);
  let distance = cycles * speedTime * speed;
  let remainingTime = time - cycles * cycleTime;
  distance += Math.min(remainingTime, speedTime) * speed;

  return distance;
}

function firstPart(data) {
  let rows = data.split(`\n`);
  let reindeers = [];
  for (let i = 0; i < rows.length; i++) {
    reindeers.push(parse(rows[i]));
  }

  let maxDistance = 0;
  let time = 2503;
  for (let i = 0; i < reindeers.length; i++) {
    let { speed, speedTime, restTime } = reindeers[i];
    let distance = calcDistance(time, speed, speedTime, restTime);

    if (distance > maxDistance) {
      maxDistance = distance;
    }
  }
  return maxDistance;
}

function secondPart(data) {
  let rows = data.split(`\n`);
  let reindeers = [];
  for (let i = 0; i < rows.length; i++) {
    reindeers.push({
      ...parse(rows[i]),
      points: 0,
      distance: 0,
    });
  }

  for (let time = 1; time <= 2503; time++) {
    let maxDistance = 0;
    for (let i = 0; i < reindeers.length; i++) {
      let { speed, speedTime, restTime } = reindeers[i];
      let distance = calcDistance(time, speed, speedTime, restTime);
      reindeers[i].distance = distance;

      if (distance > maxDistance) {
        maxDistance = distance;
      }
    }
    for (let i = 0; i < reindeers.length; i++) {
      if (reindeers[i].distance === maxDistance) {
        reindeers[i].points++;
      }
    }
  }
  return Math.max(...reindeers.map(r => r.points));
}

fs.readFile('./advent-of-code-2015/inputs/day-14.txt', { encoding: 'utf8' }).then((data) => {
  console.time('first part');
  let maxDistance = firstPart(data);
  console.timeEnd('first part');

  console.time('second part');
  let maxPoints = secondPart(data);
  console.timeEnd('second part');

  console.log(maxDistance, maxPoints);
});