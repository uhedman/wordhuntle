import data from './data8.js';

// Direcciones a las casillas adyacentes
const ways = [[-1, -1], [-1, 0], [-1, 1],
							[0 , -1],          [0 , 1],
							[1 , -1], [1 , 0], [1 , 1]];

function hash(number) {
  number = ((number >> 16) ^ number) * 0x45d9f3b;
  number = ((number >> 16) ^ number) * 0x45d9f3b;
  number = (number >> 16) ^ number;
  return number;
}

function getGrid(day) {
  let seed = hash(day);
  // Pseudo Random Number Generator
  function prng() {
    // Simple PRNG implementation
    seed = (seed * 9301 + 49297) % 233280;
    return seed;
  }

  let secretWord = data[seed % data.length];
  let grid = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']];

  let backtrackWays = [];
  let [currentX, currentY] = [prng() % 4, prng() % 4];
  let usedPositions = [[currentX, currentY]];
  let backtrack = false;

  for (let i = 1; i < secretWord.length; ) {
    let possibleSquares = [];
    for (let i = 0; i < 8; i++) {
      let [squareX, squareY] = [ways[i][0] + currentX, ways[i][1] + currentY];
      if (!(squareX < 0 || squareX > 3 || squareY < 0 || squareY > 3 || grid[squareX][squareY] !== ''))
        possibleSquares.push([squareX, squareY]);
    }

    if (possibleSquares.length === 0) {
      backtrack = true;
      i--;
      grid[currentX][currentY] = '';
      [currentX, currentY] = usedPositions.pop();
      continue;
    }

    [currentX, currentY] = possibleSquares.shift();
    usedPositions.push([currentX, currentY]);
    grid[currentX][currentY] = secretWord[i];
    backtrack = false;
    i++;
  }

  // Fill the remaining grid cells with random letters
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '') {
        // Generate a random letter using PRNG
        let randomCharCode = prng();
        let randomLetter = String.fromCharCode(97 + randomCharCode % 26);
        grid[i][j] = randomLetter;
      }
    }
  }

  return grid;
}

export {getGrid}