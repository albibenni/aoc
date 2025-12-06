import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

function solve1() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "6p.txt";

  const lines = fs.readFileSync(currDir, "utf8").trim().split("\n");
  const rows = lines.map((line) =>
    line.split(/\s+/).filter((s) => s.length > 0),
  );

  const numCols = rows[0]!.length;
  let sum = 0;

  for (let col = 0; col < numCols; col++) {
    const sign = rows[rows.length - 1]![col]!;
    let partSum = 0;

    for (let row = 0; row < rows.length - 1; row++) {
      const num = parseInt(rows[row]![col]!);
      if (sign === "*") {
        partSum = partSum === 0 ? num : partSum * num;
      } else {
        partSum += num;
      }
    }
    sum += partSum;
  }

  console.log("Part 1:", sum);
}

function solve2() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "6p.txt";

  const lines = fs.readFileSync(currDir, "utf8").trim().split("\n");
  const lastLine = lines.length - 1;

  const grid: string[][] = lines
    .slice(0, lastLine)
    .map((line) => line.split(""));

  const gridRows = grid.length;

  const operators: string[] = [];
  const indexes: number[] = [];
  for (let i = 0; i < lines[lastLine]!.length; i++) {
    const char = lines[lastLine]![i]!;
    if (char === " ") {
      continue;
    }
    operators.push(char);
    indexes.push(i);
  }
  indexes.push(grid[0]!.length + 1); // add last limit

  let total = 0;
  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i]!;
    const start = indexes[i]!;
    const end = indexes[i + 1]! - 1;
    const operands: number[] = [];

    for (let col = start; col < end; col++) {
      let num = "";
      for (let row = 0; row < gridRows; row++) {
        num += grid[row]![col];
      }
      operands.push(parseInt(num.trim()));
    }

    if (operator === "+") {
      total += operands.reduce((sum, n) => sum + n, 0);
    } else if (operator === "*") {
      total += operands.reduce((product, n) => product * n, 1);
    }
  }

  console.log("Part 2:", total);
}

solve1();
solve2();
