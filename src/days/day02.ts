import { SolutionSet } from '../inc/types';

type Set = {
  values: number[];
  problemDampenerSet?: number[];
  part1Safe: boolean;
  part2Safe: boolean;
}
function allDescendingOrAscending(arr: number[]): boolean  {
  // ensure all numbers are either ascending or descending
  // a set is not valid if adjacent numbers are the same
  let isAscending: boolean = true;
  let isDescending: boolean = true;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      isDescending = false;
    } else if (arr[i] < arr[i - 1]) {
      isAscending = false;
    } else if (arr[i] === arr[i - 1]) {
      isAscending = false;
      isDescending = false;
    }
  }

  return isAscending || isDescending;
}

function isSafeSet(set: number[]): boolean {
  // difference between each adjactent number must be greater than 0 and less than or equal to 3
  // should be no 0 values because of previous function, and we use absolute value to fix negatives
  for (let i = 1; i < set.length; i++) {
    if (Math.abs(set[i] - set[i - 1]) > 3) {
      return false;
    }
  } 
  return true;
}

export function day02(data: string): SolutionSet {
  let solution: SolutionSet = {};

  let validSets: number = 0;
  let validSets2: number = 0;
  
  // Split the data into 2d array of numbers
  const tempSets = data.split('\n').map((set) => set.split(/\s+/).map((num) => parseInt(num, 10)));
  const sets: Set[] = tempSets.map((set) => {
    return {
      values: set,
      part1Safe: false,
      part2Safe: false
    }
  });

  // Part 1
  // For each set, check if it is either all ascending or all descending. If it is, check if it's a safe set
  for (let i = 0; i < sets.length; i++) {
    if (allDescendingOrAscending(sets[i].values)) {
      if (isSafeSet(sets[i].values)) {
        validSets++;
        sets[i].part1Safe = true;
      }
    }
  }
  solution.part1 = validSets;

  // Part 2
  // Loop through the sets that failed part 1
  validSets2 = validSets;
  for (let i = 0; i < sets.length; i++) {
    if (!sets[i].part1Safe) {
      // Loop through each set, testing again by removing 1 number until a safe set is found
      for (let j = 0; j < sets[i].values.length; j++) {
        const tempDampSet = sets[i].values.filter((num, index) => index !== j);
        if (allDescendingOrAscending(tempDampSet)) {
          if (isSafeSet(tempDampSet)) {
            validSets2++;
            sets[i].part2Safe = true;
            sets[i].problemDampenerSet = tempDampSet;
            break;
          }
        }
      }
    }
  }
  solution.part2 = validSets2;

  return solution;
}