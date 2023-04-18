import React from "react";

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

const getTileUpward = (activeElt, gridSize, count = 1) => {
  let elt = activeElt;
  for (let i = 0; i < gridSize; ++i) {
    elt = getTileLeftward(elt, count);
  }
  return elt;
};

const getTileDownward = (activeElt, gridSize, count = 1) => {
  let elt = activeElt;
  for (let i = 0; i < gridSize; ++i) {
    elt = getTileRightward(elt, count);
  }
  return elt;
};

const useArrowNavigation = (gridSize, cycle) => {
  const handleOnKeydown = React.useCallback(
    (event) => {
      const { code } = event;

      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(code)) {
        return;
      }

      const activeElt = document.activeElement;
      if (!activeElt || !activeElt.getAttribute("data-tile")) {
        return;
      }

      const activeId = Number(activeElt.id);

      event.preventDefault();

      if (code === "ArrowUp") {
        // Up
        if (activeId >= gridSize) {
          getTileUpward(activeElt, gridSize).focus();
        } else if (cycle) {
          // Go to the bottom > gridSize * gridSize - gridSize + id
          getTileDownward(activeElt, gridSize, gridSize - 1).focus();
        }
      } else if (code === "ArrowDown") {
        // Down
        if (activeId < gridSize * gridSize - gridSize) {
          getTileDownward(activeElt, gridSize).focus();
        } else if (cycle) {
          // Go to the top > id % gridSize
          getTileUpward(activeElt, gridSize, gridSize - 1).focus();
        }
      } else if (code === "ArrowLeft") {
        // Left
        if (activeId % gridSize > 0) {
          getTileLeftward(activeElt).focus();
          //activeElt.previousElementSibling.focus();
        } else if (cycle) {
          // Go to the right > id + gridSize - 1
          getTileRightward(activeElt, gridSize - 1).focus();
        }
      } else {
        // Right
        if ((activeId + 1) % gridSize > 0) {
          getTileRightward(activeElt).focus();
          //activeElt.nextElementSibling.focus();
        } else if (cycle) {
          // Go to the left > id - gridSize + 1
          getTileLeftward(activeElt, gridSize - 1).focus();
        }
      }
    },
    [cycle, gridSize]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleOnKeydown);

    return () => {
      window.removeEventListener("keydown", handleOnKeydown);
    };
  }, [handleOnKeydown]);
};

export default useArrowNavigation;
