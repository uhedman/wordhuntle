import { useAppSelector } from "@/shared/hooks";
import { Rotation } from "@/features/game/types";
import Line from "@/features/game/components/Line";
import Tile from "@/features/game/components/Tile";

type GridProps = {
  rotation: Rotation | null;
};

const Grid = ({ rotation }: GridProps) => {
  const grid = useAppSelector((state) => state.game.grid);

  const tiles = grid === null ? Array(16).fill(null) : grid.flat();

  return (
    <div className="position-relative">
      <div
        className={`d-grid gap-3 grid-anim ${rotation ? `rotate-${rotation}` : ""}`}
        style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
      >
        {tiles.map((letter, index) => (
          <Tile key={index} id={index} letter={letter} rotation={rotation} />
        ))}
      </div>
      <Line />
    </div>
  );
};

export default Grid;
