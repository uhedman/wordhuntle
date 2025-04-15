import { useAppSelector } from "@/hooks";
import Tile from "@/components/Tile";
import Line from "@/components/Line";

const Grid = () => {
  const grid = useAppSelector((state) => state.gameData.grid);

  const tiles = grid === null ? Array(16).fill(null) : grid.flat();

  return (
    <div className="position-relative">
      <div
        className="d-grid gap-3"
        style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
      >
        {tiles.map((letter, index) => (
          <Tile key={index} id={index} letter={letter} />
        ))}
      </div>
      <Line />
    </div>
  );
};

export default Grid;
