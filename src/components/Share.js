import React from 'react';
import { FaShareAlt } from 'react-icons/fa';

class Share extends React.Component {
  render () {
    let menu = (
      <div>
        <h1>Share results</h1>
        <div>
          <p>wordhuntle - Aug 31, 2023</p>
          <p>Level 0/8 — 0 points — 0 words</p>
        </div>
      </div>
    )

    return (
      <button onClick={() => this.props.setMenu(menu)}><FaShareAlt /></button>
    )
  }
}

export {Share};
