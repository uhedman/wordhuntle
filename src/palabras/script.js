const fs = require('fs');  // Requiere el módulo de sistema de archivos

const archivo = 'diccionario.txt';  // Nombre del archivo diccionario

const grid = [['A', 'B', 'C', 'D'],
              ['H', 'E', 'J', 'E'],
              ['I', 'O', 'A', 'F'],
              ['P', 'O', 'N', 'G']]
// Palabras escondidas: ABEJA, ABEJON, HIPO, DEJAN, EJE, ...

// Lee el contenido del diccionario
fs.readFile(archivo, 'utf-8', (error, data) => {
  if (error) {
    console.error('Error al leer el archivo:', error);
    return;
  }

  lineas = data.split('\n');  // Guardamos las palabras en un arreglo
});