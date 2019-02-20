import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Filters } from '../filters';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
  selectedFilters: Filters = {
    suits: ['spade','heart','club','diamond'],
    cardsInHand: 7,
    maxCardValue: 12,
    minCardValue: 0,
    numDecks: 1,
  };

  error: string | null;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Emitted filter event.
   */
  @Output() filterEvent = new EventEmitter<Filters>();

  /**
   * Wrap emit in validation that filters are possible to satisfy.
   */
  setFilter() {
    if (this.filtersSatisfiable(this.selectedFilters)) {
      this.filterEvent.emit(this.selectedFilters);
    }
  }

  /**
   * Translate a card's deck index to a face value.
   * @param index Index of card selected from 1 or more decks.
   */
  formatFaceLabel(index: number | null) {
    /**
     * Disregard suit, only need face value.
     */
    const noSuit = index % 13;

    /**
     * Card face value label to return.
     */
    let label;
    if (noSuit >= 0 && noSuit < 9) {
      /**
       * Indices from 0 to 8 are just incremented by 2.
       * Face values 2 through 9.
       */
      label = '' + (noSuit + 2);
    } else {
      /**
       * Indices from 9 to 12 are face cards.
       * Face values Jack through Ace.
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

        // This shouldn't ever happen.
        default:
          label = '';
          break;
      }
    }

    return label;
  }

  /**
   * Test if possible to satisfy filters.
   * @param filters Filters values object.
   */
  filtersSatisfiable(filters) {
    if (filters.minCardValue > filters.maxCardValue) {
      this.error = 'min card value must be less than or equal to max card value';
      return false;
    }
    if (filters.suits.length === 0) {
      this.error = 'no suits selected';
      return false;
    }

    /*
     * This error handling not necessary with dynamic hand-size selection.
     * BUT important while debugging to keep unsatisfiable filter conditions
     * in the do-while loop from locking up the browser.
     */
    // const maxHandSize = this.maxHandSize();
    // if (filters.cardsInHand > maxHandSize) {
    //   this.error = 'not possible to draw that many cards with current filters';
    //   return false;
    // }

    this.error = null;
    return true;
  }

  /**
   * Get the maximum possible cards that could comprise a hand.
   */
  maxHandSize() {
    return this.selectedFilters.numDecks * this.selectedFilters.suits.length * ((this.selectedFilters.maxCardValue + 1) - this.selectedFilters.minCardValue);
  }

  /**
   * Keep the maximum selectable value of hand size
   * in sync with multi select/slider updates.
   * @param $event Event emitted when filters update.
   */
  updateFilterSelections($event) {
    const maxHand = this.maxHandSize();

    /**
     * Automatically reduce the number of cards selected to draw
     * if greater than the number it's currently possible to draw.
     */
    if (this.selectedFilters.cardsInHand > maxHand) {
      this.selectedFilters.cardsInHand = maxHand;
    }
  }
}
