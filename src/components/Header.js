import Button from '@/components/Button';
import HighScores from '@/components/HighScores';
import Image from 'next/image';
import React from 'react';
import Score from '@/components/Score';
import { SettingsContext } from '@/providers/SettingsProvider';
import highScoresIcon from '@/assets/high-scores.svg';
import restartIcon from '@/assets/restart.svg';
import settingsIcon from '@/assets/settings.svg';
import styles from '@/components/Header.module.css';

const Header = ({ attempts, missed, onReset }) => {
  const [isHighScoresOpen, setIsHighScoresOpen] = React.useState(false);
  const { openSettings } = React.useContext(SettingsContext);

  const openHighScores = () => {
    setIsHighScoresOpen(true);
  };

  const closeHighScores = () => {
    setIsHighScoresOpen(false);
  };

  return (
    <>
      <div className={styles.header}>
        <Score attempts={attempts} missed={missed} />
        <Button className={`${styles.iconBtn} ${styles.settingsBtn}`} onClick={openSettings}>
          <Image alt='Settings icon' src={settingsIcon} />
        </Button>
        <Button className={`${styles.iconBtn} ${styles.restartBtn}`} onClick={onReset}>
          <Image alt='Restart icon' src={restartIcon} />
        </Button>
        <Button className={`${styles.iconBtn} ${styles.highScoresBtn}`} onClick={openHighScores}>
          <Image alt='High scores icon' src={highScoresIcon} />
        </Button>
      </div>
      {isHighScoresOpen && <HighScores onCloseHighScores={closeHighScores} />}
    </>
  );
};

export default Header;
