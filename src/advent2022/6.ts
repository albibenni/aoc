import fs from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

async function day6p1() {
  const currDir = dirname(fileURLToPath(import.meta.url));
  const file = fs.readFile(currDir + "/data/6p.txt", "utf8");
  console.log(await file);
  const stream = (await file).trim();
  const queue: string[] = [...stream.slice(0, 4)]; // max length 4;
  for (let i = 4; i < stream.length; i++) {
    if (queue.length == 4) {
      const set = new Set(queue);

      if (set.size === queue.length) {
        return i;
      } else {
        queue.shift();
        queue.push(stream[i]!);
      }
    } else {
      queue.push(stream[i]!);
      if (queue.length == 4) {
        const set = new Set(queue);
        if (set.size === stream.length) {
          return i;
        }
      }
    }
  }
}

const res = await day6p1();
console.log(res);
