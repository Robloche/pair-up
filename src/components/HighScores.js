import Modal from '@/components/Modal';
import React from 'react';
import { getAllowedSizes } from '@/helpers/tiles';
import { loadHighScores } from '@/helpers/score';
import styles from './HighScores.module.css';

const HighScores = ({ onCloseHighScores }) => {
  const [showAll, setShowAll] = React.useState(false);
  const showAllId = React.useId();

  const handleShowAllOnChange = React.useCallback((event) => {
    setShowAll(event.target.checked);
  }, []);

  const highScores = loadHighScores() ?? {};
  const allSizes = getAllowedSizes();

  return (
    <Modal label='Player name prompt' onClose={onCloseHighScores}>
      <div className={styles.content}>
        <h1>HIGH SCORES</h1>
        <div className={styles.filter}>
          <input checked={showAll} id={showAllId} onChange={handleShowAllOnChange} type='checkbox' />
          <label htmlFor={showAllId} className={styles.label}>
            Show all
          </label>
        </div>
        <div className={styles.scoresWrapper}>
          <div className={styles.header}>
            <span title='Number of rows'>R</span>
            <span title='Number of columns'>C</span>
            <span className={styles.left} title='Player name'>
              PLAYER
            </span>
            <span title='Number of attempts'>A</span>
            <span title='Number of misses'>M</span>
          </div>
          <ul>
            {allSizes.map((size) => {
              const highScore = highScores[`${size.rows}x${size.columns}`];

              if (!highScore && !showAll) {
                // Hide empty high scores
                return null;
              }

              const [player, attempts, missed] = (highScore ?? '..........:/:/').split(':');

              return (
                <li key={`${size.rows}x${size.columns}`}>
                  <span>{size.rows}</span>
                  <span>{size.columns}</span>
                  <span className={styles.left}>{player}</span>
                  <span>{attempts}</span>
                  <span>{missed}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default HighScores;
