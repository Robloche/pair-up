import styles from "./Banner.module.css";

const Banner = ({ attempts, missed, onReset }) => {
  return (
    <div className={styles.bannerWrapper}>
      <p>
        You found all pairs in <span className={styles.number}>{attempts}</span>{" "}
        attempt{attempts > 1 ? "s" : ""} and missed{" "}
        <span className={styles.number}>{missed}</span> time
        {missed > 1 ? "s" : ""}.
      </p>
      <button className="action" onClick={onReset}>
        Play Again
      </button>
    </div>
  );
};

export default Banner;
