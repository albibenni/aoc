/*
--- Part Two ---
Fortunately, the Elves are trying to order so much fence that they qualify for a bulk discount!

Under the bulk discount, instead of using the perimeter to calculate the price, you need to use the number of sides each region has. Each straight section of fence counts as a side, regardless of how long it is.

Consider this example again:

AAAA
BBCD
BBCC
EEEC
The region containing type A plants has 4 sides, as does each of the regions containing plants of type B, D, and E. However, the more complex region containing the plants of type C has 8 sides!

Using the new method of calculating the per-region price by multiplying the region's area by its number of sides, regions A through E have prices 16, 16, 32, 4, and 12, respectively, for a total price of 80.

The second example above (full of type X and O plants) would have a total price of 436.

Here's a map that includes an E-shaped region full of type E plants:

EEEEE
EXXXX
EEEEE
EXXXX
EEEEE
The E-shaped region has an area of 17 and 12 sides for a price of 204. Including the two regions full of type X plants, this map has a total price of 236.

This map has a total price of 368:

AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA
It includes two regions full of type B plants (each with 4 sides) and a single region full of type A plants (with 4 sides on the outside and 8 more sides on the inside, a total of 12 sides). Be especially careful when counting the fence around regions like the one full of type A plants; in particular, each section of fence has an in-side and an out-side, so the fence does not connect across the middle of the region (where the two B regions touch diagonally). (The Elves would have used the Möbius Fencing Company instead, but their contract terms were too one-sided.)

The larger example from before now has the following updated prices:

A region of R plants with price 12 * 10 = 120.
A region of I plants with price 4 * 4 = 16.
A region of C plants with price 14 * 22 = 308.
A region of F plants with price 10 * 12 = 120.
A region of V plants with price 13 * 10 = 130.
A region of J plants with price 11 * 12 = 132.
A region of C plants with price 1 * 4 = 4.
A region of E plants with price 13 * 8 = 104.
A region of I plants with price 14 * 16 = 224.
A region of M plants with price 5 * 6 = 30.
A region of S plants with price 3 * 6 = 18.
Adding these together produces its new total price of 1206.

What is the new total price of fencing all regions on your map?
*/
//@ts-nocheck
import fs from "fs";

const input = fs
  .readFileSync("./src/day12/dummy.txt", "utf8")
  .toString()
  .trim()
  .split("\n");

function solution(input: string[]) {
  let ret1 = 0;
  let ret2 = 0;
  let visited: { [key: string]: boolean } = {};

  for (let y = 0; y < input.length; y++) {
    const length = input[0]!.length;
    for (let x = 0; x < length; x++) {
      if (visited[`${y},${x}`]) continue;
      let ch = input[y]![x];
      let area = 0;
      let wall: { [key: string]: number[] } = {};
      let perm = 0;
      let nav = (y: number, x: number, py: number, px: number) => {
        if (y < 0 || y >= input.length || input[y]![x] != ch) {
          if (x == px) {
            if (!wall[["y", y, py]]) wall[["y", y, py]] = [];
            wall[["y", y, py]].push(x);
          } else {
            if (!wall[["x", x, px]]) wall[["x", x, px]] = [];
            wall[["x", x, px]].push(y);
          }
          perm++;
          return;
        }
        if (visited[`${y},${x}`]) return;
        area++;
        visited[`${y},${x}`] = true;
        nav(y - 1, x, y, x);
        nav(y + 1, x, y, x);
        nav(y, x - 1, y, x);
        nav(y, x + 1, y, x);
      };
      nav(y, x);
      let walls = 0;
      for (let k in wall) {
        let v = wall[k];
        v.sort((a: number, b: number) => a - b);
        let prev = -999;
        for (let n of v) {
          if (n > prev + 1) walls++;
          prev = n;
        }
      }
      //console.log(ch,area,wall,walls)
      ret1 += area * perm;
      ret2 += area * walls;
    }
  }

  return [ret1, ret2];
}
console.log(solution(input));
// 1485656 - 899196
