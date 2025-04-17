import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import NavBarComponent from "@/components/NavBar";
import Game from "@/components/Game";
import ModalComponent from "@/components/Modal";
import "@/App.css";
import { fetchSeed } from "@/api";
import { loadGame } from "./store/thunks/loadGame";

const App = () => {
  const theme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSeed();
        const seed = data.seed;
        dispatch(loadGame(seed));
      } catch (error) {
        console.error("Error al obtener el código del día:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div id="App">
      <NavBarComponent />
      <Game />
      <ModalComponent />
    </div>
  );
};

export default App;
