import { useAppSelector } from "@/shared/hooks";
import { Pos } from "~/shared/types";

type LineSegmentProps = {
  p1: Pos;
  p2: Pos;
};

const LineSegment = ({ p1: [x1, y1], p2: [x2, y2] }: LineSegmentProps) => {
  const cellWidth = "calc((100% - 3rem) / 4)";

  const calcCoord = (value: number) =>
    `calc((${cellWidth} + 1rem) * ${value} + ${cellWidth} / 2 - 1rem)`;

  const startX = calcCoord(x1);
  const startY = calcCoord(y1);

  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angleRad = Math.atan2(dy, dx);

  return (
    <div
      style={{
        position: "absolute",
        top: startY,
        left: startX,
        width: `calc(2rem + (${cellWidth} + 1rem) * ${distance})`,
        height: "2rem",
        backgroundColor: "var(--blue)",
        opacity: 0.5,
        borderRadius: "1rem",
        transform: `rotate(${angleRad}rad)`,
        transformOrigin: "1rem 50%",
      }}
    />
  );
};

const Line = () => {
  const path = useAppSelector((state) => state.drag.path);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      {path.slice(1).map((_, index) => {
        const [y1, x1] = path[index];
        const [y2, x2] = path[index + 1];
        return (
          <LineSegment
            key={`${x1}-${y1}-${x2}-${y2}`}
            p1={[x1, y1]}
            p2={[x2, y2]}
          />
        );
      })}
    </div>
  );
};

export default Line;
