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
    <div
      className={`${styles.tileWrapper} ${styles[tile.state]}`}
      onClick={handleOnClick}
    >
      {tile.state === State.Hidden ? "" : tile.char}
    </div>
  );
};

export default Tile;
