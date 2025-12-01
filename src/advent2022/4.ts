import { readFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

function day4P1() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "4p.txt";
  const file = readFileSync(currDir, "utf8");

  const pairs = file.split("\n").filter((line) => line.trim() !== "");

  let fullyContains: number = 0;
  for (const pair of pairs) {
    const [left, right] = pair.split(",");

    const [left1, left2] = left!.split("-");
    const [right1, right2] = right!.split("-");
    if (
      parseInt(left1!) === parseInt(right1!) ||
      parseInt(right2!) === parseInt(left2!) ||
      parseInt(right1!) === parseInt(left2!) ||
      parseInt(right2!) === parseInt(left1!)
    ) {
      fullyContains++;
    } else if (parseInt(left1!) > parseInt(right1!)) {
      if (parseInt(right2!) > parseInt(left2!)) {
        fullyContains++;
      }
    } else {
      if (parseInt(right2!) < parseInt(left2!)) {
        fullyContains++;
      }
    }
  }
  return fullyContains;
}

console.log(day4P1());
function day4P2() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "4p.txt";
  const file = readFileSync(currDir, "utf8");

  const pairs = file.split("\n").filter((line) => line.trim() !== "");

  let overlaps: number = 0;
  for (const pair of pairs) {
    const [left, right] = pair.split(",");
    console.log(left, right);

    const [left1, left2] = left!.split("-");
    const [right1, right2] = right!.split("-");

    if (
      parseInt(left1!) === parseInt(right1!) ||
      parseInt(right2!) === parseInt(left2!) ||
      parseInt(right1!) === parseInt(left2!) ||
      parseInt(right2!) === parseInt(left1!)
    ) {
      console.log("equal", left1, right1, left2, right2);

      overlaps++;
    } else if (parseInt(left1!) > parseInt(right1!)) {
      if (parseInt(left1!) < parseInt(right2!)) {
        console.log("right: ", left1, right2);
        overlaps++;
      }
    } else {
      if (parseInt(right1!) < parseInt(left2!)) {
        console.log("left: ", right1, left2);

        overlaps++;
      }
    }
  }
  return overlaps;
}
console.log(day4P2());
