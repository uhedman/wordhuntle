import React, { useEffect } from 'react';
import Points from './Points';
import Grid from './Grid';
import { useDispatch } from 'react-redux';
import { deselectAndStoreWord } from '../redux/slices/gameSlice';
import Display from './Display';

const Game = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const handleEnd = () => {
			dispatch(deselectAndStoreWord());
		};

		document.addEventListener('pointerup', handleEnd);
		document.addEventListener('touchend', handleEnd);

		return () => {
			document.removeEventListener('pointerup', handleEnd);
			document.removeEventListener('touchend', handleEnd);
		};
	}, [dispatch]);

	return (
		<div className='p-3 w-100' style={{maxWidth: '60vh', touchAction: 'none'}}>
			<div className='container-fluid d-flex flex-column gap-3'>
				<Points />
				<Display />
				<Grid />
			</div>
		</div>
	);
}

export default Game;