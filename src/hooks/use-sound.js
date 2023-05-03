import React from 'react';
import { SettingsContext } from '@/providers/SettingsProvider';

const useSound = () => {
  const { settings } = React.useContext(SettingsContext);
  const found = React.useMemo(() => new Audio('/sounds/found-full.m4a'), []);
  const miss = React.useMemo(() => new Audio('/sounds/miss-full.m4a'), []);
  const move = React.useMemo(() => new Audio('/sounds/keyboard-move-full.m4a'), []);
  const tileTurn = React.useMemo(() => new Audio('/sounds/tile-turn-full.m4a'), []);

  const play = React.useCallback(
    (audio) => {
      if (settings.sound) {
        audio.play();
      }
    },
    [settings]
  );

  const playFound = React.useCallback(() => play(found), [found, play]);
  const playMiss = React.useCallback(() => play(miss), [miss, play]);
  const playMove = React.useCallback(() => play(move), [move, play]);
  const playTileTurn = React.useCallback(() => play(tileTurn), [play, tileTurn]);

  return {
    playFound,
    playMiss,
    playMove,
    playTileTurn,
  };
};

export default useSound;
