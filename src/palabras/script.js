const fs = require('fs');  // Requiere el módulo de sistema de archivos
const { get } = require('http');

const archivo = 'data.txt';  // Nombre del archivo diccionario

const grid = [['a', 'b', 'c', 'd'],
              ['h', 'e', 'j', 'e'],
              ['i', 'o', 'a', 'f'],
              ['p', 'o', 'n', 'g']]
// Palabras escondidas: ABEJA, ABEJON, HIPO, DEJAN, EJE, ...

// Direcciones a las casillas adyacentes
const ways = [[-1, -1], [-1, 0], [-1, 1],
              [0 , -1],          [0 , 1],
              [1 , -1], [1 , 0], [1 , 1]];

function searchTuple(list, t) {
  for (let index = 0; index < list.length; index++) {
    if (list[index][0] == t[0] && list[index][1] == t[1]) {
      return index; // Se encontró la tupla con elementos a y b
    }
  }
  return -1; // No se encontró la tupla con elementos a y b
}

function searchPrefix(words, prefix) {
  for (const word of words) {
    if (word.startsWith(prefix)) {
      return true; // Se encontró una palabra con el prefijo
    } else if (word > prefix) {
      return false; // Ya pasamos de las palabras que podrían tener el prefijo
    }
  }
  return false; // No se encontró ninguna palabra con el prefijo
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
      // console.log(casillas);
      // warm_start significa continuar desde el valor guardado
      if (warm_start) {
        // Se analizaron todos los caminos, pasar a la siguiente casilla
        if (casillas.length < 3) {
          break;
        }
        last = casillas.pop();
        i = casillas[casillas.length - 1][0];
        j = casillas[casillas.length - 1][1];
        way = searchTuple(ways, [last[0] - i, last[1] - j]) + 1;
        // console.log(way);
        casillas[0] = casillas[0].slice(0, casillas[0].length - 1);
        warm_start = false;
      }
      else {
        way = 0;
      }
      for (; way < 8; way++) {
        k = i + ways[way][0];
        l = j + ways[way][1];
        // Casilla fuera de la matriz
        if (k < 0 || l < 0 || k > 3 || l > 3) {
          continue;
        }
        // Casilla ya elegida
        if (searchTuple(casillas, [k, l]) >= 0) {
          continue;
        }
        // No existen palabras con ese prefijo
        if (!searchPrefix(data, casillas[0] + grid[k][l])) {
          // console.log(casillas[0] + grid[k][l]);
          continue;
        }
        break;
        // checkear que se puedan construir palabras con las letras adyacentes
      }
      
      // Si ninguna casilla pudo continuar una palabra
      if (way == 8) {
        // Llamar a backtracking
        warm_start = true;
      }
      else {
        i = k;
        j = l;
        // console.log(k, l);
        casillas.push([k, l]);
        casillas[0] += grid[k][l];

        if (casillas[0].length > 1 && data.indexOf(casillas[0]) >= 0) {
          words.push(casillas[0]);
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
  console.log(getWords(lineas));
});