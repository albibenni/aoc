/*--- Part Two ---
The engineers are surprised by the low number of safe reports until they realize they forgot to tell you about the Problem Dampener.

The Problem Dampener is a reactor-mounted module that lets the reactor safety systems tolerate a single bad level in what would otherwise be a safe report. It's like the bad level never happened!

Now, the same rules apply as before, except if removing a single level from an unsafe report would make it safe, the report instead counts as safe.

More of the above example's reports are now safe:

7 6 4 2 1: Safe without removing any level.
1 2 7 8 9: Unsafe regardless of which level is removed.
9 7 6 2 1: Unsafe regardless of which level is removed.
1 3 2 4 5: Safe by removing the second level, 3.
8 6 4 4 1: Safe by removing the third level, 4.
1 3 6 7 9: Safe without removing any level.
Thanks to the Problem Dampener, 4 reports are actually safe!

Update your analysis by handling situations where the Problem Dampener can remove a single level from unsafe reports. How many reports are now safe?
*/
//@ts-nocheck
import fs from "fs";

function solution(input: string) {
  const reports = input.split("\n");
  const reportMatrix = reports.map((report) =>
    report.split(" ").map((level) => parseInt(level)),
  );
  let safeNumb = 0;

  const safeReports: number[][] = [];

  for (let y = 0; y < reportMatrix.length; y++) {
    const report = reportMatrix[y];
    let safe = true;
    let swapUsed = false;
    const increasing = areIncreasing(report);
    console.log(increasing);

    for (let i = 0; i < report.length - 1; i++) {
      const res = cases(report[i + 1], report[i], increasing);
      if (res) {
        continue;
      } else if (!swapUsed) {
        console.log("swap used");

        if (tryAgain(report, i, increasing)) {
          swapUsed = true;
          i++;
        } else {
          console.log("not safe");

          safe = false;
          break;
        }
      } else {
        safe = false;
        break;
      }
    }
    if (safe) {
      console.log(report);
      safeReports.push(report);
      safeNumb++;
    }
  }
  console.log(safeNumb);
  //console.log(safeReports);
}

function tryAgain(report: number[], i: number, increasing: boolean) {
  if (i + 2 >= report.length) {
    return true;
  }
  const canCheckBefore = i - 1 >= 0;
  const current = report[i];
  const next = report[i + 1];
  const prev = report[i - 1];
  const nextNext = report[i + 2];
  if (canCheckBefore && cases(next, prev, increasing)) {
    return true;
  } else cases(nextNext, current, increasing);
}

function areIncreasing(report: number[]) {
  const isIncreasingFirst = report[0] < report[1];
  const isIncreasingSecond = report[1] < report[2];
  const isIncreasingFirstAndThird = report[0] < report[2];

  if (isIncreasingFirst === isIncreasingSecond) {
    return isIncreasingFirst;
  }
  if (isIncreasingFirst === isIncreasingFirstAndThird) {
    return isIncreasingFirst;
  }
  if (isIncreasingSecond === isIncreasingFirstAndThird) {
    return isIncreasingSecond;
  }
}

//solution(input);
//343

function solution2(input: string) {
  const reports = input.split("\n");
  const reportMatrix = reports.map((report) =>
    report.split(" ").map((level) => parseInt(level)),
  );
  let safeNumb = 0;
  const safeReports: number[][] = [];
  for (let y = 0; y < reportMatrix.length; y++) {
    const report = reportMatrix[y];
    const result = isSafe(report);
    if (result.safe) {
      safeNumb++;
      safeReports.push(report);
    } else {
      if (result.position === report.length - 2) {
        safeNumb++;
        safeReports.push(report);
      } else {
        const newReport1 = [];
        report?.forEach((level, index) => {
          if (index !== result.position) {
            newReport1.push(level);
          }
        });

        if (isSafe(newReport1).safe) {
          safeNumb++;
          safeReports.push(report);
        } else {
          const newReport2 = [];
          report?.forEach((level, index) => {
            if (index !== result.position) {
              newReport2.push(level);
            }
          });
          newReport2.splice(result.position + 1, 1);
          if (isSafe(newReport2).safe) {
            safeNumb++;
            safeReports.push(report);
          }
        }
      }
    }
  }
  console.log(safeNumb);
  console.log(safeReports);
}

function isSafe(report: number[]): { safe: boolean; position: number } {
  const increasing = report[0] < report[1];
  let safe = true;
  let position = 0;
  //@ts-ignore
  for (let i = 0; i < report.length - 1; i++) {
    //@ts-ignore
    const res = cases(report[i + 1], report[i], increasing);
    if (res) {
      continue;
    } else {
      safe = false;
      position = i;
      break;
    }
  }
  return { safe, position };
}

function cases(num1: number, num2: number, increasing: boolean) {
  const diff = num1 - num2;

  if (diff === 0) {
    return false;
  }
  if (Math.abs(diff) > 3) {
    return false;
  }
  if (increasing !== diff > 0) {
    return false;
  }
  return true;
}

const input = fs.readFileSync("./src/day2/data.txt", "utf8");
solution2(input);
