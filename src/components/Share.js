import React from 'react';

class Share extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "Copiar"
		}
		this.copy = this.copy.bind(this);
	}

	copy() {
		const shareDiv = document.querySelector('.share'); // Selecciona el div con la clase 'share'
		const textoACopiar = shareDiv.textContent;

		const elementoTemporal = document.createElement('textarea');
		elementoTemporal.value = textoACopiar;
		document.body.appendChild(elementoTemporal);
		elementoTemporal.select();
		elementoTemporal.setSelectionRange(0, 99999); // Para dispositivos móviles
		document.execCommand('copy');
		document.body.removeChild(elementoTemporal);

		this.setState({
			text: "Copiado!"
		})
	}

	render () {
		const fechaActual = new Date();

		const dia = fechaActual.getDate();
		const mes = fechaActual.toLocaleString('default', { month: 'long' }); // Obtiene el mes en formato largo (por ejemplo, "enero")
		const anio = fechaActual.getFullYear();

		return (
			<div>
				<h1>Comparte tus resultados</h1>
				<div className='share'>
					<p>wordhuntle - {`${dia} de ${mes} de ${anio}`} </p>
					<p>Nivel {this.props.level}/8 — {this.props.points} puntos — {this.props.found} palabras</p>
				</div>
				<button className='copy' onClick={this.copy}>{this.state.text}</button>
			</div>
		)
	}
}

export default Share;
