import { FaShareAlt, FaRegClock, FaInfoCircle } from 'react-icons/fa';
import { Button } from './Button';
import { Theme } from './Theme';
import React from 'react';

class Header extends React.Component {
  render () {
    const headerStyles = {
      backgroundColor: '#0a0a23',
      gridArea: 'HEADER',
      fontFamily: "'Source Serif 4', sans serif",
      padding: 15,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      color: 'white',
      fontSize: 'xx-large',
      fontWeight: 700,
    }
    
    const liStyles = {
      display: 'inline-block',
      padding: '0 20px'
    }
    
    const buttonStyles = {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: 'white'
    }
    
    return (
      <div style={headerStyles}>
      <p style={{marginRight: 'auto'}}>wordhuntle</p>
      <nav>
        <ul style={{listStyle: 'none'}}>
          <li style={liStyles}><Theme 
                                  buttonStyles={buttonStyles} 
                                  iconStyles={{fontSize: 'x-large'}}
                                  changeTheme={this.props.changeTheme}
                                  /></li>
          <li style={liStyles}><Button icon={<FaShareAlt style={{fontSize: 'x-large'}}/>} /></li>
          <li style={liStyles}><Button icon={<FaRegClock style={{fontSize: 'x-large'}}/>} /></li>
          <li style={liStyles}><Button icon={<FaInfoCircle style={{fontSize: 'x-large'}}/>} /></li>
        </ul>
      </nav>
    </div>
    )
  }
}

export {Header}