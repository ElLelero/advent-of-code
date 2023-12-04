const fs = require('node:fs/promises');

function firstPart(rows) {
  let totalPoints = 0;
  rows.forEach(row => {
    let [card, myNumbers] = row.split(' | ');
    let [cardNumber, winningNumbers] = card.split(': ');

    let winningNumbersSet = new Set(winningNumbers.split(' ').filter(n => n !== ''));
    let myNumbersList = myNumbers.split(' ').filter(n => n !== '');

    let points = 0;
    let matches = 0;
    for (let i = 0; i < myNumbersList.length; i++) {
      if (winningNumbersSet.has(myNumbersList[i])) {
        if (matches === 0) {
          points++;
        } else {
          points <<= 1;
        }
        matches++;
      }
    }
    totalPoints += points;
  });
  return totalPoints;
}

function getMatchesForCard(rowIndex, myNumbers, winningNumbers) {
  let elementsToAdd = [];
  let matches = 0;
  let winningNumbersSet = new Set(winningNumbers.split(' ').filter(n => n !== ''));
  let myNumbersList = myNumbers.split(' ').filter(n => n !== '');

  for (let i = 0; i < myNumbersList.length; i++) {
    if (winningNumbersSet.has(myNumbersList[i])) {
      elementsToAdd.push((+rowIndex) + matches + 1);
      matches++;
    }
  }
  return elementsToAdd;
}

function secondPart(rows) {
  let results = rows.map((row, i) => i).reduce((dict, index) => {
    dict[index] = 1;
    return dict;
  }, {});

  let totalScartchcards = 0;

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let copies = results[i];

    let [card, myNumbers] = row.split(' | ');
    let [cardNumber, winningNumbers] = card.split(': ');

    let cardsToPlay = getMatchesForCard(i, myNumbers, winningNumbers);
    for (let i = 0; i < cardsToPlay.length; i++) {
      let cardIndex = +(cardsToPlay[i]);
      if (results[cardIndex] == null) results[cardIndex] = 0;
      results[cardIndex] += copies;
    }

    totalScartchcards += copies;
  }

  return totalScartchcards;
}

fs.readFile('./advent-of-code-2023/inputs/day-4.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');

  console.time('first part');
  let totalWinningPoints = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let totalScartchcards = secondPart(rows);
  console.timeEnd('second part');

  console.log(totalWinningPoints, totalScartchcards);
});