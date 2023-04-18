import React from "react";
import { State } from "@/helpers/types";
import styles from "./Tile.module.css";

const Tile = ({ showTile, tile }) => {
  const handleOnClick = () => {
    //if (selection.length === 2 ||)
    if (tile.state === State.Visible || tile.state === State.Found) {
      return;
    }

    showTile(tile.index);
  };

  return (
    <button
      className={`${styles.tileWrapper} ${styles[tile.state]}`}
      id={tile.index.toString()}
      onClick={handleOnClick}
    >
      {tile.state === State.Hidden ? "" : tile.char}
    </button>
  );
};

export default Tile;
