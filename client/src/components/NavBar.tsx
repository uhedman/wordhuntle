import { Button, Container, Nav, Navbar } from "react-bootstrap";
import {
  FaSun,
  FaMoon,
  FaShareNodes,
  FaClock,
  FaChartSimple,
  FaCircleInfo,
  FaCircleUser,
} from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { openModal } from "@/store/slices/modalSlice";
import { toggleTheme } from "@/store/slices/themeSlice";

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

const NavBarComponent = () => {
  const theme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();

  return (
    <Navbar className="w-100 bg-body-tertiary transition">
      <Container fluid>
        <Navbar.Brand
          className="fs-2 fw-bold"
          href="https://www.wordhuntle.com"
        >
          wordhuntle
        </Navbar.Brand>
        <Nav className="fs-2">
          <NavBarButton onClick={() => dispatch(toggleTheme())}>
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </NavBarButton>
          <NavBarButton onClick={() => dispatch(openModal("share"))}>
            <FaShareNodes />
          </NavBarButton>
          <NavBarButton onClick={() => dispatch(openModal("history"))}>
            <FaClock />
          </NavBarButton>
          <NavBarButton onClick={() => dispatch(openModal("info"))}>
            <FaCircleInfo />
          </NavBarButton>
          <NavBarButton onClick={() => dispatch(openModal("ranking"))}>
            <FaChartSimple />
          </NavBarButton>
          <NavBarButton onClick={() => dispatch(openModal("user"))}>
            <FaCircleUser />
          </NavBarButton>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;
