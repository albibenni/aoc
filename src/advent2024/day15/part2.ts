/*
--- Part Two ---
The lanternfish use your information to find a safe moment to swim in and turn off the malfunctioning robot! Just as they start preparing a festival in your honor, reports start coming in that a second warehouse's robot is also malfunctioning.

This warehouse's layout is surprisingly similar to the one you just helped. There is one key difference: everything except the robot is twice as wide! The robot's list of movements doesn't change.

To get the wider warehouse's map, start with your original map and, for each tile, make the following changes:

If the tile is #, the new map contains ## instead.
If the tile is O, the new map contains [] instead.
If the tile is ., the new map contains .. instead.
If the tile is @, the new map contains @. instead.
This will produce a new warehouse map which is twice as wide and with wide boxes that are represented by []. (The robot does not change size.)

The larger example from before would now look like this:

####################
##....[]....[]..[]##
##............[]..##
##..[][]....[]..[]##
##....[]@.....[]..##
##[]##....[]......##
##[]....[]....[]..##
##..[][]..[]..[][]##
##........[]......##
####################
Because boxes are now twice as wide but the robot is still the same size and speed, boxes can be aligned such that they directly push two other boxes at once. For example, consider this situation:

#######
#...#.#
#.....#
#..OO@#
#..O..#
#.....#
#######

<vv<<^^<<^^
After appropriately resizing this map, the robot would push around these boxes as follows:

Initial state:
##############
##......##..##
##..........##
##....[][]@.##
##....[]....##
##..........##
##############

Move <:
##############
##......##..##
##..........##
##...[][]@..##
##....[]....##
##..........##
##############

Move v:
##############
##......##..##
##..........##
##...[][]...##
##....[].@..##
##..........##
##############

Move v:
##############
##......##..##
##..........##
##...[][]...##
##....[]....##
##.......@..##
##############

Move <:
##############
##......##..##
##..........##
##...[][]...##
##....[]....##
##......@...##
##############

Move <:
##############
##......##..##
##..........##
##...[][]...##
##....[]....##
##.....@....##
##############

Move ^:
##############
##......##..##
##...[][]...##
##....[]....##
##.....@....##
##..........##
##############

Move ^:
##############
##......##..##
##...[][]...##
##....[]....##
##.....@....##
##..........##
##############

Move <:
##############
##......##..##
##...[][]...##
##....[]....##
##....@.....##
##..........##
##############

Move <:
##############
##......##..##
##...[][]...##
##....[]....##
##...@......##
##..........##
##############

Move ^:
##############
##......##..##
##...[][]...##
##...@[]....##
##..........##
##..........##
##############

Move ^:
##############
##...[].##..##
##...@.[]...##
##....[]....##
##..........##
##..........##
##############
This warehouse also uses GPS to locate the boxes. For these larger boxes, distances are measured from the edge of the map to the closest edge of the box in question. So, the box shown below has a distance of 1 from the top edge of the map and 5 from the left edge of the map, resulting in a GPS coordinate of 100 * 1 + 5 = 105.

##########
##...[]...
##........
In the scaled-up version of the larger example from above, after the robot has finished all of its moves, the warehouse would look like this:

####################
##[].......[].[][]##
##[]...........[].##
##[]........[][][]##
##[]......[]....[]##
##..##......[]....##
##..[]............##
##..@......[].[][]##
##......[][]..[]..##
####################
The sum of these boxes' GPS coordinates is 9021.

Predict the motion of the robot and boxes in this new, scaled-up warehouse. What is the sum of all boxes' final GPS coordinates?
*/

//@ts-nocheck
import fs from "fs";

let [gridRaw, movements] = fs
  .readFileSync("./2024/day15/data.txt", "utf8")
  .trim()
  .split("\n\n");

movements = movements.replace(/\n/g, "").split("");

/**
 * Class for a 2D Bound
 * @param {number} x - x coordinate of the top left corner
 * @param {number} y - y coordinate of the top left corner
 * @param {number} width - width of the box
 * @param {number} height - height of the box
 */
