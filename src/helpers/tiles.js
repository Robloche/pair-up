import { State } from "@/helpers/types";

/*
 * Shuffle the given array of numbers in place
 * Implementation of Fischer-Yates algorithm
 */
const shuffleArray = (array) => {
  const { length } = array;

  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const initializeTiles = (n) => {
  const TILES = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🤩",
    "🥳",
    "😏",
    "😒",
    "😞",
    "😔",
    "😟",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "😖",
    "😫",
    "😩",
    "🥺",
    "😢",
    "😭",
    "😮",
    "‍😤",
    "😠",
    "😡",
    "🤬",
    "🤯",
    "😳",
    "🥵",
    "🥶",
    "😱",
    "😨",
    "😰",
    "😥",
    "😓",
    "🤗",
    "🤔",
    "🤭",
    "🤫",
    "🤥",
    "😶",
    "😶",
    "‍️😐",
    "😑",
    "😬",
    "🙄",
    "😯",
    "😦",
    "😧",
    "😮",
    "😲",
    "🥱",
    "😴",
    "🤤",
    "😪",
    "😵",
    "😵",
    "‍🤐",
    "🥴",
    "🤢",
    "🤮",
    "🤧",
    "😷",
    "🤒",
    "🤕",
    "🤑",
    "🤠",
    "😈",
    "👿",
    "👹",
    "👺",
    "🤡",
    "💩",
    "👻",
    "💀",
    "☠️",
    "👽",
    "👾",
    "🤖",
    "🎃",
    "😺",
    "😸",
    "😹",
    "😻",
    "😼",
    "😽",
    "🙀",
    "😿",
    "😾",
  ];
  shuffleArray(TILES);
  const tiles = TILES.slice(0, n / 2);
  tiles.push(...tiles);
  shuffleArray(tiles);
  return tiles.map((emoji, i) => ({
    index: i,
    char: emoji,
    state: State.Hidden,
  }));
};

const getTilesByState = (tiles, state) =>
  tiles.filter((tile) => tile.state === state);

const getVisibleTiles = (tiles) => getTilesByState(tiles, State.Visible);

const getFoundTiles = (tiles) => getTilesByState(tiles, State.Found);

const getTileUpward = (activeElt, gridSize) => {
  let elt = activeElt;
  for (let i = 0; i < gridSize; ++i) {
    elt = elt.previousElementSibling;
  }
  return elt;
};

const getTileDownward = (activeElt, gridSize) => {
  let elt = activeElt;
  for (let i = 0; i < gridSize; ++i) {
    elt = elt.nextElementSibling;
  }
  return elt;
};

export {
  getFoundTiles,
  getTileUpward,
  getTileDownward,
  getVisibleTiles,
  initializeTiles,
  shuffleArray,
};
