import { FaSun, FaMoon } from 'react-icons/fa';
import React from 'react';

class Theme extends React.Component {
  render () {
    return (
      <button 
        style={this.props.buttonStyles} 
        onClick={this.props.changeTheme}
        className={this.props.theme}>
        {this.props.theme === 'dark' ? <FaSun style={this.props.iconStyles}/> : <FaMoon style={this.props.iconStyles}/>}
      </button>
    )
  }
}

export {Theme};
