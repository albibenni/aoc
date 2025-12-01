import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

function solve1p1() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "1p.txt";
  const splits = fs
    .readFileSync(currDir, "utf8")
    .split("\n\n")
    .map((s) => s.split("\n"));
  let maxCal = 0;
  splits.forEach((elf) => {
    const res = elf.reduce((acc, n) => acc + parseInt(n), 0);
    if (res > maxCal) {
      maxCal = res;
    }
  });

  console.log(maxCal);
}

// solve1p1();

function solve1p2() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "1p.txt";
  const splits = fs
    .readFileSync(currDir, "utf8")
    .split("\n\n")
    .map((s) => s.split("\n"));
  const calSum: number[] = [];
  splits.forEach((elf) => {
    const res = elf.reduce((acc, n) => {
      const num = parseInt(n);
      return acc + (isNaN(num) ? 0 : num);
    }, 0);
    calSum.push(res);
  });
  calSum.sort((a, b) => a - b);
  console.log(calSum);

  console.log(
    calSum[calSum.length - 1]! +
      calSum[calSum.length - 2]! +
      calSum[calSum.length - 3]!,
  );
}

solve1p2();
