import '../App.css';
import {Header} from './Header'
import {Game} from './Game'
import React from 'react';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      color: '#f5f6f7',
      backgroundColor: '#1b1b32',
      headerColor: '#0a0a23'
    }
    this.changeTheme = this.changeTheme.bind(this);
  }
  changeTheme() {
    this.setState(state => ({
      color: state.backgroundColor,
      backgroundColor: state.color,
      headerColor: '#0a0a23' === state.headerColor ? 'white': '#0a0a23'
    }));
  }
  render () {
    let appStyles = {
      color : this.state.color,
      backgroundColor: this.state.backgroundColor,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridTemplateRows: '0.1fr 2fr',
      gap: '0px 0px',
      gridAutoFlow: 'row',
      gridTemplateAreas:`
      "HEADER HEADER HEADER"
      ". GAME ."
      `,
      height: '100vh',
      width: '100vw',
    }
    return (
      <div style={appStyles}>
        <Header changeTheme={this.changeTheme} state={this.state}/>
        <Game />
      </div>
    );
  }
}

export default App;
