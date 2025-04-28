export const validateAuthInput = (
  username: unknown,
  password: unknown
): string | null => {
  if (!username || !password) {
    return "Faltan datos";
  }

  if (typeof username !== "string" || typeof password !== "string") {
    return "Formato inválido";
  }

  if (username.length < 3 || username.length > 20) {
    return "El nombre de usuario debe tener entre 3 y 20 caracteres";
  }

  if (password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres";
  }

  if (!/^[a-zA-Z0-9_\s]+$/.test(username)) {
    return "El nombre de usuario solo puede contener letras, números y guiones bajos";
  }

  return null;
};
