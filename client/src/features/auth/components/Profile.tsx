import { useAppSelector, useAppDispatch } from "@/shared/hooks";
import { Button } from "react-bootstrap";
import { logoutUser } from "@/features/auth/thunks/logoutUser";

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
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
    </>
  );
};

export default Profile;
