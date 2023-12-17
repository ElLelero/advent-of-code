

function firstPart(string) {
  for (let i = 0; i < 40; i++) {
    let currentChar = string[0];
    let countCurrentChar = 1;
    let newString = "";
    for (let j = 1; j < string.length; j++) {
      if (string[j] !== currentChar) {
        newString += `${countCurrentChar}${currentChar}`;
        currentChar = string[j];
        countCurrentChar = 1;
      } else {
        countCurrentChar++;
      }
    }
    newString += `${countCurrentChar}${currentChar}`;
    string = newString;
  }
  return string.length;
}

function secondPart(string) {
  for (let i = 0; i < 50; i++) {
    let currentChar = string[0];
    let countCurrentChar = 1;
    let newString = "";
    for (let j = 1; j < string.length; j++) {
      if (string[j] !== currentChar) {
        newString += `${countCurrentChar}${currentChar}`;
        currentChar = string[j];
        countCurrentChar = 1;
      } else {
        countCurrentChar++;
      }
    }
    newString += `${countCurrentChar}${currentChar}`;
    string = newString;
  }
  return string.length;
}


console.time('first part');
let length = firstPart("3113322113");
console.timeEnd('first part');

console.time('second part');
let newLength = secondPart("3113322113");
console.timeEnd('second part');

console.log(length, newLength);