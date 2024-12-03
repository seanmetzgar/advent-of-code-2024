import { SolutionSet } from '../inc/types';

export function day03(data: string): SolutionSet {
  let solution: SolutionSet = {};

  //Part 1 & 2
  let part1 = 0;
  let part2 = 0;
  let part2Active = true;
  const matches = data.match(/do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/gm);

  if (matches?.length) {
    for (let i = 0; i < matches?.length; i++) {
      if (matches[i].includes("do()")) {
        part2Active = true;
      } else if (matches[i].includes("don't()")) {
        part2Active = false;
      } else {
        const match = matches[i].match(/\d{1,3}/g);
        if (match) {
          const [a, b] = match.map((num) => parseInt(num, 10));
          part1 += (a * b);
          part2 += part2Active ? (a * b) : 0;
        }
      }
    }
  }
  
  solution.part1 = part1;
  solution.part2 = part2;

  return solution;
}