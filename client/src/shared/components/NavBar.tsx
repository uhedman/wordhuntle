import { openModal } from "@/features/modal/slice";
import { toggleTheme } from "@/features/theme/slice";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { FaSun, FaMoon, FaClock, FaBars } from "react-icons/fa";
import {
  FaShareNodes,
  FaCircleInfo,
  FaChartSimple,
  FaCircleUser,
} from "react-icons/fa6";
import { useAppSelector, useAppDispatch } from "@/shared/hooks";
import NavBarButton from "@/shared/components/NavBarButton";

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

        {/* Botones visibles en pantallas grandes */}
        <Nav className="fs-2 d-none d-sm-flex">
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

        <Dropdown className="d-sm-none ms-auto">
          <Dropdown.Toggle variant="tertiary" className="fs-2">
            <FaBars />
          </Dropdown.Toggle>

          <Dropdown.Menu className="fs-5 dropdown-menu-end">
            <Dropdown.Item
              className="d-flex align-items-center gap-2"
              onClick={() => dispatch(toggleTheme())}
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
              {theme === "dark" ? "Modo claro" : "Modo oscuro"}
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex align-items-center gap-2"
              onClick={() => dispatch(openModal("share"))}
            >
              <FaShareNodes />
              Compartir
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex align-items-center gap-2"
              onClick={() => dispatch(openModal("history"))}
            >
              <FaClock />
              Historial
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex align-items-center gap-2"
              onClick={() => dispatch(openModal("info"))}
            >
              <FaCircleInfo />
              Info
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex align-items-center gap-2"
              onClick={() => dispatch(openModal("ranking"))}
            >
              <FaChartSimple />
              Ranking
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex align-items-center gap-2"
              onClick={() => dispatch(openModal("user"))}
            >
              <FaCircleUser />
              Usuario
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;
