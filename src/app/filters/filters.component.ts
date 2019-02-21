import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Filters } from '../filters';

import { PlayingCardsService } from '../playing-cards.service';

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

  constructor(public playingCardsService: PlayingCardsService) { }

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
