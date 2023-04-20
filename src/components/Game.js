import { GameState, State } from '@/helpers/types';
import { findHiddenTileIndex, getFoundTiles, getVisibleTiles, initializeTiles } from '@/helpers/tiles';
import Banner from '@/components/Banner';
import Image from 'next/image';
import React from 'react';
import Score from '@/components/Score';
import { SettingsContext } from '@/providers/SettingsProvider';
import Tiles from '@/components/Tiles';
import { checkUpdateHighScore } from '@/helpers/score';
import { getRandomInteger } from '@/helpers/math';
import restartIcon from '../assets/restart.svg';
import settingsIcon from '../assets/settings.svg';
import styles from './Game.module.css';

const Game = () => {
  const [attempts, setAttempts] = React.useState(0);
  const [gameState, setGameState] = React.useState(GameState.Playing);
  const { openSettings, settings } = React.useContext(SettingsContext);
  const [tiles, setTiles] = React.useState(() => initializeTiles(settings.rowCount, settings.columnCount));

  const tileCount = settings.rowCount * settings.columnCount;
  const missed = attempts - getFoundTiles(tiles).length / 2;

  const hideTiles = React.useCallback((hideFound = false) => {
    // Change transition-delay to a random number when hiding all tiles (new game) and to 0 in-game
    const tilesElt = document.querySelectorAll('button[data-tile]');
    tilesElt.forEach((tileElt) => tileElt.style.setProperty('--tile-animation-delay', hideFound ? `${getRandomInteger(0, 200)}ms` : '0ms'));

    setTiles((tiles) =>
      tiles.map((t) => ({
        ...t,
        state: hideFound || t.state === State.Visible ? State.Hidden : t.state,
      }))
    );
  }, []);

  const showTile = React.useCallback(
    (index, isHint) => {
      const newTiles = [...tiles];
      newTiles[index].state = State.Visible;
      newTiles[index].discovered = true;

      const visibleTiles = getVisibleTiles(tiles);

      if (visibleTiles.length === 2) {
        if (!isHint) {
          setAttempts(attempts + 1);
        }
        if (!isHint && visibleTiles[0].char === visibleTiles[1].char) {
          // Pair found
          newTiles[visibleTiles[0].index].state = State.Found;
          newTiles[visibleTiles[1].index].state = State.Found;

          // Check end
          if (getFoundTiles(tiles).length === tileCount) {
            // Game is finished
            if (checkUpdateHighScore(settings.rowCount, settings.columnCount, attempts, missed)) {
              setGameState(GameState.FinishedHighScore);
            } else {
              setGameState(GameState.Finished);
            }
          }
        } else {
          // Missed
          setTimeout(hideTiles, 1_000);
        }
      }

      setTiles(newTiles);
    },
    [attempts, hideTiles, missed, settings.columnCount, settings.rowCount, tileCount, tiles]
  );

  const showHint = React.useCallback(() => {
    const i = findHiddenTileIndex(tiles, 0, null);
    if (i === null) {
      return;
    }

    const j = findHiddenTileIndex(tiles, i + 1, tiles[i].char);
    if (j === null) {
      return null;
    }

    showTile(i, true);
    showTile(j, true);
  }, [showTile, tiles]);

  const solve = React.useCallback(
    (solvingTiles = null) => {
      const newTiles = [...(solvingTiles ?? tiles)];

      const i = findHiddenTileIndex(newTiles, 0, null);
      const j = findHiddenTileIndex(newTiles, i + 1, newTiles[i].char);
      if (j === null) {
        return null;
      }

      newTiles[i].state = State.Found;
      newTiles[j].state = State.Found;
      setTiles(newTiles);
      setAttempts((attempts) => attempts + 1);

      if (newTiles.every(({ state }) => state === State.Found)) {
        return;
      }

      setTimeout(() => solve(newTiles), getRandomInteger(100, 300));
    },
    [tiles]
  );

  React.useEffect(() => {
    window.dbgHideTiles = hideTiles;
    window.dbgShowHint = showHint;
    window.dbgSolve = solve;
  }, [hideTiles, showHint, solve]);

  const reset = React.useCallback(() => {
    const initTiles = () => setTiles(initializeTiles(settings.rowCount, settings.columnCount));

    setGameState(GameState.Playing);
    setAttempts(0);
    hideTiles(true);
    setTimeout(initTiles, 500);
  }, [hideTiles, settings.columnCount, settings.rowCount]);

  React.useEffect(() => {
    reset();
  }, [reset, settings.columnCount, settings.rowCount]);

  return (
    <>
      {gameState !== GameState.Playing && <Banner attempts={attempts} isHighScore={gameState === GameState.FinishedHighScore} missed={missed} onReset={reset} />}
      <div className={styles.gameWrapper}>
        <button className={styles.iconBtn} onClick={openSettings}>
          <Image alt='Settings icon' src={settingsIcon} />
        </button>
        <button className={`${styles.iconBtn} ${styles.restartBtn}`} onClick={reset}>
          <Image alt='Restart icon' src={restartIcon} />
        </button>
        <Score attempts={attempts} missed={missed} />
        <Tiles showTile={showTile} tiles={tiles} />
      </div>
    </>
  );
};

export default Game;
