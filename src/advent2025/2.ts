import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

function solve1() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "2p.txt";
  const splits = fs
    .readFileSync(currDir, "utf8")
    .trim()
    .split(",")
    .map((e) => e.replace("\n", ""));
  const invalid: number[] = [];
  const invalid2: number[] = [];

  for (const range of splits) {
    const [start, end] = range.trim().split("-").map(Number);
    for (let num = start!; num <= end!; num++) {
      if (isInvalidID(num, true)) {
        invalid.push(num);
      }
      if (isInvalidID(num, false)) {
        invalid2.push(num);
      }
    }
  }
  console.log(invalid.reduce((a, b) => a + b, 0));
  console.log(invalid2.reduce((a, b) => a + b, 0));
}
function isInvalidID(num: number, isPart1: boolean): boolean {
  const str = num.toString();
  if (isPart1) {
    //- ^ - Start of string
    // - (\d+?) - Capture one or more digits non-greedy (the ? is crucial - it finds the smallest repeating unit)
    // - \1+ - Match the captured group one or more additional times (so at least 2 total repetitions)
    // - $ - End of string

    const regex = /^(\d+)\1$/;

    return regex.test(str);
  } else {
    //- ^ - Start of string
    // - (\d+?) - Capture one or more digits non-greedy (the ? is crucial - it finds the smallest repeating unit)
    // - \1+ - Match the captured group one or more additional times (so at least 2 total repetitions)
    // - $ - End of string
    const regex = /^(\d+?)\1+$/;
    return regex.test(str);
  }
}

solve1();
