import { Button } from "react-bootstrap";

interface NavBarButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const NavBarButton = ({ children, onClick }: NavBarButtonProps) => {
  return (
    <Button
      className="nav-link bg-transparent"
      variant="tertiary"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default NavBarButton;
