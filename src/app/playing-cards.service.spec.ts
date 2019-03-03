import { TestBed } from '@angular/core/testing';

import { PlayingCardsService } from './playing-cards.service';
import {
  DECK_SIZE,
  SUIT_FACES,
  SUIT_FACES_SHORT,
  SUIT_SIZE,
  DECK_SUITS,
} from './playing-cards.constants';

/**
 * Number of concatenated playing card decks to test against.
 */
const DECKS_TO_TEST = 10;

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
  it('smoke: should be created', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    expect(service).toBeTruthy();
  });

  /**
   * test: `mapIndexToCardSuit`
   */
  it('should map spade suits', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    testMapIndexToCardSuit(service, 'spade');
  });

  it('should map heart suits', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    testMapIndexToCardSuit(service, 'heart');
  });

  it('should map club suits', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    testMapIndexToCardSuit(service, 'club');
  });

  it('should map diamond suits', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    testMapIndexToCardSuit(service, 'diamond');
  });

  /**
   * test: `mapIndexToCardValue`
   */
  it('should map spade face values', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    testMapIndexToCardValue(service, 'spade');
  });

  it('should map heart face values', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    testMapIndexToCardValue(service, 'heart');
  });

  it('should map club face values', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    testMapIndexToCardValue(service, 'club');
  });

  it('should map diamond face values', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    testMapIndexToCardValue(service, 'diamond');
  });

  /**
   * test: `mapIndexToCardValueShort`
   */
  it('should map short face values', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    testMapIndexToCardValueShort(service);
  });

});
