export {Game}

function Game() {
  const wordStyles = {
    gridArea: 'WORD',
    backgroundColor: 'darkslateblue'
  }

  const gridStyles = {
    gridArea: 'GRID',
    backgroundColor: 'darkslategray'
  }

  return (
    <div id="Game">
      <div id="Points">Here will be the points and words guessed</div>
      <div style={wordStyles}>Here will be the word construction</div>
      <div style={gridStyles}>Here will be the grid of letters</div>
    </div>
  )
}