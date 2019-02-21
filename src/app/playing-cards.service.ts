import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayingCardsService {

  constructor() { }

  /**
   * Translate a card's deck index to a suit.
   * @param index Integer corresponding to a specific card in a collection of 1 or more standard playing card decks.
   * [TODO] deduplicate face value and face value short functionality.
   */
  mapIndexToCardSuit(index: number) {
    /**
     * Normalize index if drawing from multiple decks.
     * e.g. 2 decks will have 2 entire sets of Spades:
     * 2 Aces of Spades, index 12 and 64
     *   12 % 52 = 12
     *   64 % 52 = 12
     */
    const normalizedIndex = index % 52;

    if (normalizedIndex >= 0 && normalizedIndex < 13) {
      return 'spade';
    } else if (normalizedIndex >= 13 && normalizedIndex < 26) {
      return 'heart';
    } else if (normalizedIndex >= 26 && normalizedIndex < 39) {
      return 'club';
    } else {
      return 'diamond';
    }
  }

  /**
   * Translate a card's deck index to a face value.
   * @param index Integer corresponding to a specific card in a collection of 1 or more standard playing card decks.
   */
  mapIndexToCardValue(index: number) {

    /**
     * We don't need to normalize the index for card face value.
     * Face values are always the same within suit boundaries.
     * No matter how many decks we pull from, face value will always be index modulo 13.
     */
    const noSuit = index % 13;

    let value;
    if (noSuit >= 0 && noSuit < 9) {
      /**
       * Indices from 0 to 8 are just incremented by 2.
       * Face values 2 through 10.
       */
      value = '' + (noSuit + 2);

    } else {
      /**
       * Indices from 9 to 12 are face cards.
       * Face values Jack through Ace.
       */
      switch (noSuit) {
        case 9:
          value = 'jack';
          break;
        case 10:
          value = 'queen';
          break;
        case 11:
          value = 'king';
          break;
        case 12:
          value = 'ace';
          break;

        // This shouldn't ever happen.
        default:
          value = null;
          break;
      }

    }

    return value;
  }

  /**
   * Map a card's face value to a 1 character symbol.
   * @param index Index of card selected from 1 or more decks.
   * [TODO] not happy with this repeated logic: calling another service member function,
   * i.e. composing this new utility with result of mapIndexToCardValue and map of
   * face value -> short symbol was causing problems in mat-slider.
   *
   * references to `this` here do not remain bound to the service context?
   *
   * maybe best to use same function and provide a flag to return "short" face value
   *
   * whatever, moving on; stop getting stuck on these details
   */
  mapIndexToCardValueShort(index: number | null): string {

    if (index != null) {

      const noSuit = index % 13;

      /**
       * Card face value label to return.
       */
      let label;

      if (noSuit < 9) {
        /**
         * Face values 2 through 10.
         */
        label = '' + (2 + noSuit);

      } else {
        /**
         * Face values, Jack through Ace (capitalized first letter).
         */
        switch (noSuit) {
          case 9:
            label = 'J';
            break;
          case 10:
            label = 'Q';
            break;
          case 11:
            label = 'K';
            break;
          case 12:
            label = 'A';
            break;
        }

      }

      return label;
    }

    return '';
  }
}
