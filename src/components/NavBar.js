import React from 'react';
import Info from './Info';
import Share from './Share';
import History from './History';
import { FaSun, FaMoon, FaShareAlt, FaRegClock, FaInfoCircle } from 'react-icons/fa';

function NavBar(props) {
	return (
		<nav>
			<p>wordhuntle</p>
			<button onClick={props.changeTheme}>
				{props.theme === 'dark' ? <FaSun /> : <FaMoon />}
			</button>
			<button onClick={() => props.setMenu(<Share />)}>
				<FaShareAlt />
			</button>
			<button onClick={() => props.setMenu(<History />)}>
				<FaRegClock />
			</button>
			<button onClick={() => props.setMenu(<Info />)}>
				<FaInfoCircle />
			</button>
		</nav>
	)
}

export default NavBar;