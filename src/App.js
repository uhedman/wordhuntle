import './App.css';
import NavBarComponent from './components/NavBar'
import Game from './components/Game'
import ModalComponent from './components/Modal'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextStorage } from './redux/slices/storageSlice';

const App = () => {
	const theme = useSelector(state => state.storage.theme);
  const todayCode = useSelector((state) => state.game.todayCode);
  const storageCode = useSelector((state) => state.storage.todayCode);
	const dispatch = useDispatch();

	useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (storageCode !== todayCode) {
      dispatch(nextStorage(todayCode));
    }
  }, [todayCode, storageCode, dispatch]);

	return (
		<div id='App'>
			<NavBarComponent />
			<Game />
			<ModalComponent />
		</div>
	);
}

export default App;
