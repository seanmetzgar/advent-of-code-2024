import { SolutionSet } from '../inc/types';
// import { prettyPrint2D } from '../inc/utils'; //(DEBUG)

type FrequencySpot = {
  x: number;
  y: number;
  frequency: string;
  antenna?: boolean;
}

export function day08(data: string): SolutionSet {
  let solution: SolutionSet = {};
  
  // Get Grid
  const grid: string[][] = data.split('\n').map((row) => row.split(''));

  const maxX: number = grid[0].length - 1;
  const maxY: number = grid.length - 1;
  const antinodes: FrequencySpot[] = [];
  const antinodes2: FrequencySpot[] = [];
  const antennas: FrequencySpot[] = [];

  // Find all antennas (points on grid with value of [a-z || A-Z || 0-9])
  grid.forEach((row, y) => {
    row.forEach((spot, x) => {
      if (spot.match(/[a-zA-Z0-9]/)) {
        antennas.push({x, y, frequency: spot});
      }
    });
  });

  // Find all antinodes (Find all possible pairs of antennas with same frequency, exluding previously used pairs)
  antennas.forEach((antennaA, indexA) => {
    // Loop through all antennas AFTER current index to avoid duplicates
    antennas.slice(indexA + 1).forEach((antennaB) => {
      if (antennaA.frequency === antennaB.frequency) {
        // measure distance between antennas x and y shift between antennas
        const xShift = antennaB.x - antennaA.x; // Relative from A to B (neg Left, pos Right)
        const yShift = antennaB.y - antennaA.y; // Relative from A to B (neg Up, pos Down)

        let antinodeStep = 0;
        let part2ARunning = true;
        let part2BRunning = true;

        while (part2ARunning === true || part2BRunning === true) {
          // Create antinodes for each pair of antennas : negative shift from A, positive shift from B (unless the X or Y is out of bounds)
          antinodeStep++;
          let antinodeAX = antennaA.x - (xShift * antinodeStep); let antinodeAY = antennaA.y - (yShift * antinodeStep);
          let antinodeBX = antennaB.x + (xShift * antinodeStep); let antinodeBY = antennaB.y + (yShift * antinodeStep);

          if (antinodeAX >= 0 && antinodeAX <= maxX && antinodeAY >= 0 && antinodeAY <= maxY) {
            antinodes2.push({x: antinodeAX, y: antinodeAY, frequency: antennaA.frequency});
            if (antinodeStep === 1) {
              antinodes.push({x: antinodeAX, y: antinodeAY, frequency: antennaA.frequency})

            }
          } else part2ARunning = false;

          if (antinodeBX >= 0 && antinodeBX <= maxX && antinodeBY >= 0 && antinodeBY <= maxY) {
            antinodes2.push({x: antinodeBX, y: antinodeBY, frequency: antennaB.frequency});
            if (antinodeStep === 1) {
              antinodes.push({x: antinodeBX, y: antinodeBY, frequency: antennaB.frequency})
            }
          } else part2BRunning = false;
        }
        

      }
    });
  });

  // count unique locations
  const uniqueAntinodes = antinodes.filter((antinode, index) => {
    return antinodes.findIndex((a) => a.x === antinode.x && a.y === antinode.y) === index;
  });

  // Add antennas to antinodes2
  antennas.forEach((antenna) => {
    antinodes2.push({x: antenna.x, y: antenna.y, frequency: antenna.frequency, antenna: true});
  });

  const uniqueAntinodes2 = antinodes2.filter((antinode, index) => {
    return antinodes2.findIndex((a) => a.x === antinode.x && a.y === antinode.y) === index;
  });

  // build new grid from antinodes2, using . for empty spots (DEBUG)
  // const newGrid: string[][] = [];
  // for (let y = 0; y <= maxY; y++) {
  //   newGrid.push([]);
  //   for (let x = 0; x <= maxX; x++) {
  //     const antinode = antinodes2.find((a) => a.x === x && a.y === y);
  //     if (antinode) {
  //       if (antinode.antenna) {
  //       newGrid[y].push(antinode.frequency);
  //       } else {
  //         newGrid[y].push('#');
  //       }
  //     } else {
  //       newGrid[y].push('.');
  //     }
  //   }
  // }



  solution.part1 = uniqueAntinodes.length;
  solution.part2 = uniqueAntinodes2.length;

  // prettyPrint2D(newGrid); //(DEBUG)
  
  return solution;
}