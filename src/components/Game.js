import React, { useEffect, useState } from 'react';
import Tile from "./Tile"
import Words from "./Words"
import { getWords } from "../palabras/script"
import { FaEye } from "react-icons/fa"

function Game(props) {
	const [state, setState] = useState({
		word: '',
		drag: false,
		list: [],
		points: 0,
		found: [],
		secretWords: [],
		total: 0
	});

	useEffect (() => {
		const grid = [['a', 'b', 'c', 'd'],
									['h', 'e', 'j', 'e'],
									['i', 'o', 'a', 'f'], 
									['p', 'o', 'n', 'g']];

		const words = getWords(grid);

		setState(prevState => ({
			...prevState,
			secretWords: words, 
			total: words.length
		}));  
	}, []);

	function start(letter, func) {
		setState(prevState => ({
			...prevState,
			word: letter,
			drag: true,
			list: [func]
		}));
	}

	function write(letter, func) {
		setState(prevState => ({
			...prevState,
			word: prevState.word + letter,
			list: [...prevState.list, func]
		}));
	}

	function puntuation(length) {
		if (length === 4) {
			return 1;
		}
		else {
			return (length - 4) * 2;
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
		setState(prevState => {
			prevState.list.map(func => func());

			let points, found;
			if (prevState.secretWords.includes(prevState.word) && !prevState.found.includes(state.word)) {
				found = insert(prevState.found, prevState.word);
				points = prevState.points + puntuation(prevState.word.length);
			}
			else {
				found = prevState.found;
				points = prevState.points;
			}

			return {
				...prevState,
				word: '',
				drag: false,
				list: [],
				found,
				points
			};
		});
	}

	let grid = ['a', 'b', 'c', 'd', 'h', 'e', 'j', 'e', 'i', 'o', 'a', 'f', 'p', 'o', 'n', 'g'];
	let tiles = grid.map((letter, index) => 
		<Tile
			key={index}
			start={start} 
			write={write} 
			drag={state.drag}
			theme={props.theme} 
			letter={letter}
		/>
	);

	return (
		<div id="Game" onMouseUp={deselect}>
			<div id="Points">
				<div className='points'>
					<h1>{state.points} pts</h1>
					<p>{state.found.length} {state.found.length === 1 ? 'palabra' : 'palabras'}</p>
					<button onClick={() => props.setMenuData(<Words found={state.found} total={state.total}/>)}>
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