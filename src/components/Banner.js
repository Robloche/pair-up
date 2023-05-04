import FocusLock from 'react-focus-lock';
import React from 'react';
import { SettingsContext } from '@/providers/SettingsProvider';
import { getHighScore } from '@/helpers/score';
import styles from './Banner.module.css';

const Banner = ({ attempts, isHighScore, missed, onReset }) => {
  const {
    settings: { rowCount, columnCount },
  } = React.useContext(SettingsContext);
  const highScore = getHighScore(rowCount, columnCount);

  return (
    <FocusLock className={styles.bannerWrapper} returnFocus>
      <p>
        You found <span className={styles.number}>{(rowCount * columnCount) / 2}</span> pairs in <span className={styles.number}>{attempts}</span> attempt{attempts > 1 ? 's' : ''} and missed{' '}
        <span className={styles.number}>{missed}</span> time
        {missed > 1 ? 's' : ''}.
      </p>
      <p className={styles.highScore}>
        {isHighScore ? (
          'New High Score!'
        ) : (
          <>
            High Score:{' '}
            <span className={styles.number}>
              {highScore.attempts} &#8211; {highScore.missed}
            </span>
          </>
        )}
      </p>
      <button className='action' onClick={onReset}>
        Play Again
      </button>
    </FocusLock>
  );
};

export default Banner;
