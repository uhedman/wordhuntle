import React, { useEffect, useState } from 'react';
import { getWords } from '../palabras/script'

function History(props) {
	let [secretWords, setSecretWords] = useState([]);

	useEffect(() => {
		let grid = [['a', 'b', 'c', 'd'],
		 						['h', 'e', 'j', 'e'],
								['i', 'o', 'a', 'f'],
								['p', 'o', 'n', 'g']];
		setSecretWords(getWords(grid));
	}, []);

	let grid = ['a', 'b', 'c', 'd', 'h', 'e', 'j', 'e', 'i', 'o', 'a', 'f', 'p', 'o', 'n', 'g'];
	let tiles = grid.map((letter, index) => 
		<button key={index} className={`tile small ${props.theme}`}>
			{letter.toUpperCase()}
		</button>
	);

	return (
		<div className='History'>
			<div>
				<h1>Palabras de ayer</h1>
				<p>Las palabras que encontraste están resaltadas</p>
			</div>
			<div className='history-grid'>
				{tiles}
			</div>
			<ul className='history-words'>
				{secretWords.map(word => <p key={word}>{word}</p>)}
			</ul>
		</div>
	)
}

export default History;
