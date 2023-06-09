import {
  ALL_TILES_HIDE_DURATION,
  HIDDEN_TILES_SHUFFLING_DURATION,
  ORDERED_TILES_VISIBILITY_DURATION,
  SOLVE_INTERVAL_MAX,
  SOLVE_INTERVAL_MIN,
  TILES_SHUFFLE_ROUND_DELAY_DURATION,
  VISIBLE_TILES_SHUFFLING_DURATION,
} from '@/helpers/constants';
import { GameState, Sound, TileState } from '@/helpers/types';
import { checkHighScore, saveHighScore } from '@/helpers/score';
import { findHiddenTileIndex, getFoundTiles, getVisibleTiles, initializeTiles, setTilesAnimationDelay, shuffleArray } from '@/helpers/tiles';
import Banner from '@/components/Banner';
import CurrentHighScore from '@/components/CurrentHighScore';
import Header from '@/components/Header';
import PlayerNamePrompt from '@/components/PlayerNamePrompt';
import React from 'react';
import { SettingsContext } from '@/providers/SettingsProvider';
import Tiles from '@/components/Tiles';
import application from '../../package.json';
import { getRandomInteger } from '@/helpers/math';
import { produce } from 'immer';
import styles from './Game.module.css';
import useSound from '@/hooks/use-sound';

