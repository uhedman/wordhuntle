import React from 'react';
import { FaShareAlt } from 'react-icons/fa';

class Share extends React.Component {
	render () {
		const fechaActual = new Date();

		const dia = fechaActual.getDate();
		const mes = fechaActual.toLocaleString('default', { month: 'long' }); // Obtiene el mes en formato largo (por ejemplo, "enero")
		const anio = fechaActual.getFullYear();

		let menu = (
			<div>
				<h1>Comparte tus resultados</h1>
				<div className='share'>
					<p>wordhuntle - {`${dia} ${mes} ${anio}`}</p>
					<p>Nivel {this.props.level}/8 — {this.props.points} puntos — {this.props.found} palabras</p>
				</div>
				<button className='copy'>Copiar</button>
			</div>
		)

		return (
			<button onClick={() => this.props.setMenu(menu)}><FaShareAlt /></button>
		)
	}
}

export {Share};
