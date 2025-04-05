import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const PointsBar = () => {
  const level = useSelector((state) => state.progress.level);
  const points = useSelector((state) => state.progress.points);
  const maxPoints = useSelector((state) => state.gameData.maxPoints);
  const progress = Math.sqrt(points / maxPoints) * 100;

  return (
    <div style={{ position: 'relative', width: '100%', height: '3rem' }}>
      <ProgressBar now={progress} style={{ height: '.5rem', position: 'absolute', top: '1.25rem', width: '100%' }}/>
      <div
        className='d-flex justify-content-between align-items-center w-100'
        style={{
          position: 'absolute',
          height: '100%',
        }}
      >
        { Array.from({ length: 9 }).map((_, index) => {
          if (index <= level) {
            return (
              <div
                key={index}
                className='rounded-circle'
                style={{
                  width: '1rem',
                  height: '1rem',
                  backgroundColor: 'var(--blue)',
                  border: '2px solid var(--blue)',
                  transition: '0.5s',
                }}
              />
            );
          } else if (level === index - 1) {
            return (
              <div
                key={index}
                className='d-flex justify-content-center align-items-center rounded-circle'
                style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: 'var(--bs-secondary-bg)',
                  border: '2px solid var(--blue)',
                  fontWeight: 'bold',
                  transition: '0.5s'
                }}
              >
                {Math.ceil(((index / 8) ** 2) * maxPoints)}
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className='rounded-circle'
                style={{
                  width: '1rem',
                  height: '1rem',
                  backgroundColor: 'var(--bs-secondary-bg)',
                  border: '2px solid var(--blue)',
                  transition: '0.5s',
                }}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default PointsBar;