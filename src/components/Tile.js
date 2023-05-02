import React from 'react';
import { SettingsContext } from '@/providers/SettingsProvider';
import { State } from '@/helpers/types';
import styles from './Tile.module.css';
import { getRandomInteger } from '@/helpers/math';
import { TILE_HIDE_DURATION_MAX, TILE_HIDE_DURATION_MIN } from '@/helpers/constants';

const Tile = ({ showTile, tile, ...rest }) => {
  const {
    settings: { showDiscovered },
  } = React.useContext(SettingsContext);
  const tileRef = React.useRef();

  const handleOnClick = () => {
    if (tile.state === State.Visible || tile.state === State.Found) {
      return;
    }

    showTile(tile.index);
  };

  React.useEffect(() => {
    tileRef.current?.style.setProperty('--tile-animation-delay', `${getRandomInteger(TILE_HIDE_DURATION_MIN, TILE_HIDE_DURATION_MAX)}ms`);
  }, []);

  return (
    <button
      className={`${styles.tileWrapper} ${styles[tile.state]} ${showDiscovered && tile.discovered ? styles.discovered : ''}`}
      data-tile={true}
      id={tile.index.toString()}
      onClick={handleOnClick}
      ref={tileRef}
      {...rest}
    >
      <div className={styles.innerTile}>
        <div className={styles.front}>{tile.char}</div>
        <div className={styles.back} />
      </div>
      <div className={styles.hover} />
    </button>
  );
};

export default Tile;
