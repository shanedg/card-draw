import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { Hand } from '../hand';
import { Filters } from '../filters';
import { PlayingCardsService } from '../playing-cards.service';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HandComponent {

  constructor(private playingCardsService: PlayingCardsService) { }

  /**
   * Selected filters constraints for generating hand.
   */
  @Input() filters: Filters;

  /**
   * Getter for generated hand, builds hand when accessed.
   */
  public get currentHand(): Hand {
    if (this.filters != undefined) {
      const hand = this.buildHand(this.filters);

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
  buildHand(options: Filters) {
    let handCandidates = [];
    for (let i = 0; i < (options.numDecks * 52); i++) {
      handCandidates.push(i);
    }

    const hand = [];

    while(hand.length < options.cardsInHand && handCandidates.length > 0) {
      // Choose random deck index
      const randomIndex = Math.floor(Math.random() * handCandidates.length);
      const randomCard = handCandidates[randomIndex];

      // Translate random deck index to suit and value
      const suit = this.playingCardsService.mapIndexToCardSuit(randomCard);
      const value = randomCard % 13;

      // Add to hand if candidate passes filter criteria
      if (options.suits.indexOf(suit) > -1
        && value >= options.minCardValue
        && value <= options.maxCardValue
      ) {
        // Push card indices and card objects separately.
        hand.push({
          suit,
          value: this.playingCardsService.mapIndexToCardValue(randomCard),
        });
      }

      if (randomIndex === 0) {
        handCandidates.shift();
      } else if (randomIndex === (handCandidates.length - 1)) {
        handCandidates.pop();
      } else {
        handCandidates = handCandidates.slice(0, randomIndex).concat(handCandidates.slice(randomIndex + 1, handCandidates.length));
      }
    }

    return hand;
  }

}
