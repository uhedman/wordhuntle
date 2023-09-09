import React from 'react';

function Tile(props) {
	return (
		<button 
			onMouseDown={() => props.start(props.letter, props.id)}
			onMouseEnter={() => props.write(props.letter, props.id)}
			className={props.selected 
									? "tile selected " + props.theme
									: "tile " + props.theme}
		>
			{props.letter.toUpperCase()}
		</button>
	);
}

export default Tile;