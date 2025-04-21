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
  const { loading } = useAppSelector((state) => state.user);
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      dispatch(loginUser({ username, password }));
    }

    setValidated(true);
  };

  return (
    <>
      <Form
        className="mb-4"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nombre de usuario"
            autoComplete="usuario"
            disabled={loading}
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese un nombre de usuario.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            autoComplete="contraseña"
            disabled={loading}
            minLength={8}
            required
          />
          <Form.Control.Feedback type="invalid">
            {password.length === 0
              ? "Por favor, ingrese una contraseña."
              : "La contraseña debe tener al menos 8 caracteres."}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
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
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const passwordsMatch = password === confirmPassword;

    if (form.checkValidity() === false || !passwordsMatch) {
      event.stopPropagation();
    } else {
      dispatch(registerUser({ username, password, confirmPassword }));
    }

    setValidated(true);
  };

  const passwordsMatch = password === confirmPassword || confirmPassword === "";

  return (
    <>
      <Form
        className="mb-4"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            placeholder="Nombre de usuario"
            autoComplete="username"
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese un nombre de usuario.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="Contraseña"
            autoComplete="new-password"
            minLength={8}
            required
          />
          <Form.Control.Feedback type="invalid">
            {password.length === 0
              ? "Por favor, ingrese una contraseña."
              : "La contraseña debe tener al menos 8 caracteres."}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            placeholder="Confirmar contraseña"
            autoComplete="new-password"
            minLength={8}
            required
            isInvalid={validated && !passwordsMatch}
          />
          <Form.Control.Feedback type="invalid">
            {confirmPassword.length === 0
              ? "Por favor, confirme su contraseña."
              : !passwordsMatch
              ? "Las contraseñas no coinciden."
              : ""}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Registrar"}
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
  const user = useAppSelector((state) => state.user.user);

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
            ? "Registrar"
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
