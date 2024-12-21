import { SolutionSet } from '../inc/types';

export function day11(test: boolean = false): SolutionSet {
  let solution: SolutionSet = {};
  
  const data: string = test ? '125 17' : '1950139 0 3 837 6116 18472 228700 45'
  
  const stones = data.split(/\s+/).map(Number);
  const memo1: Map<string, number> = new Map<string, number>();
  const memo2: Map<string, number> = new Map<string, number>();

  let oneStone = (s: number, numBlinks: number, memo) => {
    if (memo.has(`${s},${numBlinks}`)) {
      return memo.get(`${s},${numBlinks}`)!;
    }

    if (numBlinks === 0) {
      return 1;
    } else {
      let total = 0;
      const valueString = String(s);
      if (s === 0) {
        total = oneStone(1, numBlinks - 1, memo);
      } else if (valueString.length % 2 === 0) {
        total = oneStone(Number(valueString.substring(0, valueString.length/2)), numBlinks - 1, memo)
             + oneStone(Number(valueString.substring(valueString.length/2)), numBlinks - 1, memo);
      } else {
        total = oneStone(s * 2024, numBlinks - 1, memo);
      }
      memo.set(`${s},${numBlinks}`, total);
      return total;
    }
  }

  solution.part1 = 0;
  solution.part2 = 0;

  for (let i = 0; i < stones.length; i++) {
    const nextTotal1 = oneStone(stones[i], 25, memo1);
    const nextTotal2 = oneStone(stones[i], 75, memo2);
    solution.part1 += nextTotal1;
    solution.part2 += nextTotal2;
  }

  return solution;
}