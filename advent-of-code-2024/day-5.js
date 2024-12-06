const fs = require('node:fs/promises');

function parseConfig(configRaw) {
  let config = [];
  let configRows = configRaw.split('\n');
  for (let i = 0; i < configRows.length; i++) {
    config.push(configRows[i].split('|').map(c => +(c)));
  }
  return config;
}

function isUpdateCorrect(config, update) {
  let elements = update.split(',').map(n => +(n));
  let elementsSet = new Set(elements);
  for (let i = 0; i < config.length; i++) {
    let [firstPage, secondPage] = config[i];
    if (elementsSet.has(firstPage) && elementsSet.has(secondPage)) {
      let firstPageIndex = elements.findIndex(n => n === firstPage);
      let secondPageIndex = elements.findIndex(n => n === secondPage);
      if (firstPageIndex > secondPageIndex) {
        return false;
      }
    }
  }
  return true;
}

function fixUpdate(config, update) {
  let rules = [];
  let elements = update.split(',').map(n => +(n));
  let elementsSet = new Set(elements);
  for (let i = 0; i < config.length; i++) {
    let [firstPage, secondPage] = config[i];
    if (elementsSet.has(firstPage) && elementsSet.has(secondPage)) {
      rules.push([...config[i]]);
    }
  }
  let rulesDict = {};
  for (let i = 0; i < elements.length; i++) {
    let r = rules.filter(r => r[0] === elements[i]);
    rulesDict[elements[i]] = r;
  }
  return Object.entries(rulesDict).sort((a, b) => {
    let aRules = a[1].length;
    let bRules = b[1].length;
    return bRules - aRules;
  }).map(([e, r]) => e).join(',');
}

function firstPart(configRaw, rowsRaw) {
  let rows = rowsRaw.split('\n');
  let config = parseConfig(configRaw);

  let sum = 0;
  for (let i = 0; i < rows.length; i++) {
    let updateCorrect = isUpdateCorrect(config, rows[i]);
    if (updateCorrect === true) {
      let elements = rows[i].split(',').map(n => +(n));
      sum += elements[(elements.length - 1) / 2];
    }
  }

  return sum;
}

function secondPart(configRaw, rowsRaw) {
  let rows = rowsRaw.split('\n');
  let config = parseConfig(configRaw);

  let sum = 0;
  for (let i = 0; i < rows.length; i++) {
    let updateCorrect = isUpdateCorrect(config, rows[i]);
    if (updateCorrect !== true) {
      let newUpdate = fixUpdate(config, rows[i]);
      let elements = newUpdate.split(',').map(n => +(n));
      sum += elements[(elements.length - 1) / 2];
    }
  }

  return sum;
}

fs.readFile('./advent-of-code-2024/inputs/day-5.txt', { encoding: 'utf8' }).then((data) => {
  let [configRaw, rows] = data.split('\n\n');
  console.time('first part');
  let sum = firstPart(configRaw, rows);
  console.timeEnd('first part');

  console.time('second part');
  let sum2 = secondPart(configRaw, rows);
  console.timeEnd('second part');

  console.log(sum, sum2);
});