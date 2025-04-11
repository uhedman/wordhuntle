import { useAppDispatch, useAppSelector } from "@/hooks";
import { drag, startDrag } from "../redux/slices/dragSlice";
import { PointerEventHandler } from "react";

interface TileProps {
  id: number;
  letter: string;
}

const Tile = ({ id, letter }: TileProps) => {
  const selected = useAppSelector((state) => state.drag.tiles[id]);
  const dispatch = useAppDispatch();

  const handlePointerDown: PointerEventHandler<HTMLDivElement> = (e) => {
    e.currentTarget.releasePointerCapture(e.pointerId); // Important!
    dispatch(startDrag({ id, letter }));
  };

  return (
    <div className="ratio ratio-1x1">
      {letter === null ? (
        <div className="placeholder-glow d-flex rounded border border-5">
          <span className="placeholder d-flex flex-grow-1" />
        </div>
      ) : (
        <div
          onPointerDown={handlePointerDown}
          onPointerEnter={() => dispatch(drag({ id, letter }))}
          className={
            "d-flex align-items-center justify-content-center rounded border border-5"
          }
          style={{
            borderColor: selected ? "var(--blue) !important" : undefined,
            backgroundColor: selected
              ? "rgba(var(--blue-rgb), 0.2)"
              : undefined,
            cursor: "pointer",
          }}
        >
          <span className="fs-1 fw-bold">{letter.toUpperCase()}</span>
        </div>
      )}
    </div>
  );
};

export default Tile;
