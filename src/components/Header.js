import { FaSun, FaShareAlt, FaRegClock, FaInfoCircle } from 'react-icons/fa';
export {Header}

function Header() {
  let styles = {
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
  
  return (
    <div style={styles}>
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