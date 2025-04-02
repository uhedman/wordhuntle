import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const PointsBar = () => {
  const points = useSelector((state) => state.storage.points);
  const maxPoints = useSelector((state) => state.game.maxPoints);
  const levels = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];

  const progress = Math.sqrt(points / maxPoints) * 100;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <ProgressBar now={progress} style={{ height: '.5rem' }}/>
      <div 
        className='d-flex justify-content-between align-items-center w-100'
        style={{
          position: 'absolute',
          top: '-1.25rem',
        }}
      >
        { levels.map((level, index) => {
          if (progress < level && progress > level - 12.5) {
            return (
              <div
                key={index}
                className='d-flex justify-content-center align-items-center rounded-circle'
                style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: 'inherit',
                  border: '2px solid var(--blue)',
                  fontWeight: 'bold'
                }}
              >
                {Math.ceil(((level / 100) ** 2) * maxPoints)}
              </div>
            )
          } else if (progress < level) {
            return (
              <div
                key={index}
                className='rounded-circle'
                style={{
                  width: '1rem',
                  height: '1rem',
                  backgroundColor: 'inherit',
                  border: '2px solid var(--blue)',
                }}
              />
            )
          } else {
            return (
              <div
                key={index}
                className='rounded-circle'
                style={{
                  width: '1rem',
                  height: '1rem',
                  backgroundColor: 'var(--blue)',
                  border: '2px solid var(--blue)',
                }}
              />
            )
          }
        })}
      </div>
    </div>
  );
};

export default PointsBar;
