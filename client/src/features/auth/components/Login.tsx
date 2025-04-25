import { useAppSelector, useAppDispatch } from "@/shared/hooks";
import { useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { loginUser } from "@/features/auth/thunks/loginUser";
import { AuthViewProps } from "@/features/auth/types";
import { showPasswordError, showUsernameError } from "../utils";

const Login = ({ setAuthView }: AuthViewProps) => {
  const loading = useAppSelector((state) => state.auth.loginLoading);
  const error = useAppSelector((state) => state.auth.loginError);
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
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nombre de usuario"
            autoComplete="usuario"
            disabled={loading}
            minLength={3}
            maxLength={20}
            required
          />
          <Form.Control.Feedback type="invalid">
            {showUsernameError(username)}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
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
            {showPasswordError(password)}
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

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      <div>
        ¿No tenés cuenta?{" "}
        <Button
          variant="link"
          onClick={() => setAuthView("register")}
          disabled={loading}
        >
          Registrate
        </Button>
      </div>
    </>
  );
};

export default Login;
