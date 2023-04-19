import styles from "./Score.module.css";

const Score = ({ attempts, missed }) => {
  return (
    <div className={styles.scoreWrapper}>
      <div
        className={`${styles.attempts} ${
          attempts === 0 ? styles.noAnimation : ""
        }`}
        key={attempts}
      >
        {attempts}
      </div>
      <div className={styles.missed}>
        <span>MISS:</span>
        {missed}
      </div>
    </div>
  );
};

export default Score;
