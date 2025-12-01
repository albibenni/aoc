/*
--- Part Two ---
Upon completion, two things immediately become clear. First, the disk definitely has a lot more contiguous free space, just like the amphipod hoped. Second, the computer is running much more slowly! Maybe introducing all of that file system fragmentation was a bad idea?

The eager amphipod already has a new plan: rather than move individual blocks, he'd like to try compacting the files on his disk by moving whole files instead.

This time, attempt to move whole files to the leftmost span of free space blocks that could fit the file. Attempt to move each file exactly once in order of decreasing file ID number starting with the file with the highest file ID number. If there is no span of free space to the left of a file that is large enough to fit the file, the file does not move.

The first example from above now proceeds differently:

00...111...2...333.44.5555.6666.777.888899
0099.111...2...333.44.5555.6666.777.8888..
0099.1117772...333.44.5555.6666.....8888..
0099.111777244.333....5555.6666.....8888..
00992111777.44.333....5555.6666.....8888..
The process of updating the filesystem checksum is the same; now, this example's checksum would be 2858.

Start over, now compacting the amphipod's hard drive using this new method instead. What is the resulting filesystem checksum?
 */

//@ts-nocheck
import fs from "fs";

function parseInput(input: string) {
  return input.trim().split("").map(Number);
}

function createDiskMap(numbers: number[]) {
  let disk = [];
  let fileId = 0;

  for (let i = 0; i < numbers.length; i++) {
    const length = numbers[i];

    if (i % 2 === 0) {
      for (let j = 0; j < length; j++) {
        disk.push(fileId);
      }
      fileId++;
    } else {
      for (let j = 0; j < length; j++) {
        disk.push(".");
      }
    }
  }

  return disk;
}

function findFiles(disk) {
  const files = new Map();

  for (let i = 0; i < disk.length; i++) {
    const id = disk[i];
    if (id === ".") continue;

    if (!files.has(id)) {
      files.set(id, {
        id,
        start: i,
        length: 1,
      });
    } else {
      files.get(id).length++;
    }
  }

  return Array.from(files.values());
}

function findFreeSpace(disk, start, length) {
  let currentLength = 0;
  let currentStart = -1;

  for (let i = 0; i < start; i++) {
    if (disk[i] === ".") {
      if (currentStart === -1) currentStart = i;
      currentLength++;

      if (currentLength === length) {
        return currentStart;
      }
    } else {
      currentLength = 0;
      currentStart = -1;
    }
  }

  return -1;
}

function moveFile(disk, file, newStart) {
  for (let i = file.start; i < file.start + file.length; i++) {
    disk[i] = ".";
  }

  for (let i = 0; i < file.length; i++) {
    disk[newStart + i] = file.id;
  }
}

function compactDisk(disk) {
  const files = findFiles(disk);
  files.sort((a, b) => b.id - a.id);

  for (const file of files) {
    const newPos = findFreeSpace(disk, file.start, file.length);
    if (newPos !== -1) {
      moveFile(disk, file, newPos);
    }
  }

  return disk;
}

function calculateChecksum(disk) {
  return disk.reduce((sum, fileId, position) => {
    if (fileId === ".") return sum;
    return sum + position * fileId;
  }, 0);
}

function solve(input: string) {
  const numbers = parseInput(input);
  const disk = createDiskMap(numbers);
  const compactedDisk = compactDisk([...disk]);
  return calculateChecksum(compactedDisk);
}

const input = fs.readFileSync("./src/day9/data.txt", "utf8");
const input2 = fs.readFileSync("./src/day9/dummy.txt", "utf8");
console.log(solve(input));
console.log(solve(input2));
// Answer: 1333
