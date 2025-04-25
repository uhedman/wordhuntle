import { Modal } from "react-bootstrap";
import Login from "@/features/auth/components/Login";
import Profile from "@/features/auth/components/Profile";
import Register from "@/features/auth/components/Register";
import { useAuthView } from "@/features/auth/hooks/useAuthView";

const User = () => {
  const { authView, setAuthView } = useAuthView();

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          {authView === "login"
            ? "Iniciar sesión"
            : authView === "register"
            ? "Registrar"
            : "Perfil"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* TODO: agregar mensaje de error en las credenciales o servidor */}
        {authView === "authenticated" && <Profile />}

        {authView === "login" && <Login setAuthView={setAuthView} />}

        {authView === "register" && <Register setAuthView={setAuthView} />}
      </Modal.Body>
    </>
  );
};

export default User;
