import React from 'react';
import Tile from "./Tile"
import Words from "./Words"
import { script } from "../palabras/script"

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			word: '',
			drag: false,
			list: [],
			points: 0,
			found: [],
			secretWords: [],
			total: 0
		}
		this.start = this.start.bind(this);
		this.write = this.write.bind(this);
		this.delete = this.delete.bind(this);
	}

	componentDidMount() {
		const grid = [['a', 'b', 'c', 'd'],
									['h', 'e', 'j', 'e'],
									['i', 'o', 'a', 'f'], 
									['p', 'o', 'n', 'g']];

		script(grid)
		.then(words => {
			let total = words.length;
			this.setState({ 
				secretWords: words, 
				total
			}); 
		})
		.catch(error => {
			console.error('Script error:', error);
		});    
	}

	start(letter, func) {
		this.setState({
			word: letter,
			drag: true,
			list: [func]
		});
	}

	write(letter, func) {
		this.setState(prevState => ({
			word: prevState.word + letter,
			list: [...prevState.list, func],
		}));
	}

	puntuation(length) {
		if (length === 4) {
			return 1;
		}
		else {
			return (length - 4) * 2;
		}
	}

	delete() {
		this.setState(state => {
			state.list.map(func => func());

			let points, found;
			if (state.secretWords.includes(state.word) && !state.found.includes(state.word)) {
				found = [...state.found, state.word];
				points = state.points + this.puntuation(state.word.length);
			}
			else {
				found = state.found;
				points = state.points;
			}

			return {
				word: '',
				drag: false,
				list: [],
				found,
				points
			};
		});
	}

	render() {
		let grid = ['a', 'b', 'c', 'd', 'h', 'e', 'j', 'e', 'i', 'o', 'a', 'f', 'p', 'o', 'n', 'g'];
		let tiles = grid.map(letter => 
			<Tile 
				start={this.start} 
				write={this.write} 
				drag={this.state.drag}
				theme={this.props.theme} 
				letter={letter}
			/>
		);
		
		return (
			<div id="Game" onMouseUp={this.delete}>
				<div id="Points">
					<div className='points'>
						<h1>{this.state.points} pts</h1>
						<p>{this.state.found.length} {this.state.found.length === 1 ? 'palabra' : 'palabras'}</p>
						<Words 
							setMenu={this.props.setMenu}
							found={this.state.found}
							total={this.state.total}
						/>
					</div>
					<div>Here will be the points bar</div>
				</div>
				<div id="Word">
					<p>{this.state.word.toUpperCase()}</p>
				</div>
				<div id="Grid">
					{tiles}
				</div>
			</div>
		)
	}
}

export default Game;