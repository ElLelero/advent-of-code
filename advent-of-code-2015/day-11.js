function isPasswordValid(password) {
  let nonOverlappingPairs = getNonOverlappingPairs(password);
  if (nonOverlappingPairs !== 2) return false;
  return password.indexOf('i') === -1
    && password.indexOf('o') === -1
    && password.indexOf('l') === -1
    && hasIncreasingStraight(password);
}

function hasIncreasingStraight(password) {
  let charCodes = password.split('').map(char => char.charCodeAt(0));
  for (let i = 0; i < charCodes.length - 2; i++) {
    if (charCodes[i] + 1 === charCodes[i + 1] && charCodes[i] + 2 === charCodes[i + 2]) {
      return true;
    }
  }
  return false;
}

function getNonOverlappingPairs(password) {
  let nonOverlappingPairs = 0;
  for (let i = 0; i < password.length - 1; i++) {
    if (password[i] === password[i + 1]) {
      nonOverlappingPairs++;
      i++;
    }
  }
  return nonOverlappingPairs;
}

function increasePassword(password) {
  let charCodes = password.split('').map(char => char.charCodeAt(0));
  charCodes[charCodes.length - 1]++;
  for (let i = charCodes.length - 1; i >= 0; i--) {
    if (charCodes[i] === 123 && i - 1 >= 0) {
      charCodes[i] = 97;
      charCodes[i - 1]++;
    }
  }
  return charCodes.map(charCode => String.fromCharCode(charCode)).join('');
}

function firstPart(password) {
  let passwordValid = false;
  do {
    password = increasePassword(password);
    passwordValid = isPasswordValid(password);
  } while (!passwordValid);
  return password;
}

console.time('first part');
let newPassword = firstPart('vzbxkghb');
console.timeEnd('first part');

console.time('second part');
let newNewPassword = firstPart(newPassword);
console.timeEnd('second part');

console.log(newPassword, newNewPassword);