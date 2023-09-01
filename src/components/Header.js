import React from 'react';
import { Theme } from './Theme';
import { Info } from './Info';
import { Share } from './Share';
import { History } from './History';

class Header extends React.Component {
  render () {
    return (
      <nav>
        <p style={{marginRight: 'auto'}}>wordhuntle</p>
        <Theme 
          changeTheme={this.props.changeTheme}
          theme={this.props.theme}
        />
        <Share 
          setMenu={this.props.setMenu}
          theme={this.props.theme}
        />
        <History 
          setMenu={this.props.setMenu}
          theme={this.props.theme}
        />
        <Info 
          setMenu={this.props.setMenu}
          theme={this.props.theme}
        />
      </nav>
    )
  }
}

export {Header}