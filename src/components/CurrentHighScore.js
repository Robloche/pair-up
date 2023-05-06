import React from 'react';
import { SettingsContext } from '@/providers/SettingsProvider';
import { getHighScore } from '@/helpers/score';
import styles from '@/components/CurrentHighScore.module.css';

const CurrentHighScore = () => {
  const { settings } = React.useContext(SettingsContext);
  const highScore = getHighScore(settings.rowCount, settings.columnCount);

  if (!highScore) {
    return <div className={styles.noHighScore}>No high score yet!</div>;
  }

  return (
    <div>
      <span className={styles.label}>HIGH SCORE:</span>
      <span className={styles.playerName}>{highScore.playerName}</span>
      <span className={styles.number}>
        {highScore.attempts} &#8211; {highScore.missed}
      </span>
    </div>
  );
};

export default CurrentHighScore;
