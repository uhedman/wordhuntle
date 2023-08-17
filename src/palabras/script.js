const fs = require('fs');  // Requiere el módulo de sistema de archivos

const archivo = 'diccionario.txt';  // Nombre del archivo diccionario

// Lee el contenido del diccionario
fs.readFile(archivo, 'utf-8', (error, data) => {
  if (error) {
    console.error('Error al leer el archivo:', error);
    return;
  }

  lineas = data.split('\n');  // Guardamos las palabras en un arreglo
});