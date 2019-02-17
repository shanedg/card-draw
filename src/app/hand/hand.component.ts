import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { Hand } from '../hand';
import { Filters } from '../filters';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HandComponent {

  @Input() filters: Filters;

  public get currentHand(): Hand {
    if (this.filters != undefined) {
      const hand = this.buildHand();

      return {
        cards: hand,
      };
    }

    return {
      cards: null,
    };
  }

  /**
   * Generate a hand based on filter choices from UI.
   */
  buildHand() {
    const decks = this.filters.numDecks;
    const suits = this.filters.suits;
    const minCard = this.filters.minCardValue;
    const maxCard = this.filters.maxCardValue;
    const cardsInHand = this.filters.cardsInHand;

    let handCandidates = [];
    for (let i = 0; i < (decks * 52); i++) {
      handCandidates.push(i);
    }

    const hand = [];

    do {
      // Choose random deck index
      const randomIndex = Math.floor(Math.random() * handCandidates.length);
      const randomCard = handCandidates[randomIndex];

      // Translate random deck index to suit and value
      const suit = this.mapIntToSuit(randomCard);
      const value = randomCard % 13;

      // Add to hand if candidate passes filter criteria
      if (suits.indexOf(suit) > -1
        && value >= minCard
        && value <= maxCard
      ) {
        // Push card indices and card objects separately.
        hand.push({
          suit,
          value: this.mapIntToCardValue(randomCard)
        });
      }

      if (randomIndex === 0) {
        handCandidates.shift();
      } else if (randomIndex === (handCandidates.length - 1)) {
        handCandidates.pop();
      } else {
        handCandidates = handCandidates.slice(0, randomIndex).concat(handCandidates.slice(randomIndex + 1, handCandidates.length));
      }
    } while(hand.length < cardsInHand);

    return hand;
  }

  /**
   * Translate a card's deck index to a suit.
   * @param index Integer corresponding to a specific card in a collection of 1 or more standard playing card decks.
   */
  mapIntToSuit(index: number) {
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
  mapIntToCardValue(index: number) {
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
       * Face values 2 through 9.
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
}
