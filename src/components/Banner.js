import styles from "./Banner.module.css";

const Banner = ({ attempts, missed, onReset }) => {
  return (
    <div className={styles.bannerWrapper}>
      <p>
        You found all pairs in <span className={styles.number}>{attempts}</span>{" "}
        attempts and missed <span className={styles.number}>{missed}</span>{" "}
        times.
      </p>
      <button onClick={onReset}>Play Again</button>
    </div>
  );
};

export default Banner;
