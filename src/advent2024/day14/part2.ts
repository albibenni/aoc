/*
--- Part Two ---
During the bathroom break, someone notices that these robots seem awfully similar to ones built and used at the North Pole. If they're the same type of robots, they should have a hard-coded Easter egg: very rarely, most of the robots should arrange themselves into a picture of a Christmas tree.

What is the fewest number of seconds that must elapse for the robots to display the Easter egg?
*/
//@ts-nocheck
import fs from "fs";

const input = fs.readFileSync("./src/day14/data.txt", "utf8").toString();

const lines = input.split("\n");

const MAX_X = 101;
const MAX_Y = 103;
const DIRECTIONS = [
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: -1, y: 0 },
];
const TREE_SEARCH_SIZE = 50;

const robotos: {
  position: Position;
  velocity: Position;
  endPosition?: Position;
}[] = [];

for (const line of lines) {
  const splitLine = line.split(" ");
  const position = splitLine[0].replace("p=", "").split(",");
  const velocity = splitLine[1].replace("v=", "").split(",");

  robotos.push({
    position: { x: Number(position[0]), y: Number(position[1]) },
    velocity: { x: Number(velocity[0]), y: Number(velocity[1]) },
  });
}

const hasClusterWithSizeGreaterThan = (grid: number[][], size: number) => {
  const visited: boolean[][] = Array.from({ length: MAX_Y }, () =>
    Array(MAX_X).fill(false),
  );

  const dfs = (pos: Position) => {
    const stack: Position[] = [pos];
    let clusterSize = 0;

    while (stack.length > 0) {
      const current = stack.pop()!;

      if (visited[current.y][current.x]) {
        continue;
      }

      visited[current.y][current.x] = true;
      clusterSize++;

      for (const dir of DIRECTIONS) {
        const next: Position = { x: current.x + dir.x, y: current.y + dir.y };

        if (
          next.x >= 0 &&
          next.x < MAX_X &&
          next.y >= 0 &&
          next.y < MAX_Y &&
          grid[next.y][next.x] > 0 &&
          !visited[next.y][next.x]
        ) {
          stack.push(next);
        }
      }
    }

    return clusterSize;
  };

  let hasClusterWithSizeGreaterThan = false;
  for (let y = 0; y < MAX_Y; y++) {
    for (let x = 0; x < MAX_X; x++) {
      if (grid[y][x] <= 0 || visited[y][x]) {
        continue;
      }

      const clusterSize = dfs({ x, y });

      if (clusterSize >= size) {
        hasClusterWithSizeGreaterThan = true;
        break;
      }
    }

    if (hasClusterWithSizeGreaterThan) {
      break;
    }
  }

  return hasClusterWithSizeGreaterThan;
};

let seconds = 0;
let foundCluster = false;

while (!foundCluster) {
  let grid: number[][] = Array.from({ length: MAX_Y }, () =>
    Array(MAX_X).fill(0),
  );

  for (const robot of robotos) {
    const totalX = robot.position.x + robot.velocity.x * seconds;
    const totalY = robot.position.y + robot.velocity.y * seconds;

    const finalX = ((totalX % MAX_X) + MAX_X) % MAX_X;
    const finalY = ((totalY % MAX_Y) + MAX_Y) % MAX_Y;

    robot.endPosition = { x: finalX, y: finalY };

    grid[finalY][finalX]++;
  }

  if (hasClusterWithSizeGreaterThan(grid, TREE_SEARCH_SIZE)) {
    foundCluster = true;
    console.log(seconds);
  }

  seconds++;
}