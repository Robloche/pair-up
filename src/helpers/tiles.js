import { TILE_HIDE_DURATION_MAX, TILE_HIDE_DURATION_MIN } from '@/helpers/constants';
import { State } from '@/helpers/types';
import React from 'react';
import { getRandomInteger } from '@/helpers/math';

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
    state: State.Shuffling,
  }));
};

const getFoundTiles = (tiles) => getTilesByState(tiles, State.Found);

const getHiddenTiles = (tiles) => getTilesByState(tiles, State.Hidden);

const getTilesByState = (tiles, state) => tiles.filter((tile) => tile.state === state);

const getVisibleTiles = (tiles) => getTilesByState(tiles, State.Visible);

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

export { findHiddenTileIndex, getFoundTiles, getHiddenTiles, getVisibleTiles, initializeTiles, setTilesAnimationDelay, shuffleArray };
