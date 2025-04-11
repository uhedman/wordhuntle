import { useEffect } from "react";
import { stopDrag } from "../redux/slices/dragSlice";
import { useAppDispatch } from "@/hooks";
import Display from "./Display";
import Grid from "./Grid";
import Points from "./Points";

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
