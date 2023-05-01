import { ALL_TILES_HIDE_DURATION, SOLVE_INTERVAL_MAX, SOLVE_INTERVAL_MIN, TILE_HIDE_DURATION_MAX } from '@/helpers/constants';
import { GameState, State } from '@/helpers/types';
import { findHiddenTileIndex, getFoundTiles, getVisibleTiles, initializeTiles, setTilesAnimationDelay, shuffleArray } from '@/helpers/tiles';
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
  const [gameState, setGameState] = React.useState(GameState.Shuffling);
  const { applyCssRowColumnSettings, openSettings, settings } = React.useContext(SettingsContext);
  const [tiles, setTiles] = React.useState(() => initializeTiles(settings.rowCount, settings.columnCount));
  const shuffleTimeoutId = React.useRef(null);
  const turnTilesTimeoutId = React.useRef(null);
  const stopShufflingTimeoutId = React.useRef(null);
  const isResetting = React.useRef(false);

  const tileCount = settings.rowCount * settings.columnCount;
  const missed = attempts - getFoundTiles(tiles).length / 2;

  const hideTiles = React.useCallback((hideFound = false) => {
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
            // Game is finished (attempts + 1 since it hasn't been updated yet)
            if (checkUpdateHighScore(settings.rowCount, settings.columnCount, attempts + 1, missed)) {
              setGameState(GameState.FinishedHighScore);
            } else {
              setGameState(GameState.Finished);
            }
          }
        } else {
          // Missed
          setTimeout(hideTiles, ALL_TILES_HIDE_DURATION);
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

      setTimeout(() => solve(newTiles), getRandomInteger(SOLVE_INTERVAL_MIN, SOLVE_INTERVAL_MAX));
    },
    [tiles]
  );

  React.useEffect(() => {
    window.dbgHideTiles = hideTiles;
    window.dbgShowHint = showHint;
    window.dbgSolve = solve;
  }, [hideTiles, showHint, solve]);

  const shuffleTiles = React.useCallback(() => {
    setTiles((tiles) => shuffleArray([...tiles]));
    shuffleTimeoutId.current = setTimeout(shuffleTiles, 400);
  }, []);

  const turnTiles = React.useCallback(() => {
    setTiles((tiles) => {
      const newTiles = [...tiles];
      newTiles.forEach((tile) => (tile.state = State.Hidden));
      return newTiles;
    });
  }, []);

  const stopShuffling = React.useCallback(() => {
    if (shuffleTimeoutId.current) {
      clearTimeout(shuffleTimeoutId.current);
    }

    // Reset indices
    setTiles((tiles) => {
      const newTiles = [...tiles];
      newTiles.forEach((tile, i) => (tile.index = i));
      return newTiles;
    });

    setGameState(GameState.Playing);
    isResetting.current = false;
  }, []);

  const reset = React.useCallback(() => {
    if (isResetting.current) {
      // Prevent from starting shuffling twice in React strict mode
      return;
    }

    isResetting.current = true;

    const initTiles = () => {
      applyCssRowColumnSettings(settings.rowCount, settings.columnCount);
      setTiles(initializeTiles(settings.rowCount, settings.columnCount));
      setTilesAnimationDelay(false);
      shuffleTimeoutId.current = setTimeout(shuffleTiles, 1_000);
      turnTilesTimeoutId.current = setTimeout(turnTiles, 5_000);
      stopShufflingTimeoutId.current = setTimeout(stopShuffling, 7_000);
    };

    setGameState(GameState.Shuffling);
    setAttempts(0);
    setTiles([]);
    setTimeout(initTiles, TILE_HIDE_DURATION_MAX);
  }, [applyCssRowColumnSettings, settings.columnCount, settings.rowCount, shuffleTiles, stopShuffling, turnTiles]);

  React.useEffect(() => {
    reset();

    return () => {
      if (shuffleTimeoutId.current) {
        clearTimeout(shuffleTimeoutId.current);
      }
      if (turnTilesTimeoutId.current) {
        clearTimeout(turnTilesTimeoutId.current);
      }
      if (stopShufflingTimeoutId.current) {
        clearTimeout(stopShufflingTimeoutId.current);
      }
    };
  }, [reset, settings.columnCount, settings.rowCount]);

  React.useEffect(() => {
    if (gameState === GameState.Shuffling) {
      // Change transition-delay to a random number when hiding all tiles (new game) and to 0 in-game
      setTilesAnimationDelay(true);
    }
  }, [gameState]);

  return (
    <>
      {(gameState === GameState.Finished || gameState === GameState.FinishedHighScore) && (
        <Banner attempts={attempts} isHighScore={gameState === GameState.FinishedHighScore} missed={missed} onReset={reset} />
      )}
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
