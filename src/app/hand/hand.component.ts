import {
  Component,
  OnChanges,
  SimpleChanges,
  Input
} from '@angular/core';
import { Hand } from '../hand';
import { Filters } from '../filters';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  // styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnChanges {
  @Input() filters: Filters;

  currentHand: Hand = {
    cards: null
  };

  ngOnChanges(changes: SimpleChanges) {
    if (this.filters != undefined) {

      // Define objects to hold card selections we've already made
      const handIndices = [];
      const hand = [];

      // Do-while to iterate over candidate random cards until
      // we've chosen enough that satisfy filters to fill the hand.
      do {
        // Choose random deck index
        const randomCard = Math.floor(Math.random() * 52);

        // Check against deck indices already in hand
        if (handIndices.indexOf(randomCard) < 0) {
          // Translate random deck index to suit and value
          const suit = this.mapIntToSuit(randomCard);
          const value = randomCard % 13;

          // Add to hand if candidate passes filter criteria
          if (this.filters.suits.indexOf(suit) > -1
            && value >= this.filters.minCardValue
            && value <= this.filters.maxCardValue
          ) {
            // Push card indices and card objects separately.
            handIndices.push(randomCard);
            hand.push({
              suit,
              value: this.mapIntToCardValue(randomCard)
            });
          }
        }
      } while(handIndices.length < this.filters.cardsInHand);

      // Set hand to value of new, generated hand.
      this.currentHand.cards = hand;
    }
  }

  /*
   * Translate card's deck index to a suit.
   */
  mapIntToSuit(index: number) {
    // Future-proof against drawing from multiple decks.
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

  /*
   * Translate a card's deck index to a face value.
   */
  mapIntToCardValue(index: number) {
    const noSuit = index % 13;

    let value;
    if (noSuit >= 0 && noSuit < 9) {
      // Indices from 0 to 8 are just incremented by 2.
      value = '' + (noSuit + 2);
    } else {
      // Indices from 9 to 12 are face cards.
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
