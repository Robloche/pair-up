const SCORES_KEY = 'high-scores';

const buildKey = (rowCount, columnCount) => `${rowCount}x${columnCount}`;

const saveHighScore = (rowCount, columnCount, attempts, missed, playerName) => {
  const highScores = loadHighScores() ?? {};
  highScores[buildKey(rowCount, columnCount)] = `${playerName}:${attempts}:${missed}`;
  saveHighScores(highScores);
};

const saveHighScores = (highScores) => {
  try {
    localStorage.setItem(SCORES_KEY, JSON.stringify(highScores));
  } catch {
    console.warn('Local storage seems disable (cannot save high score)');
  }
};

const loadHighScores = () => {
  try {
    const highScores = localStorage.getItem(SCORES_KEY);
    if (highScores === null) {
      return null;
    }

    return JSON.parse(highScores);
  } catch {
    console.warn('Local storage seems disable (cannot load high scores)');
    return null;
  }
};

const getHighScoreCount = () => {
  const highScores = loadHighScores();
  if (highScores === null) {
    return 0;
  }

  return Object.keys(highScores).length;
};

const getHighScore = (rowCount, columnCount) => {
  const highScores = loadHighScores();
  if (highScores === null) {
    // No existing high score for this size of grid
    return null;
  }

  const highScore = highScores[buildKey(rowCount, columnCount)];

  if (typeof highScore !== 'string') {
    // No existing high score for this size of grid
    return null;
  }

  const [playerName, attempts, missed] = highScore.split(':');
  return { attempts, missed, playerName };
};

const checkHighScore = (rowCount, columnCount, attempts, missed) => {
  const highScore = getHighScore(rowCount, columnCount);
  return highScore === null || attempts < highScore.attempts || (attempts === highScore.attempts && missed < highScore.missed);
};

const clearHighScores = () => {
  try {
    localStorage.removeItem(SCORES_KEY);
  } catch {
    console.warn('Local storage seems disable (cannot clear high scores)');
    return null;
  }
};

export { checkHighScore, clearHighScores, getHighScore, getHighScoreCount, loadHighScores, saveHighScore };
