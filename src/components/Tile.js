import React from "react";
import { State } from "@/helpers/types";
import styles from "./Tile.module.css";

const Tile = ({ showTile, tile }) => {
  const handleOnClick = () => {
    if (tile.state === State.Visible || tile.state === State.Found) {
      return;
    }

    showTile(tile.index);
  };

  return (
    <button
      className={`${styles.tileWrapper} ${styles[tile.state]}`}
      data-tile={true}
      id={tile.index.toString()}
      onClick={handleOnClick}
    >
      <div className={styles.innerTile}>
        <div className={styles.front}>{tile.char}</div>
        <div className={styles.back} />
      </div>
    </button>
  );
};

export default Tile;
