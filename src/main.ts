import readline from 'readline';
import * as utils from './inc/utils';
import * as problems from './days';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export function getProblem(): void {
  rl.question('Please enter a project number (0 to exit): ', (input) => {
    const num = utils.inputToNumber(input);
    if (num === false || num < 0 || num > 500) {
      
      console.clear();
      console.log('Invalid input...');
      getProblem();
    } else {
      doProblem(num);
    }
  });
}

export function doProblem(num: number): void {
  switch (num) {
    case 0:
      console.log("Exiting...");
      rl.close();
      return;
    case 1:
      console.log("Problem 1: ", problems.helpers.getMultiples(1, 1000, [3, 5]).reduce((acc, curr) => acc + curr));
      break;
    case 2:
      console.log("Problem 2: ", problems.helpers.getSumOfMultiples(problems.p2.getFibonacciSequence(1, 2, 4e6), [2]));
      break;
    case 3:
      console.log("Problem 3: ", Math.max(...problems.helpers.getPrimeFactors(600851475143)));
      break;
    case 4:
      console.log("Problem 4: ", problems.p4.getLargestPalindromeProduct(100, 999));
      break;
    case 5:
      console.log("Problem 5: ", problems.helpers.getLCM(problems.helpers.generateLinearSequence({ count: 20 })));
      break;
    case 6:
      console.log("Problem 6: ", problems.p6.problem6(problems.helpers.generateLinearSequence({count: 100})));
      break;
    case 7:
      console.log("Problem 7: ", problems.p7.getNthPrime(10001));
      break;
    case 8:
      let problem8Data = problems.helpers.convertNumberStringToSequence(utils.getFileContents('src/problems/data/prob-8.dat', true));
      console.log("Problem 8: ", problems.p8.getLargestConsecutiveProduct(problem8Data, 13));
      break;
    case 9:
      console.log("Problem 9: ", problems.p9.calculateProblem9(1000));
      break;
    case 10:
      console.log("Problem 10: ", problems.helpers.getSequenceSum(problems.helpers.getPrimeSequenceBelow(2e6)));
      break;
    case 11:
      console.log("Problem 11: ", problems.p11.getLargestProductInGrid(problems.helpers.getNumberGrid(utils.getFileContents('src/problems/data/prob-11.dat')), 4));
      break;
    case 12:
      console.log("Problem 12: ", problems.p12.getTriangleNumberWithOverNFactors(500));
      break;
    case 13:
      console.log(
        "Problem 13: ", 
        problems.p13.addGrid(
          problems.helpers.getNumberGrid(
            utils.getFileContents('src/problems/data/prob-13.dat'),
            false
          )
        ).slice(0,10).join('')
      );
      break;
    case 14:
      console.log("Problem 14: ", problems.p14.getLongestCollatzSequence(1e6));
      break;
    case 15:
      console.log("Problem 15: ", problems.p15.countLatticePaths(20, 20));
      break;
    default:
      console.clear();
      console.log("Invalid problem number");
  }
  getProblem();
}

getProblem();