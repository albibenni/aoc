/*
--- Part Two ---
Watching over your shoulder as you work, one of The Historians asks if you took the effects of resonant harmonics into your calculations.

Whoops!

After updating your model, it turns out that an antinode occurs at any grid position exactly in line with at least two antennas of the same frequency, regardless of distance. This means that some of the new antinodes will occur at the position of each antenna (unless that antenna is the only one of its frequency).

So, these three T-frequency antennas now create many antinodes:

T....#....
...T......
.T....#...
.........#
..#.......
..........
...#......
..........
....#.....
..........
In fact, the three T-frequency antennas are all exactly in line with two antennas, so they are all also antinodes! This brings the total number of antinodes in the above example to 9.

The original example now has 34 antinodes, including the antinodes that appear on every antenna:

##....#....#
.#.#....0...
..#.#0....#.
..##...0....
....0....#..
.#...#A....#
...#..#.....
#....#.#....
..#.....A...
....#....A..
.#........#.
...#......##
Calculate the impact of the signal using this updated model. How many unique locations within the bounds of the map contain an antinode?
*/
import {
  getListOfPair,
  elapsedTime,
  readInput,
  input,
  inputd,
} from "./part1.js";

// big issue is that antinodes are created on antennas too
function solution(input: ReturnType<typeof readInput>) {
  const WIDTH = input.width;
  const HEIGHT = input.height;
  const map = input.map;
  const antinodes = new Set();

  const addAntinode = (
    originAntX: number,
    originAntY: number,
    dx: number,
    dy: number,
  ) => {
    let x = originAntX;
    let y = originAntY;
    const line = [];
    while (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) {
      line.push(`${x}:${y}`);
      x -= dx;
      y -= dy;
    }
    return line;
  };

  for (const key of map.keys()) {
    const line = getListOfPair(key, map);
    line.forEach((p) => {
      const { originAnt, destAnt, dx, dy } = p;
      const list1 = addAntinode(originAnt.x, originAnt.y, dx, dy);
      list1.forEach((e) => antinodes.add(e));
      const list2 = addAntinode(destAnt.x, destAnt.y, -dx, -dy);
      list2.forEach((e) => antinodes.add(e));
    });
  }

  let result = antinodes.size;
  return { result };
}

elapsedTime("PART2", solution, readInput(inputd));
elapsedTime("PART2", solution, readInput(input));

// Answer: 1333
