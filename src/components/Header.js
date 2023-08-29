import '../App.css';
import { FaSun, FaShareAlt, FaRegClock, FaInfoCircle } from 'react-icons/fa';
export {Header}

function Header() {
  return (
    <div className="App-header">
      <p>wordhuntle</p>
      <nav>
        <ul className="App-links">
          <li><button className='App-button'><FaSun /></button></li>
          <li><button className='App-button'><FaShareAlt /></button></li>
          <li><button className='App-button'><FaRegClock /></button></li>
          <li><button className='App-button'><FaInfoCircle /></button></li>
        </ul>
      </nav>
    </div>
  )
}