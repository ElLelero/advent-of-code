const fs = require('node:fs/promises');

function firstPart(rows) {
  let totalPoints = 0;
  rows.forEach(row => {
    let [card, myNumbers] = row.split(' | ');
    let [cardNumber, winningNumbers] = card.split(': ');

    let winningNumbersSet = new Set(winningNumbers.split(' ').filter(n => n !== ''));
    let myNumbersList = myNumbers.split(' ').filter(n => n !== '');

    let matches = 0;
    for (let i = 0; i < myNumbersList.length; i++) {
      if (winningNumbersSet.has(myNumbersList[i])) {
        matches++;
      }
    }
    if (matches > 0) {
      totalPoints += (1 << (matches - 1));
    }
  });
  return totalPoints;
}

function getMatchesForCard(rowIndex, myNumbers, winningNumbers) {
  let cardsToPlay = [];
  let matches = 0;
  let winningNumbersSet = new Set(winningNumbers.split(' ').filter(n => n !== ''));
  let myNumbersList = myNumbers.split(' ').filter(n => n !== '');

  for (let i = 0; i < myNumbersList.length; i++) {
    if (winningNumbersSet.has(myNumbersList[i])) {
      cardsToPlay.push((+rowIndex) + matches + 1);
      matches++;
    }
  }
  return cardsToPlay;
}

function secondPart(rows) {
  let results = rows.map((row, i) => i).reduce((dict, index) => {
    dict[index] = 1;
    return dict;
  }, {});

  let totalScratchcards = 0;

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

    totalScratchcards += copies;
  }

  return totalScratchcards;
}

fs.readFile('./advent-of-code-2023/inputs/day-4.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');

  console.time('first part');
  let totalWinningPoints = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let totalScratchcards = secondPart(rows);
  console.timeEnd('second part');

  console.log(totalWinningPoints, totalScratchcards);
});