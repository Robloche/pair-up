import React from 'react';
import { SettingsContext } from '@/providers/SettingsProvider';
import Tile from '@/components/Tile';
import { getVisibleTiles } from '@/helpers/tiles';
import styles from './Tiles.module.css';
import useArrowNavigation from '@/hooks/use-arrow-navigation';

const Tiles = ({ showTile, tiles }) => {
  const { settings } = React.useContext(SettingsContext);

  useArrowNavigation(settings.rowCount, settings.columnCount, settings.cycle);

  return (
    <div className={styles.tilesWrapper} id='tiles-grid'>
      {tiles.map((tile) => (
        <Tile key={tile.index} showTile={showTile} tile={tile} />
      ))}
      {getVisibleTiles(tiles).length === 2 && <div className={styles.lockMask} />}
    </div>
  );
};

export default Tiles;
