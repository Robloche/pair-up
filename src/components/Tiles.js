import { getTileDownward, getTileUpward } from "@/helpers/tiles";
import React from "react";
import Tile from "@/components/Tile";
import styles from "./Tiles.module.css";

const Tiles = ({ gridSize, showTile, tiles }) => {
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

  return (
    <div className={styles.tilesWrapper}>
      {tiles.map((tile) => (
        <Tile key={tile.index} showTile={showTile} tile={tile} />
      ))}
    </div>
  );
};

export default Tiles;
