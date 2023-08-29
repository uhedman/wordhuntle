import '../App.css';
export {Game}

function Game() {
  return (
    <div className="App-game">
      <div className="App-points">Here will be the points and words guessed</div>
      <div className="App-word">Here will be the word construction</div>
      <div className="App-grid">Here will be the grid of letters</div>
    </div>
  )
}