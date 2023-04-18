import {
  getFoundTiles,
  getVisibleTiles,
  initializeTiles,
} from "@/helpers/tiles";
import React from "react";
import Score from "@/components/Score";
import { State } from "@/helpers/types";
import Tiles from "@/components/Tiles";
import styles from "./Game.module.css";
import useArrowNavigation from "@/hooks/use-arrow-navigation";

const Game = () => {
  const [gridSize, setGridSize] = React.useState(4);
  const [attempts, setAttempts] = React.useState(0);
  const [tiles, setTiles] = React.useState([]);

  useArrowNavigation(gridSize, true);

  React.useEffect(() => {
    setTiles(initializeTiles(gridSize * gridSize));
    document.querySelector(":root").style.setProperty("--grid-size", gridSize);
  }, [gridSize]);

  const hideTiles = React.useCallback(() => {
    const newTiles = tiles.map((t) => ({
      ...t,
      state: t.state === State.Visible ? State.Hidden : t.state,
    }));
    setTiles(newTiles);
  }, [tiles]);

  const showTile = React.useCallback(
    (index) => {
      const newTiles = [...tiles];
      newTiles[index].state = State.Visible;

      const visibleTiles = getVisibleTiles(tiles);

      if (visibleTiles.length === 2) {
        setAttempts(attempts + 1);
        if (visibleTiles[0].char === visibleTiles[1].char) {
          // Pair found
          console.log("found");
          newTiles[visibleTiles[0].index].state = State.Found;
          newTiles[visibleTiles[1].index].state = State.Found;
        } else {
          // Missed
          console.log("missed");
          setTimeout(hideTiles, 1_000);
        }
      }

      setTiles(newTiles);
    },
    [attempts, hideTiles, tiles]
  );

  const missed = attempts - getFoundTiles(tiles).length / 2;

  return (
    <div className={styles.gameWrapper}>
      <Score attempts={attempts} missed={missed} />
      <Tiles gridSize={gridSize} showTile={showTile} tiles={tiles} />
    </div>
  );
};

export default Game;
