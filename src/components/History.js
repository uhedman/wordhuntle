import React from 'react';
import { FaRegClock } from 'react-icons/fa';

class History extends React.Component {
	render () {
		let menu = (
			<div>
				<h1>Yesterday's words</h1>
				<p>Words that you found are highlighted</p>
				<img alt="yesterday's grid"></img>
				<p>yesterday</p>
				<p>words</p>
			</div>
		)

		return (
			<button onClick={() => this.props.setMenu(menu)}><FaRegClock /></button>
		)
	}
}

export {History};
