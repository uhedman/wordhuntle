import { FaSun } from 'react-icons/fa';
import React from 'react';

class Theme extends React.Component {
  render () {
    
    return (
      <button style={this.props.buttonStyles} onClick={this.props.changeTheme}><FaSun style={this.props.iconStyles}/></button>
    )
  }
}

export {Theme};
