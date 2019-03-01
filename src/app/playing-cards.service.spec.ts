import { TestBed } from '@angular/core/testing';

import { PlayingCardsService } from './playing-cards.service';

/**
 * Range of concatenated playing card decks to test against.
 */
const DECKS_TO_TEST = 10;

/**
 * Number of playing cards in a standard deck.
 */
const DECK_SIZE = 52;

/**
 * Number of playing cards per suit.
 */
const SUIT_SIZE = 13;

/**
 * Possible suit values.
 */
enum DECK_SUITS {
  spade,
  heart,
  club,
  diamond,
};

/**
 * Possible face values.
 */
const SUIT_FACES = [
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
const SUIT_FACES_SHORT = [
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

/**
 * Test `mapIndexToCardSuit`
 * @param service Instance of the service to test against.
 * @param suit Suit to test.
 */
const testMapIndexToCardSuit = (service: PlayingCardsService, suit: 'spade' | 'heart' | 'club' | 'diamond') => {
  /**
   * Starting index of suit range.
   */
  const index = DECK_SUITS[suit] * SUIT_SIZE;

  /**
   * Test against a range of concatenated playing card decks.
   */
  for (let i = 0; i < DECKS_TO_TEST; i++) {
    const deckStart = DECK_SIZE * i;
    const suitStart = index + deckStart;
    const suitEnd = (index + 12) + deckStart;

    /**
     * Test suit start and end.
     */
    expect(service.mapIndexToCardSuit(suitStart)).toBe(suit);
    expect(service.mapIndexToCardSuit(suitEnd)).toBe(suit);
  }
};

/**
 * Test `mapIndexToCardValue`
 * @param service Instance of the service to test against.
 * @param suit Suit to test.
 */
const testMapIndexToCardValue = (service: PlayingCardsService, suit: 'spade' | 'heart' | 'club' | 'diamond') => {
  const suitStartIndex = DECK_SUITS[suit] * SUIT_SIZE;

  for (let i = 0; i < DECKS_TO_TEST; i++) {
    const deckStart = DECK_SIZE * i;

    for (let j = 0; j < SUIT_SIZE; j++) {
      const suitIndex = deckStart + suitStartIndex + j;
      expect(service.mapIndexToCardValue(suitIndex)).toBe(SUIT_FACES[j]);
    }
  }
};

/**
 * Test `mapIndexToCardValueShort`
 * @param service Instance of the service to test against.
 * @param suit Suit to test.
 * [TODO] deduplicate faces/short faces, this is not DRY.
 */
const testMapIndexToCardValueShort = (service: PlayingCardsService) => {
  for (let cardIndex = 0; cardIndex < (DECK_SIZE * DECKS_TO_TEST); cardIndex++) {
    expect(service.mapIndexToCardValueShort(cardIndex)).toBe(SUIT_FACES_SHORT[cardIndex % SUIT_SIZE]);
  }
};

describe('PlayingCardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  /**
   * test: service smoke
   */
  it('should be created', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    expect(service).toBeTruthy();
  });

  /**
   * test: `mapIndexToCardSuit`
   */
  it('should correctly map spade card suits', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    testMapIndexToCardSuit(service, 'spade');
  });

  it('should correctly map heart card suits', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    testMapIndexToCardSuit(service, 'heart');
  });

  it('should correctly map club card suits', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    testMapIndexToCardSuit(service, 'club');
  });

  it('should correctly map diamond card suits', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    testMapIndexToCardSuit(service, 'diamond');
  });

  /**
   * test: `mapIndexToCardValue`
   */
  it('should correctly map spade card faces', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    testMapIndexToCardValue(service, 'spade');
  });

  it('should correctly map heart card faces', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    testMapIndexToCardValue(service, 'heart');
  });

  it('should correctly map club card faces', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    testMapIndexToCardValue(service, 'club');
  });

  it('should correctly map diamond card faces', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    testMapIndexToCardValue(service, 'diamond');
  });

  /**
   * test: `mapIndexToCardValueShort`
   */
  it('should correctly map short card faces', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    testMapIndexToCardValueShort(service);
  });

});
