import { SolutionSet } from '../inc/types';

function findWordInGrid(grid: string[], word: string): number {
  // Locate all instances of a word in a grid
  // words can be vertical, horizontal, or diagonal (forward or backwards)
  // words will not wrap around the grid
  // words can overlap
  // return # of instances of word in grid

  const revWord = word.split('').reverse().join('');
  const wordLength = word.length;
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;
  const wordRegex = new RegExp(`${word}`, 'g');
  const revWordRegex = new RegExp(`${revWord}`, 'g');
  let instances = 0;

  // Check for horizontal words
  for (let y = 0; y < gridHeight; y++) {
    let matches = grid[y].match(wordRegex);
    let revMatches = grid[y].match(revWordRegex);
    if (matches) {
      instances += matches.length;
    }
    if (revMatches) {
      instances += revMatches.length;
    }
  }

  // rotate grid 90 degrees to check for vertical words
  for (let x = 0; x < gridWidth; x++) {
    let test = '';
    for (let y = 0; y < gridHeight; y++) {
      test += grid[y][x];
    }
    let matches = test.match(wordRegex);
    let revMatches = test.match(revWordRegex);
    if (matches) {
      instances += matches.length;
    }
    if (revMatches) {
      instances += revMatches.length;
    }
  }

  // Check for diagonal words (forward)
  for (let y = 0; y <= gridHeight - wordLength; y++) {
    for (let x = 0; x <= gridWidth - wordLength; x++) {
      let diagonalWord = '';
      for (let i = 0; i < wordLength; i++) {
        diagonalWord += grid[y + i][x + i];
      }
      if (diagonalWord === word || diagonalWord === revWord) {
        instances++;
      }
    }
  }

  // Check for diagonal words (backwards)
  for (let y = 0; y <= gridHeight - wordLength; y++) {
    for (let x = wordLength - 1; x < gridWidth; x++) {
      let diagonalWord = '';
      for (let i = 0; i < wordLength; i++) {
        diagonalWord += grid[y + i][x - i];
      }
      if (diagonalWord === word || diagonalWord === revWord) {
        instances++;
      }
    }
  }

  return instances;
}

function findX_MAS(grid: string[]): number {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;
  let instances = 0;

  for (let y = 0; y <= gridHeight - 3; y++) {
    for (let x = 0; x <= gridWidth - 3; x++) {
      let subGrid: string[] = [];
      subGrid.push(grid[y].slice(x, x + 3));
      subGrid.push(grid[y + 1].slice(x, x + 3));
      subGrid.push(grid[y + 2].slice(x, x + 3));


      if (subGrid[1][1] === 'A') {
        if (subGrid[0][0] === 'M' && subGrid[2][2] === 'S' && subGrid[0][2] === 'M' && subGrid[2][0] === 'S') {
          instances++; continue;
        }

        if (subGrid[0][0] === 'M' && subGrid[2][2] === 'S' && subGrid[2][0] === 'M' && subGrid[0][2] === 'S') {
          instances++; continue;
        }

        if (subGrid[0][0] === 'S' && subGrid[2][2] === 'M' && subGrid[0][2] === 'S' && subGrid[2][0] === 'M') {
          instances++; continue;
        }

        if (subGrid[0][0] === 'S' && subGrid[2][2] === 'M' && subGrid[2][0] === 'S' && subGrid[0][2] === 'M') {
          instances++; continue;
        }
      }
    }
  }

  return instances;
}


export function day04(data: string): SolutionSet {
  let solution: SolutionSet = {};

  // Part 1 & 2
  // split data into array of strings
  const grid = data.split('\n');
  solution.part1 = findWordInGrid(grid, 'XMAS');
  solution.part2 = findX_MAS(grid);
  
  return solution;
}