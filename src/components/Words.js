import React from 'react';
import { FaEye } from 'react-icons/fa';

class Words extends React.Component {
	render () {
		let found = this.props.found.map((word) => <p>{word}</p>);
		let menu = (
			<div>
				<h1>Palabras encontradas ({this.props.found.length}/{this.props.total})</h1>
				{found}
			</div>
		);

		return (
			<button onClick={() => this.props.setMenu(menu)}><FaEye /></button>
		);
	}
}

export {Words};
