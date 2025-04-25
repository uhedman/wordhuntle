export const showUsernameError = (username: string) => {
  if (username.length === 0) {
    return "Por favor, ingrese un nombre de usuario";
  } else if (username.length < 3 || username.length > 20) {
    return "El nombre de usuario debe tener entre 3 y 20 caracteres";
  } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return "El nombre de usuario solo puede contener letras, números y guiones bajos";
  } else {
    return "Error inesperado en el nombre de usuario";
  }
};

export const showPasswordError = (password: string, passwordsMatch = true) => {
  if (password.length === 0) {
    return "Por favor, ingrese una contraseña";
  } else if (password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres";
  }
  if (!passwordsMatch) {
    return "Las contraseñas deben coincidir";
  } else {
    return "Error inesperado en la contraseña";
  }
};
