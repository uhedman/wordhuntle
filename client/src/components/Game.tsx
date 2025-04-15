import { useEffect } from "react";
import { stopDrag } from "@/store/thunks/dragThunks";
import { useAppDispatch } from "@/hooks";
import Display from "@/components/Display";
import Grid from "@/components/Grid";
import Points from "@/components/Points";

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
  }, [dispatch]);

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
