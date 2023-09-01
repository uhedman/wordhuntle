import '../App.css';
import {Header} from './Header'
import {Game} from './Game'
import {Dropdown} from './Dropdown'
import React from 'react';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      theme: 'dark',
      menu: false,
      menuData: undefined
    }
    this.changeTheme = this.changeTheme.bind(this);
    this.setMenu = this.setMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  changeTheme() {
    this.setState(state => ({
      theme: state.theme === 'dark' ? 'light' : 'dark'
    }));
  }

  setMenu(data) {
    this.setState(state => ({
      menu: !state.menu,
      menuData: data
    }));
  }

  closeMenu() {
    this.setState(({
      menu: false
    }));
  }

  render () {
    return (
      <div id='App' className={this.state.theme}>
        <Header 
          changeTheme={this.changeTheme}
          setMenu={this.setMenu}  
          theme={this.state.theme}
          className={this.state.theme}/>
        <Game />
        {this.state.menu && 
        <>
          <div className="overlay" onClick={this.closeMenu}></div>
          <Dropdown 
            closeMenu={this.closeMenu}
            data={this.state.menuData}
            theme={this.state.theme}
          />
        </>
          }
      </div>
    );
  }
}

export default App;
