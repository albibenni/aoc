/*
--- Day 7: Bridge Repair ---
The Historians take you to a familiar rope bridge over a river in the middle of a jungle. The Chief isn't on this side of the bridge, though; maybe he's on the other side?

When you go to cross the bridge, you notice a group of engineers trying to repair it. (Apparently, it breaks pretty frequently.) You won't be able to cross until it's fixed.

You ask how long it'll take; the engineers tell you that it only needs final calibrations, but some young elephants were playing nearby and stole all the operators from their calibration equations! They could finish the calibrations if only someone could determine which test values could possibly be produced by placing any combination of operators into their calibration equations (your puzzle input).

For example:

190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
Each line represents a single equation. The test value appears before the colon on each line; it is your job to determine whether the remaining numbers can be combined with operators to produce the test value.

Operators are always evaluated left-to-right, not according to precedence rules. Furthermore, numbers in the equations cannot be rearranged. Glancing into the jungle, you can see elephants holding two different types of operators: add (+) and multiply (*).

Only three of the above equations can be made true by inserting operators:

190: 10 19 has only one position that accepts an operator: between 10 and 19. Choosing + would give 29, but choosing * would give the test value (10 * 19 = 190).
3267: 81 40 27 has two positions for operators. Of the four possible configurations of the operators, two cause the right side to match the test value: 81 + 40 * 27 and 81 * 40 + 27 both equal 3267 (when evaluated left-to-right)!
292: 11 6 16 20 can be solved in exactly one way: 11 + 6 * 16 + 20.
The engineers just need the total calibration result, which is the sum of the test values from just the equations that could possibly be true. In the above example, the sum of the test values for the three equations listed above is 3749.

Determine which equations could possibly be true. What is their total calibration result?
*/
//@ts-nocheck
import fs from "fs";

const input = fs
  .readFileSync("./src/day7/data.txt", "utf8")
  .toString()
  .split("\n");

function solution(input: string[]) {
  let sum = 0;

  for (const line of input) {
    if (!line) continue;
    const [test, numbers] = line.split(": ");
    const testValue = parseInt(test);
    const nums = numbers.split(" ").map(Number);

    // Generate all possible combinations of operators
    const operators = ["+", "*"];
    const possibleCombinations = operators.length ** (nums.length - 1);

    let canBeSolved = false;
    for (let i = 0; i < possibleCombinations; i++) {
      let operatorSequence = [];
      let temp = i;
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

      if (result === testValue) {
        canBeSolved = true;
        break;
      }
    }

    if (canBeSolved) {
      sum += testValue;
    }
  }

  console.log(sum);
  return sum;
}

solution(input);
// Answer: 538191549061
