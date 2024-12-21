import { SolutionSet } from '../inc/types';

type Coords = {
  x: number,
  y: number,
};

type Trailhead = {
  coords: Coords,
  score?: number,
  rating?: number,
};



function getPossibleNextSteps(map: string[][], coords: Coords): Coords[] | false {
  // Check adjacent points for next number (e.g., coords has a value of 0, find all adjacent 1's)
  const possibleNextSteps: Coords[] = [];
  const x = coords.x;
  const y = coords.y;
  const currentVal = map[y][x];
  const searchVal = (parseInt(currentVal) + 1).toString();
  const maxY = map.length - 1
  const maxX = map[0].length - 1;

  // Check UP, DOWN, LEFT, RIGHT
  if (y > 0 && map[y - 1][x] === searchVal) {
    possibleNextSteps.push({x, y: y - 1});
  }
  if (y < maxY && map[y + 1][x] === searchVal) {
    possibleNextSteps.push({x, y: y + 1});
  }
  if (x > 0 && map[y][x - 1] === searchVal) {
    possibleNextSteps.push({x: x - 1, y});
  }
  if (x < maxX && map[y][x + 1] === searchVal) {
    possibleNextSteps.push({x: x + 1, y});
  }
  if (possibleNextSteps.length === 0) {
    return false;
  }
  return possibleNextSteps;
}

export function day10(data: string): SolutionSet {
  let solution: SolutionSet = {};
  
  //split in to 2d map of characters
  const origMap = data.split('\n').map(x => x.split(''));
  const map = Array.from(origMap);

  //Find possible trailheads (0's)
  const trailheads: Trailhead[] = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '0') {
        trailheads.push({coords: {x, y}, score: 0});
      }
    }
  }

  // Loop through all trailheads
  for (let i = 0; i < trailheads.length; i++) {
    const trailhead = trailheads[i];
    let score = 0;
    const uniqueEndPoints: Coords[] = [];
    const endPoints: Coords[] = [];

    // Get possible next steps
    //Get 1's
    let nextSteps = getPossibleNextSteps(map, trailhead.coords);
    if (nextSteps === false) {
      continue;
    }
    
    //Get 2's
    for (let j = 0; j < nextSteps.length; j++) {
      const nextSteps2 = getPossibleNextSteps(map, nextSteps[j]);
      if (nextSteps2 === false) {
        continue;
      }

      //Get 3's
      for (let k = 0; k < nextSteps2.length; k++) {
        const nextSteps3 = getPossibleNextSteps(map, nextSteps2[k]);
        if (nextSteps3 === false) {
          continue;
        }

        //Get 4's
        for (let l = 0; l < nextSteps3.length; l++) {
          const nextSteps4 = getPossibleNextSteps(map, nextSteps3[l]);
          if (nextSteps4 === false) {
            continue;
          }

          

          //Get 5's
          for (let m = 0; m < nextSteps4.length; m++) {
            const nextSteps5 = getPossibleNextSteps(map, nextSteps4[m]);
            if (nextSteps5 === false) {
              continue;
            }

            //Get 6's
            for (let n = 0; n < nextSteps5.length; n++) {
              const nextSteps6 = getPossibleNextSteps(map, nextSteps5[n]);
              if (nextSteps6 === false) {
                continue;
              }

              //Get 7's
              for (let o = 0; o < nextSteps6.length; o++) {
                const nextSteps7 = getPossibleNextSteps(map, nextSteps6[o]);
                if (nextSteps7 === false) {
                  continue;
                }

                //Get 8's
                for (let p = 0; p < nextSteps7.length; p++) {
                  const nextSteps8 = getPossibleNextSteps(map, nextSteps7[p]);
                  if (nextSteps8 === false) {
                    continue;
                  }

                  //Get 9's
                  for (let q = 0; q < nextSteps8.length; q++) {
                    const nextSteps9 = getPossibleNextSteps(map, nextSteps8[q]);
                    if (nextSteps9 === false) {
                      continue;
                    }
                    // push all nextSteps9 into endPoints
                    endPoints.push(...nextSteps9);
                  }
                }
              }
            } 
          }
        } 
      }
    }

    // Remove duplicates
    for (let i = 0; i < endPoints.length; i++) {
      const endPoint = endPoints[i];
      if (!uniqueEndPoints.find(x => x.x === endPoint.x && x.y === endPoint.y)) {
        uniqueEndPoints.push(endPoint);
      }
    }

    trailhead.rating = endPoints.length;
    trailhead.score = uniqueEndPoints.length;
  }

  // Sum all scores
  let totalScore = 0;
  let totalRating = 0;
  for (let i = 0; i < trailheads.length; i++) {
    totalScore += trailheads[i].score || 0;
    totalRating += trailheads[i].rating || 0;
  }
  solution.part1 = totalScore;
  solution.part2 = totalRating;

  return solution;
}