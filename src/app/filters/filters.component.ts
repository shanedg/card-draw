import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Filters } from '../filters';

import { PlayingCardsService } from '../playing-cards.service';
import {
  INITIAL_CARDS_FILTER,
  ERROR_MESSAGE_MIN_GT_MAX,
  ERROR_MESSAGE_HAND_NOT_POSSIBLE,
  ERROR_MESSAGE_NO_SUITS,
} from './filters.constants';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
  /**
   * Filters to apply to drawn hand.
   */
  selectedFilters: Filters;

  /**
   * Filtering errors.
   */
  error: string[] = [];

  /**
   * Number of cards available to draw based on filters.
   */
  maxHandSize: number;

  constructor(public playingCardsService: PlayingCardsService) { }

  ngOnInit() {
    this.selectedFilters = Object.assign({}, INITIAL_CARDS_FILTER);
    this.maxHandSize = this.calcMaxHandSize(this.selectedFilters);
  }

  /**
   * Emitted filter event.
   */
  @Output() filterEvent = new EventEmitter<Filters>();

  /**
   * Only emit if filters are satisfiable.
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
  filtersSatisfiable(filters: Filters) {
    const errors = [];

    if (filters.minCardValue > filters.maxCardValue) {
      if (errors.indexOf(ERROR_MESSAGE_MIN_GT_MAX) === -1) {
        errors.push(ERROR_MESSAGE_MIN_GT_MAX);
      }
    }
    if (filters.suits.length === 0) {
      if (errors.indexOf(ERROR_MESSAGE_NO_SUITS) === -1) {
        errors.push(ERROR_MESSAGE_NO_SUITS);
      }
    }

    /*
     * This isn't strictly necessary with dynamic hand-size selection.
     * However, it is important while debugging to keep unsatisfiable
     * filters from reaching the do-while loop and locking up the browser.
     */
    const maxHandSize = this.calcMaxHandSize(filters);
    if (filters.cardsInHand > maxHandSize) {
      if (errors.indexOf(ERROR_MESSAGE_HAND_NOT_POSSIBLE) === -1) {
        errors.push(ERROR_MESSAGE_HAND_NOT_POSSIBLE);
      }
    }

    this.error = [].concat(errors);

    if (errors.length > 0) {
      return false;
    }

    return true;
  }

  /**
   * Calculate the number of cards possible to draw based on filters.
   * @param filters Filters to evaluate max hand size against.
   */
  calcMaxHandSize(filters: Filters) {
    const max = filters.numDecks * filters.suits.length * ((filters.maxCardValue + 1) - filters.minCardValue);
    return max;
  }

}
