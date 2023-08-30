import '../App.css';
import {Header} from './Header'
import {Game} from './Game'
import React from 'react';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      theme: 'dark'
    }
    this.changeTheme = this.changeTheme.bind(this);
  }
  changeTheme() {
    this.setState(state => ({
      theme: state.theme === 'dark' ? 'light' : 'dark'
    }));
  }
  render () {
    let appStyles = {
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
      <div style={appStyles} className={this.state.theme}>
        <Header 
          changeTheme={this.changeTheme} 
          theme={this.state.theme}
          className={this.state.theme}/>
        <Game />
      </div>
    );
  }
}

export default App;
