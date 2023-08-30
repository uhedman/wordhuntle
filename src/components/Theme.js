import { FaSun, FaMoon } from 'react-icons/fa';
import React from 'react';

class Theme extends React.Component {
  render () {
    return (
      <button 
        onClick={this.props.changeTheme}
        className={this.props.theme}>
        {this.props.theme === 'dark' ? <FaSun /> : <FaMoon />}
      </button>
    )
  }
}

export {Theme};
