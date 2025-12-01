/*--- Day 6: Guard Gallivant ---
The Historians use their fancy device again, this time to whisk you all away to the North Pole prototype suit manufacturing lab... in the year 1518! It turns out that having direct access to history is very convenient for a group of historians.

You still have to be careful of time paradoxes, and so it will be important to avoid anyone from 1518 while The Historians search for the Chief. Unfortunately, a single guard is patrolling this part of the lab.

Maybe you can work out where the guard will go ahead of time so that The Historians can search safely?

You start by making a map (your puzzle input) of the situation. For example:

....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
The map shows the current position of the guard with ^ (to indicate the guard is currently facing up from the perspective of the map). Any obstructions - crates, desks, alchemical reactors, etc. - are shown as #.

Lab guards in 1518 follow a very strict patrol protocol which involves repeatedly following these steps:

If there is something directly in front of you, turn right 90 degrees.
Otherwise, take a step forward.
Following the above protocol, the guard moves up several times until she reaches an obstacle (in this case, a pile of failed suit prototypes):

....#.....
....^....#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#...
Because there is now an obstacle in front of the guard, she turns right before continuing straight in her new facing direction:

....#.....
........>#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#...
Reaching another obstacle (a spool of several very long polymers), she turns right again and continues downward:

....#.....
.........#
..........
..#.......
.......#..
..........
.#......v.
........#.
#.........
......#...
This process continues for a while, but the guard eventually leaves the mapped area (after walking past a tank of universal solvent):

....#.....
.........#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#v..
By predicting the guard's route, you can determine which specific positions in the lab will be in the patrol path. Including the guard's starting position, the positions visited by the guard before leaving the area are marked with an X:

....#.....
....XXXXX#
....X...X.
..#.X...X.
..XXXXX#X.
..X.X.X.X.
.#XXXXXXX.
.XXXXXXX#.
#XXXXXXX..
......#X..
In this example, the guard will visit 41 distinct positions on your map.

Predict the path of the guard. How many distinct positions will the guard visit before leaving the mapped area?
*/
import fs from "fs";

const input = fs
  .readFileSync("./src/day6/data.txt", "utf8")
  .toString()
  .split("\n");

function solution(input: string[]) {
  const map = input.map((row) => row.split(""));
  const counter = { c: 0, nextVisited: false };
  const initGuardPosition = getGuardPosition(map);
  if (!initGuardPosition) {
    throw new Error("Guard position not found");
  }
  let nextPos = moveGuardOneStep(map, initGuardPosition.guardPosition);
  while (nextPos && typeof nextPos !== "boolean") {
    console.log(nextPos);
    nextPos = moveGuardOneStep(map, nextPos);
  }
  console.log(nextPos);
  map.forEach((row) => row.forEach((cell) => cell === "X" && counter.c++));
  console.log(counter.c);

  fs.writeFileSync(
    "./src/day6/dummy-sol.txt",
    map.map((row) => row.join("")).join("\n"),
  );
}

function getGuardPosition(map: string[][]):
  | {
      guardPosition: { i: number; j: number };
      direction: "^" | ">" | "v" | "<";
    }
  | undefined {
  for (let i = 0; i < map.length; i++) {
    const row = map[i] as string[];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === "^") {
        return { guardPosition: { i, j }, direction: "^" };
      }
      if (row[j] === ">") {
        return { guardPosition: { i, j }, direction: ">" };
      }
      if (row[j] === "v") {
        return { guardPosition: { i, j }, direction: "v" };
      }
      if (row[j] === "<") {
        return { guardPosition: { i, j }, direction: "<" };
      }
    }
  }
  return undefined;
}

function moveGuardOneStep(
  map: string[][],
  guardPosition: { i: number; j: number },
): true | { i: number; j: number } | undefined {
  const { i, j } = guardPosition;
  if (map[i]![j] === "^") {
    if (i - 1 < 0) {
      map[i]![j] = "X";
      return true;
    }
    if (map[i - 1]![j] === "#") {
      map[i]![j] = ">";
      return guardPosition;
    } else {
      map[i]![j] = "X";
      map[i - 1]![j] = "^";
      return { i: i - 1, j };
    }
  }
  if (map[i]![j] === ">") {
    if (map[i]!.length <= j + 1) {
      map[i]![j] = "X";
      return true;
    }
    if (map[i]![j + 1] === "#") {
      map[i]![j] = "v";
      return guardPosition;
    } else {
      map[i]![j] = "X";
      map[i]![j + 1] = ">";
      return { i, j: j + 1 };
    }
  }
  if (map[i]![j] === "v") {
    if (map[i]!.length <= i + 1) {
      map[i]![j] = "X";
      return true;
    }
    if (map[i + 1]![j] === "#") {
      map[i]![j] = "<";
      return guardPosition;
    } else {
      map[i]![j] = "X";
      map[i + 1]![j] = "v";
      return { i: i + 1, j };
    }
  }

  if (map[i]![j] === "<") {
    if (j - 1 < 0) {
      map[i]![j] = "X";
      return true;
    }
    if (map[i]![j - 1] === "#") {
      map[i]![j] = "^";
      return guardPosition;
    } else {
      map[i]![j] = "X";
      map[i]![j - 1] = "<";
      return { i, j: j - 1 };
    }
  }
}
/*
Other solution:
*/

// const part1 = (rawInput: string) => {
//   const input = parseInput(rawInput);
//   const pos = findElementIndex(input, "^") as [number, number];
//   const visited = new Set<string>().add(`${pos[0]}|${pos[1]}`);

//   walk(input, pos, visited, "UP");

//   return visited.size;
// };
solution(input);
// 5242
