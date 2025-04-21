import { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { loginUser, logoutUser, registerUser } from "@/store/slices/userSlice";

interface ModeProps {
  setMode: React.Dispatch<
    React.SetStateAction<"login" | "register" | "accessed">
  >;
}

const Login = ({ setMode }: ModeProps) => {
  const { loading, error } = useAppSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(loginUser({ username, password }));
  };

  return (
    <>
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

        <Button variant="primary" onClick={handleLogin} disabled={loading}>
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Iniciar sesión"
          )}
        </Button>
      </Form>
      <div>
        ¿No tenés cuenta?{" "}
        <Button
          variant="link"
          onClick={() => setMode("register")}
          disabled={loading}
        >
          Registrate
        </Button>
      </div>
    </>
  );
};

const Register = ({ setMode }: ModeProps) => {
  const { loading } = useAppSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState("");
  const dispatch = useAppDispatch();

  const handleRegister = () => {
    setShowError("");
    if (password !== confirmPassword) {
      setShowError("Las contraseñas no coinciden.");
      return;
    }
    dispatch(registerUser({ username, password, confirmPassword }));
  };

  return (
    <>
      <Form>
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

        <Form.Group className="mb-3">
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
        </Form.Group>

        {showError && <div className="text-danger mb-3">{showError}</div>}

        <Button variant="primary" onClick={handleRegister} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Registrarse"}
        </Button>
      </Form>
      <div className="mt-3">
        ¿Ya tenés cuenta?{" "}
        <Button
          variant="link"
          onClick={() => setMode("login")}
          disabled={loading}
        >
          Iniciar sesión
        </Button>
      </div>
    </>
  );
};

const Profile = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <p>
        <strong>Usuario:</strong> {user?.username} {/* // TODO */}
      </p>
      <Button variant="secondary" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </>
  );
};

const User = () => {
  const { user } = useAppSelector((state) => state.user);

  const [mode, setMode] = useState<"login" | "register" | "accessed">("login");

  useEffect(() => {
    if (user) {
      setMode("accessed");
    } else {
      setMode("login");
    }
  }, [user]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "login"
            ? "Iniciar sesión"
            : mode === "register"
            ? "Registrarse"
            : "Perfil"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {mode === "accessed" && user && <Profile />}

        {mode === "login" && <Login setMode={setMode} />}

        {mode === "register" && <Register setMode={setMode} />}
      </Modal.Body>
    </>
  );
};

export default User;
