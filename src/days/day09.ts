import { get } from 'http';
import { SolutionSet } from '../inc/types';

type DataBlock = {
  id: string,
  length: number,
  startIndex: number
}

type DayData = {
  explodedView: string[],
  lastDataBlockId: number
}

function moveDataBlock(arr: string[], firstFreeSpace: number, dataBlock: DataBlock): void {
  arr.splice(firstFreeSpace, dataBlock.length, ...Array(dataBlock.length).fill(dataBlock.id));
  arr.splice(dataBlock.startIndex, dataBlock.length, ...Array(dataBlock.length).fill('.'));
}

function getDataBlock(arr: string[], id: string): DataBlock {
  // convert id to string if it is not already
  let startIndex = arr.findIndex(el => el === id);
  let length = 0;

  if (startIndex !== -1) {
    length = arr.slice(startIndex).findIndex(el => el !== id);
    // if length is -1, then the data block is the last one in the array
    if (length === -1) length = arr.length - startIndex;
  }

  return {id: id, length: length, startIndex: startIndex};
}

function findFirstFreeSpaceOfLength(arr: string[], length: number): number {
  //find the first free space of at least length, return the index. retrun -1 if not found
  return arr.findIndex((el, index) => el === '.' && arr.slice(index).findIndex(el => el !== '.') >= length);
}

function getChecksum(arr: string[], day2: boolean = false): number {

  let checksum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== '.') {
      checksum += (parseInt(arr[i]) * i);
    } else if (!day2 && arr[i] === '.') break;
  }

  return checksum;
}

function findFindFirstFreeSpaceIndex(arr: string[]): number {
  return arr.findIndex(el => el === '.');
}

function findLastNonFreeSpaceIndex(arr: string[]): number {
  let tempIndex = Array.from(arr).reverse().findIndex(el => el !== '.');
  return tempIndex === -1 ? -1 : arr.length - tempIndex - 1;
}

function getDayData(data: string): DayData {
  // convert string of numbers to array of numbers
  const nums: number[] = data.split('').map(Number);
  let explodedView: string[] = [];
  let i: number = 0;

  for (i = 0; i < nums.length; i++) {
    if (i % 2 === 0) {
      explodedView.push(...Array(nums[i]).fill(String(i/2)));
    } else {
      explodedView.push(...Array(nums[i]).fill('.'));
    }
  }

  let lastDataBlockId = i % 2 === 0 ? i / 2 : (i - 1) / 2;

  return {explodedView, lastDataBlockId};
}


export function day09(data: string): SolutionSet {
  let solution: SolutionSet = {};

  // test should yield 00...111...2...333.44.5555.6666.777.888899
  // test yielded:     00...111...2...333.44.5555.6666.777.888899 (YAY!)
  console.log('getExplodedView Started');
  let dayData = getDayData(data);
  let explodedView = Array.from(dayData.explodedView);
  let explodedView2 = Array.from(dayData.explodedView);
  console.log('getExplodedView Ended');

  let fixed = false;


  console.log('Part 1 Started');
  while (fixed === false) {
    let firstFreeSpace = findFindFirstFreeSpaceIndex(explodedView);
    let lastNonFreeSpace = findLastNonFreeSpaceIndex(explodedView);

    if (firstFreeSpace > 0 && lastNonFreeSpace > 0) {
      if (firstFreeSpace < lastNonFreeSpace) {
        explodedView[firstFreeSpace] = explodedView[lastNonFreeSpace];
        explodedView[lastNonFreeSpace] = '.';
      } if (firstFreeSpace > lastNonFreeSpace) {
        fixed = true;
      }
    } else { console.error('No free spaces and/or data blocks'); break; }
  }
  console.log('Part 1 Ended');
  
  console.log('Part 2 Started');
  // make the following code more efficient



  for (let i = dayData.lastDataBlockId; i > 0; i--) {
    let dataBlock = getDataBlock(explodedView2, String(i));
    let firstFreeSpace = findFirstFreeSpaceOfLength(explodedView2, dataBlock.length);

    // show every 100th data block details
    if (i % 100 === 0) {
      console.log(`Data Block: ${dataBlock.id}, length: ${dataBlock.length}`);
      console.log(`eligible free space: ${firstFreeSpace}`);
    }

    if (firstFreeSpace === -1) {
      continue;
    }

    if (firstFreeSpace < dataBlock.startIndex) {
      moveDataBlock(explodedView2, firstFreeSpace, dataBlock);
    }
  }
  console.log('Part 2 Ended');

  solution.part1 = getChecksum(explodedView);
  solution.part2 = getChecksum(explodedView2, true);


  return solution;
}