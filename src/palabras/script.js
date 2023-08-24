const fs = require('fs');

// Nombre del archivo diccionario
const archivo = 'data-sin-enie.txt';

const grid = [['a', 'b', 'c', 'd'],
              ['h', 'e', 'j', 'e'],
              ['i', 'o', 'a', 'f'],
              ['p', 'o', 'n', 'g']]

// Direcciones a las casillas adyacentes
const ways = [[-1, -1], [-1, 0], [-1, 1],
              [0 , -1],          [0 , 1],
              [1 , -1], [1 , 0], [1 , 1]];

// Buscar una tupla en una lista
function searchTuple(list, t) {
  for (let index = 0; index < list.length; index++) {
    if (list[index][0] == t[0] && list[index][1] == t[1]) {
      return index;
    }
  }
  return -1;
}

// Buscar una palabra que contenga un prefijo
// usando busqueda binaria
function searchPrefix(words, prefix) {
  let a = 0, b = words.length - 1, c;
  while (a <= b) {
    c = Math.floor((a + b) / 2);
    if (words[c].startsWith(prefix)) {
      return true;
    } else if (words[c] > prefix) {
      b = c-1;
    } else {
      a = c+1;
    }
  }
  return false; 
}

// Buscar una palabra usando busqueda binaria
function searchWord(words, w) {
  let a = 0, b = words.length - 1, c;
  while (a <= b) {
    c = Math.floor((a + b) / 2);
    if (words[c] == w) {
      return true;
    } else if (words[c] > w) {
      b = c-1;
    } else {
      a = c+1;
    }
  }
  return false;
}

// Busca las palabras que pertenecen a data
// y estan escondidas en la grilla
function getWords(data) {
  let words = [];

  // Se itera para cada casilla de la grilla
  for (let start = 0; start < 16; start++) {
    let i = start >> 2, j = start % 4;

    // Casillas tiene la palabra que se va creando, y las casillas que la componen
    let casillas = [grid[i][j], [i, j]];

    let warm_start = false, way, k, l, last;
    while (true) {
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
          continue;
        }
        break;
      }
      
      // Si ninguna casilla pudo continuar una palabra
      if (way == 8) {
        // Llamar a backtracking
        warm_start = true;
      } else {
        i = k;
        j = l;
        casillas.push([k, l]);
        casillas[0] += grid[k][l];

        if (casillas[0].length > 3 && // Palabra suficientemente larga
            searchWord(data, casillas[0]) && // Presente en el diccionario
            words.indexOf(casillas[0]) < 0) { // Todavia no se guardo
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