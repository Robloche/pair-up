import { getTileDownward, getTileUpward } from "@/helpers/tiles";
import React from "react";

const useArrowNavigation = (gridSize) => {
  const handleOnKeydown = React.useCallback(
    (event) => {
      const { code } = event;

      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(code)) {
        return;
      }

      event.preventDefault();

      const activeElt = document.activeElement;
      const activeId = Number(activeElt.id);

      if (code === "ArrowUp") {
        // Up
        if (activeId >= gridSize) {
          getTileUpward(activeElt, gridSize).focus();
        }
      } else if (code === "ArrowDown") {
        // Down
        if (activeId < gridSize * gridSize - gridSize) {
          getTileDownward(activeElt, gridSize).focus();
        }
      } else if (code === "ArrowLeft") {
        // Left
        if (activeId % gridSize > 0) {
          activeElt.previousElementSibling.focus();
        }
      } else {
        // Right
        if ((activeId + 1) % gridSize > 0) {
          activeElt.nextElementSibling.focus();
        }
      }
    },
    [gridSize]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleOnKeydown);

    return () => {
      window.removeEventListener("keydown", handleOnKeydown);
    };
  }, [handleOnKeydown]);
};

export default useArrowNavigation;
