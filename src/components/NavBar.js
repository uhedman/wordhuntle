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
		<nav>
			<p>wordhuntle</p>
			<button onClick={changeTheme}>
				{props.theme === 'dark' ? <FaSun /> : <FaMoon />}
			</button>
			<button onClick={() => props.setMenuData(<Share storage={props.storage}/>)}>
				<FaShareAlt />
			</button>
			<button onClick={() => props.setMenuData(<History />)}>
				<FaRegClock />
			</button>
			<button onClick={() => props.setMenuData(<Info />)}>
				<FaInfoCircle />
			</button>
		</nav>
	)
}

export default NavBar;