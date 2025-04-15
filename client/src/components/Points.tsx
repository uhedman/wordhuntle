import { Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { openModal } from "@/store/slices/modalSlice";
import PointsBar from "@/components/PointsBar";

const Points = () => {
  const points = useAppSelector((state) => state.progress.points) || 0; // TODO
  const found = useAppSelector((state) => state.progress.found) || []; // TODO
  const dispatch = useAppDispatch();

  return (
    <div className="d-flex justify-content-between flex-column gap-3">
      <div className="d-flex justify-content-between align-items-end">
        <span className="fs-1 fw-bold">{points} pts</span>
        <div className="d-flex align-items-baseline">
          <span className="fs-3">
            {found.length} {found.length === 1 ? "palabra" : "palabras"}
          </span>
          <Button
            variant="tertiary"
            className="fs-3 bg-transparent border-0"
            onClick={() => dispatch(openModal("words"))}
          >
            <FaEye />
          </Button>
        </div>
      </div>
      <PointsBar />
    </div>
  );
};

export default Points;
