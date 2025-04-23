import { useAppSelector } from "@/shared/hooks";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Login from "@/features/auth/components/Login";
import Profile from "@/features/auth/components/Profile";
import Register from "@/features/auth/components/Register";

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
        {/* TODO: agregar mensaje de error en las credenciales o servidor */}
        {mode === "accessed" && user && <Profile />}

        {mode === "login" && <Login setMode={setMode} />}

        {mode === "register" && <Register setMode={setMode} />}
      </Modal.Body>
    </>
  );
};

export default User;
