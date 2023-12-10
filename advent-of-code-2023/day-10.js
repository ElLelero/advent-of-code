const fs = require('node:fs/promises');

function getAdjacentRelativePositions(tile) {
  switch (tile) {
    case 'F': {
      return [{
        colIndex: 1
      }, {
        rowIndex: 1
      }];
    }
    case '-': {
      return [{
        colIndex: 1
      }, {
        colIndex: -1
      }];
    }
    case '|': {
      return [{
        rowIndex: 1
      }, {
        rowIndex: -1
      }];
    }
    case 'L': {
      return [{
        colIndex: 1
      }, {
        rowIndex: -1
      }];
    }
    case 'J': {
      return [{
        colIndex: -1
      }, {
        rowIndex: -1
      }];
    }
    case '7': {
      return [{
        colIndex: -1
      }, {
        rowIndex: 1
      }];
    }
  }

}

function firstPart(rows) {
  let pathSet = new Set();
  let startPosition = {
    rowIndex: 0,
    colIndex: 0
  };
  let currentPositions = [];

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let index = row.indexOf('S');
    if (index > -1) {
      currentPositions.push({
        rowIndex: i,
        colIndex: index,
      });
      startPosition = { ...currentPositions[0] };
      rows[i] = rows[i].replace('S', '|');//realizzare algoritmo per determinare in autonomia il carattere
      pathSet.add(`${i}_${index}`);
      break;
    }
  }

  let distance = 0;
  while (currentPositions.length > 0) {
    let newCurrentPositions = [];
    currentPositions.forEach(({ rowIndex, colIndex }) => {
      let adjacentPositions = getAdjacentRelativePositions(rows[rowIndex][colIndex]).filter(position => !pathSet.has(`${rowIndex + (position.rowIndex ?? 0)}_${colIndex + (position.colIndex ?? 0)}`))
      newCurrentPositions.push(...adjacentPositions.map(p => {
        pathSet.add(`${rowIndex + (p.rowIndex ?? 0)}_${colIndex + (p.colIndex ?? 0)}`);
        return {
          rowIndex: rowIndex + (p.rowIndex ?? 0),
          colIndex: colIndex + (p.colIndex ?? 0),
        }
      }));
    })
    currentPositions = [...newCurrentPositions];
    distance++;
  }

  let splitted = rows[startPosition.rowIndex].split('');
  splitted[startPosition.colIndex] = 'S';
  rows[startPosition.rowIndex] = splitted.join('');

  return distance - 1;
}

function secondPart(rows) {
  let pathSet = new Set();
  let startPosition = {
    rowIndex: 0,
    colIndex: 0
  };
  let currentPositions = [];

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let index = row.indexOf('S');
    if (index > -1) {
      currentPositions.push({
        rowIndex: i,
        colIndex: index,
      });
      startPosition = { ...currentPositions[0] };
      rows[i] = rows[i].replace('S', '|');//realizzare algoritmo per determinare in autonomia il carattere
      pathSet.add(`${i}_${index}`);
      break;
    }
  }
  while (currentPositions.length > 0) {
    let newCurrentPositions = [];
    currentPositions.forEach(({ rowIndex, colIndex }) => {
      let adjacentPosition = getAdjacentRelativePositions(rows[rowIndex][colIndex])
        .filter(position => !pathSet.has(`${rowIndex + (position.rowIndex ?? 0)}_${colIndex + (position.colIndex ?? 0)}`))[0];

      pathSet.add(`${rowIndex + (adjacentPosition?.rowIndex ?? 0)}_${colIndex + (adjacentPosition?.colIndex ?? 0)}`);

      newCurrentPositions = [];
      if (adjacentPosition != null) {
        newCurrentPositions.push({
          rowIndex: rowIndex + (adjacentPosition?.rowIndex ?? 0),
          colIndex: colIndex + (adjacentPosition?.colIndex ?? 0),
        });
      }
    })
    currentPositions = [...newCurrentPositions];
  }

  let polygon = [...pathSet].map(s => {
    let splitted = s.split('_');
    return [+splitted[1], +splitted[0]];
  })

  let enclosedTiles = 0;

  let yCoords = polygon.map(point => point[0]), xCoords = polygon.map(point => point[1]);

  let minRowIndex = Math.min.apply(Math, xCoords);
  let maxRowIndex = Math.max.apply(Math, xCoords);
  let minColIndex = Math.min.apply(Math, yCoords);
  let maxColIndex = Math.max.apply(Math, yCoords);

  for (let i = minRowIndex; i < maxRowIndex; i++) {
    console.time(`loop ${i}`);
    for (let j = minColIndex; j < maxColIndex; j++) {
      if (!pathSet.has(`${i}_${j}`)) {
        let p = [j, i];
        let inside = pointInPolygon(p, polygon);
        if (inside) enclosedTiles++;
      }
    }
  }


  let splitted = rows[startPosition.rowIndex].split('');
  splitted[startPosition.colIndex] = 'S';
  rows[startPosition.rowIndex] = splitted.join('');

  return enclosedTiles;
}


function pointInPolygon(point, vs) {
  let [x, y] = point;

  let inside = false;
  let j = vs.length - 1;
  for (let i = 0; i < vs.length; i++) {
    let [xi, yi] = vs[i];
    var [xj, yj] = vs[j];

    let intersect = ((yi > y) != (yj > y))
      && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) {
      inside = !inside;
    }
    j = i;
  }

  return inside;
}

fs.readFile('./advent-of-code-2023/inputs/day-10.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');

  console.time('first part');
  let farthestTile = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let enclosedTiles = secondPart(rows);
  console.timeEnd('second part');

  console.log(farthestTile, enclosedTiles)
});