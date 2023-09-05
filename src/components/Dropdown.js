import React from 'react';
import { FaTimes } from 'react-icons/fa';

function Dropdown(props) {
	return (
		<div className={"dropdown " + props.theme}>
			<div className='close-container'>
				<button onClick={props.closeMenu}>
					<FaTimes/>
				</button>
			</div>
			{props.data}
		</div>
	)
}

export default Dropdown;
