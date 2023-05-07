export const GameState = Object.freeze({
  Shuffling: 0,
  Solving: 1,
  Playing: 2,
  Finished: 3,
  FinishedHighScore: 4,
  PromptPlayerName: 5,
});

export const TileState = Object.freeze({
  Found: 'found',
  Hidden: 'hidden',
  Shuffling: 'shuffling',
  Visible: 'visible',
});

export const Sound = Object.freeze({
  Click: 'click',
  Finished: 'finished',
  FinishedHighScore: 'finishedHighScore',
  Found: 'found',
  Miss: 'miss',
  Move: 'move',
  Shuffle: 'shuffle',
  TileTurn: 'tileTurn',
});
