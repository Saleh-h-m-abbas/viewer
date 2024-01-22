import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import Icon from '../Icon';
import ProgressLoadingBar from '../ProgressLoadingBar';

/**
 *  A React component that renders a loading indicator.
 * if progress is not provided, it will render an infinite loading indicator
 * if progress is provided, it will render a progress bar
 * Optionally a textBlock can be provided to display a message
 */
function LoadingIndicatorProgress({ className, textBlock, progress }) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => (prevDots.length < 3 ? prevDots + '.' : ''));
    }, 500); // Update every 500 milliseconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);
  return (
    <div
      className={classNames(
        'absolute top-0 left-0 z-40 flex flex-col items-center justify-center space-y-5',
        className
      )}
    >
      {/*
      Saleh Abbas
      <Icon
        name="loading-ohif-mark"
        className="h-60 w-60 text-white"
      /> */}
      <div style={{ color: 'white' }}>Loading{dots}</div>
      <div className="w-48">
        <ProgressLoadingBar progress={progress} />
      </div>
      {textBlock}
    </div>
  );
}

export default LoadingIndicatorProgress;
