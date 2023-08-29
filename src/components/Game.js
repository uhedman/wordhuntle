export {Game}

function Game() {
  const gameStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '0.3fr 0.3fr 2.4fr',
    gap: '0px 0px',
    gridAutoFlow: 'row',
    gridTemplateAreas:`
      "POINTS"
      "WORD"
      "GRID"
    `,
    gridArea: 'GAME',
    padding: '20px',
  }

  const pointsStyles = {
    gridArea: 'POINTS',
    backgroundColor: 'blueviolet'
  }

  const wordStyles = {
    gridArea: 'WORD',
    backgroundColor: 'darkslateblue'
  }

  const gridStyles = {
    gridArea: 'GRID',
    backgroundColor: 'darkslategray'
  }

  return (
    <div style={gameStyles}>
      <div style={pointsStyles}>Here will be the points and words guessed</div>
      <div style={wordStyles}>Here will be the word construction</div>
      <div style={gridStyles}>Here will be the grid of letters</div>
    </div>
  )
}