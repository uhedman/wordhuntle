import React from 'react';
import { Theme } from './Theme';
import { Info } from './Info';
import { Share } from './Share';
import { History } from './History';

class Header extends React.Component {
  render () {
    return (
      <header id='Header'>
        <p style={{marginRight: 'auto', className: this.props.theme}}>wordhuntle</p>
        <nav>
          <ul style={{listStyle: 'none'}}>
            <li><Theme 
                  changeTheme={this.props.changeTheme}
                  theme={this.props.theme}
                /></li>
            <li><Share 
                  setMenu={this.props.setMenu}
                  theme={this.props.theme}
                /></li>
            <li><History 
                  setMenu={this.props.setMenu}
                  theme={this.props.theme}
                /></li>
            <li><Info 
                  setMenu={this.props.setMenu}
                  theme={this.props.theme}
                /></li>
          </ul>
        </nav>
      </header>
    )
  }
}

export {Header}