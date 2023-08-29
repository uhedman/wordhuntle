import { FaSun, FaShareAlt, FaRegClock, FaInfoCircle } from 'react-icons/fa';
export {Header}

function Header() {
  const headerStyles = {
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
  
  const buttonStyles = {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: 'white'
  }

  const liStyles = {
    display: 'inline-block',
    padding: '0 20px'
  }

  return (
    <div style={headerStyles}>
      <p style={{marginRight: 'auto'}}>wordhuntle</p>
      <nav>
        <ul style={{listStyle: 'none'}}>
          <li style={liStyles}><button style={buttonStyles}><FaSun style={{fontSize: 'x-large'}}/></button></li>
          <li style={liStyles}><button style={buttonStyles}><FaShareAlt style={{fontSize: 'x-large'}}/></button></li>
          <li style={liStyles}><button style={buttonStyles}><FaRegClock style={{fontSize: 'x-large'}}/></button></li>
          <li style={liStyles}><button style={buttonStyles}><FaInfoCircle style={{fontSize: 'x-large'}}/></button></li>
        </ul>
      </nav>
    </div>
  )
}