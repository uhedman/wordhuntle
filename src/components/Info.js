import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

class Info extends React.Component {
  render () {
    let menu = (
      <div>
        <h1>How to play</h1>
        <p>Use your mouse or finger to connect letters together on the grid to make words.</p>
        <img alt='How to play'></img>
        <ul>
          <li>You can connect any two adjacent letters, including diagonally</li>
          <li>You cannot use the same grid cell more than once in a word</li>
          <li>Your line CAN cross over itself</li>
          <li>Your word must be at least 4 letters long</li>
        </ul>
        <h1>Scoring</h1>
        <p>When you make a word, you will receive points depending on how long your word is:

           4 letters: 1 point
           5 letters: 4 points
           6 letters: 6 points
           7 letters: 8 points
           8 letters: 10 points
           9 letters: 12 points
           10 letters: 14 points
           11 letters: 16 points
           
           etc.</p>
        <i>Tip: Every board will have a word that is at least 8 letters long. Make sure to keep an eye out for it!</i>
        <p>Score points to increase your level. Try to reach the max level each day!</p>
        <h1>More</h1>
        <p>Wordhuntle is updated every day at 8pm EST. Check back in each day for a new board!</p>
      </div>
    )

    return (
      <button onClick={() => this.props.setMenu(menu)}><FaInfoCircle /></button>
    )
  }
}

export {Info};
