import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deselect } from '../redux/slices/gameSlice';

const Word = () => {
  const word = useSelector(state => state.game.word);
  const [showBubble, setShowBubble] = useState(false);
  const dispatch = useDispatch();

  const specialMessages = useMemo(() => ({
    'too short': 'bg-warning text-dark shake',
    'not found': 'bg-danger text-white shake',
    'found': 'bg-success text-white showup',
    'already found': 'bg-info text-white shake'
  }), []);

  useEffect(() => {
    if (specialMessages[word]) {
      setShowBubble(true);
      const timer = setTimeout(() => {
        setShowBubble(false);
        dispatch(deselect(''));
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowBubble(false);
    }
  }, [dispatch, specialMessages, word]);

  return (
    <div className='p-2 fs-1 fw-bold text-center'>
      {showBubble ? (
        <span className={`px-2 rounded-pill ${specialMessages[word]}`}>
          {word.toUpperCase()}
        </span>
      ) : (
        <p className='m-0'>{word.toUpperCase()}&nbsp;</p>
      )}
    </div>
  );
}

export default Word;
