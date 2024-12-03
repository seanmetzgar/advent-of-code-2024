import { SolutionSet } from '../inc/types';

export function day01(data: string): SolutionSet {
  let solution: SolutionSet = {};
  const colA: number[] = [];
  const colB: number[] = [];
  const diffs: number[] = [];
  const occurrences: number[] = [];
  let similairtyScore: number = 0;

  // Each line of the data contains two numbers separated by spaces
  // Convert each number to an integer and store in colA and colB respectively

  data.split('\n').forEach((row) => {
    const [a, b] = row.split(/\s+/).map((num) => parseInt(num, 10));
    colA.push(a);
    colB.push(b);
  });

  // Sort columns ASC
  colA.sort((a, b) => a - b);
  colB.sort((a, b) => a - b);

  // Part 1
  // Get the difference between corresponding elements in colA and colB (absolute value to fix negatives)
  for (let i = 0; i < colA.length; i++) {
    diffs.push(Math.abs(colA[i] - colB[i]));
  }
  // Sum the differences
  solution.part1 = diffs.reduce((acc, diff) => acc + diff, 0);
  

  // Part 2
  // get similarity score see AOC Day 1 part 2 description online
  for (let i = 0; i < colA.length; i++) {
    // count the number of occurences of colA[i] in colB
    occurrences[i] = colB.filter((num) => num === colA[i]).length;

    // calculate the similarity score
    similairtyScore += colA[i] * occurrences[i];
  }
  solution.part2 = similairtyScore;

  return solution;
}