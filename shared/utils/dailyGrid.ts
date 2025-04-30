import { data } from "../data/words8";
import { Grid, Pos } from "../types";

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const hash = (number: number) => {
  number = ((number >> 16) ^ number) * 0x45d9f3b;
  number = ((number >> 16) ^ number) * 0x45d9f3b;
  number = (number >> 16) ^ number;
  return number;
};

const getEmptyNeighbours = (grid: Grid, [x, y]: Pos) =>
  directions
    .map(([dx, dy]) => [x + dx, y + dy] as Pos)
    .filter(
      ([nx, ny]) =>
        nx >= 0 && nx < 4 && ny >= 0 && ny < 4 && grid[nx][ny] === ""
    );

export const getSecretWord = (dayCode: number) => {
  const seed = hash(dayCode);
  return data[seed % data.length];
};

export const getGrid = (dayCode: number) => {
  let seed = hash(dayCode);

  // Pseudo Random Number Generator
  const prng = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed;
  };

  // Pseudo Random Number Generator Element get
  const prngElement = <T>(array: T[]): T => {
    let index = prng() % array.length;
    let removedElement = array.splice(index, 1)[0];

    return removedElement;
  };

  let secretWord = getSecretWord(dayCode);
  let grid: Grid = [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ];

  let backtrackCandidatesHistory: Pos[][] = [];
  let [currentX, currentY] = [prng() % 4, prng() % 4];
  grid[currentX][currentY] = secretWord[0];
  let path: Pos[] = [[currentX, currentY]];
  let backtrack = false;

  // Place secret word
  for (let i = 1; i < secretWord.length; ) {
    let candidates: Pos[] = backtrack
      ? backtrackCandidatesHistory.pop()!
      : getEmptyNeighbours(grid, [currentX, currentY]);

    if (candidates.length === 0) {
      backtrack = true;
      i--;
      grid[currentX][currentY] = "";
      [currentX, currentY] = path.pop()!;
    } else {
      [currentX, currentY] = prngElement(candidates);
      backtrackCandidatesHistory.push(candidates);
      path.push([currentX, currentY]);
      grid[currentX][currentY] = secretWord[i];
      backtrack = false;
      i++;
    }
  }

  // Fill the remaining grid cells with random letters
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "") {
        // Generate a random letter using PRNG
        let randomCharCode = prng();
        let randomLetter = String.fromCharCode(97 + (randomCharCode % 26));
        grid[i][j] = randomLetter;
      }
    }
  }

  return grid;
};
