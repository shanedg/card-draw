/**
 * Number of playing cards in a standard deck.
 */
export const DECK_SIZE = 52;

/**
 * Number of playing cards per suit.
 */
export const SUIT_SIZE = 13;

/**
 * Possible suit values.
 */
export enum DECK_SUITS {
  spade,
  heart,
  club,
  diamond,
};

/**
 * Possible face values.
 */
export const SUIT_FACES = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'jack',
  'queen',
  'king',
  'ace',
];

/**
 * Possible short face values.
 * [TODO] deduplicate faces/short faces, this is not DRY.
 */
export const SUIT_FACES_SHORT = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
];
