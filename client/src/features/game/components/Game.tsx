import Display from "@/features/display/components/Display";
import Grid from "@/features/game/components/Grid";
import Points from "@/features/game/components/Points";
import { useStopDrag } from "@/features/drag/hooks/useStopDrag";
import { useConfetti } from "@/features/game/hooks/useConfetti";

const Game = () => {
  useStopDrag();
  useConfetti();

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
