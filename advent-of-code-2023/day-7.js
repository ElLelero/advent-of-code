const fs = require('node:fs/promises');

function getCardCount(hand) {
  let cards = hand.split('');
  return cards.reduce((dict, card) => {
    dict[card] = (dict[card] ?? 0) + 1;
    return dict;
  }, {});
}

function getTotalWinning(hands, mode) {
  hands.sort((a, b) => {
    let type = a.type - b.type;
    if (type !== 0) return type;

    for (let i = 0; i < 5; i++) {
      let card = convertCardToNumber(a.hand[i], mode) - convertCardToNumber(b.hand[i], mode);
      if (card !== 0) return card;
    }

    return 0;
  });
  return hands.reduce((sum, result, i) => sum + (result.bid * (1 + i)), 0);
}

function convertCardToNumber(card, mode) {
  if (mode === 'first-part') {
    return ({ 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 })[card] ?? (+card);
  }
  return ({ 'J': 1, 'T': 10, 'Q': 11, 'K': 12, 'A': 13 })[card] ?? (+card);
}

function maximize(hand) {
  if (hand.indexOf('J') === -1) return hand;

  let cardsInHand = getCardCount(hand);
  let type = getHandType(hand, cardsInHand);

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
  let card = 'A';//five-of-a-kind failsafe
  let cardEntries = Object.entries(cardsInHand).filter(([card, cardCount]) => card !== 'J' && cardCount === cardCountToCheck);
  if (cardEntries.length > 0) {
    cardEntries.sort((a, b) => convertCardToNumber(b[0], 'second-part') - convertCardToNumber(a[0], 'second-part'));
    card = cardEntries[0][0];
  }
  return hand.split('J').join(card);
}

function getHandType(hand, cardsInHand) {
  if (cardsInHand == null) {
    cardsInHand = getCardCount(hand);
  }

  let cardValues = Object.values(cardsInHand);
  cardValues.sort((a, b) => b - a);
  
  let differentCardsCount = cardValues.length;

  if (cardValues[0] === 5) {
    return 7;//five-of-a-kind
  }
  if (cardValues[0] === 4) {
    return 6; //four-of-a-kind;
  }
  if (cardValues[0] === 3) {
    return differentCardsCount === 2 ? 5 : 4;//full-house || three-of-a-kind
  }
  if (cardValues[0] === 2) {
    return differentCardsCount === 3 ? 3 : 2;//two-pair || one-pair
  }
  return 1;//high-card
}

function firstPart(rows) {
  let hands = rows.map(row => {
    let [hand, bid] = row.split(' ');
    return { type: getHandType(hand), hand, bid: +bid };
  });

  return getTotalWinning(hands, 'first-part');
}

function secondPart(rows) {
  let hands = rows.map(row => {
    let [hand, bid] = row.split(' ');
    return { type: getHandType(maximize(hand)), hand, bid: +bid };
  });

  return getTotalWinning(hands, 'second-part');
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