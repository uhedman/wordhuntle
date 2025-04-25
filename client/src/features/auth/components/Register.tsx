import { useAppSelector, useAppDispatch } from "@/shared/hooks";
import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { registerUser } from "../thunks/registerUser";
import { ModeProps } from "../types";
import { showUsernameError, showPasswordError } from "../utils";

const Register = ({ setMode }: ModeProps) => {
  const loading = useAppSelector((state) => state.auth.loading);
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
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            placeholder="Nombre de usuario"
            autoComplete="username"
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
            disabled={loading}
            placeholder="Contraseña"
            autoComplete="new-password"
            minLength={8}
            isInvalid={validated && !passwordsMatch}
            isValid={validated && passwordsMatch}
            required
          />
          <Form.Control.Feedback type="invalid">
            {showPasswordError(password, passwordsMatch)}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            placeholder="Confirmar contraseña"
            autoComplete="new-password"
            minLength={8}
            isInvalid={validated && !passwordsMatch}
            required
          />
          <Form.Control.Feedback type="invalid">
            {showPasswordError(confirmPassword, passwordsMatch)}
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

export default Register;
