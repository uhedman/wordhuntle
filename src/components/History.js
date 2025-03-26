import React, { useEffect, useState } from 'react';
import { getWords } from '../palabras/script'
import { getGrid } from '../palabras/grid';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

const History = () => {
	const todayCode = useSelector(state => state.todayCode);
	const { theme, lastFound } = useSelector(state => state.storage);
	const [secretWords, setSecretWords] = useState([]);
	const [lastGrid, setLastGrid] = useState([]);

	useEffect(() => {
		const grid = getGrid(todayCode - 1); 
		setLastGrid(grid);
	}, [todayCode]);

	useEffect (() => {
		if (lastGrid.length > 0) {
			const words = getWords(lastGrid).sort();
			
			setSecretWords(words);
		}
	}, [lastGrid]);

	const lastTiles = lastGrid.flat().map((letter, index) => 
		<div className='ratio ratio-1x1'>
			<Button
				key={index}
				variant={theme}
				className={`fs-1 border border-3`}
				disabled
			>
				{letter.toUpperCase()}
			</Button>
		</div>
		
	);

	return (
		<div className='d-flex flex-column gap-3'>
			<div>
				<p>Las palabras que encontraste están resaltadas</p>
			</div>
			<div className='d-grid gap-2 w-75' style={{gridTemplate: 'auto auto / repeat(4, 1fr)'}}>
				{lastTiles}
			</div>
			<ul className='d-grid' style={{gridTemplate: 'auto auto / repeat(2, 1fr)'}}>
				{secretWords.map(word => {
					if(lastFound.includes(word)){
						return (<p key={word}><strong>{word}</strong></p>);
					}
					else {
						return (<p key={word}>{word}</p>)
					}
				})}
			</ul>
		</div>
	);
}

export default History;
