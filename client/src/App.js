import NavBarComponent from './components/NavBar'
import Game from './components/Game'
import ModalComponent from './components/Modal'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLastGrid, fetchLastWords } from './redux/slices/historySlice';
import { fetchTodayCode, fetchTodayGrid, fetchTodayWords } from './redux/slices/gameDataSlice';


const App = () => {
	const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();

	useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  useEffect(() => {
    dispatch(fetchTodayCode());
    dispatch(fetchTodayGrid());
    dispatch(fetchTodayWords());
    dispatch(fetchLastGrid());
    dispatch(fetchLastWords());
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
