import { Flipper, Flipped } from 'react-flip-toolkit';
import React from 'react';
import { SettingsContext } from '@/providers/SettingsProvider';
import Tile from '@/components/Tile';
import { getVisibleTiles } from '@/helpers/tiles';
import styles from './Tiles.module.css';
import useArrowNavigation from '@/hooks/use-arrow-navigation';

const Tiles = ({ gameState, showTile, tiles }) => {
  const { settings } = React.useContext(SettingsContext);

  useArrowNavigation(settings.rowCount, settings.columnCount, settings.cycle, gameState);

  return (
    <div className={styles.tilesWrapper}>
      <Flipper className={styles.tilesWrapper} flipKey={tiles.map((tile) => tile.key).join('')} spring='gentle'>
        {tiles.map((tile) => (
          <Flipped key={tile.key} flipId={tile.key}>
            <Tile showTile={showTile} tile={tile} />
          </Flipped>
        ))}
      </Flipper>
      {getVisibleTiles(tiles).length === 2 && <div className={styles.lockMask} />}
    </div>
  );
};

export default Tiles;
