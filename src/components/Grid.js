import React from 'react';
import Tile from './Tile'
import { useSelector } from 'react-redux';

const Grid = () => {
	const grid = useSelector(state => state.game.grid);

  return (
    <div className='d-grid gap-3' style={{ gridTemplate: 'auto auto / repeat(4, 1fr)' }}>
		  { grid.flat().map((letter, index) => 
		    <Tile key={index} id={index} letter={letter} />
	    )}
    </div>
  );
}

export default Grid;