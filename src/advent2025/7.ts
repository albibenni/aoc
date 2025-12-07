import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

function solve1() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "7p.txt";

  const lines = fs.readFileSync(currDir, "utf8").trim().split("\n");
  const grid = lines.map((line) => line.split(""));

  let startRow = -1;
  let startCol = -1;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r]!.length; c++) {
      if (grid[r]![c] === "S") {
        startRow = r;
        startCol = c;
        break;
      }
    }
    if (startRow !== -1) break;
  }

  const activatedSplitters = new Set<string>();
  const processedBeams = new Set<string>();

  const queue: Array<[number, number]> = [[startRow, startCol]];

  while (queue.length > 0) {
    const [row, col] = queue.shift()!;

    const beamKey = `${row},${col}`;
    if (processedBeams.has(beamKey)) {
      continue;
    }
    processedBeams.add(beamKey);

    for (let r = row + 1; r < grid.length; r++) {
      if (grid[r]![col] === "^") {
        const splitterKey = `${r},${col}`;
        if (!activatedSplitters.has(splitterKey)) {
          activatedSplitters.add(splitterKey);
        }

        if (col - 1 >= 0) {
          queue.push([r, col - 1]);
        }
        if (col + 1 < grid[r]!.length) {
          queue.push([r, col + 1]);
        }
        break;
      }
    }
  }

  console.log("Total splits:", activatedSplitters.size);
  return activatedSplitters.size;
}

function solve2() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "7p.txt";

  const lines = fs.readFileSync(currDir, "utf8").trim().split("\n");
  const grid = lines.map((line) => line.split(""));

  let startRow = -1;
  let startCol = -1;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r]!.length; c++) {
      if (grid[r]![c] === "S") {
        startRow = r;
        startCol = c;
        break;
      }
    }
    if (startRow !== -1) break;
  }

  let currentParticles = new Map<number, number>();
  currentParticles.set(startCol, 1);

  for (let row = startRow + 1; row < grid.length; row++) {
    const nextParticles = new Map<number, number>();

    for (const [col, count] of currentParticles.entries()) {
      if (grid[row]![col] === "^") {
        if (col - 1 >= 0) {
          nextParticles.set(col - 1, (nextParticles.get(col - 1) || 0) + count);
        }
        if (col + 1 < grid[row]!.length) {
          nextParticles.set(col + 1, (nextParticles.get(col + 1) || 0) + count);
        }
      } else {
        nextParticles.set(col, (nextParticles.get(col) || 0) + count);
      }
    }

    currentParticles = nextParticles;
  }

  let totalTimelines = 0;
  for (const count of currentParticles.values()) {
    totalTimelines += count;
  }

  console.log("Total timelines:", totalTimelines);
  return totalTimelines;
}

solve1();
console.log();
solve2();
