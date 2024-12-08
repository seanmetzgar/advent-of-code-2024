import { SolutionSet } from '../inc/types';

type Position = {
  y: number;
  x: number;
  char?: string;
}

type Route = {
  routeMap: string[][];
  isLoop: boolean;
  steps: number;
}

function cloneMap(map: string[][]): string[][] {
  return map.map((row) => {
    return row.slice();
  });
}

function prettyPrintMap(map: string[][]): void {
  map.forEach((row) => {
    console.log(row.join(''));
  });
}

function findPatrol(map: string[][]): Position | false {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '^' || map[y][x] === '>' || map[y][x] === '<' || map[y][x] === 'v') {
        return { y, x, char: map[y][x] };
      }
    }
  }

  return false;
}

function replaceChar(map: string[][], pos: Position, char: string): Position {
  map[pos.y][pos.x] = char;
  pos.char = char;

  return pos;
}

function findRoute(map: string[][], limit?: number): Route {
  let patrol = findPatrol(map);
  let steps = 0;
  limit = limit || map.length * map[0].length;

  if (patrol) {
    // while patrol is still on the map
    while(patrol.x >= 0 && patrol.y >= 0 && patrol.x < map[0].length && patrol.y < map.length) {
      if (patrol.char === '^') {
        // first check if next position is out of bounds
        if (map[patrol.y-1] === undefined) {
          patrol = replaceChar(map, patrol, 'X');
          steps++
          patrol.y--; patrol.char = undefined;
          break;
        } else if (map[patrol.y-1][patrol.x] === '#') {
          replaceChar(map, patrol, '>');
        } else {
          replaceChar(map, patrol, 'X');
          steps++;
          patrol.y--;
          patrol = replaceChar(map, patrol, '^');
        }
      }

      if (patrol.char === '>') {
        if (map[patrol.y][patrol.x+1] === undefined) {
          patrol = replaceChar(map, patrol, 'X');
          steps++;
          patrol.x++; patrol.char = undefined;
          break;
        } else if (map[patrol.y][patrol.x+1] === '#') {
          replaceChar(map, patrol, 'v');
        } else {
          replaceChar(map, patrol, 'X');
          steps++;
          patrol.x++;
          patrol = replaceChar(map, patrol, '>');
        }
      }

      if (patrol.char === 'v') {
        if (map[patrol.y+1] === undefined) {
          patrol = replaceChar(map, patrol, 'X');
          steps++;
          patrol.y++; patrol.char = undefined;
          break;
        } else if (map[patrol.y+1][patrol.x] === '#') {
          replaceChar(map, patrol, '<');
        } else {
          replaceChar(map, patrol, 'X');
          steps++;
          patrol.y++;
          patrol = replaceChar(map, patrol, 'v');
        }
      }

      if (patrol.char === '<') {
        if (map[patrol.y][patrol.x-1] === undefined) {
          patrol = replaceChar(map, patrol, 'X');
          steps++;
          patrol.x--; patrol.char = undefined;
          break;
        } else if (map[patrol.y][patrol.x-1] === '#') {
          replaceChar(map, patrol, '^');
        } else {
          replaceChar(map, patrol, 'X');
          steps++;
          patrol.x--;
          patrol = replaceChar(map, patrol, '<');
        }
      }

      if (steps > limit) break;
    }
  }

  let isLoop = (steps > limit) ? true : false;
  return { routeMap: map, isLoop, steps };
}


export function day06(data: string): SolutionSet {
  let solution: SolutionSet = {};
   
  const origMap = data.split('\n').map((row: string) => {
    return Array.from(row);
  });

  let map = cloneMap(origMap);
  let route = findRoute(map);
  
  let part1 = 0;

  // stuff for part 2
  let minX = 0;
  let minY = 0;
  let maxX = 0;
  let maxY = 0;

  route.routeMap.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 'X') part1++;

      // get bounds of X's for part 2
      if (cell === 'X') {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    });
  });
  solution.part1 = part1;

  // Part 2
  let boundsWidth = maxX - minX;
  let boundsHeight = maxY - minY;
  let part2 = 0;

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      // Make temporary loop search map
      let testMap = cloneMap(origMap);
      if (testMap[y][x] !== '>' && testMap[y][x] !== '<' && testMap[y][x] !== '^' && testMap[y][x] !== 'v') {
        testMap[y][x] = '#';
        let route = findRoute(testMap, boundsWidth * boundsHeight);
        if (route.isLoop) part2++;
      }
    }
  }
  solution.part2 = part2;
  
  return solution;
}