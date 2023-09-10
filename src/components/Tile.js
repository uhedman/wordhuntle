import React from 'react';

function Tile(props) {
	function handlePointerDown (e) {
		e.target.releasePointerCapture(e.pointerId); // Important!
		props.start(props.letter, props.id);
	}

	return (
		<button 
			onPointerDown={handlePointerDown}
			onPointerEnter={() => props.write(props.letter, props.id)}
			className={`tile ${props.theme} ${ props.selected ? " selected" : ""}`}
		>
			{props.letter.toUpperCase()}
		</button>
	);
}

export default Tile;