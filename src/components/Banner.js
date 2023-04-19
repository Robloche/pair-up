import styles from "./Banner.module.css";

const Banner = ({ attempts, isHighScore, missed, onReset }) => {
  return (
    <div className={styles.bannerWrapper}>
      <p>
        You found all pairs in <span className={styles.number}>{attempts}</span>{" "}
        attempt{attempts > 1 ? "s" : ""} and missed{" "}
        <span className={styles.number}>{missed}</span> time
        {missed > 1 ? "s" : ""}.
      </p>
      {isHighScore && <p className={styles.highScore}>New High Score!</p>}
      <button className="action" onClick={onReset}>
        Play Again
      </button>
    </div>
  );
};

export default Banner;
