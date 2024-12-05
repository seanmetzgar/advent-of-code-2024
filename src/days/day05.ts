import { SolutionSet } from '../inc/types';

type Rule = {
  x: number;
  y: number;
}

function getMiddleValue(arr: number[]): number {
  let middleIndex = Math.floor(arr.length / 2);
  return arr[middleIndex];
}

function validatePageOrder(rules: Rule[], update: number[]): boolean | number[] {
  let isValid: boolean = true;


  for (let i = 0; i < update.length - 1; i++) {
    let currentPage = update[i];

    const currentPageXRules = rules.filter((rule) => rule.x === currentPage); // Rules where x is the current page (y values should come AFTER)
    const currentPageYRules = rules.filter((rule) => rule.y === currentPage); // Rules where y is the current page (x values should come BEFORE)

    // get values in update that occur before and after the current page as separate arrays
    let beforeCurrentPage = update.slice(0, i);
    let afterCurrentPage = update.slice(i + 1);

    // check to see if any pages in beforeCurrentPage are in the currentPageXRules, if so set isValid to false
    if (currentPageXRules.some((rule) => beforeCurrentPage.includes(rule.y))) {
      isValid = false;
      break;
    }

    // check to see if any pages in afterCurrentPage are in the currentPageYRules, if so set isValid to false
    if (currentPageYRules.some((rule) => afterCurrentPage.includes(rule.x))) {
      isValid = false;
      break;
    }
  }
  
  return isValid;
}

function fixPageOrder(rules: Rule[], update: number[]): number[] {
  let fixedUpdate: number[] = [...update];

  while (!validatePageOrder(rules, fixedUpdate)) {
    for (let i = 0; i < fixedUpdate.length - 1; i++) {
      let currentPage = fixedUpdate[i];

      const currentPageXRules = rules.filter((rule) => rule.x === currentPage); // Rules where x is the current page (y values should come AFTER)
      const currentPageYRules = rules.filter((rule) => rule.y === currentPage); // Rules where y is the current page (x values should come BEFORE)

      // get values in update that occur before and after the current page as separate arrays
      let beforeCurrentPage = fixedUpdate.slice(0, i);
      let afterCurrentPage = fixedUpdate.slice(i + 1);

      // check to see if any pages in beforeCurrentPage are in the currentPageXRules, if so set isValid to false
      if (currentPageXRules.some((rule) => beforeCurrentPage.includes(rule.y))) {
        // move current page to index 0 and shift all other pages to the right
        fixedUpdate.splice(i, 1);
        fixedUpdate.unshift(currentPage);
        break;
        
      }

      // check to see if any pages in afterCurrentPage are in the currentPageYRules, if so set isValid to false
      if (currentPageYRules.some((rule) => afterCurrentPage.includes(rule.x))) {
        // move current page to the end of the array and shift all other pages to the left
        fixedUpdate.splice(i, 1);
        fixedUpdate.push(currentPage);
        break;
      }
    }
  }

  return fixedUpdate;
}

export function day05(data: string): SolutionSet {
  let solution: SolutionSet = {};

  const splitData = data.split('\n\n');

  // Split the first part of the data into an array of rules
  const rules: Rule[] = splitData[0].split('\n').map((rule) => {
    const [x, y] = rule.split('|').map((num) => parseInt(num, 10));
    return {x, y};
  });

  // Split the second part of the data into updates
  const updates: number[][] = splitData[1].split('\n').map((update) => update.split(',').map((num) => parseInt(num, 10)));
  const invalidUpdates: number[][] = [];

  // Part 1
  let part1 = 0;

  for (let i = 0; i < updates.length; i++) {
    if (validatePageOrder(rules, updates[i])) {
      // get the middle value of the update array
      part1 += getMiddleValue(updates[i]);
    } else {
      invalidUpdates.push(updates[i]);
    }
  }
  solution.part1 = part1;

  // Part 2
  let part2 = 0;

  let fixedUpdates: number[][] = [];
  for (let i = 0; i < invalidUpdates.length; i++) {
    let fixedUpdate = fixPageOrder(rules, invalidUpdates[i]);
    fixedUpdates.push(fixedUpdate);
  }
  for (let i = 0; i < fixedUpdates.length; i++) {
    part2 += getMiddleValue(fixedUpdates[i]);
  }
  solution.part2 = part2;

  return solution;
}