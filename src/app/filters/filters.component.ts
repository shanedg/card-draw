import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Filters } from '../filters';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  selectedFilters: Filters = {
    suits: ['spade','heart','club','diamond'],
    cardsInHand: 7,
    maxCardValue: 12,
    minCardValue: 0
  };

  error: string|null;

  constructor() { }

  ngOnInit() {
  }

  // Send filter changes up and out to parent.
  @Output() filterEvent = new EventEmitter<Filters>();

  /*
   * Emit filter event for interception of filter state by parent.
   */
  setFilter() {
    if (this.filtersSatisfiable(this.selectedFilters)) {
      this.filterEvent.emit(this.selectedFilters);
    }
  }

  /*
   * Translate a card's deck index to a face value.
   */
  formatFaceLabel(value: number | null) {
    const noSuit = value % 13;

    let label;
    if (noSuit >= 0 && noSuit < 9) {
      // Indices from 0 to 8 are just incremented by 2.
      label = '' + (noSuit + 2);
    } else {
      // Indices from 9 to 12 are 'face' cards.
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
          value = null;
          break;            
      }
    }

    return label;
  }

  /*
   * Test if possible to satisfy filters based on current filters state.
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

  /*
   * Get the maximum possible cards that could comprise a hand
   * given the current filters state.
   */
  maxHandSize() {
    return this.selectedFilters.suits.length * ((this.selectedFilters.maxCardValue + 1) - this.selectedFilters.minCardValue);
  }

  /*
   * Keep the maximum selectable value of hand size
   * in sync with multi select/slider updates.
   */
  updateFilterSelections($event) {
    const maxHand = this.maxHandSize();

    // Important to adjust actual `cardsInHand` var as well.
    if (this.selectedFilters.cardsInHand > maxHand) {
      this.selectedFilters.cardsInHand = maxHand;
    }
  }
}
