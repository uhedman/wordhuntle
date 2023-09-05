import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

class Theme extends React.Component {
	render () {
		return (
			<button onClick={this.props.changeTheme}>
				{this.props.theme === 'dark' ? <FaSun /> : <FaMoon />}
			</button>
		)
	}
}

export default Theme;
