import React from 'react';
import { SettingsContext } from '@/providers/SettingsProvider';
import { State } from '@/helpers/types';
import styles from './Tile.module.css';

const Tile = ({ showTile, tile }) => {
  const {
    settings: { showDiscovered },
  } = React.useContext(SettingsContext);

  const handleOnClick = () => {
    if (tile.state === State.Visible || tile.state === State.Found) {
      return;
    }

    showTile(tile.index);
  };

  return (
    <button className={`${styles.tileWrapper} ${styles[tile.state]} ${showDiscovered && tile.discovered ? styles.discovered : ''}`} data-tile={true} id={tile.index.toString()} onClick={handleOnClick}>
      <div className={styles.innerTile}>
        <div className={styles.front}>{tile.char}</div>
        <div className={styles.back} />
      </div>
      <div className={styles.hover} />
    </button>
  );
};

export default Tile;
