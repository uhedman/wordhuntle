import { useEffect } from "react";
import { useAppDispatch } from "@/shared/hooks";
import { stopDrag } from "@/features/drag/thunks/stopDrag";

export const useStopDrag = () => {
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
};
