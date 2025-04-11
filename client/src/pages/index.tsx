import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import NavBarComponent from "../components/NavBar";
import Game from "../components/Game";
import ModalComponent from "../components/Modal";
import {
  fetchLastGrid,
  fetchLastWords,
  loadHistoryStorage,
} from "../redux/slices/historySlice";
import {
  fetchTodayGrid,
  fetchTodayWords,
  loadGameStorage,
  setTodayCode,
} from "../redux/slices/gameDataSlice";
import {
  resetProgress,
  loadProgressStorage,
} from "@/redux/slices/progressSlice";

const App = () => {
  const theme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/todayCode`);
        const data = await res.json();
        const apiCode = data.code;
        const localCode = localStorage.getItem("todayCode");

        if (localCode !== String(apiCode)) {
          localStorage.setItem("todayCode", apiCode);
          dispatch(fetchTodayGrid());
          dispatch(fetchTodayWords());
          dispatch(resetProgress());
          dispatch(fetchLastGrid());
          dispatch(fetchLastWords());
        } else {
          dispatch(loadGameStorage());
          dispatch(loadProgressStorage());
          dispatch(loadHistoryStorage());
        }

        dispatch(setTodayCode(apiCode));
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
