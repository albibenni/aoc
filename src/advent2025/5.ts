import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

function solve1() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "5p.txt";

  const lines = fs.readFileSync(currDir, "utf8").trim().split("\n");

  // Find the blank line that separates ranges from IDs
  const blankLineIndex = lines.findIndex((line) => line.trim() === "");

  // Parse fresh ID ranges
  const ranges: [number, number][] = [];
  for (let i = 0; i < blankLineIndex; i++) {
    const [start, end] = lines[i]!.split("-").map(Number);
    ranges.push([start!, end!]);
  }

  // Parse available ingredient IDs
  const availableIds: number[] = [];
  for (let i = blankLineIndex + 1; i < lines.length; i++) {
    availableIds.push(Number(lines[i]));
  }

  // Check which IDs are fresh (fall into any range)
  let freshCount = 0;
  for (const id of availableIds) {
    const isFresh = ranges.some(([start, end]) => id >= start && id <= end);
    if (isFresh) {
      freshCount++;
    }
  }

  console.log("Part 1:", freshCount);
}

function solve2() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "5p.txt";

  const lines = fs.readFileSync(currDir, "utf8").trim().split("\n");

  const blankLineIndex = lines.findIndex((line) => line.trim() === "");

  const ranges: [number, number][] = [];
  for (let i = 0; i < blankLineIndex; i++) {
    const [start, end] = lines[i]!.split("-").map(Number);
    ranges.push([start!, end!]);
  }

  ranges.sort((a, b) => a[0] - b[0]);

  const merged: [number, number][] = [];
  for (const [start, end] of ranges) {
    if (merged.length === 0) {
      merged.push([start, end]);
    } else {
      const last = merged[merged.length - 1]!;
      if (start <= last[1] + 1) {
        last[1] = Math.max(last[1], end);
      } else {
        merged.push([start, end]);
      }
    }
  }

  let totalFresh = 0;
  for (const [start, end] of merged) {
    totalFresh += end - start + 1; // +1 because ranges are inclusive
  }

  console.log("Part 2:", totalFresh);
}

solve1();
solve2();
