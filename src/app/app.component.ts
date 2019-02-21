import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Filters } from './filters';
import 'hammerjs';
import { Subject } from 'rxjs';

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
  filters: Subject<Filters> = new Subject<Filters>();

  /**
   * Run on filter event.
   * @param $event Emitted filter event.
   */
  recieveFilters($event) {

    /**
     * Update app filters state with filter event.
     * Note, it's important that the filters are always a new object;
     * Allows a new, random hand to be drawn with identical filters.
     */
    this.filters.next({
      ...$event
    });
  }
}
