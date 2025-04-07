import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { drag, startDrag } from '../redux/slices/dragSlice';

const Tile = (props) => {
	const { id, letter } = props;
	const selected = useSelector(state => state.drag.tiles[id]);
	const dispatch = useDispatch();
	
	const handlePointerDown = (e) => {
		e.target.releasePointerCapture(e.pointerId); // Important!
		dispatch(startDrag({ id, letter }));
	}

	return (
		<div className='ratio ratio-1x1'>
			<div 
				onPointerDown={handlePointerDown}
				onPointerEnter={() => dispatch(drag({ id, letter }))}
				className={`d-flex align-items-center justify-content-center rounded border border-5 ${selected ? 'selected' : ''}`}
        style={{
          borderColor: selected ? 'var(--blue) !important' : null,
					backgroundColor: selected ? 'rgba(var(--blue-rgb), 0.2)' : null,
					cursor: 'pointer'
        }}
			>
				<span className='fs-1 fw-bold'>
					{letter?.toUpperCase() || ''}
				</span>
			</div>
		</div>
	);
}

export default Tile;