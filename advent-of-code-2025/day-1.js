const fs = require('node:fs/promises');
function firstPart(data) {
  let password = 0;
  let position = 50;
  for (let i = 0; i < data.length; i++) {
    let direction = data[i][0];
    let amount = +(data[i].substring(1));

    let sign = 1;
    if (direction === 'L') sign = -1;

    position += (sign * amount);

    if (position % 100 === 0) password++;
  }
  return password;
}

function secondPart(data) {
  let password = 0;
  let position = 50;
  for (let i = 0; i < data.length; i++) {
    let direction = data[i][0];
    let amount = +(data[i].substring(1));

    let sign = 1;
    if (direction === 'L') sign = -1;

    const nextPosition = position + (sign * amount);

    if (sign > 0) {
      password += Math.floor(nextPosition / 100) - Math.floor(position / 100);
    } else {
      password += Math.ceil(position / 100) - Math.ceil(nextPosition / 100);
    }

    position += (sign * amount);
  }
  return password;
}

fs.readFile('./advent-of-code-2025/inputs/day-1.txt', { encoding: 'utf8' }).then((data) => {
  console.time('first part');
  let password = firstPart(data.split('\n'));
  console.timeEnd('first part');

  console.time('second part');
  let password2 = secondPart(data.split('\n'));
  console.timeEnd('second part');

  console.log(password, password2);
});