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
		todayCode: JSON.parse(localStorage.getItem("todayCode")) || 0
	}));
	const [todayCode] = useState(() => {
		const todayCode = Math.floor(Date.now() / 86400000);

		if (storage.todayCode !== todayCode) {
			localStorage.clear();
			localStorage.setItem("todayCode", JSON.stringify(todayCode));
			if (storage.dayCode === todayCode - 1) {
				setStorage(prevStorage => {
					localStorage.setItem("lastFound", JSON.stringify(prevStorage.found));
					return {
						points: 0,
						found: [],
						dayCode: todayCode
					}
				});
			} else {
				setStorage(() => {
					localStorage.setItem("lastFound", JSON.stringify([]));
					return {
						points: 0,
						found: [],
						dayCode: todayCode
					}
				});
			}
		}
	
		return todayCode;
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
				todayCode={todayCode}
			/>
			<Game 
				theme={theme} 
				setMenuData={setMenuData}
				storage={storage}
				setStorage={setStorage}
				todayCode={todayCode}
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
