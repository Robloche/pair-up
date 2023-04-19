import React from "react";
import Tile from "@/components/Tile";
import { getVisibleTiles } from "@/helpers/tiles";
import styles from "./Tiles.module.css";

const Tiles = ({ showTile, tiles }) => {
  return (
    <div className={styles.tilesWrapper}>
      {tiles.map((tile) => (
        <Tile key={tile.index} showTile={showTile} tile={tile} />
      ))}
      {getVisibleTiles(tiles).length === 2 && (
        <div className={styles.lockMask} />
      )}
    </div>
  );
};

export default Tiles;
