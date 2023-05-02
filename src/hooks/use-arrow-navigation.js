import React from 'react';
import { GameState } from '@/helpers/types';
import { SettingsContext } from '@/providers/SettingsProvider';

const getTileLeftward = (activeElt, count = 1) => {
  let elt = activeElt;
  for (let i = 0; i < count; i++) {
    elt = elt.previousElementSibling;
  }
  return elt;
};

const getTileRightward = (activeElt, count = 1) => {
  let elt = activeElt;
  for (let i = 0; i < count; i++) {
    elt = elt.nextElementSibling;
  }
  return elt;
};

const getTileUpward = (activeElt, columnCount, count = 1) => {
  let elt = activeElt;
  for (let i = 0; i < columnCount; ++i) {
    elt = getTileLeftward(elt, count);
  }
  return elt;
};

const getTileDownward = (activeElt, columnCount, count = 1) => {
  let elt = activeElt;
  for (let i = 0; i < columnCount; ++i) {
    elt = getTileRightward(elt, count);
  }
  return elt;
};

const useArrowNavigation = (rowCount, columnCount, cycle, gameState) => {
  const { settings } = React.useContext(SettingsContext);
  const audioMove = React.useMemo(() => new Audio('/sounds/keyboard-move-full.m4a'), []);

  const handleOnKeydown = React.useCallback(
    (event) => {
      const { code } = event;

      if (gameState !== GameState.Playing || !['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(code)) {
        return;
      }

      const activeElt = document.activeElement;
      if (!activeElt || !activeElt.getAttribute('data-tile')) {
        // Focused element is not a tile
        return;
      }

      const activeId = Number(activeElt.id);

      event.preventDefault();

      if (settings.sound) {
        audioMove.play();
      }

      if (code === 'ArrowUp') {
        // Up
        if (activeId >= columnCount) {
          getTileUpward(activeElt, columnCount).focus();
        } else if (cycle) {
          // Cycle to the bottom
          getTileDownward(activeElt, columnCount, rowCount - 1).focus();
        }
      } else if (code === 'ArrowDown') {
        // Down
        if (activeId < rowCount * columnCount - columnCount) {
          getTileDownward(activeElt, columnCount).focus();
        } else if (cycle) {
          // Cycle to the top
          getTileUpward(activeElt, columnCount, rowCount - 1).focus();
        }
      } else if (code === 'ArrowLeft') {
        // Left
        if (activeId % columnCount > 0) {
          getTileLeftward(activeElt).focus();
        } else if (cycle) {
          // Cycle to the right
          getTileRightward(activeElt, columnCount - 1).focus();
        }
      } else {
        // Right
        if ((activeId + 1) % columnCount > 0) {
          getTileRightward(activeElt).focus();
        } else if (cycle) {
          // Cycle to the left
          getTileLeftward(activeElt, columnCount - 1).focus();
        }
      }
    },
    [audioMove, columnCount, cycle, gameState, rowCount, settings.sound]
  );

  React.useEffect(() => {
    window.addEventListener('keydown', handleOnKeydown);

    return () => {
      window.removeEventListener('keydown', handleOnKeydown);
    };
  }, [handleOnKeydown]);
};

export default useArrowNavigation;
