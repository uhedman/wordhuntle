import { useEffect } from "react";
import { Badge } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { clearDisplay } from "@/features/game/slices/displaySlice";

const Display = () => {
  const text = useAppSelector((state) => state.display.text);
  const showBubble = useAppSelector((state) => state.display.showBubble);
  const className = useAppSelector((state) => state.display.className);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (showBubble) {
      const timer = setTimeout(() => {
        dispatch(clearDisplay());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [dispatch, showBubble]);

  return (
    <div className="fs-1 fw-bold text-center">
      {showBubble ? (
        <Badge className={className}>{text}</Badge>
      ) : (
        <p className="m-0">{text.toUpperCase()}&nbsp;</p>
      )}
    </div>
  );
};

export default Display;
