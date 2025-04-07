import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

const History = () => {
	const theme = useSelector(state => state.theme);
	const lastFound = useSelector(state => state.history.lastFound);
	const lastWords = useSelector(state => state.history.lastWords);
	const lastGrid = useSelector(state => state.history.lastGrid);

	return (
		<div className='d-flex flex-column gap-3'>
			<p>Las palabras que encontraste están resaltadas</p>
			<div className='d-grid gap-2 w-75' style={{gridTemplate: 'auto auto / repeat(4, 1fr)'}}>
				{ lastGrid.flat().map((letter, index) => 
					<div className='ratio ratio-1x1' key={index}>
						<Button
							key={index}
							variant={theme}
							className={`fs-1 border border-3`}
							disabled
						>
							{letter.toUpperCase()}
						</Button>
					</div>
				)}
			</div>
			<ul className='d-grid' style={{gridTemplate: 'auto auto / repeat(2, 1fr)'}}>
				{ lastWords.map(word => 
						lastFound.includes(word) ? (
							<p key={word} className='fw-bold' style={{color: 'var(--green)'}}>{word}</p>
						) : (
							<p key={word}>{word}</p>
						)
					)
				}
			</ul>
		</div>
	);
}

export default History;
