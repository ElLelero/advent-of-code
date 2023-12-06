const fs = require('node:fs/promises');

function findValue(list, value) {
  let nextElements = list.map(({ destinationRangeStart, sourceRangeStart, rangeLength }) => {
    if (value >= sourceRangeStart && value <= sourceRangeStart + rangeLength) {
      let delta = value - sourceRangeStart;
      return delta + destinationRangeStart;
    }
    return null;
  }).filter(nextElement => nextElement != null);
  if (nextElements.length === 0) {
    nextElements = [value];
  }
  return nextElements[0];
}

function findRanges(list, seedRange) {
  let newRanges = [];
  list.forEach(range => {
    let { destinationRangeStart, sourceRangeStart, rangeLength } = range;

    if ((sourceRangeStart + rangeLength - 1 >= seedRange.start) && (sourceRangeStart < seedRange.end)) {
      newRanges.push({
        start: Math.max(sourceRangeStart, seedRange.start) + (destinationRangeStart - sourceRangeStart),
        end: Math.min(sourceRangeStart + rangeLength - 1, seedRange.end) + (destinationRangeStart - sourceRangeStart)
      })
    }
  });

  if (newRanges.length > 0) {
    return newRanges;
  }
  return undefined;
}

function createLists(rows) {
  let lists = {
    'seed-to-soil': [],
    'soil-to-fertilizer': [],
    'fertilizer-to-water': [],
    'water-to-light': [],
    'light-to-temperature': [],
    'temperature-to-humidity': [],
    'humidity-to-location': [],
  };
  let map = undefined;
  let temp = [];
  for (let i = 1; i < rows.length; i++) {
    let row = rows[i];
    if (row !== '') {
      if (map == null) {
        if (row.indexOf(' map')) {
          map = row.split(' map')[0];
        }
      } else {
        let [destinationRangeStart, sourceRangeStart, rangeLength] = row.split(' ').filter(n => n !== '').map(n => +n);
        temp.push({
          destinationRangeStart,
          sourceRangeStart,
          rangeLength
        });
      }
    } else {
      if (temp.length > 0) {
        lists[map] = [...temp];
        temp = [];
        map = undefined;
      }
    }
  }
  if (temp.length > 0) {
    lists[map] = [...temp];
  }
  Object.entries(lists).forEach(([name, list]) => {
    list.sort();
  });
  return lists;
}

function firstPart(rows) {
  let seeds = rows[0].split('seeds: ')[1].split(' ').filter(n => n !== '').map(n => +n);

  let lists = createLists(rows);
  let listsKeys = Object.keys(lists);

  let locations = seeds.map(seed => {
    let value = seed;
    listsKeys.forEach(key => {
      value = findValue(lists[key], value);
    });
    return value;
  });

  return Math.min.apply(Math, locations);
}

function secondPart(rows) {
  let seedsInput = rows[0].split('seeds: ')[1].split(' ').filter(n => n !== '').map(n => +n);

  let seedsRange = [];
  for (let i = 0; i < seedsInput.length / 2; i++) {
    seedsRange.push({
      start: seedsInput[i * 2],
      end: seedsInput[i * 2] + seedsInput[i * 2 + 1],
    });
  }
  let lists = createLists(rows);
  let minLocation = undefined;

  let ranges = [...seedsRange];
  let listsKeys = Object.keys(lists);
  listsKeys.forEach(key => {
    let newRanges = [];
    ranges.forEach(range => {
      newRanges.push(...(findRanges(lists[key], range) ?? [range]));
    });
    ranges = [...newRanges];
  });

  let min = Math.min.apply(Math, ranges.map(range => range.start));
  if (min < minLocation || minLocation == null) {
    minLocation = min;
  }

  return minLocation;
}


fs.readFile('./advent-of-code-2023/inputs/day-5.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');

  console.time('first part');
  let minLocation = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let newMinLocation = secondPart(rows);
  console.timeEnd('second part');

  console.log(minLocation, newMinLocation);
});