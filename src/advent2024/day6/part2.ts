/*
--- Part Two ---
While The Historians begin working around the guard's patrol route, you borrow their fancy device and step outside the lab. From the safety of a supply closet, you time travel through the last few months and record the nightly status of the lab's guard post on the walls of the closet.

Returning after what seems like only a few seconds to The Historians, they explain that the guard's patrol area is simply too large for them to safely search the lab without getting caught.

Fortunately, they are pretty sure that adding a single new obstruction won't cause a time paradox. They'd like to place the new obstruction in such a way that the guard will get stuck in a loop, making the rest of the lab safe to search.

To have the lowest chance of creating a time paradox, The Historians would like to know all of the possible positions for such an obstruction. The new obstruction can't be placed at the guard's starting position - the guard is there right now and would notice.

In the above example, there are only 6 different positions where a new obstruction would cause the guard to get stuck in a loop. The diagrams of these six situations use O to mark the new obstruction, | to show a position where the guard moves up/down, - to show a position where the guard moves left/right, and + to show a position where the guard moves both up/down and left/right.

Option one, put a printing press next to the guard's starting position:

....#.....
....+---+#
....|...|.
..#.|...|.
....|..#|.
....|...|.
.#.O^---+.
........#.
#.........
......#...
Option two, put a stack of failed suit prototypes in the bottom right quadrant of the mapped area:


....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
......O.#.
#.........
......#...
Option three, put a crate of chimney-squeeze prototype fabric next to the standing desk in the bottom right quadrant:

....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
.+----+O#.
#+----+...
......#...
Option four, put an alchemical retroencabulator near the bottom left corner:

....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
..|...|.#.
#O+---+...
......#...
Option five, put the alchemical retroencabulator a bit to the right instead:

....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
....|.|.#.
#..O+-+...
......#...
Option six, put a tank of sovereign glue right next to the tank of universal solvent:

....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
.+----++#.
#+----++..
......#O..
It doesn't really matter what you choose to use as an obstacle so long as you and The Historians can put it into position without the guard noticing. The important thing is having enough options that you can find one that minimizes time paradoxes, and in this example, there are 6 different positions you could choose.

You need to get the guard stuck in a loop by adding a single new obstruction. How many different positions could you choose for this obstruction?
*/
//@ts-nocheck
import fs from "fs";

const input = fs
  .readFileSync("./src/day6/data.txt", "utf8")
  .toString()
  .split("\n");
type TDirection = "UP" | "RIGHT" | "DOWN" | "LEFT";

const DIRECTION = {
  UP: [-1, 0],
  RIGHT: [0, 1],
  DOWN: [1, 0],
  LEFT: [0, -1],
};

const parseInput = (rawInput: string) => rawInput.map((r) => r.split(""));

const findElementIndex = (
  grid: string[][],
  target: string,
): [number, number] | null => {
  for (const [i, row] of grid.entries()) {
    const j = row.indexOf(target);
    if (j !== -1) return [i, j];
  }
  return null;
};

const getNextDirection = (currentDir: TDirection) => {
  const directionKeys = Object.keys(DIRECTION) as TDirection[];
  const currentIndex = directionKeys.indexOf(currentDir);
  const nextIndex = (currentIndex + 1) % directionKeys.length;

  return directionKeys[nextIndex];
};

const walk = (
  arr: string[][],
  position: [number, number],
  visited: Set<string>,
  direction: TDirection,
  loopDetection = false,
) => {
  let factor = 1;

  // eslint-disable-next-line typescriptEslint/no-unnecessary-condition
  while (true) {
    const [dY, dX] = DIRECTION[direction];
    const newRow = position[0] + dY * factor;
    const newCol = position[1] + dX * factor;
    const key = `${newRow}|${newCol}${loopDetection ? `|${direction}` : ""}`;

    if (loopDetection && visited.has(key)) return true;

    if (
      newRow < 0 ||
      newCol < 0 ||
      newRow >= arr.length ||
      newCol >= arr[0].length
    )
      // out of grid bounds - no loop
      return loopDetection ? false : undefined;

    if ([".", "^"].includes(arr[newRow][newCol])) {
      visited.add(key);
    } else {
      return walk(
        arr,
        [newRow - dY, newCol - dX],
        visited,
        getNextDirection(direction),
        loopDetection,
      );
    }

    factor += 1;
  }
};

const part2 = (input: string) => {
  const input = parseInput(input);
  const guardPosition = findElementIndex(input, "^") as [number, number];
  const visitedPositions = new Set<string>().add(
    `${guardPosition[0]}|${guardPosition[1]}`,
  );
  let result = 0;

  // We walk once to populate visited with the path we will take.
  // We only need to add obstacle on the path since adding it elsewhere doesn't mater.
  walk(input, guardPosition, visitedPositions, "UP");

  for (const position of visitedPositions) {
    const [row, col] = position.split("|").map(Number);
    if (row === guardPosition[0] && col === guardPosition[1]) continue;

    // We copy the original array
    const copy = input.map((row) => [...row]);
    copy[row][col] = "#";

    if (walk(copy, guardPosition, new Set(), "UP", true)) result += 1;
  }

  return result;
};

console.log(part2(input));
