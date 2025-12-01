/*
--- Part Two ---
The engineers seem concerned; the total calibration result you gave them is nowhere close to being within safety tolerances. Just then, you spot your mistake: some well-hidden elephants are holding a third type of operator.

The concatenation operator (||) combines the digits from its left and right inputs into a single number. For example, 12 || 345 would become 12345. All operators are still evaluated left-to-right.

Now, apart from the three equations that could be made true using only addition and multiplication, the above example has three more equations that can be made true by inserting operators:

156: 15 6 can be made true through a single concatenation: 15 || 6 = 156.
7290: 6 8 6 15 can be made true using 6 * 8 || 6 * 15.
192: 17 8 14 can be made true using 17 || 8 + 14.
Adding up all six test values (the three that could be made before using only + and * plus the new three that can now be made by also using ||) produces the new total calibration result of 11387.

Using your new knowledge of elephant hiding spots, determine which equations could possibly be true. What is their total calibration result?
*/
import fs from "fs";

const input = fs
  .readFileSync("./src/day7/data.txt", "utf8")
  .toString()
  .split("\n");

/** 
  The main function calc takes two parameters:

permutation: A string representing a sequence of operators (*, +, or |)
numbers: An array of numbers to operate on
The function implements a calculator that processes these operations sequentially. It starts with the first number from the array as the initial result and then iterates through the permutation string. For each operator in the permutation:

If it's *, it multiplies the current result by the next number
If it's +, it adds the next number to the current result
If it's |, it performs a concatenation operation by converting both numbers to strings, joining them, and converting back to a number (e.g., 1 | 2 becomes 12)
Based on the comment above the code, this appears to be solving a puzzle where you need to find valid equations that can be formed using these operators. The puzzle mentions "elephant hiding spots" and requires calculating a "calibration result" by summing up values from valid equations.

The use of TypeScript's strict nullability is evident with the ! operators, indicating that the code assumes result and currentNumber will never be null or undefined during execution
*/
const calc = (permutation: string, numbers: number[]) => {
  let result = numbers[0];
  let numberIndex = 1;

  for (let x = 0; x < permutation.length; x++) {
    const operator = permutation[x];
    const currentNumber = numbers[numberIndex];

    switch (operator) {
      case "*":
        result! *= currentNumber!;
        break;
      case "+":
        result! += currentNumber!;
        break;
      case "|":
        result = Number.parseInt(`${result}${currentNumber}`);
        break;
    }

    numberIndex++;
  }

  return result;
};

const hasWorkingPermutation = (numbers: number[], compare: number) => {
  const length = numbers.length - 1;
  const chars = ["*", "|", "+"];

  const totalPermutations = Math.pow(3, length);

  for (let i = 0; i < totalPermutations; i++) {
    let num = i;
    let perm = "";

    for (let j = 0; j < length; j++) {
      perm = chars[num % 3] + perm;
      num = Math.floor(num / 3);
    }

    if (calc(perm, numbers) === compare) {
      return true;
    }
  }

  return false;
};

let sum = 0;
for (const line of input) {
  const [resultStr, numbersStr] = line.split(":");
  const result = Number.parseInt(resultStr!);
  const numbers = numbersStr!
    .split(" ")
    .splice(1)
    .map((x) => Number.parseInt(x));

  if (hasWorkingPermutation(numbers, result)) {
    sum += result;
  }
}

console.log(sum);

// Answer: 34612812972206
