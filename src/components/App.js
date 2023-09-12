import '../App.css';
import NavBar from './NavBar'
import Game from './Game'
import Modal from './Modal'
import React, { useState, useEffect } from 'react';

function App() {
	const [theme, setTheme] = useState('dark');
	const [menuData, setMenuData] = useState(undefined);
	const [storage, setStorage] = useState(() => ({
		points: JSON.parse(localStorage.getItem("points")) || 0,
		found: JSON.parse(localStorage.getItem("found")) || [],
	}));

	useEffect (() => {
		localStorage.setItem("found", JSON.stringify(storage.found));
		localStorage.setItem("points", JSON.stringify(storage.points));
	}, [storage.found, storage.points]);

	return (
		<div id='App' className={theme}>
			<NavBar 
				setTheme={setTheme}
				setMenuData={setMenuData}
				theme={theme}
				storage={storage}
			/>
			<Game 
				theme={theme} 
				setMenuData={setMenuData}
				storage={storage}
				setStorage={setStorage}
			/>
			{menuData !== undefined && 
			<>
				<div className="overlay" onClick={() => setMenuData(undefined)} />
				<Modal 
					setMenuData={setMenuData}
					data={menuData}
					theme={theme}
				/>
			</>
			}
		</div>
	);
}

export default App;
