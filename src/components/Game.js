export {Game}

function Game() {
  const gridStyles = {
    gridArea: 'GRID',
    backgroundColor: 'darkslategray'
  }

  return (
    <div id="Game">
      <div id="Points">Here will be the points and words guessed</div>
      <div id="Word">Here will be the word construction</div>
      <div style={gridStyles}>Here will be the grid of letters</div>
    </div>
  )
}