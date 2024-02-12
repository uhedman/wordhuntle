import React, { useEffect, useState } from 'react';
import Tile from "./Tile"
import Words from "./Words"
import { getWords } from "../palabras/script"
import { getGrid } from "../palabras/grid"
import { FaEye } from "react-icons/fa"

function Game(props) {
	const [state, setState] = useState({
		word: '',
		drag: false,
		secretWords: [],
		total: 0,
		tiles: Array.from({ length: 16 }, () => false),
		order: [],
		grid: []
	});

	const tiles = state.grid.flat().map((letter, index) => 
		<Tile
		key={index}
		id={index}
		selected={state.tiles[index]}
		start={start} 
		write={write} 
		drag={state.drag}
		theme={props.theme} 
		letter={letter}
		/>
	);

	useEffect(() => {
		const grid = getGrid(props.todayCode); 
		
		setState(prevState => ({
			...prevState,
			grid
		}));
	}, [props.todayCode]);

	useEffect (() => {
		if (state.grid.length > 0) {
			const words = getWords(state.grid);
			
			setState(prevState => ({
				...prevState,
				secretWords: words, 
				total: words.length
			}));
		}
	}, [state.grid]);

	function start(letter, id) {
		let x = Math.floor(id / 4);
		let y = id % 4;
		setState(prevState => ({
			...prevState,
			word: letter,
			drag: true,
			tiles: prevState.tiles.map((item, index) => index === id ? true : item),
			order: [[x, y]]
		}));
	}

	function write(letter, id) {
		setState(prevState => {
			if (!prevState.drag) {
				return prevState;
			}
			
			let x = Math.floor(id / 4);
			let y = id % 4;
			const { tiles, order, word } = prevState;
			let l = order.length;
			let [a, b] = order[l - 1];
			
			if (l >= 2) {
				let [c, d] = order[l - 2];
				if (x === c && y === d) {
					return {
						...prevState,
						word: word.slice(0, -1),
						tiles: tiles.map((item, index) => index === a * 4 + b ? false : item),
						order: order.slice(0, -1)
					}
				}
			}

			if (!state.tiles[id] &&
				Math.abs(x - a) <= 1 &&
				Math.abs(y - b) <= 1) {
				return {
					...prevState,
					word: word + letter,
					tiles: tiles.map((item, index) => index === id ? true : item),
					order: [...order, [x, y]]
				};
			}
			else {
				return prevState;		
			}
		});
	}

	function puntuation(length) {
		if (length === 4) {
			return 1;
		}
		else {
			return (length - 3) * 2;
		}
	}

	function insert(arr, newString) {
		let low = 0;
		let high = arr.length - 1;
		const newArray = [...arr];
	
		while (low <= high) {
			const mid = Math.floor((low + high) / 2);
	
			if (newString === arr[mid]) {
				return newArray;
			} else if (newString < arr[mid]) {
				high = mid - 1;
			} else {
				low = mid + 1;
			}
		}
	
		newArray.splice(low, 0, newString);
		return newArray;
	}

	function deselect() {
		let word = state.word;
		setState(prevState => {
			return {
				...prevState,
				word: '',
				drag: false,
				tiles: Array.from({ length: 16 }, () => false),
				order: []
			};
		});
		props.setStorage(prevStorage => {
			if (state.secretWords.includes(word) && !prevStorage.found.includes(word)) {
				return {
					found: insert(prevStorage.found, word),
					points: prevStorage.points + puntuation(word.length)
				};
			}
			else {
				return prevStorage;
			}
		});
	}

	return (
		<div id="Game" onMouseUp={deselect} onTouchEnd={deselect}>
			<div id="Points">
				<div className='points'>
					<h1>{props.storage.points} pts</h1>
					<p>{props.storage.found.length} {props.storage.found.length === 1 ? 'palabra' : 'palabras'}</p>
					<button onClick={() => props.setMenuData(<Words found={props.storage.found} total={state.total}/>)}>
						<FaEye />
					</button>
				</div>
				<div>Here will be the points bar</div>
			</div>
			<div id="Word">
				<p>{state.word.toUpperCase()}</p>
			</div>
			<div id="Grid">
				{tiles}
			</div>
		</div>
	)
}

export default Game;