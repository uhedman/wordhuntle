import { stopDrag } from "@/features/drag/thunks/stopDrag";
import { useAppDispatch } from "@/shared/hooks";
import { useEffect } from "react";
import Display from "@/features/game/components/Display";
import Grid from "@/features/game/components/Grid";
import Points from "@/features/game/components/Points";

const Game = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleEnd = () => {
      dispatch(stopDrag());
    };

    document.addEventListener("pointerup", handleEnd);
    document.addEventListener("touchend", handleEnd);

    return () => {
      document.removeEventListener("pointerup", handleEnd);
      document.removeEventListener("touchend", handleEnd);
    };
  }, []);

  return (
    <div
      className="p-3 w-100"
      style={{ maxWidth: "60vh", touchAction: "none" }}
    >
      <div className="container-fluid d-flex flex-column gap-3">
        <Points />
        <Display />
        <Grid />
      </div>
    </div>
  );
};

export default Game;
