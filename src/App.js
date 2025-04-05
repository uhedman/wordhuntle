import './App.css';
import NavBarComponent from './components/NavBar'
import Game from './components/Game'
import ModalComponent from './components/Modal'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGame } from './redux/slices/gameDataSlice';


const App = () => {
	const theme = useSelector(state => state.theme);
	const dispatch = useDispatch();

	useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

	useEffect(() => {
		const todayCode = Math.floor(Date.now() / 86400000) - 1;
		dispatch(setGame(todayCode));
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
