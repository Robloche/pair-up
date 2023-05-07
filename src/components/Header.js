import Button from '@/components/Button';
import Image from 'next/image';
import React from 'react';
import Score from '@/components/Score';
import { SettingsContext } from '@/providers/SettingsProvider';
import restartIcon from '@/assets/restart.svg';
import settingsIcon from '@/assets/settings.svg';
import styles from '@/components/Header.module.css';

const Header = ({ attempts, missed, onReset }) => {
  const { openSettings } = React.useContext(SettingsContext);

  return (
    <div className={styles.header}>
      <Score attempts={attempts} missed={missed} />
      <Button className={`${styles.iconBtn} ${styles.settingsBtn}`} onClick={openSettings}>
        <Image alt='Settings icon' src={settingsIcon} />
      </Button>
      <Button className={`${styles.iconBtn} ${styles.restartBtn}`} onClick={onReset}>
        <Image alt='Restart icon' src={restartIcon} />
      </Button>
    </div>
  );
};

export default Header;
