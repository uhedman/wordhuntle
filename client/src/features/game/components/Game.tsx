import Display from "@/features/display/components/Display";
import { useStopDrag } from "@/features/drag/hooks/useStopDrag";
import { useAppDispatch } from "@/shared/hooks";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaRotateLeft, FaRotateRight } from "react-icons/fa6";
import { rotateGrid } from "@/features/game/slice";
import { Rotation } from "@/features/game/types";
import Grid from "@/features/game/components/Grid";
import Points from "@/features/game/components/Points";

const Game = () => {
  useStopDrag();
  const [rotation, setRotation] = useState<Rotation | null>(null);
  const dispatch = useAppDispatch();

  const handleRotate = (direction: Rotation) => {
    setRotation(direction);

    setTimeout(() => {
      dispatch(rotateGrid(direction));
      setRotation(null);
    }, 1000);
  };

  return (
    <div className="w-100" style={{ maxWidth: "60vh", touchAction: "none" }}>
      <div className="container-fluid d-flex flex-column gap-1">
        <Points />
        <Display />
        <div className="d-flex justify-content-between">
          <Button
            variant="tertiary"
            className="fs-3 bg-transparent border-0"
            onClick={() => handleRotate("left")}
            disabled={rotation !== null}
          >
            <FaRotateLeft />
          </Button>
          <Button
            variant="tertiary"
            className="fs-3 bg-transparent border-0"
            onClick={() => handleRotate("right")}
            disabled={rotation !== null}
          >
            <FaRotateRight />
          </Button>
        </div>
        <Grid rotation={rotation} />
      </div>
    </div>
  );
};

export default Game;
