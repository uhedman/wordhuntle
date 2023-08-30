import '../App.css';
import {Header} from './Header'
import {Game} from './Game'
import React from 'react';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      color: 'white',
      backgroundColor: ''
  }
  }
  render () {
    const appStyles = {
      color : 'white',
      backgroundColor: '#1b1b32',
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
        <Header />
        <Game />
      </div>
    );
  }
}

export default App;
