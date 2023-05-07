import React from 'react';
import { SettingsContext } from '@/providers/SettingsProvider';

const stop = (audio) => {
  audio.currentTime = 0;
  audio.pause();
};

const useSound = () => {
  const { settings } = React.useContext(SettingsContext);
  const sounds = React.useMemo(
    () =>
      Object.freeze({
        click: new Audio('/sounds/click.m4a'),
        finished: new Audio('/sounds/finish.m4a'),
        finishedHighScore: new Audio('/sounds/finish-high-score.m4a'),
        found: new Audio('/sounds/found.m4a'),
        miss: new Audio('/sounds/miss.m4a'),
        move: new Audio('/sounds/keyboard-move.m4a'),
        shuffle: new Audio('/sounds/shuffle.m4a'),
        tileTurn: new Audio('/sounds/tile-turn.m4a'),
      }),
    []
  );

  // Duration in ms
  const play = React.useCallback(
    (soundKey, duration = undefined) => {
      const audio = sounds[soundKey];
      if (!settings.sound || !audio) {
        return;
      }

      if (!audio.paused) {
        return;
      }

      const audioDurationInMs = audio.duration * 1000;

      if (typeof duration !== 'undefined') {
        if (duration < audioDurationInMs) {
          // Stop audio before end
          setTimeout(stop, duration, audio);
        } else if (duration > audioDurationInMs) {
          // Play multiple times
          audio.addEventListener('ended', () => play(soundKey, duration - audioDurationInMs), { once: true });
        }
      }
      audio.play();
    },
    [settings, sounds]
  );

  return { play };
};

export default useSound;
