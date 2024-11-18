const fs = require('node:fs/promises');

function parse(row) {
  let words = row.split('.').join('').split(' ');
  let name = words[0];
  let sign = words[2] === 'gain' ? 1 : -1;
  let amount = +(words[3]);
  let otherName = words[words.length - 1];
  return {
    name,
    amount: amount * sign,
    otherName
  }
}

function firstPart(data) {
  let rows = data.split(`\n`);
  let dictionary = {};
  let peopleSet = new Set();
  for (let i = 0; i < rows.length; i++) {
    let { name, amount, otherName } = parse(rows[i]);
    if (dictionary[name] == null) dictionary[name] = {};
    dictionary[name][otherName] = amount;
    peopleSet.add(name);
  }

  let maxHappiness = undefined;

  let people = [...peopleSet];
  let tableCombinations = combinations(people);
  for (let i = 0; i < tableCombinations.length; i++) {
    let [A, B, C, D, E, F, G, H] = tableCombinations[i];
    let amountAB = dictionary[A][B] + dictionary[B][A];
    let amountBC = dictionary[B][C] + dictionary[C][B];
    let amountCD = dictionary[C][D] + dictionary[D][C];
    let amountDE = dictionary[D][E] + dictionary[E][D];
    let amountEF = dictionary[E][F] + dictionary[F][E];
    let amountFG = dictionary[F][G] + dictionary[G][F];
    let amountGH = dictionary[G][H] + dictionary[H][G];
    let amountHA = dictionary[H][A] + dictionary[A][H];
    let happiness = amountAB
      + amountBC
      + amountCD
      + amountDE
      + amountEF
      + amountFG
      + amountGH
      + amountHA;
    if (maxHappiness == null || happiness > maxHappiness) maxHappiness = happiness;
  }
  return maxHappiness;
}

function secondPart(data) {
  let rows = data.split(`\n`);
  let dictionary = {
    'Myself': {}
  };
  let peopleSet = new Set(['Myself']);
  for (let i = 0; i < rows.length; i++) {
    let { name, amount, otherName } = parse(rows[i]);
    if (dictionary[name] == null) dictionary[name] = {};
    dictionary[name][otherName] = amount;
    dictionary['Myself'][name] = 0;
    dictionary[name]['Myself'] = 0;
    peopleSet.add(name);
  }

  let maxHappiness = undefined;
  let people = [...peopleSet];
  let tableCombinations = combinations(people);
  for (let n = 0; n < tableCombinations.length; n++) {
    let [A, B, C, D, E, F, G, H, I] = tableCombinations[n];
    let amountAB = dictionary[A][B] + dictionary[B][A];
    let amountBC = dictionary[B][C] + dictionary[C][B];
    let amountCD = dictionary[C][D] + dictionary[D][C];
    let amountDE = dictionary[D][E] + dictionary[E][D];
    let amountEF = dictionary[E][F] + dictionary[F][E];
    let amountFG = dictionary[F][G] + dictionary[G][F];
    let amountGH = dictionary[G][H] + dictionary[H][G];
    let amountHI = dictionary[H][I] + dictionary[I][H];
    let amountIA = dictionary[I][A] + dictionary[A][I];
    let happiness = amountAB
      + amountBC
      + amountCD
      + amountDE
      + amountEF
      + amountFG
      + amountGH
      + amountHI
      + amountIA;
    if (maxHappiness == null || happiness > maxHappiness) maxHappiness = happiness;
  }
  return maxHappiness;
}


function combinations(elements) {
  if ((elements ?? []).length === 0) return [];
  if ((elements ?? []).length === 1) return [[elements[0]]];

  let results = [];
  for (let i = 0; i < (elements ?? []).length; i++) {
    let element = elements[i];
    let subElements = [...elements];
    subElements.splice(i, 1);
    let subResults = combinations(subElements);
    for (let j = 0; j < subResults.length; j++) {
      results.push([
        element,
        ...(subResults[j])
      ]);
    }
  }
  return results;
}



fs.readFile('./advent-of-code-2015/inputs/day-13.txt', { encoding: 'utf8' }).then((data) => {
  console.time('first part');
  let maxHappiness = firstPart(data);
  console.timeEnd('first part');

  console.time('second part');
  let maxHappiness2 = secondPart(data);
  console.timeEnd('second part');

  console.log(maxHappiness, maxHappiness2);
});