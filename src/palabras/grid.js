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
  let secretWord = data[hash(day) % data.length];
  let grid = [['','','',''],['','','',''],['','','',''],['','','','']];
  
  return grid;
}

export {getGrid}