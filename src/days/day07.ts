import { SolutionSet } from '../inc/types';

type Calibration = {
  test: number;
  parts: number[];
}

function generateOperatorsStrings(length: number, part2: boolean = false): string[] {
  let combinations: number[] = [];
  let operators = ['+', '*'];
  let rVal: string[];
  let power = part2 ? 3 : 2;
  let max = Math.pow(power, length);

  for (let i = 0; i < max; i++) {
    combinations.push(i);
  }

  // return as zero padded binary strings
  rVal = combinations.map((num) => num.toString(power).padStart(length, '0'));
  rVal.shift();
  rVal.pop();

  //replace 0 with + and 1 with *
  rVal = rVal.map((str) => str.replace(/0/g, '+').replace(/1/g, '*').replace(/2/g, '|'));

  return rVal;
}

function validateCalibrationSum(calibration: Calibration): boolean {
  return calibration.test === calibration.parts.reduce((acc, part) => acc + part, 0) ? true: false;
}

function validateCalibrationMultiply(calibration: Calibration): boolean {
  return calibration.test === calibration.parts.reduce((acc, part) => acc * part, 1) ? true : false;
}

function validateCalibrationConcat(calibration: Calibration): boolean {
  return calibration.test === parseInt(calibration.parts.join(''), 10) ? true: false;
}

function runTest(calibrations: Calibration[], part2: boolean = false): number {
  let rVal = 0;

  for (let i = 0; i < calibrations.length; i++) {
    let calibration = calibrations[i];
    
    if (validateCalibrationSum(calibration)) {
      rVal += calibration.test;
      continue;
    } else if (validateCalibrationMultiply(calibration)) {
      rVal += calibration.test;
      continue;
    } else if (part2 && validateCalibrationConcat(calibration)) {
      rVal += calibration.test;
      continue;
    } else {
      let operatorsCheck = false;
      let operatorsStrings = generateOperatorsStrings(calibration.parts.length - 1, part2);
      for (let i = 0; i < operatorsStrings.length; i++) {
        let operators = Array.from(operatorsStrings[i]);
        let total = calibration.parts[0];

        for (let i = 0; i < operators.length; i++) {
          if (operators[i] === '|') {
            total = parseInt(`${total}${calibration.parts[i+1]}`, 10);
          } else { total = eval(`${total} ${operators[i]} ${calibration.parts[i+1]}`); }
        }

        if (total === calibration.test) {
          operatorsCheck = true;
          break;
        }
      }
      if (operatorsCheck) {
        rVal += calibration.test;
        continue;
      }
    }
  }

  return rVal;
}

export function day07(data: string): SolutionSet {
  let solution: SolutionSet = {};
  
  const calibrations: Calibration[] = data.split('\n').map((calibration) => {
    let dataSplit = calibration.split(':');
    let test = parseInt(dataSplit[0], 10);
    let parts = dataSplit[1].trim().split(' ').map((part) => parseInt(part, 10));

    return { test, parts };
  });

  let part1 = 0;
  let part2 = 0;

  part1 = runTest(calibrations);
  part2 = runTest(calibrations, true);

  solution.part1 = part1;
  solution.part2 = part2;
  
  return solution;
}