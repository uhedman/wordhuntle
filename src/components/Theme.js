import { FaSun, FaMoon } from 'react-icons/fa';
import React from 'react';

class Theme extends React.Component {
  render () {
    return (
      <button style={this.props.buttonStyles} onClick={this.props.changeTheme}>
        {this.props.buttonStyles.color === '#f5f6f7' ? <FaSun style={this.props.iconStyles}/> : <FaMoon style={this.props.iconStyles}/>}
      </button>
    )
  }
}

export {Theme};
