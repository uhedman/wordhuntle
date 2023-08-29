import React from 'react';

class Button extends React.Component {
  render () {
    const buttonStyles = {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: 'white'
    }
    
  return (
    <button style={buttonStyles}>{this.props.icon}</button>
    )
  }
}

export {Button};
