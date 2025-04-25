import { useAppSelector } from "@/shared/hooks";
import { Badge } from "react-bootstrap";
import { useBubble } from "@/features/display/hooks/useBubble";

const Display = () => {
  const text = useAppSelector((state) => state.display.text);
  const className = useAppSelector((state) => state.display.className);
  const { showBubble } = useBubble();

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
