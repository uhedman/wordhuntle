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
    return (
      <div id='App' className={this.state.theme}>
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
