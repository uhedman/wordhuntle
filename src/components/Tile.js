import React, { useState } from 'react';

function Tile(props) {
	const [selected, setSelected] = useState(false);

	function onMouseDown() {
		setSelected(prevSelected => {
			if (!prevSelected) {
				props.start(props.letter, deselect);
			}
			return true;
		});
	}

	function onMouseEnter() {
		if (props.drag) {
			setSelected(prevSelected => {
				if (!prevSelected) {
					props.write(props.letter, deselect);
				}
				return true;
			});
		}
	}

	function deselect() {
		setSelected(false);
	}

	return (
		<button 
			onMouseDown={onMouseDown}
			onMouseEnter={onMouseEnter}
			className={selected 
									? "tile selected " + props.theme
									: "tile " + props.theme}
		>
			{props.letter.toUpperCase()}
		</button>
	);
}

export default Tile;