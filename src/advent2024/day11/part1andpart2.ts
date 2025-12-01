import fs from "fs";

function parse(input: string) {
  const stones = input
    .split(/\s+/g)
    .map((i) => i.trim())
    .filter((i) => i.length > 0)
    .map((i) => BigInt(i));

  const result = new Map<bigint, number>();
  for (const stone of stones) {
    result.set(stone, (result.get(stone) ?? 0) + 1);
  }
  return result;
}

function add(stones: Map<bigint, number>, stone: bigint, count: number) {
  stones.set(stone, (stones.get(stone) ?? 0) + count);
}

function tick(stones: Map<bigint, number>) {
  const next = new Map<bigint, number>();
  for (const [stone, count] of stones) {
    if (stone === 0n) {
      add(next, 1n, count);
      continue;
    }
    // handle the case where the stone is even via string - length is 2 - 4, 6, 8, 10, 12 etc
    const stoneString = stone.toString();
    if (stoneString.length % 2 === 0) {
      const left = BigInt(stoneString.substring(0, stoneString.length / 2));
      const right = BigInt(stoneString.substring(stoneString.length / 2));
      add(next, left, count);
      add(next, right, count);
      continue;
    }
    // handle the case where the stone is not 0 or even - length is 1 - 3 - 5, 7, 9, 11, 13 etc
    add(next, stone * 2024n, count);
  }
  return next;
}

export function partOne(input: string) {
  let stones = parse(input);
  for (let i = 0; i < 25; ++i) {
    stones = tick(stones);
  }
  return [...stones].reduce((acc, [, count]) => acc + count, 0);
}

export function partTwo(input: string) {
  let stones = parse(input);
  for (let i = 0; i < 75; ++i) {
    stones = tick(stones);
  }
  return [...stones].reduce((acc, [, count]) => acc + count, 0);
}

const input = fs.readFileSync("./src/day11/data.txt", "utf8");
console.log(partOne(input));
console.log(partTwo(input));
