import React from 'react';
import { Tile } from "./Tile"
import { script } from "../palabras/script"

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      drag: false,
      list: [],
      secretWords: script([['A', 'B', 'C', 'D'],
                           ['H', 'E', 'J', 'E'],
                           ['I', 'O', 'A', 'F'], 
                           ['P', 'O', 'N', 'G']])
    }
    this.start = this.start.bind(this);
    this.write = this.write.bind(this);
    this.delete = this.delete.bind(this);
  }

  start(letter, func) {
    this.setState({
      word: letter,
      drag: true,
      list: [func]
    });
  }

  write(letter, func) {
    this.setState(state => 
      state.drag ? {
        word: state.word + letter,
        list: [...state.list, func]
      } : {}
    );
  }

  delete() {
    this.setState(state => {
      state.list.map((func) => func());
      return {
        word: '',
        drag: false,
        list: []
      };
    });
  }

  render () {
    let grid = ['A', 'B', 'C', 'D', 'H', 'E', 'J', 'E', 'I', 'O', 'A', 'F', 'P', 'O', 'N', 'G'];
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
        <div id="Points">Here will be the points and words guessed</div>
        <div id="Word">{this.state.word}</div>
        <div id="Grid">
          {tiles}
        </div>
      </div>
    )
  }
}

export {Game}