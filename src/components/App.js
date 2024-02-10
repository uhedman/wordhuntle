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
		dayCode: JSON.parse(localStorage.getItem("dayCode")) || 0
	}));
	const [dayCode] = useState(() => {
		const date = new Date();
		const dayOfYear = (date.getMonth() * 31) + date.getDate();

		if (storage.dayCode !== dayOfYear) {
			localStorage.clear();
			localStorage.setItem("dayCode", JSON.stringify(dayOfYear));
			setStorage(prevStorage => ({
				...prevStorage,
				dayCode: dayOfYear
			}));
		}
	
		return dayOfYear;
	});

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
				dayCode={dayCode}
			/>
			<Game 
				theme={theme} 
				setMenuData={setMenuData}
				storage={storage}
				setStorage={setStorage}
				dayCode={dayCode}
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
