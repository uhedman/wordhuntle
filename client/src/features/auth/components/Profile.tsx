import { useAppSelector, useAppDispatch } from "@/shared/hooks";
import { Alert, Button } from "react-bootstrap";
import { logoutUser } from "@/features/auth/thunks/logoutUser";

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const error = useAppSelector((state) => state.auth.logoutError);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <p>
        <strong>Usuario:</strong> {user?.username} {/* // TODO */}
      </p>
      <Button variant="danger" onClick={handleLogout}>
        Cerrar sesión
      </Button>

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
    </>
  );
};

export default Profile;
