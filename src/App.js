import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <p>wordhuntle</p>
        <nav>
          <ul className="App-links">
            <li><a href="https://example.com" target="_blank" rel="noopener noreferrer">Sun/Moon</a></li>
            <li><a href="https://example.com" target="_blank" rel="noopener noreferrer">Share</a></li>
            <li><a href="https://example.com" target="_blank" rel="noopener noreferrer">History</a></li>
            <li><a href="https://example.com" target="_blank" rel="noopener noreferrer">Info</a></li>
          </ul>
        </nav>
      </div>
      <div className="App-game">
        <div className="App-points">Here will be the points and words guessed</div>
        <div className="App-word">Here will be the word construction</div>
        <div className="App-grid">Here will be the grid of letters</div>
      </div>
    </div>
  );
}

export default App;
