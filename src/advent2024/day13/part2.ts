/*
--- Part Two ---
As you go to win the first prize, you discover that the claw is nowhere near where you expected it would be. Due to a unit conversion error in your measurements, the position of every prize is actually 10000000000000 higher on both the X and Y axis!

Add 10000000000000 to the X and Y position of every prize. After making this change, the example above would now look like this:

Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=10000000008400, Y=10000000005400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=10000000012748, Y=10000000012176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=10000000007870, Y=10000000006450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=10000000018641, Y=10000000010279
Now, it is only possible to win a prize on the second and fourth claw machines. Unfortunately, it will take many more than 100 presses to do so.

Using the corrected prize coordinates, figure out how to win as many prizes as possible. What is the fewest tokens you would have to spend to win all possible prizes?
*/
//@ts-nocheck
import fs from "fs";

const input = fs
  .readFileSync("./src/day13/data.txt", "utf8")
  .toString()
  .trim()
  .split("\n\n");

const isDivisible = (num: number, by: number) => {
  if (num > by) {
    return num % by === 0;
  }
  return by % num === 0;
};

const determinant = (matrix: number[][]) => {
  return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
};

// invert without dividing
const invertMatrix = (matrix: number[][]) => {
  return [
    [matrix[1][1], -matrix[0][1]],
    [-matrix[1][0], matrix[0][0]],
  ];
};

function solution(input: string[]) {
  let totalCost = 0;

  for (const machines of input) {
    const [aInfo, bInfo, prizeInfo] = machines.split("\n");
    const [aX, aY] =
      aInfo
        .match(/Button A: X\+(\d+), Y\+(\d+)/)
        ?.slice(1)
        .map(Number) || [];
    const [bX, bY] =
      bInfo
        .match(/Button B: X\+(\d+), Y\+(\d+)/)
        ?.slice(1)
        .map(Number) || [];
    let [prizeX, prizeY] =
      prizeInfo
        .match(/X=(\d+), Y=(\d+)/)
        ?.slice(1)
        .map(Number) || [];

    prizeX += 10000000000000;
    prizeY += 10000000000000;

    // console.log(`A: ${aX}, ${aY}`, `B: ${bX}, ${bY}`, `Prize: ${prizeX}, ${prizeY}`);

    let cost = 0;
    // pressing A costs 3, B costs 1 and max we can press is 100 times each

    // so need to solve this linear equations
    // aX * a + bX * b = prizeX
    // aY * a + bY * b = prizeY
    // 0 <= a <= 100, 0 <= b <= 100
    // and minimize a * 3 + b

    const matrix = [
      [aX, bX],
      [aY, bY],
    ];

    // if it has solution then determinant of matrix should not be 0
    const det = determinant(matrix);
    if (det === 0 && !(isDivisible(prizeX, aX) && isDivisible(prizeY, aY))) {
      console.log(`No solution for ${prizeX}, ${prizeY}`);
      continue;
    }

    // so solution = matrix^-1 * [prizeX, prizeY]
    const invertedMatrix = invertMatrix(matrix);
    let [a, b] = invertedMatrix.map((row) => row[0] * prizeX + row[1] * prizeY);
    a = a / det;
    b = b / det;

    // if positive and integer then only we can consider it
    if (a >= 0 && b >= 0 && Number.isInteger(a) && Number.isInteger(b)) {
      cost = a * 3 + b;
      console.log(
        `Solution for ${prizeX}, ${prizeY} is ${a}, ${b} with cost ${cost}`,
      );
    } else {
      console.log(`No solution for ${prizeX}, ${prizeY}, as a: ${a}, b: ${b}`);
    }

    totalCost += cost;
  }

  return totalCost;
}
console.log(solution(input));
// answer: 87596249540359
