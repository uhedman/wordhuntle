import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from 'react-bootstrap';
import { clearDisplay } from '../redux/slices/displaySlice';

const Display = () => {
  const text = useSelector(state => state.display.text);
  const showBubble = useSelector(state => state.display.showBubble);
  const className = useSelector(state => state.display.className);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showBubble) {
      const timer = setTimeout(() => {
        dispatch(clearDisplay());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [dispatch, showBubble]);

  return (
    <div className='fs-1 fw-bold text-center'>
      { showBubble ? (
        <Badge className={className}>
          {text}
        </Badge>
      ) : (
        <p className='m-0'>{text.toUpperCase()}&nbsp;</p>
      )}
    </div>
  );
}

export default Display;
