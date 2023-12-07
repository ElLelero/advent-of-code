const fs = require('node:fs/promises');

function sortHands(hands, mode) {
  hands.sort((a, b) => {
    let type = a.type - b.type;
    if (type !== 0) return type;

    for (let i = 0; i < 5; i++) {
      let card = convertCardToNumber(a.hand[i], mode) - convertCardToNumber(b.hand[i], mode);
      if (card !== 0) return card;
    }

    return 0;
  });
}

function convertCardToNumber(card, mode) {
  let cardToNumber = undefined;
  if (mode === 'first-part') {
    cardToNumber = { 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };
  } else {
    cardToNumber = { 'J': 1, 'T': 10, 'Q': 11, 'K': 12, 'A': 13 };
  }
  return cardToNumber[card] ?? (+card);
}

function maximizeHand(hand) {
  if (hand.indexOf('J') === -1) return hand;

  let cards = hand.split('');
  let cardsInHand = {};
  for (let i = 0; i < cards.length; i++) {
    if (cardsInHand[cards[i]] == null) cardsInHand[cards[i]] = 0;
    cardsInHand[cards[i]]++;
  }

  let type = getHandType(hand);
  if (type === 7) {
    return 'AAAAA';
  }
  let cardCountToCheck = 1;
  if (type === 6 || type === 5) {
    cardCountToCheck = 5 - cardsInHand['J'];
  } else {
    if (type === 4) {
      cardCountToCheck = 4 - cardsInHand['J'];
    } else {
      if (type === 3) {
        cardCountToCheck = 2;
      } else {
        if (type === 2) {
          cardCountToCheck = 3 - cardsInHand['J'];
        }
      }
    }
  }
  let cardEntries = Object.entries(cardsInHand).filter(([card, cardCount]) => card !== 'J' && cardCount === cardCountToCheck);
  cardEntries.sort((a, b) => convertCardToNumber(b[0], 'second-part') - convertCardToNumber(a[0], 'second-part'));
  let card = cardEntries[0][0];
  return hand.split('J').join(card);
}

function getHandType(hand) {
  let cardsInHand = {};
  let cards = hand.split('');
  for (let i = 0; i < cards.length; i++) {
    if (cardsInHand[cards[i]] == null) cardsInHand[cards[i]] = 0;
    cardsInHand[cards[i]]++;
  }

  let differentCardsCount = Object.keys(cardsInHand).length;
  if (differentCardsCount === 1) {
    return 7;
  }
  if (differentCardsCount === 2) {
    let isFourOfAKind = Object.values(cardsInHand).some((cardCount) => cardCount === 4);
    if (isFourOfAKind === true) {
      return 6;
    } else {
      return 5;
    }
  }
  if (differentCardsCount === 3) {
    let isThreeOfAKind = Object.values(cardsInHand).some((cardCount) => cardCount === 3);
    if (isThreeOfAKind === true) {
      return 4;
    } else {
      return 3;
    }
  }
  if (differentCardsCount === 4) {
    return 2;
  }
  return 1;
}

function firstPart(rows) {
  let totalWinnings = 0;

  let hands = rows.map(row => {
    let [hand, bid] = row.split(' ');
    return { type: getHandType(hand), hand, bid: +bid };
  });
  sortHands(hands, 'first-part');

  totalWinnings = hands.map((result, i) => result.bid * (1 + i)).reduce((sum, winning) => sum + winning, 0);

  return totalWinnings;
}

function secondPart(rows) {
  let totalWinnings = 0;

  let hands = rows.map(row => {
    let [hand, bid] = row.split(' ');
    maximizedHand = maximizeHand(hand);
    return { type: getHandType(maximizedHand), hand, bid: +bid };
  });
  sortHands(hands, 'second-part');

  totalWinnings = hands.map((result, i) => result.bid * (1 + i)).reduce((sum, winning) => sum + winning, 0);

  return totalWinnings;
}

fs.readFile('./advent-of-code-2023/inputs/day-7.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');

  console.time('first part');
  let totalWinnings = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let newTotalWinnings = secondPart(rows);
  console.timeEnd('second part');

  console.log(totalWinnings, newTotalWinnings);
});