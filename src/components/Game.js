import React from 'react';
import { Tile } from "./Tile"

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: ''
    }
    this.write = this.write.bind(this);
  }

  write(letter) {
    this.setState(state => ({
      word: state.word + letter
    }));
  }

  render () {
    return (
      <div id="Game">
        <div id="Points">Here will be the points and words guessed</div>
        <div id="Word">{this.state.word}</div>
        <div id="Grid">
          <Tile write={this.write} theme={this.props.theme}/>
          <Tile write={this.write} theme={this.props.theme}/>
          <Tile write={this.write} theme={this.props.theme}/>
          <Tile write={this.write} theme={this.props.theme}/>
          
          <Tile write={this.write} theme={this.props.theme}/>
          <Tile write={this.write} theme={this.props.theme}/>
          <Tile write={this.write} theme={this.props.theme}/>
          <Tile write={this.write} theme={this.props.theme}/>

          <Tile write={this.write} theme={this.props.theme}/>
          <Tile write={this.write} theme={this.props.theme}/>
          <Tile write={this.write} theme={this.props.theme}/>
          <Tile write={this.write} theme={this.props.theme}/>

          <Tile write={this.write} theme={this.props.theme}/>
          <Tile write={this.write} theme={this.props.theme}/>
          <Tile write={this.write} theme={this.props.theme}/>
          <Tile write={this.write} theme={this.props.theme}/>
        </div>
      </div>
    )
  }
}

export {Game}