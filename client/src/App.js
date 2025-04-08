import NavBarComponent from './components/NavBar'
import Game from './components/Game'
import ModalComponent from './components/Modal'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLastGrid, fetchLastWords, loadHistoryStorage } from './redux/slices/historySlice';
import { fetchTodayGrid, fetchTodayWords, loadGameStorage, setTodayCode } from './redux/slices/gameDataSlice';

const App = () => {
	const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();

	useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/todayCode`);
        const data = await res.json();
        const apiCode = data.code;
        const localCode = localStorage.getItem('todayCode');
  
        if (localCode !== String(apiCode)) {
          localStorage.setItem('todayCode', apiCode);
          dispatch(fetchTodayGrid());
          dispatch(fetchTodayWords());
          dispatch(fetchLastGrid());
          dispatch(fetchLastWords());
        } else {
          dispatch(loadGameStorage());
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
		<div id='App'>
			<NavBarComponent />
			<Game />
			<ModalComponent />
		</div>
	);
}

export default App;
