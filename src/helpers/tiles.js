import { State } from '@/helpers/types';

const findHiddenTileIndex = (tiles, startIndex, searchedChar) => {
  const { length: tileCount } = tiles;
  let i = startIndex;
  while (i < tileCount && (tiles[i].state !== State.Hidden || (searchedChar !== null && tiles[i].char !== searchedChar))) {
    ++i;
  }
  // Return null if all pairs have already been found
  return i < tileCount ? i : null;
};

const initializeTiles = (rowCount, columnCount) => {
  if (typeof window === 'undefined') {
    return [];
  }

  const tileCount = rowCount * columnCount;

  if (tileCount % 2 > 0) {
    throw Error(`Grid dimension should lead to an even number of tiles but got ${rowCount}x${columnCount}`);
  }

  const TILES = [
    '😀',
    '😃',
    '😄',
    '😁',
    '😆',
    '😅',
    '😂',
    '🤣',
    '😊',
    '😇',
    '🙂',
    '🙃',
    '😉',
    '😌',
    '😍',
    '🥰',
    '😘',
    '😗',
    '😙',
    '😚',
    '😋',
    '😛',
    '😝',
    '😜',
    '🤪',
    '🤨',
    '🧐',
    '🤓',
    '😎',
    '🤩',
    '🥳',
    '😏',
    '😒',
    '😞',
    '😔',
    '😟',
    '😕',
    '🙁',
    '☹️',
    '😣',
    '😖',
    '😫',
    '😩',
    '🥺',
    '😢',
    '😭',
    '😮',
    '‍😤',
    '😠',
    '😡',
    '🤬',
    '🤯',
    '😳',
    '🥵',
    '🥶',
    '😱',
    '😨',
    '😰',
    '😥',
    '😓',
    '🤗',
    '🤔',
    '🤭',
    '🤫',
    '🤥',
    '😶',
    '😶',
    '‍️😐',
    '😑',
    '😬',
    '🙄',
    '😯',
    '😦',
    '😧',
    '😮',
    '😲',
    '🥱',
    '😴',
    '🤤',
    '😪',
    '😵',
    '😵',
    '‍🤐',
    '🥴',
    '🤢',
    '🤮',
    '🤧',
    '😷',
    '🤒',
    '🤕',
    '🤑',
    '🤠',
    '😈',
    '👿',
    '👹',
    '👺',
    '🤡',
    '💩',
    '👻',
    '💀',
    '☠️',
    '👽',
    '👾',
    '🤖',
    '🎃',
    '😺',
    '😸',
    '😹',
    '😻',
    '😼',
    '😽',
    '🙀',
    '😿',
    '😾',
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
    discovered: false,
    state: State.Hidden,
  }));
};

const getFoundTiles = (tiles) => getTilesByState(tiles, State.Found);

const getTilesByState = (tiles, state) => tiles.filter((tile) => tile.state === state);

const getVisibleTiles = (tiles) => getTilesByState(tiles, State.Visible);

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

export { findHiddenTileIndex, getFoundTiles, getVisibleTiles, initializeTiles, shuffleArray };
