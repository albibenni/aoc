//@ts-nocheck
/*
--- Part Two ---
The Elf looks quizzically at you. Did you misunderstand the assignment?

Looking for the instructions, you flip over the word search to find that this isn't actually an XMAS puzzle; it's an X-MAS puzzle in which you're supposed to find two MAS in the shape of an X. One way to achieve that is like this:

M.S
.A.
M.S
Irrelevant characters have again been replaced with . in the above diagram. Within the X, each MAS can be written forwards or backwards.

Here's the same example from before, but this time all of the X-MASes have been kept instead:

.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........
In this example, an X-MAS appears 9 times.

Flip the word search from the instructions back over to the word search side and try again. How many times does an X-MAS appear?
*/

import fs from "fs";
const preprocess = (text: string) => text.split("\n");

const reverseString = (str: string) => str.split("").reverse().join("");

const getWordsAround = (input: string[], i: number, j: number) => [
  // Forward
  input[i].slice(j, j + 4),
  // Backwards
  reverseString(input[i].slice(j - 3, j + 1)),
  // Vertical - up
  reverseString(
    `${input[i - 3]?.[j] || ""}${input[i - 2]?.[j] || ""}${
      input[i - 1]?.[j] || ""
    }${input[i][j]}`,
  ),
  // Vertical - down
  `${input[i][j]}${input[i + 1]?.[j] || ""}${input[i + 2]?.[j] || ""}${
    input[i + 3]?.[j] || ""
  }`,
  // Diagonal - up right
  `${input[i][j]}${input[i - 1]?.[j + 1] || ""}${input[i - 2]?.[j + 2] || ""}${
    input[i - 3]?.[j + 3] || ""
  }`,
  // Diagonal - down right
  `${input[i][j]}${input[i + 1]?.[j + 1] || ""}${input[i + 2]?.[j + 2] || ""}${
    input[i + 3]?.[j + 3] || ""
  }`,
  // Diagonal - up left
  `${input[i][j]}${input[i - 1]?.[j - 1] || ""}${input[i - 2]?.[j - 2] || ""}${
    input[i - 3]?.[j - 3] || ""
  }`,
  // Diagonal - down left
  `${input[i][j]}${input[i + 1]?.[j - 1] || ""}${input[i + 2]?.[j - 2] || ""}${
    input[i + 3]?.[j - 3] || ""
  }`,
];

const partOne = (input: string[]) => {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      sum += getWordsAround(input, i, j).filter(
        (word) => word === "XMAS",
      ).length;
    }
  }
  return sum;
};

const input = fs.readFileSync("./src/day4/data.txt", "utf8");

console.log(partOne(preprocess(input)));

const isXmas = (input: string[], i: number, j: number) =>
  input[i][j] === "A" &&
  ((input[i - 1]?.[j - 1] === "M" && input[i + 1]?.[j + 1] === "S") ||
    (input[i - 1]?.[j - 1] === "S" && input[i + 1]?.[j + 1] === "M")) &&
  ((input[i + 1]?.[j - 1] === "M" && input[i - 1]?.[j + 1] === "S") ||
    (input[i + 1]?.[j - 1] === "S" && input[i - 1]?.[j + 1] === "M"));

const partTwo = (input: string[]) => {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      sum += isXmas(input, i, j) ? 1 : 0;
    }
  }
  return sum;
};
console.log(partTwo(preprocess(input)));
