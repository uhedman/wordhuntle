import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const PointsBar = () => {
  const level = useSelector(state => state.progress.level);
  const points = useSelector(state => state.progress.points);
  const maxPoints = useSelector(state => state.gameData.maxPoints);
  const progress = Math.sqrt(points / maxPoints) * 100;

  return (
    <div className='position-relative w-100' style={{ height: '3rem' }}>
      <ProgressBar className='position-absolute w-100' now={progress} style={{ height: '.5rem', top: '1.25rem'}}/>
      <div className='d-flex justify-content-between align-items-center w-100 position-absolute h-100'>
        { Array.from({ length: 9 }).map((_, index) => {
          if (index <= level) {
            return (
              <div
                key={index}
                className='rounded-circle'
                style={{ width: '1rem', height: '1rem', backgroundColor: 'var(--blue)', border: '2px solid var(--blue)', transition: '0.5s' }}
              />
            );
          } else if (level === index - 1) {
            if (maxPoints === null) {
              return (
                <div 
                  key={index}
                  className="placeholder-glow d-flex rounded-circle"
                  style={{ width: '3rem', height: '3rem', backgroundColor: 'var(--bs-secondary-bg)', border: '2px solid var(--blue)', fontWeight: 'bold', transition: '0.5s' }}
                >
                  <span className="placeholder d-flex flex-grow-1 rounded-circle" />
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className='d-flex justify-content-center align-items-center rounded-circle'
                  style={{ width: '3rem', height: '3rem', backgroundColor: 'var(--bs-secondary-bg)', border: '2px solid var(--blue)', fontWeight: 'bold', transition: '0.5s' }}
                >
                  {Math.ceil(((index / 8) ** 2) * maxPoints)}
                </div>
              );
            }
          } else {
            return (
              <div 
                key={index} 
                className='rounded-circle' 
                style={{ width: '1rem', height: '1rem', backgroundColor: 'var(--bs-secondary-bg)', border: '2px solid var(--blue)', transition: '0.5s' }}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default PointsBar;