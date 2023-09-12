import React, { useState } from 'react';

function Share(props) {
	const [copied, setCopied] = useState(false);

	function copy() {
		const shareDiv = document.querySelector('.share');
		const textoACopiar = shareDiv.textContent;

		const elementoTemporal = document.createElement('textarea');
		elementoTemporal.value = textoACopiar;
		document.body.appendChild(elementoTemporal);
		elementoTemporal.select();
		elementoTemporal.setSelectionRange(0, 99999); // Para dispositivos móviles
		document.execCommand('copy');
		document.body.removeChild(elementoTemporal);

		setCopied(true);
	}

	const fechaActual = new Date();

	const dia = fechaActual.getDate();
	const mes = fechaActual.toLocaleString('default', { month: 'long' });
	const anio = fechaActual.getFullYear();

	return (
		<div>
			<h1>Comparte tus resultados</h1>
			<div className='share'>
				<p>wordhuntle - {dia} de {mes} de {anio}</p>
				<p>Nivel {props.level}/8 — {props.storage.points} puntos — {props.storage.found.length} palabras</p>
			</div>
			<button className='copy' onClick={copy}>{copied ? "Copiado!" : "Copiar"}</button>
		</div>
	)
}

export default Share;
