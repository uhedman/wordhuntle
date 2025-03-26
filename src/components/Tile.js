import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { start, write } from '../redux/slices/gameSlice';
import { Button } from 'react-bootstrap';

const Tile = (props) => {
	const { id, letter } = props;
	const selected = useSelector(state => state.game.tiles[id]);
	const theme = useSelector(state => state.storage.theme);
	const dispatch = useDispatch();
	
	const handlePointerDown = (e) => {
		e.target.releasePointerCapture(e.pointerId); // Important!
		dispatch(start({ id, letter }));
	}

	return (
		<div className='ratio ratio-1x1'>
			<Button 
				variant={theme}
				onPointerDown={handlePointerDown}
				onPointerEnter={() => dispatch(write({ id, letter }))}
				className={`fs-1 fw-bold border border-5 ${selected ? 'bg-primary' : ''}`}
			>
				{letter.toUpperCase()}
			</Button>
		</div>
	);
}

export default Tile;