import React from 'react';

function Words(props) {
	let found = props.found.map(word => <p>{word}</p>);

	return (
		<div>
			<h1>Palabras encontradas ({props.found.length}/{props.total})</h1>
			{found}
		</div>
	);
}

export default Words;
