import React from 'react';
import Score from '@/components/Score';
import Tiles from '@/components/Tiles';
import styles from './Game.module.css';

const Game = () => {
  const [attempts, setAttempts] = React.useState(0);
  const [tiles, setTiles] = React.useState([]);

  return (
    <div className={styles.gameWrapper}>
      <Score/>
      <Tiles/>
    </div>
  )
};

export default Game;
