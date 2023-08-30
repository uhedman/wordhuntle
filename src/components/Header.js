import { FaShareAlt, FaRegClock, FaInfoCircle } from 'react-icons/fa';
import { Button } from './Button';
import { Theme } from './Theme';
import React from 'react';

class Header extends React.Component {
  render () {
    const headerStyles = {
      gridArea: 'HEADER',
      fontFamily: "'Source Serif 4', sans serif",
      padding: 15,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
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
    }
    
    return (
      <header style={headerStyles} className={this.props.theme}>
        <p style={{marginRight: 'auto', className: this.props.theme}}>wordhuntle</p>
        <nav>
          <ul style={{listStyle: 'none'}}>
            <li style={liStyles}><Theme 
                                    buttonStyles={buttonStyles} 
                                    iconStyles={{fontSize: 'x-large'}}
                                    changeTheme={this.props.changeTheme}
                                    theme={this.props.theme}
                                    /></li>
            <li style={liStyles}><Button 
                                    buttonStyles={buttonStyles} 
                                    theme={this.props.theme}
                                    icon={<FaShareAlt style={{fontSize: 'x-large'}}/>} 
                                    /></li>
            <li style={liStyles}><Button 
                                    buttonStyles={buttonStyles} 
                                    theme={this.props.theme}
                                    icon={<FaRegClock style={{fontSize: 'x-large'}}/>} 
                                    /></li>
            <li style={liStyles}><Button 
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