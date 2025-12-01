/*
--- Day 16: Reindeer Maze ---
It's time again for the Reindeer Olympics! This year, the big event is the Reindeer Maze, where the Reindeer compete for the lowest score.

You and The Historians arrive to search for the Chief right as the event is about to start. It wouldn't hurt to watch a little, right?

The Reindeer start on the Start Tile (marked S) facing East and need to reach the End Tile (marked E). They can move forward one tile at a time (increasing their score by 1 point), but never into a wall (#). They can also rotate clockwise or counterclockwise 90 degrees at a time (increasing their score by 1000 points).

To figure out the best place to sit, you start by grabbing a map (your puzzle input) from a nearby kiosk. For example:

###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############
There are many paths through this maze, but taking any of the best paths would incur a score of only 7036. This can be achieved by taking a total of 36 steps forward and turning 90 degrees a total of 7 times:


###############
#.......#....E#
#.#.###.#.###^#
#.....#.#...#^#
#.###.#####.#^#
#.#.#.......#^#
#.#.#####.###^#
#..>>>>>>>>v#^#
###^#.#####v#^#
#>>^#.....#v#^#
#^#.#.###.#v#^#
#^....#...#v#^#
#^###.#.#.#v#^#
#S..#.....#>>^#
###############
Here's a second example:

#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################
In this maze, the best paths cost 11048 points; following one such path would look like this:

#################
#...#...#...#..E#
#.#.#.#.#.#.#.#^#
#.#.#.#...#...#^#
#.#.#.#.###.#.#^#
#>>v#.#.#.....#^#
#^#v#.#.#.#####^#
#^#v..#.#.#>>>>^#
#^#v#####.#^###.#
#^#v#..>>>>^#...#
#^#v###^#####.###
#^#v#>>^#.....#.#
#^#v#^#####.###.#
#^#v#^........#.#
#^#v#^#########.#
#S#>>^..........#
#################
Note that the path shown above includes one 90 degree turn as the very first move, rotating the Reindeer from facing East to facing North.

Analyze your map carefully. What is the lowest score a Reindeer could possibly get?

*/
import fs from "fs";

const input = fs.readFileSync("./2024/day16/data.txt", "utf8").toString();

type Point = { x: number; y: number };

const DIRECTIONS: Point[] = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

export type MinHeapNode = {
  score: number;
  node: string;
};

/**
 * min heap implementation
 */
export class MinHeap {
  heap: MinHeapNode[];
  constructor() {
    this.heap = [];
  }

  /**
   * inserts an element and heapifies it until it is in the correct location
   */
  insert(element: MinHeapNode) {
    this.heap.push(element);
    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index]!.score >= this.heap[parentIndex]!.score) break;
      //@ts-ignore
      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index],
      ];
      index = parentIndex;
    }
  }

  /**
   * gets the smallest element, which is at the beginning, then heapifies
   */
  extractMin() {
    if (this.heap.length === 1) return this.heap.pop() as MinHeapNode;
    const min = this.heap[0];
    this.heap[0] = this.heap.pop() as MinHeapNode;
    let index = 0;

    // eslint-disable-next-line typescriptEslint/no-unnecessary-condition
    while (true) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let smallest = index;

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild]!.score < this.heap[smallest]!.score
      )
        smallest = leftChild;
      if (
        rightChild < this.heap.length &&
        this.heap[rightChild]!.score < this.heap[smallest]!.score
      )
        smallest = rightChild;
      if (smallest === index) break;
      //@ts-ignore
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }

    return min;
  }

  /**
   * return the size of the heap
   */
  size() {
    return this.heap.length;
  }
}

export const dijkstra = (
  graph: { [key: string]: { [key: string]: number } },
  start: Point,
  directionless: boolean,
): { [key: string]: number } => {
  const queue = new MinHeap();
  const distances: { [key: string]: number } = {};

  let startingKey = `${start.x},${start.y},0`;
  if (directionless) startingKey = `${start.x},${start.y}`;

  queue.insert({ score: 0, node: startingKey });
  distances[startingKey] = 0;

  while (queue.size() != 0) {
    const current = queue.extractMin() as MinHeapNode;

    if (distances[current.node]! < current.score) continue;

    if (graph[current.node] === undefined) continue;

    Object.entries(graph[current.node]!).forEach(([next, weight]) => {
      const newScore = current.score + weight;
      if (distances[next] === undefined || distances[next] > newScore) {
        distances[next] = newScore;
        queue.insert({ score: newScore, node: next });
      }
    });
  }

  return distances;
};

export const parseGrid = (grid: string[]) => {
  const width = grid[0]!.length,
    height = grid.length;

  // construct a graph to make dijkstra search easier
  let start = { x: 0, y: 0 };
  let end = { x: 0, y: 0 };
  const forward: { [key: string]: { [key: string]: number } } = {};
  const reverse: { [key: string]: { [key: string]: number } } = {};
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y]![x] === "S") start = { x, y };
      if (grid[y]![x] === "E") end = { x, y };

      if (grid[y]![x] !== "#") {
        DIRECTIONS.forEach((direction, i) => {
          const position = { x: x + direction.x, y: y + direction.y };

          const key = `${x},${y},${i}`;
          const moveKey = `${position.x},${position.y},${i}`;

          if (
            position.x >= 0 &&
            position.x < width &&
            position.y >= 0 &&
            position.y < height &&
            grid[position.y]![position.x] !== "#"
          ) {
            if (forward[key] === undefined) forward[key] = {};
            if (reverse[moveKey] === undefined) reverse[moveKey] = {};

            forward[key][moveKey] = 1;
            reverse[moveKey][key] = 1;
          }

          for (const rotateKey of [
            `${x},${y},${(i + 3) % 4}`,
            `${x},${y},${(i + 1) % 4}`,
          ]) {
            if (forward[key] === undefined) forward[key] = {};
            if (reverse[rotateKey] === undefined) reverse[rotateKey] = {};

            forward[key][rotateKey] = 1000;
            reverse[rotateKey][key] = 1000;
          }
        });
      }
    }
  }

  DIRECTIONS.forEach((_, i) => {
    const key = `${end.x},${end.y}`;
    const rotateKey = `${end.x},${end.y},${i}`;

    if (forward[rotateKey] === undefined) forward[rotateKey] = {};
    if (reverse[key] === undefined) reverse[key] = {};

    forward[rotateKey][key] = 0;
    reverse[key][rotateKey] = 0;
  });

  return { start, end, forward, reverse };
};

/**
 * the code of part 1 of the puzzle
 */
const solution = (input: string) => {
  const grid = input.split("\n");
  const { start, end, forward } = parseGrid(grid);

  const distances = dijkstra(forward, start, false);
  return distances[`${end.x},${end.y}`];
};

console.log(solution(input));
