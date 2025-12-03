import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

function solve1() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "3p.txt";
  const lines = fs.readFileSync(currDir, "utf8").trim().split("\n");
  const greatest: number[] = [];

  for (let j = 0; j < lines.length; j++) {
    const line = lines[j]!;
    let currentGreatest = -Infinity;
    let secondGreatest = -Infinity;
    for (let i = 0; i < line.length; i++) {
      const numb = parseInt(line[i]!);
      if (numb > currentGreatest && line.length - 1 !== i) {
        currentGreatest = numb;
        secondGreatest = -Infinity;
      } else {
        if (numb > secondGreatest) {
          secondGreatest = numb;
        }
      }
    }
    greatest.push(currentGreatest * 10 + secondGreatest);
  }
  return greatest.reduce((a, b) => a + b, 0);
}

console.log(solve1());

function solve2() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "3p.txt";
  const lines = fs.readFileSync(currDir, "utf8").trim().split("\n");
  let sum = 0;

  for (let j = 0; j < lines.length; j++) {
    const line = lines[j]!;
    const k = 12;
    const toRemove = line.length - k;

    const stack: string[] = [];
    let removed = 0;

    for (let i = 0; i < line.length; i++) {
      const digit = line[i]!;

      while (
        stack.length > 0 &&
        stack[stack.length - 1]! < digit &&
        removed < toRemove
      ) {
        stack.pop();
        removed++;
      }

      stack.push(digit);
    }

    while (removed < toRemove) {
      stack.pop();
      removed++;
    }

    const result = parseInt(stack.join(""));
    sum += result;
  }
  return sum;
}

console.log(solve2());
