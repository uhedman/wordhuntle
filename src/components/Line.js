import React from 'react';
import { useSelector } from 'react-redux';

const Line = () => {
  const order = useSelector(state => state.game.order);

  const lineStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  };

  return (
    <svg style={lineStyle}>
      { order.slice(1).map((item, index) => {
        const [x1, y1] = order[index];
        const [x2, y2] = item;
        return (
          <line 
            key={index} 
            x1={`${y1 * 25 + 12.5}%`} 
            y1={`${x1 * 25 + 12.5}%`} 
            x2={`${y2 * 25 + 12.5}%`} 
            y2={`${x2 * 25 + 12.5}%`} 
            stroke='blue' 
            strokeWidth='8' 
            strokeLinecap='round'
            opacity={0.5}
          />
        );
      })}
    </svg>
  );
};

export default Line;