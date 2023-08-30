import { FaShareAlt, FaRegClock, FaInfoCircle } from 'react-icons/fa';
import { Button } from './Button';
import { Theme } from './Theme';
import React from 'react';

class Header extends React.Component {
  render () {
    return (
      <header id='Header' className={this.props.theme}>
        <p style={{marginRight: 'auto', className: this.props.theme}}>wordhuntle</p>
        <nav>
          <ul style={{listStyle: 'none'}}>
            <li><Theme 
                  changeTheme={this.props.changeTheme}
                  theme={this.props.theme}
                /></li>
            <li><Button 
                  theme={this.props.theme}
                  icon={<FaShareAlt />} 
                /></li>
            <li><Button 
                  theme={this.props.theme}
                  icon={<FaRegClock />} 
                /></li>
            <li><Button 
                  theme={this.props.theme}
                  icon={<FaInfoCircle />} 
                /></li>
          </ul>
        </nav>
      </header>
    )
  }
}

export {Header}