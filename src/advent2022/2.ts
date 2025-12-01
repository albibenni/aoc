import { readFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

function solveP1() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "2p.txt";
  const file = readFileSync(currDir, "utf8");
  const rounds = file.trim().split("\n");
  const mapKeyForDraw: Map<string, string> = new Map<string, string>()
    .set("A", "X")
    .set("B", "Y")
    .set("C", "Z");

  const mapKeyForWin: Map<string, string> = new Map<string, string>()
    .set("A", "Y")
    .set("B", "Z")
    .set("C", "X");

  const scores: Map<string, number> = new Map<string, number>()
    .set("X", 1)
    .set("Y", 2)
    .set("Z", 3);
  let total = 0;

  for (const round of rounds) {
    const [move1, move2] = round.split(" ");
    if (mapKeyForDraw.get(move1!) === move2) {
      total += 3;
    } else if (mapKeyForWin.get(move1!) === move2) {
      total += 6;
    }
    const moveScore = scores.get(move2!)!;
    total += moveScore;
  }
  console.log(total);
}

// solveP1();

function solveP2() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "2p.txt";
  const file = readFileSync(currDir, "utf8");
  const rounds = file.trim().split("\n");
  const mapKeyForDraw: Map<string, string> = new Map<string, string>()
    .set("A", "A")
    .set("B", "B")
    .set("C", "C");
  const mapKeyForWin: Map<string, string> = new Map<string, string>()
    .set("A", "B")
    .set("B", "C")
    .set("C", "A");
  const mapKeyForLoss: Map<string, string> = new Map<string, string>()
    .set("A", "C")
    .set("B", "A")
    .set("C", "B");
  const scores: Map<string, number> = new Map<string, number>()
    .set("A", 1)
    .set("B", 2)
    .set("C", 3);

  let total = 0;

  for (const round of rounds) {
    const [move1, howRoundEnds] = round.split(" ");
    if (howRoundEnds === "X") {
      total += scores.get(mapKeyForLoss.get(move1!)!)!;
    } else if (howRoundEnds === "Y") {
      total += scores.get(mapKeyForDraw.get(move1!)!)! + 3;
    } else {
      total += scores.get(mapKeyForWin.get(move1!)!)! + 6;
    }
  }
  console.log(total);
}

solveP2();

function solveP2Litteral() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "2p.txt";
  const file = readFileSync(currDir, "utf8");
  const rounds = file.trim().split("\n");

  // Rock=A=1, Paper=B=2, Scissors=C=3
  const shapeScore: Record<string, number> = { A: 1, B: 2, C: 3 };

  // What shape to play for each outcome
  const winMove: Record<string, string> = { A: "B", B: "C", C: "A" };
  const loseMove: Record<string, string> = { A: "C", B: "A", C: "B" };

  let total = 0;

  for (const round of rounds) {
    const [opponent, outcome] = round.split(" ");

    if (outcome === "X") {
      total += shapeScore[loseMove[opponent!]!]!;
    } else if (outcome === "Y") {
      total += shapeScore[opponent!]! + 3;
    } else {
      total += shapeScore[winMove[opponent!]!]! + 6;
    }
  }

  console.log(total);
}

function solveP2Optimized() {
  const currDir = dirname(fileURLToPath(import.meta.url)) + "/data/" + "2p.txt";
  const file = readFileSync(currDir, "utf8");
  const rounds = file.trim().split("\n");

  let total = 0;

  for (const round of rounds) {
    const opponent = round.charCodeAt(0) - 65; // A=0, B=1, C=2
    const outcome = round.charCodeAt(2) - 88; // X=0, Y=1, Z=2

    // pattern would be -> shape = (opponent + outcome - 1) % 3
    // avoid negative module with +3
    const shape = (opponent + outcome - 1 + 3) % 3;

    total += shape + 1 + outcome * 3;
  }

  console.log(total);
}

solveP2();
