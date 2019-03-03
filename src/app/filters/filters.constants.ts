import { Filters } from '../filters';

export const INITIAL_CARDS_FILTER: Filters = {
  suits: [
    'spade',
    'heart',
    'club',
    'diamond',
  ],
  cardsInHand: 7,
  maxCardValue: 12,
  minCardValue: 0,
  numDecks: 1,
};

export const ERROR_MESSAGE_NO_SUITS = 'no suits selected';
export const ERROR_MESSAGE_MIN_GT_MAX = 'min card value must be less than or equal to max';
export const ERROR_MESSAGE_HAND_NOT_POSSIBLE = 'not possible to draw that many cards with current selections';
