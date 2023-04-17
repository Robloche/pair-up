import styles from "./Score.module.css";

const Score = ({ attempts, missed }) => {
  return (
    <div className={styles.attempts}>
      {attempts}
      <div className={styles.missed}>{missed}</div>
    </div>
  );
};

export default Score;
