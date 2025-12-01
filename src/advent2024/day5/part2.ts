/*
--- Part Two ---
While the Elves get to work printing the correctly-ordered updates, you have a little time to fix the rest of them.

For each of the incorrectly-ordered updates, use the page ordering rules to put the page numbers in the right order. For the above example, here are the three incorrectly-ordered updates and their correct orderings:

75,97,47,61,53 becomes 97,75,47,61,53.
61,13,29 becomes 61,29,13.
97,13,75,29,47 becomes 97,75,47,29,13.
After taking only the incorrectly-ordered updates and ordering them correctly, their middle page numbers are 47, 29, and 47. Adding these together produces 123.

Find the updates which are not in the correct order. What do you get if you add up the middle page numbers after correctly ordering just those updates?
*/
//@ts-nocheck
import fs from "fs";

function solution(input: string[]) {
  const index = input.indexOf("");

  const rules = input.slice(0, index).map((s) => s.split("|").map(Number));
  const pageNumbs = input.slice(index + 1).map((s) => s.split(",").map(Number));

  return [rules, pageNumbs];
}
export function solution(input: string[]) {
  const [rules, pages] = divider(input);
  const sorter = makeSorter(rules);

  return pages
    .map((update) => {
      const sorted = update.toSorted(sorter);
      return compare(update, sorted) ? [] : sorted;
    })
    .filter((update) => update.length)
    .reduce(sumMidElement, 0);
}

function compare(a: number[], b: number[]) {
  return a.length === b.length && a.every((val, index) => val === b[index]);
}

function sumMidElement(array: number[], sum: number) {
  return array[Math.floor(array.length / 2)] + sum;
}

function makeSorter(rules: number[][]) {
  return function (a: number, b: number) {
    if (rules.find((rule) => compare(rule, [a, b]))) return -1;
    if (rules.find((rule) => compare(rule, [b, a]))) return 1;
    return 0;
  };
}

const input = fs
  .readFileSync("./src/day5/data.txt", "utf8")
  .toString()
  .split("\n");

console.log(solution(input));
//4077
