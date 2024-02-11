import React, { useEffect, useState } from 'react';
import { getWords } from '../palabras/script'
import { getGrid } from '../palabras/grid';

function History(props) {
	const [secretWords, setSecretWords] = useState([]);
	const [lastGrid, setLastGrid] = useState([]);

	useEffect(() => {
		const grid = getGrid(props.dayCode); 
		setLastGrid(grid);
	}, [props.dayCode]);

	useEffect (() => {
		if (lastGrid.length > 0) {
			const words = getWords(lastGrid);
			
			setSecretWords(words);
		}
	}, [lastGrid]);

	const lastTiles = lastGrid.flat().map((letter, index) => 
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
				{lastTiles}
			</div>
			<ul className='history-words'>
				{secretWords.map(word => <p key={word}>{word}</p>)}
			</ul>
		</div>
	)
}

export default History;
