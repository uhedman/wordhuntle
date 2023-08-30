import { FaShareAlt, FaRegClock, FaInfoCircle } from 'react-icons/fa';
import { Button } from './Button';
import { Theme } from './Theme';
import React from 'react';

class Header extends React.Component {
  render () {
    const buttonStyles = {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
    }
    
    return (
      <header id='Header' className={this.props.theme}>
        <p style={{marginRight: 'auto', className: this.props.theme}}>wordhuntle</p>
        <nav>
          <ul style={{listStyle: 'none'}}>
            <li><Theme 
                  buttonStyles={buttonStyles} 
                  iconStyles={{fontSize: 'x-large'}}
                  changeTheme={this.props.changeTheme}
                  theme={this.props.theme}
                /></li>
            <li><Button 
                  buttonStyles={buttonStyles} 
                  theme={this.props.theme}
                  icon={<FaShareAlt style={{fontSize: 'x-large'}}/>} 
                /></li>
            <li><Button 
                  buttonStyles={buttonStyles} 
                  theme={this.props.theme}
                  icon={<FaRegClock style={{fontSize: 'x-large'}}/>} 
                /></li>
            <li><Button 
                  buttonStyles={buttonStyles}
                  theme={this.props.theme}
                  icon={<FaInfoCircle style={{fontSize: 'x-large'}}/>} 
                /></li>
          </ul>
        </nav>
      </header>
    )
  }
}

export {Header}