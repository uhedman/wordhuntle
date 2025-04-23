import { useAppSelector, useAppDispatch } from "@/shared/hooks";
import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { loginUser } from "@/features/auth/thunks/loginUser";
import { ModeProps } from "@/features/auth/types";

const Login = ({ setMode }: ModeProps) => {
  const loading = useAppSelector((state) => state.user.loading);
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
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese un nombre de usuario.
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

export default Login;
