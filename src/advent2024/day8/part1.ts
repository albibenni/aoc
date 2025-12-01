/*
--- Day 8: Resonant Collinearity ---
You find yourselves on the roof of a top-secret Easter Bunny installation.

While The Historians do their thing, you take a look at the familiar huge antenna. Much to your surprise, it seems to have been reconfigured to emit a signal that makes people 0.1% more likely to buy Easter Bunny brand Imitation Mediocre Chocolate as a Christmas gift! Unthinkable!

Scanning across the city, you find that there are actually many such antennas. Each antenna is tuned to a specific frequency indicated by a single lowercase letter, uppercase letter, or digit. You create a map (your puzzle input) of these antennas. For example:

............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
The signal only applies its nefarious effect at specific antinodes based on the resonant frequencies of the antennas. In particular, an antinode occurs at any point that is perfectly in line with two antennas of the same frequency - but only when one of the antennas is twice as far away as the other. This means that for any pair of antennas with the same frequency, there are two antinodes, one on either side of them.

So, for these two antennas with frequency a, they create the two antinodes marked with #:

..........
...#......
..........
....a.....
..........
.....a....
..........
......#...
..........
..........
Adding a third antenna with the same frequency creates several more antinodes. It would ideally add four antinodes, but two are off the right side of the map, so instead it adds only two:

..........
...#......
#.........
....a.....
........a.
.....a....
..#.......
......#...
..........
..........
Antennas with different frequencies don't create antinodes; A and a count as different frequencies. However, antinodes can occur at locations that contain antennas. In this diagram, the lone antenna with frequency capital A creates no antinodes but has a lowercase-a-frequency antinode at its location:

..........
...#......
#.........
....a.....
........a.
.....a....
..#.......
......A...
..........
..........
The first example has antennas with two different frequencies, so the antinodes they create look like this, plus an antinode overlapping the topmost A-frequency antenna:

......#....#
...#....0...
....#0....#.
..#....0....
....0....#..
.#....A.....
...#........
#......#....
........A...
.........A..
..........#.
..........#.
Because the topmost A-frequency antenna overlaps with a 0-frequency antinode, there are 14 total unique locations that contain an antinode within the bounds of the map.

Calculate the impact of the signal. How many unique locations within the bounds of the map contain an antinode?
*/
import fs from "fs";

export const input = "./src/day8/data.txt";
export const inputd = "./src/day8/dummy.txt";

export function elapsedTime(
  name: string,
  func: (input: ReturnType<typeof readInput>) => { result: number },
  input: ReturnType<typeof readInput>,
) {
  const startTime = performance.now();
  const { result } = func(input);
  const elapsed = performance.now() - startTime;
  console.log(
    `${name} time: ${Math.floor(elapsed / 60000)}:${Math.floor((elapsed % 60000) / 1000)}:${Math.floor(elapsed % 1000)}`,
  );
  console.log(`${name} result: ${result}`);
}
/**
 * Read the input file and return a map of antennas
 * @returns {Map<string, {x: number, y: number}[]>, width: number, height: number}
 */
export function readInput(filename: string): {
  map: Map<string, { x: number; y: number }[]>;
  width: number;
  height: number;
} {
  const data = fs.readFileSync(filename);
  const map = new Map();
  let width = 0;
  let height = 0;
  // start by splitting the data into lines and getting the antenna positions
  data
    .toString()
    .split("\n")
    .filter((line) => line.length > 0)
    .forEach((line, index) => {
      line.split("").forEach((value, i) => {
        width = i;
        if (value === ".") return;
        if (!map.has(value)) map.set(value, []);
        map.get(value).push({ x: i, y: index });
      });
      height = index;
    });
  return { map, width: width + 1, height: height + 1 };
}

/**
 *
 * Get the list of pairs of antennas - with the same symbol - a !== A !== b
 * @param antennaSymbol
 * @param map
 * @returns
 */
export function getListOfPair(
  antennaSymbol: string,
  map: Map<string, { x: number; y: number }[]>,
): {
  originAnt: { x: number; y: number };
  destAnt: { x: number; y: number };
  dx: number;
  dy: number;
}[] {
  const listPositions = map.get(antennaSymbol) as { x: number; y: number }[];
  const listPairs = [];
  for (let i = 0; i < listPositions.length - 1; i++) {
    const originAnt = listPositions[i] as { x: number; y: number };
    for (let j = i + 1; j < listPositions.length; j++) {
      const destAnt = listPositions[j] as { x: number; y: number };
      const pair = {
        originAnt,
        destAnt,
        dx: destAnt.x - originAnt.x,
        dy: destAnt.y - originAnt.y,
      };
      listPairs.push(pair);
    }
  }
  return listPairs;
}

function solution(input: ReturnType<typeof readInput>) {
  const WIDTH = input.width as number;
  const HEIGHT = input.height as number;
  const map = input.map as Map<string, { x: number; y: number }[]>;
  const antinodes = new Set();

  for (const key of map.keys()) {
    const list = getListOfPair(key, map);
    list.forEach((pair) => {
      const { originAnt, destAnt, dx, dy } = pair;
      const antenna1 = { x: originAnt.x - dx, y: originAnt.y - dy };
      const antenna2 = { x: destAnt.x + dx, y: destAnt.y + dy };
      if (
        antenna1.x >= 0 &&
        antenna1.x < WIDTH &&
        antenna1.y >= 0 &&
        antenna1.y < HEIGHT
      )
        antinodes.add(`${antenna1.x}:${antenna1.y}`);
      if (
        antenna2.x >= 0 &&
        antenna2.x < WIDTH &&
        antenna2.y >= 0 &&
        antenna2.y < HEIGHT
      )
        antinodes.add(`${antenna2.x}:${antenna2.y}`);
    });
  }

  let result = antinodes.size;
  return { result };
}

elapsedTime("PART1", solution, readInput(inputd));
elapsedTime("PART1", solution, readInput(input));
// Answer: 398
