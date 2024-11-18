const fs = require('node:fs/promises');

function parse(row) {
  let rememberedCompounds = {};
  let auntNumber = +(row.split(' ')[1].split(':').join(''));
  let rememberedCompoundsRaw = row.split(`Sue ${auntNumber}:`).join('').trim();
  let rememberedCompoundsList = rememberedCompoundsRaw.split(', ');
  for (let j = 0; j < rememberedCompoundsList.length; j++) {
    let [compound, amountRaw] = rememberedCompoundsList[j].split(': ');
    rememberedCompounds[compound] = (+amountRaw);
  }
  return {
    number: auntNumber,
    rememberedCompounds
  };
}

function firstPart(data, detectedCompounds) {
  let rows = data.split(`\n`);
  let aunts = [];
  for (let i = 0; i < rows.length; i++) {
    aunts.push(parse(rows[i]));
  }
  let finalAunts = [...aunts];
  let detectedCompoundsEntries = Object.entries(detectedCompounds);
  for (let i = 0; i < detectedCompoundsEntries.length; i++) {
    let [compound, amount] = detectedCompoundsEntries[i];
    finalAunts = finalAunts.filter(a => a.rememberedCompounds[compound] == null || a.rememberedCompounds[compound] === amount);
  }
  return finalAunts[0].number;
}

function secondPart(data, detectedCompounds) {
  let rows = data.split(`\n`);
  let aunts = [];
  for (let i = 0; i < rows.length; i++) {
    aunts.push(parse(rows[i]));
  }
  let finalAunts = [...aunts];
  finalAunts = finalAunts.filter(a => a.rememberedCompounds.cats == null || a.rememberedCompounds.cats > detectedCompounds.cats);
  finalAunts = finalAunts.filter(a => a.rememberedCompounds.trees == null || a.rememberedCompounds.trees > detectedCompounds.trees);

  finalAunts = finalAunts.filter(a => a.rememberedCompounds.pomeranians == null || a.rememberedCompounds.pomeranians < detectedCompounds.pomeranians);
  finalAunts = finalAunts.filter(a => a.rememberedCompounds.goldfish == null || a.rememberedCompounds.goldfish < detectedCompounds.goldfish);

  finalAunts = finalAunts.filter(a => a.rememberedCompounds.children == null || a.rememberedCompounds.children === detectedCompounds.children);
  finalAunts = finalAunts.filter(a => a.rememberedCompounds.samoyeds == null || a.rememberedCompounds.samoyeds === detectedCompounds.samoyeds);
  finalAunts = finalAunts.filter(a => a.rememberedCompounds.akitas == null || a.rememberedCompounds.akitas === detectedCompounds.akitas);
  finalAunts = finalAunts.filter(a => a.rememberedCompounds.vizslas == null || a.rememberedCompounds.vizslas === detectedCompounds.vizslas);
  finalAunts = finalAunts.filter(a => a.rememberedCompounds.cars == null || a.rememberedCompounds.cars === detectedCompounds.cars);
  finalAunts = finalAunts.filter(a => a.rememberedCompounds.perfumes == null || a.rememberedCompounds.perfumes === detectedCompounds.perfumes);

  return finalAunts[0].number;
}

fs.readFile('./advent-of-code-2015/inputs/day-16.txt', { encoding: 'utf8' }).then((data) => {
  let detectedCompounds = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };
  console.time('first part');
  let auntNumber = firstPart(data, detectedCompounds);
  console.timeEnd('first part');

  console.time('second part');
  let realAuntNumber = secondPart(data, detectedCompounds);
  console.timeEnd('second part');

  console.log(auntNumber, realAuntNumber);
});