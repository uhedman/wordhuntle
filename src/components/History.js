import React from 'react';

function History(props) {
	let grid = ['a', 'b', 'c', 'd', 'h', 'e', 'j', 'e', 'i', 'o', 'a', 'f', 'p', 'o', 'n', 'g'];
	let tiles = grid.map((letter, index) => 
	<button key={index} className={`tile small ${props.theme}`}>
		{letter.toUpperCase()}
	</button>
);

	return (
		<div className='History'>
			<h1>Palabras de ayer</h1>
			<p>Las palabras que encontraste están resaltadas</p>
			<div className='history-grid'>
				{tiles}
			</div>
			<p>lorem</p>
			<p>ipsum</p>
			<p>dolor</p>
		</div>
	)
}

export default History;
