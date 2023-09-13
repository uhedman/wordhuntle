import React from 'react';

function Words(props) {
	let found = props.found.map(word => <p key={word}>{word}</p>);

	return (
		<div>
			<h1>Palabras encontradas ({props.found.length}/{props.total})</h1>
			{found && <div className='found'>{found}</div>}
		</div>
	);
}

export default Words;
