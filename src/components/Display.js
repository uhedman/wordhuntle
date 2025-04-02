import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deselect } from '../redux/slices/gameSlice';
import { Badge } from 'react-bootstrap';

const Display = () => {
  const displayText = useSelector(state => state.game.displayText);
  const displayShowBubble = useSelector(state => state.game.displayShowBubble);
  const displayClassName = useSelector(state => state.game.displayClassName);
  const dispatch = useDispatch();

  useEffect(() => {
    if (displayShowBubble) {
      const timer = setTimeout(() => {
        dispatch(deselect(''));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [dispatch, displayShowBubble]);

  return (
    <div className='p-2 fs-1 fw-bold text-center'>
      { displayShowBubble ? (
        <Badge className={`${displayClassName}`}>
          {displayText}
        </Badge>
      ) : (
        <p className='m-0'>{displayText.toUpperCase()}&nbsp;</p>
      )}
    </div>
  );
}

export default Display;
