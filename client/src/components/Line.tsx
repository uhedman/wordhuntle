import { useAppSelector } from "@/hooks";

const Line = () => {
  const order = useAppSelector((state) => state.drag.order);

  const calcCoord = (value: number) =>
    `calc(((100% - 3rem) / 4 + 1rem) * ${value} + (100% - 3rem) / 8)`;

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      {order.slice(1).map((item, index) => {
        const [y1, x1] = order[index];
        const [y2, x2] = item;
        return (
          <line
            key={index}
            x1={calcCoord(x1)}
            y1={calcCoord(y1)}
            x2={calcCoord(x2)}
            y2={calcCoord(y2)}
            stroke="var(--blue)"
            strokeWidth="32"
            strokeLinecap="round"
            opacity={0.5}
          />
        );
      })}
    </svg>
  );
};

export default Line;
