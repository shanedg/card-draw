import { Component } from '@angular/core';
import { Filters } from './filters';
import 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'card-draw';
  filters: Filters;

  recieveFilters($event) {
    /*
     * Treat  `this.filters` as immutable so that this change
     * triggers `ngOnChanges` in children that receive it, i.e. app-hand.
     */
    this.filters = {
      ...$event
    };
  }
}