const Game = () => {
  const [attempts, setAttempts] = React.useState(0);
  const [gameState, setGameState] = React.useState(GameState.Shuffling);
  const { applyCssRowColumnSettings, clearTriggerReset, settings, triggerReset } = React.useContext(SettingsContext);
  const [tiles, setTiles] = React.useState(() => initializeTiles(settings.rowCount, settings.columnCount));

  const shuffleTimeoutId = React.useRef(null);
  const turnTilesTimeoutId = React.useRef(null);
  const stopShufflingTimeoutId = React.useRef(null);
  const nextSolvingTimeoutId = React.useRef(null);
  const hideTimeoutId = React.useRef(null);

  const { play } = useSound();

  const tileCount = settings.rowCount * settings.columnCount;
  const missed = attempts - getFoundTiles(tiles).length / 2;
  const visibleTileCount = getVisibleTiles(tiles).length;

  const clearAllTimeouts = React.useCallback(() => {
    if (shuffleTimeoutId.current) {
      clearTimeout(shuffleTimeoutId.current);
    }
    if (turnTilesTimeoutId.current) {
      clearTimeout(turnTilesTimeoutId.current);
    }
    if (stopShufflingTimeoutId.current) {
      clearTimeout(stopShufflingTimeoutId.current);
    }
    if (hideTimeoutId.current) {
      clearTimeout(hideTimeoutId.current);
    }
    if (nextSolvingTimeoutId.current) {
      clearTimeout(nextSolvingTimeoutId.current);
    }
  }, []);

  const hideTiles = React.useCallback((hideFound = false) => {
    setTiles(
      produce((draft) => {
        draft.forEach((tile) => (tile.state = hideFound || tile.state === TileState.Visible ? TileState.Hidden : tile.state));
      })
    );
  }, []);

  React.useEffect(() => {
    if (visibleTileCount === 2) {
      hideTimeoutId.current = setTimeout(hideTiles, ALL_TILES_HIDE_DURATION);
    }

    return () => {
      if (hideTimeoutId.current) {
        clearTimeout(hideTimeoutId.current);
      }
    };
  }, [hideTiles, visibleTileCount]);

  const showTile = React.useCallback(
    (index, isHint) => {
      play(Sound.TileTurn);

      setTiles(
        produce((draft) => {
          draft[index].state = TileState.Visible;
          draft[index].discovered = true;
        })
      );

      const firstTurnedTile = tiles.find((tile) => tile.state === TileState.Visible);

      if (!firstTurnedTile) {
        // First turned tile
        return;
      }

      if (isHint) {
        // Hint shown
        return;
      }

      // 2 tiles have been turned
      setAttempts(attempts + 1);

      if (tiles[index].char === firstTurnedTile.char) {
        // Pair found
        play(Sound.Found);

        setTiles(
          produce((draft) => {
            draft[index].state = TileState.Found;
            draft[firstTurnedTile.index].state = TileState.Found;
          })
        );

        // Check end (-2 because last pair is not persisted yet)
        if (getFoundTiles(tiles).length === tileCount - 2) {
          // Game is finished (attempts + 1 since it hasn't been updated yet)
          if (checkHighScore(settings.rowCount, settings.columnCount, attempts + 1, missed)) {
            setGameState(GameState.PromptPlayerName);
            //setGameState(GameState.FinishedHighScore);
          } else {
            setGameState(GameState.Finished);
          }
        }
      } else {
        // Missed
        play(Sound.Miss);
      }
    },
    [attempts, missed, play, settings.columnCount, settings.rowCount, tileCount, tiles]
  );

  const handlePlayerNameSet = React.useCallback(
    (playerName) => {
      if (gameState !== GameState.PromptPlayerName) {
        return;
      }

      saveHighScore(settings.rowCount, settings.columnCount, attempts, missed, playerName || 'John Doe');
      setGameState(GameState.FinishedHighScore);
    },
    [attempts, missed, gameState, settings.columnCount, settings.rowCount]
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

  const solve = React.useCallback(() => setGameState(GameState.Solving), []);

  React.useEffect(() => {
    if (gameState !== GameState.Solving) {
      return;
    }

    if (tiles.every(({ state }) => state === TileState.Found)) {
      // Game solved
      setGameState(GameState.Playing);
      return;
    }

    nextSolvingTimeoutId.current = setTimeout(() => {
      const i = findHiddenTileIndex(tiles, 0, null);
      const j = findHiddenTileIndex(tiles, i + 1, tiles[i].char);
      if (j === null) {
        return;
      }

      setAttempts((attempts) => attempts + 1);
      setTiles(
        produce((draft) => {
          draft[i].state = TileState.Found;
          draft[j].state = TileState.Found;
        })
      );
    }, getRandomInteger(SOLVE_INTERVAL_MIN, SOLVE_INTERVAL_MAX));

    return () => {
      if (nextSolvingTimeoutId.current) {
        clearTimeout(nextSolvingTimeoutId.current);
      }
    };
  }, [gameState, tiles]);

  React.useEffect(() => {
    window.dbgHideTiles = hideTiles;
    window.dbgShowHint = showHint;
    window.dbgSolve = solve;
  }, [hideTiles, showHint, solve]);

  const shuffleTiles = React.useCallback(
    (playSound) => {
      if (playSound) {
        play(Sound.Shuffle, HIDDEN_TILES_SHUFFLING_DURATION - ORDERED_TILES_VISIBILITY_DURATION);
      }
      setTiles(produce((draft) => shuffleArray(draft)));
      shuffleTimeoutId.current = setTimeout(shuffleTiles, TILES_SHUFFLE_ROUND_DELAY_DURATION, false);
    },
    [play]
  );

  const turnTiles = React.useCallback(() => {
    setTiles(produce((draft) => draft.forEach((tile) => (tile.state = TileState.Hidden))));
  }, []);

  const stopShuffling = React.useCallback(() => {
    clearAllTimeouts();

    // Reset indices after shuffle
    setTiles(produce((draft) => draft.forEach((tile, i) => (tile.index = i))));

    setGameState(GameState.Playing);
    setTilesAnimationDelay();
  }, [clearAllTimeouts]);

  const reset = React.useCallback(() => {
    const initTiles = () => {
      applyCssRowColumnSettings(settings.rowCount, settings.columnCount);
      setTiles(initializeTiles(settings.rowCount, settings.columnCount));
      if (settings.showShuffle) {
        // Show shuffling animation

        // Timeouts have to be cleared here in case of React.Strict context (useEffect() firing twice but cleanup code runs before timeouts are set)
        clearAllTimeouts();

        shuffleTimeoutId.current = setTimeout(shuffleTiles, ORDERED_TILES_VISIBILITY_DURATION, true);
        turnTilesTimeoutId.current = setTimeout(turnTiles, VISIBLE_TILES_SHUFFLING_DURATION);
        stopShufflingTimeoutId.current = setTimeout(stopShuffling, HIDDEN_TILES_SHUFFLING_DURATION);
      } else {
        // Skip shuffling animation
        turnTiles();
        setTiles(produce((draft) => shuffleArray(draft)));
        stopShuffling();
      }
    };

    setGameState(GameState.Shuffling);
    setAttempts(0);
    setTiles([]);
    setTimeout(initTiles, 10);
    clearTriggerReset();
  }, [applyCssRowColumnSettings, clearAllTimeouts, clearTriggerReset, settings.columnCount, settings.rowCount, settings.showShuffle, shuffleTiles, stopShuffling, turnTiles]);

  React.useEffect(() => {
    if (triggerReset) {
      clearAllTimeouts();
      reset();
    }

    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts, reset, triggerReset]);

  return (
    <>
      {(gameState === GameState.Finished || gameState === GameState.FinishedHighScore) && (
        <Banner attempts={attempts} isHighScore={gameState === GameState.FinishedHighScore} missed={missed} onReset={reset} />
      )}
      {gameState === GameState.PromptPlayerName && <PlayerNamePrompt onClosePlayerNamePrompt={handlePlayerNameSet} />}
      <div className={styles.gameWrapper}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Pair Up!</h1>
          <div className={styles.version}>v{application.version}</div>
        </div>
        <Header attempts={attempts} missed={missed} onReset={reset} />
        <CurrentHighScore />
        <Tiles gameState={gameState} showTile={showTile} tiles={tiles} />
      </div>
    </>
  );
};

export default Game;
