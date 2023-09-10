import React, { useEffect, useState } from 'react';
import Tile from "./Tile"
import Words from "./Words"
import { getWords } from "../palabras/script"
import { FaEye } from "react-icons/fa"

function Game(props) {
	const [state, setState] = useState({
		word: '',
		drag: false,
		points: 0,
		found: [],
		secretWords: [],
		total: 0,
		tiles: Array.from({ length: 16 }, () => false)
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

	function start(letter, id) {
		setState(prevState => ({
			...prevState,
			word: letter,
			drag: true,
			tiles: prevState.tiles.map((item, index) => index === id ? true : item)
		}));
	}

	function write(letter, id) {
		console.log("enter")
		setState(prevState => {
			if (prevState.drag && !state.tiles[id]) {
				return {
					...prevState,
					word: prevState.word + letter,
					tiles: prevState.tiles.map((item, index) => index === id ? true : item)
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
				found,
				points,
				tiles: tiles.map(item => false)
			};
		});
	}

	let grid = ['a', 'b', 'c', 'd', 'h', 'e', 'j', 'e', 'i', 'o', 'a', 'f', 'p', 'o', 'n', 'g'];
	let tiles = grid.map((letter, index) => 
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

	return (
		<div id="Game" onMouseUp={deselect} onTouchEnd={deselect}>
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