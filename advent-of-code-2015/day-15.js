const fs = require('node:fs/promises');

function parse(row) {
  let words = row.split(' ');
  let ingredient = words[0].split(':').join('');
  let capacity = +(words[2].split(',').join(''));
  let durability = +(words[4].split(',').join(''));
  let flavor = +(words[6].split(',').join(''));
  let texture = +(words[8].split(',').join(''));
  let calories = +(words[10].split(',').join(''));
  return {
    ingredient,
    capacity,
    durability,
    flavor,
    texture,
    calories,
  }
}

function firstPart(data) {
  let ingredients = [];
  let rows = data.split(`\n`);
  for (let i = 0; i < rows.length; i++) {
    ingredients.push(parse(rows[i]));
  }
  let maxScore = undefined;
  let total = 100;

  for (let a = 1; a <= total; a++) {
    for (let b = 1; b <= total - a; b++) {
      for (let c = 1; c <= total - a - b; c++) {
        let d = total - a - b - c;

        let totalCapacity = (a * ingredients[0].capacity + b * ingredients[1].capacity + c * ingredients[2].capacity + d * ingredients[3].capacity);
        if (totalCapacity < 0) continue;
        let totalDurability = (a * ingredients[0].durability + b * ingredients[1].durability + c * ingredients[2].durability + d * ingredients[3].durability);
        if (totalDurability < 0) continue;
        let totalFlavor = (a * ingredients[0].flavor + b * ingredients[1].flavor + c * ingredients[2].flavor + d * ingredients[3].flavor);
        if (totalFlavor < 0) continue;
        let totalTexture = (a * ingredients[0].texture + b * ingredients[1].texture + c * ingredients[2].texture + d * ingredients[3].texture);
        if (totalTexture < 0) continue;

        let score = (totalCapacity * totalDurability * totalFlavor * totalTexture);

        if (maxScore == null) maxScore = score;
        if (maxScore < score) {
          maxScore = score;
        }
      }
    }
  }
  return maxScore;
}

function secondPart(data) {
  let ingredients = [];
  let rows = data.split(`\n`);
  for (let i = 0; i < rows.length; i++) {
    ingredients.push(parse(rows[i]));
  }
  let maxScore = undefined;
  let total = 100;
  let targetCalories = 500;
  for (let a = 1; a <= total; a++) {
    for (let b = 1; b <= total - a; b++) {
      for (let c = 1; c <= total - a - b; c++) {
        let d = total - a - b - c;
        let totalCapacity = (a * ingredients[0].capacity + b * ingredients[1].capacity + c * ingredients[2].capacity + d * ingredients[3].capacity);
        if (totalCapacity < 0) continue;
        let totalDurability = (a * ingredients[0].durability + b * ingredients[1].durability + c * ingredients[2].durability + d * ingredients[3].durability);
        if (totalDurability < 0) continue;
        let totalFlavor = (a * ingredients[0].flavor + b * ingredients[1].flavor + c * ingredients[2].flavor + d * ingredients[3].flavor);
        if (totalFlavor < 0) continue;
        let totalTexture = (a * ingredients[0].texture + b * ingredients[1].texture + c * ingredients[2].texture + d * ingredients[3].texture);
        if (totalTexture < 0) continue;

        let totalCalories = (a * ingredients[0].calories + b * ingredients[1].calories + c * ingredients[2].calories + d * ingredients[3].calories);
        if (totalCalories < 0) continue;

        if (totalCalories !== targetCalories) continue;

        let score = (totalCapacity * totalDurability * totalFlavor * totalTexture);

        if (maxScore == null) maxScore = score;
        if (maxScore < score) {
          maxScore = score;
        }

      }
    }
  }
  return maxScore;
}

fs.readFile('./advent-of-code-2015/inputs/day-15.txt', { encoding: 'utf8' }).then((data) => {
  console.time('first part');
  let maxScore = firstPart(data);
  console.timeEnd('first part');

  console.time('second part');
  let maxScore2 = secondPart(data);
  console.timeEnd('second part');

  console.log(maxScore, maxScore2);
});