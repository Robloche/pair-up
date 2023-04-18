import { getTileDownward, getTileUpward } from "@/helpers/tiles";
import React from "react";
import Tile from "@/components/Tile";
import styles from "./Tiles.module.css";

const Tiles = ({ gridSize, showTile, tiles }) => {
  return (
    <div className={styles.tilesWrapper}>
      {tiles.map((tile) => (
        <Tile key={tile.index} showTile={showTile} tile={tile} />
      ))}
    </div>
  );
};

export default Tiles;
