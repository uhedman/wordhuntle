import '../App.css';
import NavBar from './NavBar'
import Game from './Game'
import Dropdown from './Dropdown'
import React, { useState } from 'react';

function App() {
	const [theme, setTheme] = useState('dark');
	const [menuData, setMenuData] = useState(undefined);

	function changeTheme() {
		setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
	}

	function setMenu(data) {
		setMenuData(data);
	}

	function closeMenu() {
		setMenuData(undefined);
	}

	return (
		<div id='App' className={theme}>
			<NavBar 
				changeTheme={changeTheme}
				setMenu={setMenu}  
				theme={theme}
				className={theme}
			/>
			<Game 
				theme={theme} 
				setMenu={setMenu}
			/>
			{menuData !== undefined && 
			<>
				<div className="overlay" onClick={closeMenu} />
				<Dropdown 
					closeMenu={closeMenu}
					data={menuData}
					theme={theme}
				/>
			</>
			}
		</div>
	);
}

export default App;
