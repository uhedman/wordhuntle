import '../App.css';
import NavBar from './NavBar'
import Game from './Game'
import Modal from './Modal'
import React, { useState } from 'react';

function App() {
	const [theme, setTheme] = useState('dark');
	const [menuData, setMenuData] = useState(undefined);

	return (
		<div id='App' className={theme}>
			<NavBar 
				setTheme={setTheme}
				setMenuData={setMenuData}
				theme={theme}
			/>
			<Game 
				theme={theme} 
				setMenuData={setMenuData}
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
