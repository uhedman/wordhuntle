import React from 'react';
import { Tile } from "./Tile"

class Game extends React.Component {
  render () {
    return (
      <div id="Game">
        <div id="Points">Here will be the points and words guessed</div>
        <div id="Word">Here will be the word construction</div>
        <div id="Grid">
          <Tile theme={this.props.theme}/>
          <Tile theme={this.props.theme}/>
          <Tile theme={this.props.theme}/>
          <Tile theme={this.props.theme}/>
          
          <Tile theme={this.props.theme}/>
          <Tile theme={this.props.theme}/>
          <Tile theme={this.props.theme}/>
          <Tile theme={this.props.theme}/>

          <Tile theme={this.props.theme}/>
          <Tile theme={this.props.theme}/>
          <Tile theme={this.props.theme}/>
          <Tile theme={this.props.theme}/>

          <Tile theme={this.props.theme}/>
          <Tile theme={this.props.theme}/>
          <Tile theme={this.props.theme}/>
          <Tile theme={this.props.theme}/>
        </div>
      </div>
    )
  }
}

export {Game}