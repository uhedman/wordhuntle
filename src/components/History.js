import React from 'react';
import { FaRegClock } from 'react-icons/fa';

class History extends React.Component {
	render () {
		let menu = (
			<div>
				<h1>Palabras de ayer</h1>
				<p>Las palabras que encontraste están resaltadas</p>
				<img alt="tablero de ayer"></img>
				<p>lorem</p>
				<p>ipsum</p>
				<p>dolor</p>
			</div>
		)

		return (
			<button onClick={() => this.props.setMenu(menu)}><FaRegClock /></button>
		)
	}
}

export {History};
