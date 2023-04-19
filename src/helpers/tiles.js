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

const initializeTiles = (rowCount, columnCount) => {
  const tileCount = rowCount * columnCount;

  if (tileCount % 2 > 0) {
    throw Error(
      `Grid dimension should lead to an even number of tiles but got ${rowCount}x${columnCount}`
    );
  }

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

  // Shuffle available tiles
  shuffleArray(TILES);

  // Take first (tileCount / 2) ones
  const tiles = TILES.slice(0, tileCount / 2);

  // Add same tiles to create pairs
  tiles.push(...tiles);

  // Shuffle chosen tiles
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

export { getFoundTiles, getVisibleTiles, initializeTiles, shuffleArray };
