const fs = require('node:fs/promises');

function isReportSafe(reportLevels) {
  let previousMode = undefined;
  for (let i = 1; i < reportLevels.length; i++) {
    let level = reportLevels[i];
    let previousLevel = reportLevels[i - 1];
    let delta = level - previousLevel;
    if (previousMode == null) {
      previousMode = delta > 0 ? 'decreasing' : 'increasing';
    }

    if (Math.abs(delta) < 1 || Math.abs(delta) > 3) return false;

    let mode = delta > 0 ? 'decreasing' : 'increasing';;
    if (mode !== previousMode) return false;
  }
  return true;
}

function isReportSafeWithDampener(reportLevels) {  
  for (let i = 0; i < reportLevels.length; i++) {
    let newReportLevels = [...reportLevels]
    newReportLevels.splice(i, 1);
    let safe = isReportSafe(newReportLevels);
    
    if(safe === true) return true;
  }
  return false;
}

function firstPart(rows) {
  let safeReportsCount = 0;
  for (let i = 0; i < rows.length; i++) {
    let reportLevels = rows[i].split(' ').map(n => +n);

    let safe = isReportSafe(reportLevels);
    if (safe === true) {
      safeReportsCount++;
    }
  }
  return safeReportsCount;
}

function secondPart(rows) {
  let safeReportsCount = 0;
  for (let i = 0; i < rows.length; i++) {
    let reportLevels = rows[i].split(' ').map(n => +n);

    let safe = isReportSafeWithDampener(reportLevels);
    if (safe === true) {
      safeReportsCount++;
    }
  }
  return safeReportsCount;
}

fs.readFile('./advent-of-code-2024/inputs/day-2.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');

  console.time('first part');
  let safeReportsCount = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let safeReportsCountWithDampener = secondPart(rows);
  console.timeEnd('second part');

  console.log(safeReportsCount, safeReportsCountWithDampener);

});