/*--- Day 4: Ceres Search ---
"Looks like the Chief's not here. Next!" One of The Historians pulls out a device and pushes the only button on it. After a brief flash, you recognize the interior of the Ceres monitoring station!

As the search for the Chief continues, a small Elf who lives on the station tugs on your shirt; she'd like to know if you could help her with her word search (your puzzle input). She only has to find one word: XMAS.

This word search allows words to be horizontal, vertical, diagonal, written backwards, or even overlapping other words. It's a little unusual, though, as you don't merely need to find one instance of XMAS - you need to find all of them. Here are a few ways XMAS might appear, where irrelevant characters have been replaced with .:


..X...
.SAMX.
.A..A.
XMAS.S
.X....
The actual word search will be full of letters instead. For example:

MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
In this word search, XMAS occurs a total of 18 times; here's the same word search again, but where letters not involved in any XMAS have been replaced with .:

....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX
Take a look at the little Elf's word search. How many times does XMAS appear?
*/

import fs from "fs";
function solution(input: string) {
  let sum = 0;
  let matrix = input.split("\n").map((row) => row.split(""));
  console.log(matrix);
  for (let x = 0; x < matrix.length; x++) {
    //@ts-ignore
    for (let y = 0; y < matrix[x].length; y++) {
      //@ts-ignore
      if (matrix[x][y] === "X") {
        console.log("X found at", x, y);

        if (adjacentChar(x, y, matrix, "X")) {
          sum += 1;
        }
      }
    }
  }
  console.log(sum);
}

function adjacentChar(
  x: number,
  y: number,
  matrix: number[][],
  charToCheck: string,
): boolean {
  if (x > 0) {
    if (matrix[x - 1][y] == charToCheck) {
      return nextChar(x - 1, y, charToCheck, matrix);
    }
  }
  if (x < matrix.length - 1) {
    if (matrix[x + 1][y] == charToCheck) {
      return nextChar(x + 1, y, charToCheck, matrix);
    }
  }
  if (y > 0) {
    if (matrix[x][y - 1] == charToCheck) {
      return nextChar(x, y - 1, charToCheck, matrix);
    }
  }
  if (y < matrix[x].length - 1) {
    if (matrix[x][y + 1] == charToCheck) {
      return nextChar(x, y + 1, charToCheck, matrix);
    }
  }
  if (x > 0 && y > 0) {
    if (matrix[x - 1][y - 1] == charToCheck) {
      return nextChar(x - 1, y - 1, charToCheck, matrix);
    }
  }
  if (x > 0 && y < matrix[x].length - 1) {
    if (matrix[x - 1][y + 1] == charToCheck) {
      return nextChar(x - 1, y + 1, charToCheck, matrix);
    }
  }
  if (x < matrix.length - 1 && y > 0) {
    if (matrix[x + 1][y - 1] == charToCheck) {
      return nextChar(x + 1, y - 1, charToCheck, matrix);
    }
  }
  if (x < matrix.length - 1 && y < matrix[x].length - 1) {
    if (matrix[x + 1][y + 1] == charToCheck) {
      return nextChar(x + 1, y + 1, charToCheck, matrix);
    }
  }
  return false;
}

function nextChar(
  x: number,
  y: number,
  currentChar: string,
  matrix: number[][],
) {
  if (currentChar === "X") {
    return adjacentChar(x, y, matrix, "M");
  }
  if (currentChar === "M") {
    return adjacentChar(x, y, matrix, "A");
  }
  if (currentChar === "A") {
    return adjacentChar(x, y, matrix, "S");
  }
  if (currentChar === "S") {
    return true;
  }
}

const input = fs.readFileSync("./src/day4/dummy.txt", "utf8");
solution(input);

// 2569
