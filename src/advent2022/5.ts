import { readFile } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

async function day5P1() {
  const currDir = dirname(fileURLToPath(import.meta.url));
  const file = await readFile(currDir + "/data/5p.txt", "utf8");
  const lines = file.split("\n");
  console.log(lines);
  const moves: string[] = [];
  const containers: string[][] = [];
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i]!;
    if (line.includes("[")) {
      handleCranes(containers, line);
    } else if (line.includes("move")) {
      moves.push(line);
    }
  }
  console.log(containers);
  handleMoves(moves, containers);
}

function handleCranes(containers: string[][], line: string) {
  for (let i = 1; i < line.length; i += 4) {
    const crane = line[i]!;
    if (crane == " ") continue;
    const stackN = Math.floor(i / 4);
    if (!containers[stackN]) {
      containers[stackN] = [crane];
    } else {
      containers[stackN].push(crane);
    }
  }
}

function handleMoves(moves: string[], containers: string[][]) {
  for (let i = moves.length - 1; i >= 0; i--) {
    const move = moves[i]!;
    const parts = move.split(" ");
    const amount = parseInt(parts[1]!);
    const subject = parseInt(parts[3]!) - 1;
    const where = parseInt(parts[5]!) - 1;
    console.log(amount, subject, where);
    for (let j = 0; j < amount; j++) {
      const crate = containers[subject]!.pop();
      if (crate) {
        containers[where]!.push(crate);
      }
    }

    // Print top crates
    const result = containers
      .map((stack) => stack[stack.length - 1] || "")
      .join("");
    console.log(result);
  }
}
//await day5P1();

async function day5P2() {
  const currDir = dirname(fileURLToPath(import.meta.url));
  const file = await readFile(currDir + "/data/5p.txt", "utf8");
  const lines = file.split("\n");

  console.log(lines);
  const moves: string[] = [];
  const containers: string[][] = [];
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i]!;
    if (line.includes("[")) {
      handleCranes(containers, line);
    } else if (line.includes("move")) {
      moves.push(line);
    }
  }
  handleMoves2(moves, containers);
}

function handleMoves2(moves: string[], containers: string[][]) {
  for (let i = moves.length - 1; i >= 0; i--) {
    const move = moves[i]!;
    const parts = move.split(" ");
    const amount = parseInt(parts[1]!);
    const subject = parseInt(parts[3]!) - 1;
    const where = parseInt(parts[5]!) - 1;

    const crates: string[] = [];
    for (let j = 0; j < amount; j++) {
      crates.push(containers[subject]!.pop()!);
    }
    for (let z = crates.length - 1; z >= 0; z--) {
      containers[where]!.push(crates[z]!);
    }
  }
  const result = containers
    .map((stack) => stack[stack.length - 1] || "")
    .join("");
  console.log(result);
}
await day5P2();
