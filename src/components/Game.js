import React, { useEffect } from 'react';
import Tile from './Tile'
import Word from './Word';
import Points from './Points';
import { useDispatch, useSelector } from 'react-redux';
import { deselectAndStoreWord } from '../redux/slices/gameSlice';

const Game = () => {
	const grid = useSelector(state => state.game.grid);
	const dispatch = useDispatch();

	const tiles = grid.flat().map((letter, index) => 
		<Tile key={index} id={index} letter={letter} />
	);

	useEffect(() => {
		const handlePointerUp = () => {
			dispatch(deselectAndStoreWord());
		};

		document.addEventListener('pointerup', handlePointerUp);

		return () => {
			document.removeEventListener('pointerup', handlePointerUp);
		};
	}, [dispatch]);

	return (
		<div className='p-3 w-100' style={{maxWidth: '60vh'}}>
			<div className='container-fluid'>
				<Points />
				<Word />
				<div className='d-grid gap-3' style={{ gridTemplate: 'auto auto / repeat(4, 1fr)' }}>
					{tiles}
				</div>
			</div>
		</div>
	);
}

export default Game;