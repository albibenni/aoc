/*
--- Part Two ---
Now that you know what the best paths look like, you can figure out the best spot to sit.

Every non-wall tile (S, ., or E) is equipped with places to sit along the edges of the tile. While determining which of these tiles would be the best spot to sit depends on a whole bunch of factors (how comfortable the seats are, how far away the bathrooms are, whether there's a pillar blocking your view, etc.), the most important factor is whether the tile is on one of the best paths through the maze. If you sit somewhere else, you'd miss all the action!

So, you'll need to determine which tiles are part of any best path through the maze, including the S and E tiles.

In the first example, there are 45 tiles (marked O) that are part of at least one of the various best paths through the maze:

###############
#.......#....O#
#.#.###.#.###O#
#.....#.#...#O#
#.###.#####.#O#
#.#.#.......#O#
#.#.#####.###O#
#..OOOOOOOOO#O#
###O#O#####O#O#
#OOO#O....#O#O#
#O#O#O###.#O#O#
#OOOOO#...#O#O#
#O###.#.#.#O#O#
#O..#.....#OOO#
###############
In the second example, there are 64 tiles that are part of at least one of the best paths:

#################
#...#...#...#..O#
#.#.#.#.#.#.#.#O#
#.#.#.#...#...#O#
#.#.#.#.###.#.#O#
#OOO#.#.#.....#O#
#O#O#.#.#.#####O#
#O#O..#.#.#OOOOO#
#O#O#####.#O###O#
#O#O#..OOOOO#OOO#
#O#O###O#####O###
#O#O#OOO#..OOO#.#
#O#O#O#####O###.#
#O#O#OOOOOOO..#.#
#O#O#O#########.#
#O#OOO..........#
#################
Analyze your map further. How many tiles are part of at least one of the best paths through the maze?
*/

import fs from "fs";
import { dijkstra, parseGrid } from "./part1.js";

const input = fs.readFileSync("./2024/day16/data.txt", "utf8").toString();
/**
 * the code of part 2 of the puzzle
 */
const solution = (input: string) => {
  const grid = input.split("\n");
  const { start, end, forward, reverse } = parseGrid(grid);

  const fromStart = dijkstra(forward, start, false);
  const toEnd = dijkstra(reverse, end, true);

  const endKey = `${end.x},${end.y}`;
  const target = fromStart[endKey];
  const spaces = new Set<string>();

  Object.keys(fromStart).forEach((position) => {
    if (
      position !== endKey &&
      fromStart[position]! + toEnd[position]! === target
    ) {
      const [x, y] = position.split(",");
      spaces.add(`${x},${y}`);
    }
  });

  return spaces.size;
};

console.log(solution(input));
