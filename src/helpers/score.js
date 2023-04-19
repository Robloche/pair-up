const buildKey = (rowCount, columnCount) => `${rowCount}x${columnCount}`;

const saveHighScore = (rowCount, columnCount, attempts, missed) => {
  try {
    localStorage.setItem(
      buildKey(rowCount, columnCount),
      `${attempts}:${missed}`
    );
  } catch {
    alert("Unable to save score");
  }
};

const getHighScore = (rowCount, columnCount) => {
  try {
    const value = localStorage.getItem(buildKey(rowCount, columnCount));
    if (value === null) {
      return null;
    }

    const [attempts, missed] = value.split(":");
    return { attempts, missed };
  } catch {
    alert("Unable to get score");
    return null;
  }
};

const checkUpdateHighScore = (rowCount, columnCount, attempts, missed) => {
  const highScore = getHighScore(rowCount, columnCount);

  if (
    highScore === null ||
    attempts < highScore.attempts ||
    (attempts === highScore.attempts && missed < highScore.missed)
  ) {
    saveHighScore(rowCount, columnCount, attempts, missed);
    return true;
  }

  return false;
};

export { getHighScore, checkUpdateHighScore, saveHighScore };
