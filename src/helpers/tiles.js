import { COLUMN_COUNT_MAX, COLUMN_COUNT_MIN, ROW_COUNT_MAX, ROW_COUNT_MIN } from '@/helpers/constants';
import React from 'react';
import { TileState } from '@/helpers/types';

const findHiddenTileIndex = (tiles, startIndex, searchedChar) => {
  const { length: tileCount } = tiles;
  let i = startIndex;
  while (i < tileCount && (tiles[i].state !== TileState.Hidden || (searchedChar !== null && tiles[i].char !== searchedChar))) {
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

  const EMOJIS = [
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
  shuffleArray(EMOJIS);

  // Take first (tileCount / 2) ones
  const emojis = EMOJIS.slice(0, tileCount / 2);

  // Add same tiles to create pairs
  const emojiPairs = [];
  emojis.forEach((emoji) => emojiPairs.push(emoji, emoji));

  return emojiPairs.map((emoji, i) => ({
    index: i,
    char: emoji,
    key: `${emoji}-${i}`,
    discovered: false,
    state: TileState.Shuffling,
  }));
};

const getFoundTiles = (tiles) => getTilesByState(tiles, TileState.Found);

const getHiddenTiles = (tiles) => getTilesByState(tiles, TileState.Hidden);

const getTilesByState = (tiles, state) => tiles.filter((tile) => tile.state === state);

const getVisibleTiles = (tiles) => getTilesByState(tiles, TileState.Visible);

const setTilesAnimationDelay = () => {
  document.querySelectorAll('button[data-tile]').forEach((tileElt) => tileElt.style.setProperty('--tile-animation-delay', '0ms'));
};

/*
 * Shuffle the given array of numbers in place
 * Implementation of Fischer-Yates algorithm
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const getAllowedSizes = () => {
  const sizes = [];
  for (let r = ROW_COUNT_MIN; r <= ROW_COUNT_MAX; r++) {
    for (let c = COLUMN_COUNT_MIN; c <= COLUMN_COUNT_MAX; c++) {
      if ((r * c) % 2 === 0) {
        sizes.push({ columns: c, rows: r });
      }
    }
  }

  console.log(sizes);
  sizes.sort((a, b) => {
    const aSize = a.rows * a.columns;
    const bSize = b.rows * b.columns;
    if (aSize !== bSize) {
      return bSize - aSize;
    }

    return b.columns - a.columns;
  });
  console.log(sizes);

  return sizes;
};

export { findHiddenTileIndex, getAllowedSizes, getFoundTiles, getHiddenTiles, getVisibleTiles, initializeTiles, setTilesAnimationDelay, shuffleArray };
