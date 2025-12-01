/*--- Part Two ---
As you scan through the corrupted memory, you notice that some of the conditional statements are also still intact. If you handle some of the uncorrupted conditional statements in the program, you might be able to get an even more accurate result.

There are two new instructions you'll need to handle:

The do() instruction enables future mul instructions.
The don't() instruction disables future mul instructions.
Only the most recent do() or don't() instruction applies. At the beginning of the program, mul instructions are enabled.

For example:

xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))
This corrupted memory is similar to the example from before, but this time the mul(5,5) and mul(11,8) instructions are disabled because there is a don't() instruction before them. The other mul instructions function normally, including the one at the end that gets re-enabled by a do() instruction.

This time, the sum of the results is 48 (2*4 + 8*5).

Handle the new instructions; what do you get if you add up all of the results of just the enabled multiplications?
*/
//@ts-nocheck
import fs from "fs";

function solution(input: string) {
  let sum = 0;
  let instructions = [];
  const regex = /mul\((\d+),(\d+)\)|don't\(\)|do\(\)/g;
  let ignore = false;
  let matches;

  while ((matches = regex.exec(input)) !== null) {
    if (matches[0] === "don't()") {
      ignore = true;
    } else if (matches[0] === "do()") {
      ignore = false;
    } else if (!ignore) {
      const x = parseInt(matches[1], 10);
      const y = parseInt(matches[2], 10);
      instructions.push({ x, y });
    }
  }

  instructions.forEach((instructions) => {
    sum += instructions.x * instructions.y;
  });
  console.log(sum);
}

const input = fs.readFileSync("./src/day3/data.txt", "utf8");
solution(input);
