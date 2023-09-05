import React from 'react';
import Info from './Info';
import Share from './Share';
import History from './History';
import { FaSun, FaMoon, FaShareAlt, FaRegClock, FaInfoCircle } from 'react-icons/fa';

class NavBar extends React.Component {
	render() {
		return (
			<nav>
				<p>wordhuntle</p>
				<button onClick={this.props.changeTheme}>
					{this.props.theme === 'dark' ? <FaSun /> : <FaMoon />}
				</button>
				<button onClick={() => this.props.setMenu(<Share />)}>
					<FaShareAlt />
				</button>
				<button onClick={() => this.props.setMenu(<History />)}>
					<FaRegClock />
				</button>
				<button onClick={() => this.props.setMenu(<Info />)}>
					<FaInfoCircle />
				</button>
			</nav>
		)
	}
}

export default NavBar;