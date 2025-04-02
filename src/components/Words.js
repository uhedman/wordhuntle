import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Words = () => {
	const storageFound = useSelector(state => state.storage.found);

	return (
		<div className='d-grid' style={{ gridTemplate: 'auto auto / repeat(2, 1fr)' }}>
			{ storageFound.map((word, idx) => (
				<div key={word}>
					<OverlayTrigger 
						trigger="hover"
						placement='right'
						overlay={ 
							<Tooltip id={`${word}-${idx}`}>
								Buscar definicion en el diccionario.
							</Tooltip>
						}
					>
						<a
							className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
							href={`https://dle.rae.es/${word}`} 
							target="_blank" 
							rel="noopener noreferrer"
						>
							{word}
						</a>
					</OverlayTrigger>
				</div>
			))}
		</div>
	);
}

export default Words;