class Bound2D {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width || 0;
    this.height = height || 0;
  }

  /**
   * Checks if this bound collides with another bound (strong overlap)
   * @param {Bound2D} bound
   * @returns
   */
  doesCollide(bound) {
    return (
      this.x < bound.x + bound.width &&
      this.x + this.width > bound.x &&
      this.y < bound.y + bound.height &&
      this.y + this.height > bound.y
    );
  }

  /**
   * Checks if this bound collides with another bound (weak overlap)
   * @param {Bound2D} bound
   * @returns
   */
  doesCollideWeak(bound) {
    return (
      this.x <= bound.x + bound.width &&
      this.x + this.width >= bound.x &&
      this.y <= bound.y + bound.height &&
      this.y + this.height >= bound.y
    );
  }
}

let grid = gridRaw.split("\n").map((row) => row.split(""));
let playerPos = { x: 0, y: 0 };

//look for the @
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] === "@") {
      playerPos = { x: j * 2, y: i, bound: new Bound2D(j, i, 1, 1) };
      break;
    }
  }
}

let boxes = [];
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] === "O") {
      boxes.push({
        x: x * 2,
        y,
        bound: new Bound2D(x * 2, y, 2, 1),
        id: boxes.length,
      });
    }
  }
}

let walls = [];
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] === "#") {
      walls.push({ x: x * 2, y, bound: new Bound2D(x * 2, y, 2, 1) });
    }
  }
}
//widthxheiht

//walls are 1x1
//boxes are 2x1
//player is 1x1

const directions = {
  "^": { x: 0, y: -1 },
  v: { x: 0, y: 1 },
  "<": { x: -1, y: 0 },
  ">": { x: 1, y: 0 },
};

for (const mov of movements) {
  const newPosition = {
    x: playerPos.x + directions[mov].x,
    y: playerPos.y + directions[mov].y,
    bound: new Bound2D(
      playerPos.x + directions[mov].x,
      playerPos.y + directions[mov].y,
      1,
      1,
    ),
  };

  //look for walls that collide
  let doesWallsCollide = false;
  for (const wall of walls) {
    if (wall.bound.doesCollide(newPosition.bound)) {
      doesWallsCollide = true;
      break;
    }
  }

  if (doesWallsCollide) {
    //console.log("wall collision");
    continue;
  }

  //look for boxes that collide
  let collidedBox = null;
  for (const box of boxes) {
    //console.log(box.bound, newPosition.bound);

    if (box.bound.doesCollide(newPosition.bound)) {
      collidedBox = box;
      break;
    }
  }

  let drafts = [];
  let finalized = [];

  let moveOK = true;

  //if there isn't a box, just move and continue
  if (!collidedBox) {
    playerPos = newPosition;
    //console.log("player moved");
    continue;
  }

  //if there is a box add to the draft
  drafts.push({
    x: collidedBox.x + directions[mov].x,
    y: collidedBox.y + directions[mov].y,
    bound: new Bound2D(
      collidedBox.x + directions[mov].x,
      collidedBox.y + directions[mov].y,
      2,
      1,
    ),
    id: collidedBox.id,
  });

  while (drafts.length > 0) {
    const draft = drafts.shift();

    //check if we collide into any wall
    let doesCollideWall = false;
    for (const wall of walls) {
      if (wall.bound.doesCollide(draft.bound)) {
        doesCollideWall = true;
        break;
      }
    }
    if (doesCollideWall) {
      moveOK = false;
      break;
    }

    //check if we collide into any box
    let collidingBoxes = [];
    for (const box of boxes) {
      if (box.bound.doesCollide(draft.bound) && box.id !== draft.id) {
        collidingBoxes.push(box);
      }
    }

    //if we collide into a box, add it to the drafts
    for (const box of collidingBoxes) {
      drafts.push({
        x: box.x + directions[mov].x,
        y: box.y + directions[mov].y,
        bound: new Bound2D(
          box.x + directions[mov].x,
          box.y + directions[mov].y,
          2,
          1,
        ),
        id: box.id,
      });
    }

    //finalize the move
    finalized.push(draft);
  }

  if (moveOK) {
    playerPos = newPosition;
    for (const final of finalized) {
      boxes[final.id] = final;
    }
  }

  //print();
}

let score = 0;
for (const box of boxes) {
  //console.log(box.bound);
  score += box.bound.y * 100 + box.bound.x;
}

console.log(score);

// solution 1486520
