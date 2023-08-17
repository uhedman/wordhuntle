const fs = require('fs');  // Requiere el módulo de sistema de archivos
const { get } = require('http');

const archivo = 'diccionario.txt';  // Nombre del archivo diccionario

const grid = [['A', 'B', 'C', 'D'],
              ['H', 'E', 'J', 'E'],
              ['I', 'O', 'A', 'F'],
              ['P', 'O', 'N', 'G']]
// Palabras escondidas: ABEJA, ABEJON, HIPO, DEJAN, EJE, ...

// Direcciones a las casillas adyacentes
const ways = [[-1, -1], [-1, 0], [-1, 1],
              [0 , -1],        , [0 , 1],
              [1 , -1], [1 , 0], [1 , 1]]

function getWords(data) {
  let words = [];

  // Se itera para cada casilla de la grilla
  for (let start = 0; start < 16; start++) {
    let i = start >> 2, j = start % 4;

    // Casillas tiene la palabra que se va creando, y las casillas que la componen
    let casillas = [grid[i][j], [i, j]];
    console.log(casillas);

    let warm_start = false, way = 0;
    while ( ) {
      // warm_start significa continuar desde el valor guardado
      if (warm_start) {
        way = casillas.pop();
        casillas[0] = casillas[0].slice(0, casillas[0].length - 1);
        warm_start = false;
      }
      else {
        start = 0;
      }
      for (; way < 9; way++) {
        // checkear que se puedan construir palabras con las letras adyacentes
      }
      
      // Si ninguna casilla pudo continuar una palabra
      if (way == 9) {
        // Llamar a backtracking
        warm_start = true;
      }
      else {
        if (casillas[0].length > 1 /*&& casillas[0] esta en data*/) {
          words += casillas[0];
        }
      }
    }
  }
  return words;
}

// Lee el contenido del diccionario
fs.readFile(archivo, 'utf-8', (error, data) => {
  if (error) {
    console.error('Error al leer el archivo:', error);
    return;
  }

  lineas = data.split('\n');  // Guardamos las palabras en un arreglo
  getWords(data);
});