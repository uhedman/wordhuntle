import React from 'react';

class Button extends React.Component {
  render () {
    
  return (
    <button style={this.props.buttonStyles} className={this.props.theme}>{this.props.icon}</button>
    )
  }
}

export {Button};
