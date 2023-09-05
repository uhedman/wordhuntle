import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import gif from '../how-to-play.gif';

class Info extends React.Component {
	render () {
		let menu = (
			<div>
				<h1>Cómo jugar</h1>
				<p>Usá el ratón o el dedo para conectar las letras en la grilla para formar palabras.</p>
				<img src={gif} alt='Cómo jugar' width='300px'></img>
				<ul>
					<li>Podés conectar cualquier par de letras adyacentes, incluso diagonalmente</li>
					<li>No podés usar la misma casilla más de una vez por palabra</li>
					<li>Tu línea PUEDE cruzarse a sí misma</li>
					<li>Tu palabra tiene que tener al menos 4 letras</li>
				</ul>
				<h1>Puntuación</h1>
				<p>Cuando creas una palabra, recibirás puntos dependiendo de cuán larga sea:</p>
				<span>4 letras: 1 punto</span>
				<span>5 letras: 4 puntos</span>
				<span>6 letras: 6 puntos</span>
				<span>7 letras: 8 puntos</span>
				<span>8 letras: 10 puntos</span>
				<span>9 letras: 12 puntos</span>
				<span>10 letras: 14 puntos</span>
				<span>11 letras: 16 puntos</span>
				<span>etc.</span>
				<i>Consejo: Cada tablero tendrá una palabra que tiene al menos 8 letras. Recordá prestarle atención!</i>
				<p>Consigue puntos para subir de nivel. Intentá conseguir el nivel máximo cada día!</p>
				<h1>Más</h1>
				<p>Wordhuntle se reinicia todos los días a las 8pm EST. Volvé cada día para jugar un tablero nuevo!</p>
			</div>
		)

		return (
			<button onClick={() => this.props.setMenu(menu)}><FaInfoCircle /></button>
		)
	}
}

export {Info};
