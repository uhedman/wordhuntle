import { Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/slices/modalSlice";


const Points = () => {
  const points = useSelector(state => state.storage.points);
  const found = useSelector(state => state.storage.found);
  const dispatch = useDispatch();

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <span className='fs-1 fw-bold'>{points} pts</span>
        <div className='d-flex align-items-baseline'>
          <span className='fs-3'>{found.length} {found.length === 1 ? 'palabra' : 'palabras'}</span>
          <Button variant='tertiary' className="fs-3 bg-transparent border-0" onClick={() => dispatch(openModal('words'))}>
            <FaEye />
          </Button>
        </div>
      </div>
      <div>Here will be the points bar</div>
    </div>
  );
}

export default Points;