//@ts-nocheck
import fs from "fs";

const input = fs
  .readFileSync("./src/day7/dummy.txt", "utf8")
  .toString()
  .split("\n");
console.log(sol(input));
// Answer: 538191549061

function sol(input: string[]) {
  let sum = { sum: 0 };
  for (const line of input) {
    const [numToGet, nums] = line.split(": ");
    const numbs = nums!.split(" ").map(Number);
    const res = Number(numToGet);
    console.log(numToGet, nums);
    attemptMath(numbs, res, sum);
  }
  return sum;
}

function attemptMath(
  nums: number[],
  attemptedResult: number,
  sum: { sum: number },
): boolean {
  const operators = ["+", "*"];

  const combinations = operators.length ** (nums.length - 1);
  let isPossible = false;
  for (let index = 0; index < combinations; index++) {
    // if (isPossible) {
    //   return isPossible;
    // }
    let operatorSequence = [];
    let temp = index;
    for (let j = 0; j < nums.length - 1; j++) {
      operatorSequence.push(operators[temp % operators.length]);
      temp = Math.floor(temp / operators.length);
    }

    // Evaluate expression left to right
    let result = nums[0];
    for (let j = 0; j < operatorSequence.length; j++) {
      if (operatorSequence[j] === "+") {
        result += nums[j + 1];
      } else {
        result *= nums[j + 1];
      }
    }

    if (result === attemptedResult) {
      isPossible = true;
      break;
    }
  }
  if (isPossible) {
    sum.sum += attemptedResult;
  }
  return isPossible;
}
