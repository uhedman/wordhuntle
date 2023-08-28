import './App.css';
import { FaRegSun, FaShareAlt, FaRegClock, FaInfoCircle } from 'react-icons/fa';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <p>wordhuntle</p>
        <nav>
          <ul className="App-links">
            <li><button className='App-button'><FaRegSun /></button></li>
            <li><button className='App-button'><FaShareAlt /></button></li>
            <li><button className='App-button'><FaRegClock /></button></li>
            <li><button className='App-button'><FaInfoCircle /></button></li>
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
