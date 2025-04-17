import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import NavBarComponent from "@/components/NavBar";
import Game from "@/components/Game";
import ModalComponent from "@/components/Modal";
import { setseed } from "@/store/slices/gameDataSlice";
import "@/App.css";
import { fetchSeed } from "@/api";
import { newDay } from "@/store/thunks/newDay";
import { loadStorage } from "@/store/thunks/storage";

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
        const apiSeed = data.seed;
        const localSeed = localStorage.getItem("seed");

        if (localSeed !== String(apiSeed)) {
          localStorage.setItem("seed", JSON.stringify(apiSeed));
          dispatch(newDay(localSeed === String(apiSeed - 1)));
        } else {
          dispatch(loadStorage());
        }

        dispatch(setseed(apiSeed));
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
