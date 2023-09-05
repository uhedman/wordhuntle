import React from 'react';
import { FaTimes } from 'react-icons/fa';

class Dropdown extends React.Component {
	render () {
		return (
			<div className={"dropdown " + this.props.theme}>
				<div className='close-container'>
					<button onClick={this.props.closeMenu}>
						<FaTimes/>
					</button>
				</div>
				{this.props.data}
			</div>
		)
	}
}

export default Dropdown;
