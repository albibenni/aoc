import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

function solve1() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "4p.txt";

  const lines = fs.readFileSync(currDir, "utf8").trim().split("\n");

  const grid = lines.map((line) => line.split(""));
  const rows = grid.length;
  const cols = grid[0]!.length;

  // 8 directions: N, NE, E, SE, S, SW, W, NW
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let accessibleCount = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row]![col] === "@") {
        // Count neighbors that are '@'
        let neighborCount = 0;

        for (const [dr, dc] of directions) {
          const newRow = row + dr!;
          const newCol = col + dc!;

          // Check if neighbor is in bounds and is '@'
          if (
            newRow >= 0 &&
            newRow < rows &&
            newCol >= 0 &&
            newCol < cols &&
            grid[newRow]![newCol] === "@"
          ) {
            neighborCount++;
          }
        }

        // Accessible if fewer than 4 neighboring rolls
        if (neighborCount < 4) {
          accessibleCount++;
        }
      }
    }
  }

  console.log("Accessible rolls:", accessibleCount);
  return accessibleCount;
}

function solve2() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "4p.txt";

  const lines = fs.readFileSync(currDir, "utf8").trim().split("\n");

  const grid = lines.map((line) => line.split(""));
  const rows = grid.length;
  const cols = grid[0]!.length;

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let totalRemoved = 0;

  while (true) {
    // Find all accessible rolls in this iteration
    const toRemove: [number, number][] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (grid[row]![col] === "@") {
          // Count neighbors that are '@'
          let neighborCount = 0;

          for (const [dr, dc] of directions) {
            const newRow = row + dr!;
            const newCol = col + dc!;

            // Check if neighbor is in bounds and is '@'
            if (
              newRow >= 0 &&
              newRow < rows &&
              newCol >= 0 &&
              newCol < cols &&
              grid[newRow]![newCol] === "@"
            ) {
              neighborCount++;
            }
          }

          // Accessible if fewer than 4 neighboring rolls
          if (neighborCount < 4) {
            toRemove.push([row, col]);
          }
        }
      }
    }

    // If no more rolls can be removed, stop
    if (toRemove.length === 0) {
      break;
    }

    // Remove all accessible rolls
    for (const [row, col] of toRemove) {
      grid[row]![col] = ".";
    }

    totalRemoved += toRemove.length;
  }

  console.log("Total rolls removed:", totalRemoved);
  return totalRemoved;
}

solve1();
console.log("---");
solve2();
