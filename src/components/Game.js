import React from 'react';
import { Tile } from "./Tile"
import { Words } from "./Words"
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
    let grid = [['a', 'b', 'c', 'd'],
                ['h', 'e', 'j', 'e'],
                ['i', 'o', 'a', 'f'], 
                ['p', 'o', 'n', 'g']];

    script(grid)
    .then((words) => {
      let total = words.length;
      this.setState({ 
        secretWords: words, 
        total
      }); 
    })
    .catch((error) => {
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
    this.setState((prevState) => ({
      word: prevState.word + letter,
      list: [...prevState.list, func],
    }));
  }  

  delete() {
    this.setState(state => {
      state.list.map((func) => func());
      return {
        word: '',
        drag: false,
        list: [],
        found: state.secretWords.includes(state.word) ? 
               state.found + [state.word] :
               state.found
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
        <div id="Points">
          <div className='points'>
            <h1 style={{marginRight: 'auto'}}>{this.state.points} pts</h1>
            <p>{this.state.found.length} words</p>
            <Words setMenu={this.props.setMenu}
                   found={this.state.found}
                   total={this.state.total}
            ></Words>
          </div>
          <div>Here will be the points bar</div>
        </div>
        <div id="Word">{this.state.word}</div>
        <div id="Grid">
          {tiles}
        </div>
      </div>
    )
  }
}

export {Game}