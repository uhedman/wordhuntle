import { Button, Container, Nav, Navbar } from "react-bootstrap";
import {
  FaSun,
  FaMoon,
  FaShareAlt,
  FaRegClock,
  FaInfoCircle,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../hooks";
import { openModal } from "../store/slices/modalSlice";
import { toggleTheme } from "../store/slices/themeSlice";

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
          <Button
            variant="tertiary"
            className="nav-link bg-transparent"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </Button>
          <Button
            variant="tertiary"
            className="nav-link bg-transparent"
            onClick={() => dispatch(openModal("share"))}
          >
            <FaShareAlt />
          </Button>
          <Button
            variant="tertiary"
            className="nav-link bg-transparent"
            onClick={() => dispatch(openModal("history"))}
          >
            <FaRegClock />
          </Button>
          <Button
            variant="tertiary"
            className="nav-link bg-transparent"
            onClick={() => dispatch(openModal("info"))}
          >
            <FaInfoCircle />
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;
