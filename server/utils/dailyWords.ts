import { data } from "../data/words";
import { Grid, Pos } from "../types";

const directions: Pos[] = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const searchTuple = (list: [number, number][], t: [number, number]) => {
  for (let index = 0; index < list.length; index++) {
    if (list[index][0] === t[0] && list[index][1] === t[1]) {
      return index;
    }
  }
  return -1;
};

// Search a word with a prefix using binary search
const searchPrefix = (words: string[], prefix: string) => {
  let a = 0,
    b = words.length - 1,
    c;
  while (a <= b) {
    c = Math.floor((a + b) / 2);
    if (words[c].startsWith(prefix)) {
      return true;
    } else if (words[c] > prefix) {
      b = c - 1;
    } else {
      a = c + 1;
    }
  }
  return false;
};

// Binary search
const searchWord = (words: string[], w: string) => {
  let a = 0,
    b = words.length - 1,
    c;
  while (a <= b) {
    c = Math.floor((a + b) / 2);
    if (words[c] === w) {
      return true;
    } else if (words[c] > w) {
      b = c - 1;
    } else {
      a = c + 1;
    }
  }
  return false;
};

// Get secret words from grid
export const getWords = (grid: Grid) => {
  let words: string[] = [];

  for (let start = 0; start < 16; start++) {
    let i = start >> 2;
    let j = start % 4;

    const casillas: { word: string; path: Pos[] } = {
      word: grid[i][j],
      path: [[i, j]],
    };

    let warm_start = false;
    let dirIdx: number;
    let k: number;
    let l: number;
    let last: Pos;
    while (true) {
      // warm_start significa continuar desde el valor guardado
      if (warm_start) {
        // All paths checked
        if (casillas.path.length < 2) {
          break;
        }

        last = casillas.path.pop()!;
        i = casillas.path[casillas.path.length - 1][0];
        j = casillas.path[casillas.path.length - 1][1];
        dirIdx = searchTuple(directions, [last[0] - i, last[1] - j]) + 1;
        casillas.word = casillas.word.slice(0, casillas.word.length - 1);
        warm_start = false;
      } else {
        dirIdx = 0;
      }

      for (; dirIdx < 8; dirIdx++) {
        k = i + directions[dirIdx][0];
        l = j + directions[dirIdx][1];

        if (k < 0 || l < 0 || k > 3 || l > 3) {
          continue; // Outside of grid
        }
        // Already in path
        if (searchTuple(casillas.path, [k, l]) >= 0) {
          continue;
        }
        // No words with this prefix
        if (!searchPrefix(data, casillas.word + grid[k][l])) {
          continue;
        }
        break;
      }

      if (dirIdx === 8) {
        // Backtrack
        warm_start = true;
      } else {
        i = k!;
        j = l!;
        casillas.path.push([k!, l!]);
        casillas.word += grid[k!][l!];

        if (
          casillas.word.length > 3 && // Long enough
          searchWord(data, casillas.word) && // On dictionary
          !words.includes(casillas.word) // New
        ) {
          words.push(casillas.word);
        }
      }
    }
  }

  return words;
};
