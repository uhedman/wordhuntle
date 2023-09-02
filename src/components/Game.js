import React from 'react';
import { Tile } from "./Tile"

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: ''
    }
    this.write = this.write.bind(this);
    this.delete = this.delete.bind(this);
  }

  write(letter) {
    this.setState(state => ({
      word: state.word + letter
    }));
  }

  delete() {
    this.setState({
      word: ''
    });
  }

  render () {
    let grid = ['A', 'B', 'C', 'D', 'H', 'E', 'J', 'E', 'I', 'O', 'A', 'F', 'P', 'O', 'N', 'G'];
    let tiles = grid.map(letter => 
      <Tile 
        write={this.write} 
        delete={this.delete} 
        theme={this.props.theme} 
        letter={letter}
      />
    );
    
    return (
      <div id="Game">
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