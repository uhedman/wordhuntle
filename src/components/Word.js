import React from 'react';
import { useSelector } from "react-redux";

const Word = () => {
  const word = useSelector(state => state.game.word);

  return (
    <div className='fs-1 fw-bold text-center'>
      <p className='m-0'>{word.toUpperCase()}&nbsp;</p>
    </div>
  );
}

export default Word;