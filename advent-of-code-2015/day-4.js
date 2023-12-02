const crypto = require('node:crypto');

const secretKey = 'ckczppom';

function firstPart() {
  for (let i = 1; ; i++) {
    let attempt = `${secretKey}${i}`;
    let md5 = crypto.createHash('md5').update(attempt).digest('hex');
    if (md5.startsWith('00000') === true) {
      return i;
    }
  }
}

function secondPart() {
  for (let i = 1; ; i++) {
    let attempt = `${secretKey}${i}`;
    let md5 = crypto.createHash('md5').update(attempt).digest('hex');
    if (md5.startsWith('000000') === true) {
      return i;
    }
  }
}

console.time('first part');
let fiveZerosStartingHashNumber = firstPart();
console.timeEnd('first part');

console.time('second part');
let sixZerosStartingHashNumber = secondPart();
console.timeEnd('second part');

console.log(fiveZerosStartingHashNumber, sixZerosStartingHashNumber);