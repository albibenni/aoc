import { readFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const priorityLowercase = 96;
const priorityUppercase = 38;
function solveP1() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "3p.txt";
  const file = readFileSync(currDir, "utf8");
  const rucksacks = file.split("\n");
  const chars: string[] = [];
  // console.log(lines);
  // if (char === char.toUppercas())
  for (const rucksack of rucksacks) {
    const half1 = rucksack.substring(0, Math.floor(rucksack.length / 2));
    const half2 = rucksack.substring(Math.floor(rucksack.length / 2));
    const half1Set = new Set(half1);

    for (const char of half2) {
      if (half1Set.has(char)) {
        chars.push(char);
        break;
      }
    }
  }

  const total = chars.reduce((acc, c) => {
    if (c === c.toUpperCase()) {
      const v = c.charCodeAt(0) - priorityUppercase;

      acc += v;
    } else {
      const v = c.charCodeAt(0) - priorityLowercase;
      acc += v;
    }
    return acc;
  }, 0);
  console.log(total);
}

solveP1();

function solveP2() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "3p.txt";
  const file = readFileSync(currDir, "utf8");
  const rucksacks = file.split("\n");
  const chars: string[] = [];

  for (let i = 0; i < rucksacks.length - 2; i += 3) {
    const elf1 = rucksacks[i]!;
    const elf2 = rucksacks[i + 1]!;
    const elf3 = rucksacks[i + 2]!;
    const setElf2 = new Set(elf2);
    const setElf3 = new Set(elf3);

    for (const char of elf1) {
      if (setElf2.has(char) && setElf3.has(char)) {
        chars.push(char);
        break;
      }
    }
  }
  const total = chars.reduce((acc, c) => {
    if (c === c.toUpperCase()) {
      const v = c.charCodeAt(0) - priorityUppercase;

      acc += v;
    } else {
      const v = c.charCodeAt(0) - priorityLowercase;
      acc += v;
    }
    return acc;
  }, 0);
  console.log(total);
}

solveP2();
