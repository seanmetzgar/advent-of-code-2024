import readline from 'readline';
import * as utils from './inc/utils';
import * as days from './days';

let rawData: string = '';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export function getDay(): void {
  rl.question('Please enter a day number (0 to exit): ', (input) => {
    const num = utils.inputToNumber(input);
    if (num === false || num < 0 || num > 500) {
      
      console.clear();
      console.log('Invalid input...');
      getDay();
    } else {
      doDay(num);
    }
  });
}

export function doDay(num: number): void {
  switch (num) {
    case 0:
      console.log("Exiting...");
      rl.close();
      return;
    case 1:
      rawData = utils.getFileContents('./data/day01.dat');
      console.log(days.day01(rawData));
      break;
    case 2: 
      rawData = utils.getFileContents('./data/day02.dat');
      console.log(days.day02(rawData));
      break;
    case 3:
      rawData = utils.getFileContents('./data/day03.dat', {flatten: true});
      console.log(days.day03(rawData));
      break;
    case 4:
      rawData = utils.getFileContents('./data/day04.dat');
      console.log(days.day04(rawData));
      break;
    case 5:
      rawData = utils.getFileContents('./data/day05.dat');
      console.log(days.day05(rawData));
      break;
    case 6:
      rawData = utils.getFileContents('./data/day06.dat');
      console.log(days.day06(rawData));
      break;
    case 7:
      rawData = utils.getFileContents('./data/day07.dat');
      console.log(days.day07(rawData));
      break;
    case 8:
      rawData = utils.getFileContents('./data/day08.dat');
      console.log(days.day08(rawData));
      break;
    case 9:
      rawData = utils.getFileContents('./data/day09.dat');
      console.log(days.day09(rawData));
      break;
    case 10:
      rawData = utils.getFileContents('./data/day10.dat');
      console.log(days.day10(rawData));
      break;
    case 11:
      console.log(days.day11());
      break;
    default:
      console.clear();
      console.log("Invalid problem number");
  }
  getDay();
}

getDay();