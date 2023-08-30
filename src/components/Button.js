import React from 'react';

class Button extends React.Component {
  render () {
    
  return (
    <button className={this.props.theme}>{this.props.icon}</button>
    )
  }
}

export {Button};
