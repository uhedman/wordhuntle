import React from 'react';
import { useSelector } from 'react-redux';

const Words = () => {
	const storageFound = useSelector(state => state.storage.found);
	const found = storageFound.map(word => <p key={word}>{word}</p>);

	return (
		<div>
			{found && <div className='d-grid' style={{ gridTemplate: 'auto auto / repeat(2, 1fr)' }}>{found}</div>}
		</div>
	);
}

export default Words;
