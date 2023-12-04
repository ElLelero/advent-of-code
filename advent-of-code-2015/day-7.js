const fs = require('node:fs/promises');

function getWireValue(signals, wire) {
  let result = 0;
  let instruction = signals[wire];

  if (instruction.indexOf('AND') > -1) {
    let [wire1, wire2] = instruction.split(' AND ');
    let wireValue1 = undefined, wireValue2 = undefined;
    if (!isNaN(wire1)) {
      wireValue1 = (+wire1);
    } else {
      wireValue1 = getWireValue(signals, wire1);
    }

    if (!isNaN(wire2)) {
      wireValue2 = (+wire2);
    } else {
      wireValue2 = getWireValue(signals, wire2);
    }
    result = wireValue1 & wireValue2;
    signals[wire] = `${result}`;
    return result;
  }
  if (instruction.indexOf('OR') > -1) {
    let [wire1, wire2] = instruction.split(' OR ');
    let wireValue1 = undefined, wireValue2 = undefined;
    if (!isNaN(wire1)) {
      wireValue1 = (+wire1);
    } else {
      wireValue1 = getWireValue(signals, wire1);
    }

    if (!isNaN(wire2)) {
      wireValue2 = (+wire2);
    } else {
      wireValue2 = getWireValue(signals, wire2);
    }
    result = wireValue1 | wireValue2;
    signals[wire] = `${result}`;
    return result;
  }
  if (instruction.indexOf('LSHIFT') > -1) {
    let [wire1, shiftValue] = instruction.split(' LSHIFT ');
    let wireValue1 = undefined;
    if (!isNaN(wire1)) {
      wireValue1 = (+wire1);
    } else {
      wireValue1 = getWireValue(signals, wire1);
    }
    result = wireValue1 << (+shiftValue);
    signals[wire] = `${result}`;
    return result;
  }
  if (instruction.indexOf('RSHIFT') > -1) {
    let [wire1, shiftValue] = instruction.split(' RSHIFT ');
    let wireValue1 = undefined;
    if (!isNaN(wire1)) {
      wireValue1 = (+wire1);
    } else {
      wireValue1 = getWireValue(signals, wire1);
    }
    result = wireValue1 >> (+shiftValue);
    signals[wire] = `${result}`;
    return result;
  }
  if (instruction.indexOf('NOT ') > -1) {
    let wire1 = instruction.substring(4);
    let wireValue = getWireValue(signals, wire1);
    result = 65536 + (~wireValue);
    signals[wire] = `${result}`;
    return result;
  }

  if (!isNaN(instruction)) {
    result = ((+instruction) ?? 0);
  } else {
    result = getWireValue(signals, instruction);
  }
  signals[wire] = `${result}`;
  return result;
}

function firstPart(rows) {
  let signals = {};
  rows.forEach(row => {
    let [instruction, destinationWire] = row.split(' -> ');
    signals[destinationWire] = instruction;
  });

  return getWireValue(signals, 'a');
}

function secondPart(rows) {
  let signals = {};
  rows.forEach(row => {
    let [instruction, destinationWire] = row.split(' -> ');
    signals[destinationWire] = instruction;
  });
  signals['b'] = '16076';

  return getWireValue(signals, 'a');
}

fs.readFile('./advent-of-code-2015/inputs/day-7.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');

  console.time('first part');
  let aSignal = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let newASignal = secondPart(rows);
  console.timeEnd('second part');

  console.log(aSignal, newASignal);
});