import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

function mod(dialPosition: number, base: number) {
  return ((dialPosition % base) + base) % base;
}

function solve1() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "1p.txt";
  const splits = fs.readFileSync(currDir, "utf8").trim().split("\n");
  let dialPosition = 50;
  let countZerosP1 = 0;
  let countZerosP2 = 0;
  for (const move of splits) {
    const letterSign = move[0]! === "L" ? -1 : 1;
    const sub = parseInt(move.slice(1));

    for (let i = 0; i < sub; i++) {
      dialPosition = mod(dialPosition + letterSign, 100);
      if (dialPosition === 0) countZerosP2++;
    }

    if (dialPosition === 0) {
      countZerosP1++;
    }
  }

  console.log(countZerosP1);
  console.log(countZerosP2);
}

solve1();
