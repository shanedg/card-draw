import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Filters } from './filters';
import 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  /**
   * App title.
   */
  title = 'card-draw';

  /**
   * Filters state.
   */
  filters: Filters;

  /**
   * Run on filter event.
   * @param $event Emitted filter event.
   */
  recieveFilters($event) {

    /**
     * Treat as immutable to update child input bindings on changes.
     */
    this.filters = {
      ...$event
    };
  }
}
