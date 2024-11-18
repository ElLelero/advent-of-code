const fs = require('node:fs/promises');

function firstPart(rows) {
  let totalArrangements = 0;
  for (let r = 0; r < rows.length; r++) {
    let row = rows[r];
    let [stringa, gruppiString] = row.split(' ');
    let gruppi = gruppiString.split(',').map(Number);

    let arrangements = getArrangements(stringa, gruppi);
    console.log(stringa, arrangements.length);
    totalArrangements += arrangements.length;
  }

  return totalArrangements;
}

function checkArrangement(stringa, arrangement) {
  for (let j = 0; j < stringa.length; j++) {
    if (stringa[j] !== '?' && stringa[j] !== arrangement[j]) {
      return false;
    }
  }
  return true;
}

function secondPart(rows) {
  let totalArrangements = 0;
  for (let r = 0; r < rows.length; r++) {
    let row = rows[r];
    let [stringa, gruppiString] = row.split(' ');
    let gruppi = gruppiString.split(',').map(Number);
    stringa = new Array(5).fill(stringa).join('?');
    for(let i=0; i<4; i++) {
      gruppi = [...gruppi, ...gruppiString.split(',').map(Number)];
    }

    let arrangements = getArrangements(stringa, gruppi);
    totalArrangements += arrangements.length;
  }

  return totalArrangements;
}

function getArrangements(stringa, gruppi) {
  let stringLength = stringa.length;
  let arrangements = [];
  if (gruppi.length === 1) {
    let arrangementsCount = stringLength - gruppi[0] + 1;
    for (let i = 0; i < arrangementsCount; i++) {
      arrangements.push((new Array(i).fill('.').join('') + new Array(gruppi[0]).fill('#').join('')).padEnd(stringLength, '.'));
    }
  } else {
    let newGruppi = [...gruppi.slice(1)];
    let length1 = newGruppi.reduce((sum, value) => sum + value + 1, 0);

    let arrangements1 = getArrangements(stringa.substring(0, stringLength - length1), [gruppi[0]]);
    for (let i = 0; i < arrangements1.length; i++) {
      let arrangements2 = getArrangements(stringa.substring(gruppi[0] + 1 + i), newGruppi);
      for (let j = 0; j < arrangements2.length; j++) {
        let candidato = arrangements1[i].substring(0, stringLength - arrangements2[j].length - 1) + '.' + arrangements2[j];
        if (checkArrangement(stringa, candidato) === true) {
          arrangements.push(candidato);
        }
      }
    }
  }
  return arrangements;
}

fs.readFile('./advent-of-code-2023/inputs/day-12.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');



  console.time('first part');
  let totalArrangements = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let newTotalArrangements = secondPart(rows);
  console.timeEnd('second part');

  console.log(totalArrangements/*, newTotalArrangements*/);
});