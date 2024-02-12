import React, { useEffect, useState } from 'react';
import { getWords } from '../palabras/script'
import { getGrid } from '../palabras/grid';

function History(props) {
	const [secretWords, setSecretWords] = useState([]);
	const [lastGrid, setLastGrid] = useState([]);
	const [lastFound] = useState(JSON.parse(localStorage.getItem("lastFound")) || []);

	useEffect(() => {
		const grid = getGrid(props.todayCode - 1); 
		setLastGrid(grid);
	}, [props.todayCode]);

	useEffect (() => {
		if (lastGrid.length > 0) {
			const words = getWords(lastGrid).sort();
			
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
				{secretWords.map(word => {
				if(lastFound.includes(word)){
					return (<p key={word}><strong>{word}</strong></p>);
				}
				else {
					return (<p key={word}>{word}</p>)
				}})}
			</ul>
		</div>
	)
}

export default History;
