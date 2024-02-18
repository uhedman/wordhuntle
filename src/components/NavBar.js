import React from 'react';
import Info from './Info';
import Share from './Share';
import History from './History';
import { FaSun, FaMoon, FaShareAlt, FaRegClock, FaInfoCircle } from 'react-icons/fa';

function NavBar(props) {
	function changeTheme() {
		props.setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
	}

	return (
		<nav className={props.theme}>
			<p>wordhuntle</p>
			<p><a href='https://wordhuntle.com'>juego original</a></p>
			<button onClick={changeTheme}>
				{props.theme === 'dark' ? <FaSun /> : <FaMoon />}
			</button>
			<button onClick={() => props.setMenuData(<Share storage={props.storage}/>)}>
				<FaShareAlt />
			</button>
			<button onClick={() => props.setMenuData(<History theme={props.theme} todayCode={props.todayCode}/>)}>
				<FaRegClock />
			</button>
			<button onClick={() => props.setMenuData(<Info />)}>
				<FaInfoCircle />
			</button>
		</nav>
	)
}

export default NavBar;