import FocusLock from 'react-focus-lock';
import React from 'react';
import { SettingsContext } from '@/providers/SettingsProvider';
import { Sound } from '@/helpers/types';
import styles from './Banner.module.css';
import useSound from '@/hooks/use-sound';

const Banner = ({ attempts, isHighScore, missed, onReset }) => {
  const {
    settings: { rowCount, columnCount },
  } = React.useContext(SettingsContext);
  const { play } = useSound();

  play(isHighScore ? Sound.FinishedHighScore : Sound.Finished);

  return (
    <FocusLock aria-label='End banner' aria-modal className={styles.bannerWrapper} returnFocus role='dialog'>
      <p>
        You found<span className={styles.number}>{(rowCount * columnCount) / 2}</span>pairs in<span className={styles.number}>{attempts}</span>attempt{attempts > 1 ? 's' : ''} and missed
        <span className={styles.number}>{missed}</span>time{missed > 1 ? 's' : ''}.
      </p>
      {isHighScore && <p className={styles.highScore}>New High Score!</p>}
      <button className='action' onClick={onReset}>
        Play Again
      </button>
    </FocusLock>
  );
};

export default Banner;
