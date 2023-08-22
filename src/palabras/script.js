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
              [0 , -1],          [0 , 1],
              [1 , -1], [1 , 0], [1 , 1]];

function searchTuple(list, t) {
  for (const tuple in list) {
    if (list[tuple][0] == t[0] && list[tuple][1] == t[1]) {
      return tuple; // Se encontró la tupla con elementos a y b
    }
  }
  return -1; // No se encontró la tupla con elementos a y b
}

function getWords(data) {
  let words = [];

  // Se itera para cada casilla de la grilla
  for (let start = 0; start < 16; start++) {
    let i = start >> 2, j = start % 4;

    // Casillas tiene la palabra que se va creando, y las casillas que la componen
    let casillas = [grid[i][j], [i, j]];

    let warm_start = false, way, k, l, last;
    while (true) {
      console.log(casillas);
      // warm_start significa continuar desde el valor guardado
      if (warm_start) {
        // Se analizaron todos los caminos, pasar a la siguiente casilla
        if (casillas.length < 2) {
          break;
        }
        last = casillas.pop();
        way = searchTuple(casillas, [casillas[casillas.length - 1][0] - last[0], casillas[casillas.length - 1][1] - last[1]])
        casillas[0] = casillas[0].slice(0, casillas[0].length - 1);
        warm_start = false;
      }
      else {
        way = 0;
      }
      while (way < 8) {
        k = i + ways[way][0];
        l = j + ways[way][1];
        if (k >= 0 && l >= 0 && k < 4 && l < 4 && searchTuple(casillas, [k, l]) < 0) {
          break;
        }
        else {
          way++;
        }
        // if (!check(casillas[0] + grid[i + ways[way][0], j + ways[way][1]])) {
        //   way++;
        // }
        // else {
        //   break;
        // }
        // checkear que se puedan construir palabras con las letras adyacentes
      }
      
      // Si ninguna casilla pudo continuar una palabra
      if (way == 8) {
        // Llamar a backtracking
        warm_start = true;
      }
      else {
        // if (casillas[0].length > 1 /*&& casillas[0] esta en data*/) {
        //   words += casillas[0];
        // }
        i = k;
        j = l;
        // console.log(k, l);
        casillas.push([k, l]);
        casillas[0] += grid[k][l];
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