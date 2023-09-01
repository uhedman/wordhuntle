import { Tile } from "./Tile"

function Game() {
  return (
    <div id="Game">
      <div id="Points">Here will be the points and words guessed</div>
      <div id="Word">Here will be the word construction</div>
      <div id="Grid">
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        
        <Tile />
        <Tile />
        <Tile />
        <Tile />

        <Tile />
        <Tile />
        <Tile />
        <Tile />

        <Tile />
        <Tile />
        <Tile />
        <Tile />
      </div>
    </div>
  )
}

export {Game}