import React from 'react';
import { FaTimes } from 'react-icons/fa';

function Modal(props) {
	return (
		<div className={`modal ${props.theme}`}>
			<div className='close-container'>
				<button onClick={() => props.setMenuData(undefined)}>
					<FaTimes/>
				</button>
			</div>
			<div className='modal-data'>
				{props.data}
			</div>
		</div>
	)
}

export default Modal;
