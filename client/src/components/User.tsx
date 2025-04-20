import { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { loginUser, logoutUser, registerUser } from "@/store/slices/userSlice";

const User = () => {
  const { user, error, loading } = useAppSelector((state) => state.user); // TODO error in component state
  const dispatch = useAppDispatch();

  // Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Registro
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const handleLogin = () => {
    dispatch(loginUser({ username, password }));
  };

  const handleRegister = () => {
    setRegisterError("");

    if (newPassword !== confirmPassword) {
      setRegisterError("Las contraseñas no coinciden.");
      return;
    }

    dispatch(
      registerUser({
        username: newUsername,
        password: newPassword,
        confirmPassword,
      }),
    );
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{user ? "Perfil de Usuario" : "Acceder"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {user ? (
          <>
            <p>
              <strong>Usuario:</strong> {user.username}
            </p>
            <Button variant="secondary" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </>
        ) : (
          <>
            {/* Login */}
            <h5>Iniciar sesión</h5>
            <Form className="mb-4">
              <Form.Group className="mb-3">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>

              {error && <div className="text-danger mb-3">{error}</div>}

              <Button
                variant="primary"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Iniciar sesión"
                )}
              </Button>
            </Form>

            <hr />

            {/* Registro */}
            <h5>Registrarse</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>

              {registerError && (
                <div className="text-danger mb-3">{registerError}</div>
              )}

              <Button
                variant="primary"
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Registrarse"
                )}
              </Button>
            </Form>
          </>
        )}
      </Modal.Body>
    </>
  );
};

export default User;
