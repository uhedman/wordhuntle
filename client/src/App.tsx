import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import NavBarComponent from "./components/NavBar";
import Game from "./components/Game";
import ModalComponent from "./components/Modal";
import {
  fetchLastData,
  loadHistoryStorage,
} from "./store/slices/historySlice";
import {
  fetchTodayData,
  loadGameStorage,
  setTodayCode,
} from "./store/slices/gameDataSlice";
import {
  resetProgress,
  loadProgressStorage,
} from "./store/slices/progressSlice";
import "./App.css"
import { getTodayCode } from "./api";

const App = () => {
  const theme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTodayCode();
        const apiCode = data.code;
        const localCode = localStorage.getItem("todayCode");

        if (localCode !== String(apiCode)) {
          localStorage.setItem("todayCode", JSON.stringify(apiCode));
          dispatch(fetchTodayData());
          dispatch(resetProgress());
          dispatch(fetchLastData());
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
