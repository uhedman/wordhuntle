import { useAppSelector, useAppDispatch } from "@/shared/hooks";
import { useEffect } from "react";
import { clearDisplay } from "@/features/display/slices/displaySlice";

export const useBubble = () => {
  const showBubble = useAppSelector((state) => state.display.showBubble);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (showBubble) {
      const timer = setTimeout(() => {
        dispatch(clearDisplay());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showBubble]);

  return { showBubble };
};
