import { Button, Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { FaBars, FaClock, FaMoon, FaSun } from "react-icons/fa";
import { FaChartSimple, FaCircleInfo, FaShareNodes } from "react-icons/fa6";

import { openModal } from "@/features/modal/slice";
import { toggleTheme } from "@/features/theme/slice";
import NavBarButton from "@/shared/components/NavBarButton";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";

const NavBarComponent = () => {
	const theme = useAppSelector((state) => state.theme.value);
	const user = useAppSelector((state) => state.auth.user);
	const dispatch = useAppDispatch();

	return (
		<Navbar className="w-100 bg-body-tertiary transition">
			<Container fluid>
				<Navbar.Brand className="fs-2 fw-bold">wordhuntle</Navbar.Brand>

				<Navbar.Collapse
					id="navbar-content"
					className="justify-content-end align-items-center"
				>
					<Nav className="fs-2 d-none d-sm-flex">
						<NavBarButton onClick={() => dispatch(toggleTheme())}>
							{theme === "dark" ? <FaSun /> : <FaMoon />}
						</NavBarButton>
						<NavBarButton
							onClick={() => dispatch(openModal("share"))}
						>
							<FaShareNodes />
						</NavBarButton>
						<NavBarButton
							onClick={() => dispatch(openModal("history"))}
						>
							<FaClock />
						</NavBarButton>
						<NavBarButton
							onClick={() => dispatch(openModal("info"))}
						>
							<FaCircleInfo />
						</NavBarButton>
						<NavBarButton
							onClick={() => dispatch(openModal("ranking"))}
						>
							<FaChartSimple />
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
								{theme === "dark"
									? "Modo claro"
									: "Modo oscuro"}
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
						</Dropdown.Menu>
					</Dropdown>
					<Button
						className="rounded-pill"
						onClick={() => dispatch(openModal("user"))}
					>
						{user?.username[0].toUpperCase() ?? "Iniciar sesión"}
					</Button>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBarComponent;
