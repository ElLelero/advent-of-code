const fs = require('node:fs/promises');

function getDistinctCitiesCountFromPath(path) {
  let distinctCities = new Set();
  for (let i = 0; i < path.length; i++) {
    if (path[i].startCity != null) distinctCities.add(path[i].startCity);
    if (path[i].endCity != null) distinctCities.add(path[i].endCity);
  }
  return distinctCities.size;
}

function getTotalDistanceOfPath(path) {
  return path.reduce((sum, route) => sum + route.distance, 0);
}

function getFilteredRoutesFirstPart(routes, path, maxDistance) {
  return routes.filter(route =>
    route.startCity === path[path.length - 1].endCity
    && getDistinctCitiesCountFromPath([...path, route]) === path.length + 2
    && getTotalDistanceOfPath([...path, route]) < maxDistance
  );
}

function getFilteredRoutesSecondPart(routes, path) {
  return routes.filter(route =>
    route.startCity === path[path.length - 1].endCity
    && getDistinctCitiesCountFromPath([...path, route]) === path.length + 2
  );
}

function firstPart(rows) {
  let routes = [];
  rows.forEach(row => {
    let [cities, distance] = row.split(' = ');
    let [startCity, endCity] = cities.split(' to ');

    routes.push({
      startCity,
      endCity,
      distance: +distance
    });

    routes.push({
      startCity: endCity,
      endCity: startCity,
      distance: +distance
    });
  });

  let minDistance = Infinity;

  routes.forEach(routeA => {
    getFilteredRoutesFirstPart(routes, [routeA], minDistance).forEach(routeB => {
      getFilteredRoutesFirstPart(routes, [routeA, routeB], minDistance).forEach(routeC => {
        getFilteredRoutesFirstPart(routes, [routeA, routeB, routeC], minDistance).forEach(routeD => {
          getFilteredRoutesFirstPart(routes, [routeA, routeB, routeC, routeD], minDistance).forEach(routeE => {
            getFilteredRoutesFirstPart(routes, [routeA, routeB, routeC, routeD, routeE], minDistance).forEach(routeF => {
              getFilteredRoutesFirstPart(routes, [routeA, routeB, routeC, routeD, routeE, routeF], minDistance).forEach(routeG => {
                let finalRoute = routes.find(route => route.startCity === routeG.endCity && route.endCity === routeA.startCity);
                if (finalRoute != null) {
                  let totalDistance = getTotalDistanceOfPath([routeA, routeB, routeC, routeD, routeE, routeF, routeG]);
                  if (minDistance > totalDistance) {
                    minDistance = totalDistance;
                  }
                }
              });
            });
          });
        });
      });
    });
  });

  return minDistance;
}

function secondPart(rows) {
  let routes = [];
  rows.forEach(row => {
    let [cities, distance] = row.split(' = ');
    let [startCity, endCity] = cities.split(' to ');

    routes.push({
      startCity,
      endCity,
      distance: +distance
    });

    routes.push({
      startCity: endCity,
      endCity: startCity,
      distance: +distance
    });
  });

  let maxDistance = -1;

  routes.forEach(routeA => {
    getFilteredRoutesSecondPart(routes, [routeA]).forEach(routeB => {
      getFilteredRoutesSecondPart(routes, [routeA, routeB]).forEach(routeC => {
        getFilteredRoutesSecondPart(routes, [routeA, routeB, routeC]).forEach(routeD => {
          getFilteredRoutesSecondPart(routes, [routeA, routeB, routeC, routeD]).forEach(routeE => {
            getFilteredRoutesSecondPart(routes, [routeA, routeB, routeC, routeD, routeE]).forEach(routeF => {
              getFilteredRoutesSecondPart(routes, [routeA, routeB, routeC, routeD, routeE, routeF]).forEach(routeG => {
                let finalRoute = routes.find(route => route.startCity === routeG.endCity && route.endCity === routeA.startCity);
                if (finalRoute != null) {
                  let totalDistance = getTotalDistanceOfPath([routeA, routeB, routeC, routeD, routeE, routeF, routeG]);
                  if (maxDistance < totalDistance) {
                    maxDistance = totalDistance;
                  }
                }
              });
            });
          });
        });
      });
    });
  });

  return maxDistance;
}

fs.readFile('./advent-of-code-2015/inputs/day-9.txt', { encoding: 'utf8' }).then((data) => {
  let rows = data.split('\n');

  console.time('first part');
  let shortestDistancesSum = firstPart(rows);
  console.timeEnd('first part');

  console.time('second part');
  let longestDistancesSum = secondPart(rows);
  console.timeEnd('second part');

  console.log(shortestDistancesSum, longestDistancesSum);
});