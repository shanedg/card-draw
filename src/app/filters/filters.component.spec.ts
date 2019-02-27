import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { FiltersComponent } from './filters.component';
import { allocHostVars } from '@angular/core/src/render3';
import { Filters } from '../filters';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatSelectModule,
        MatSliderModule
      ],
      declarations: [ FiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * test: component smoke
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * test: `filtersSatisfiable`
   */
  it('should validate filter initial state', () => {
    const goodFilter: Filters = {
      suits: [
        'spade',
        'heart',
        'club',
        'diamond',
      ],
      cardsInHand: 7,
      maxCardValue: 12,
      minCardValue: 0,
      numDecks: 1,
    };
    expect(component.filtersSatisfiable(goodFilter)).toBe(true);
  });

  it('should clear errors when valid', () => {
    const goodFilter: Filters = {
      suits: [
        'spade',
        'heart',
        'club',
        'diamond',
      ],
      cardsInHand: 7,
      maxCardValue: 12,
      minCardValue: 0,
      numDecks: 1,
    };
    component.error = 'no good, try again';
    component.filtersSatisfiable(goodFilter);
    expect(component.error).toEqual(null);
  });

  it('should invalidate no suits selected', () => {
    const noSuits: Filters = {
      suits: [],
      cardsInHand: 7,
      maxCardValue: 12,
      minCardValue: 0,
      numDecks: 1,
    };
    expect(component.filtersSatisfiable(noSuits)).toBe(false);
  });

  it('should report an error when no suits selected', () => {
    const noSuits: Filters = {
      suits: [],
      cardsInHand: 7,
      maxCardValue: 12,
      minCardValue: 0,
      numDecks: 1,
    };
    component.filtersSatisfiable(noSuits);
    expect(component.error).toBe('no suits selected');
  });

  it('should invalidate min greater than max', () => {
    const minGreaterThanMax: Filters = {
      suits: [
        'spade',
        'heart',
        'club',
        'diamond',
      ],
      cardsInHand: 7,
      maxCardValue: 5,
      minCardValue: 6,
      numDecks: 1,
    };
    expect(component.filtersSatisfiable(minGreaterThanMax)).toBe(false);
  });

  it('should report an error when min greater than max', () => {
    const minGreaterThanMax: Filters = {
      suits: [
        'spade',
        'heart',
        'club',
        'diamond',
      ],
      cardsInHand: 7,
      maxCardValue: 5,
      minCardValue: 6,
      numDecks: 1,
    };
    component.filtersSatisfiable(minGreaterThanMax);
    expect(component.error).toBe('min card value must be less than or equal to max card value');
  });

  it('should invalidate an empty hand', () => {
    const handEmpty: Filters = {
      suits: [
        'spade',
        'heart',
        'club',
        'diamond',
      ],
      cardsInHand: 7,
      maxCardValue: 5,
      minCardValue: 6,
      numDecks: 0,
    };
    component.selectedFilters = handEmpty;
    expect(component.maxHandSize()).toBeLessThanOrEqual(0);
  });

  it('should correctly determine when max hand size possible is <= 0', () => {
    const handEmpty: Filters = {
      suits: [
        'spade',
        'heart',
        'club',
        'diamond',
      ],
      cardsInHand: 7,
      maxCardValue: 5,
      minCardValue: 6,
      numDecks: 0,
    };
    component.selectedFilters = handEmpty;
    expect(component.maxHandSize()).toBeLessThanOrEqual(0);
  });

  /**
   * [TODO] clean/async way to wait for or force the component to update
   */
  // it('should dynamically update cards in hand when max hand size possible is < cards in hand', () => {
  //   const goodFilter: Filters = {
  //     suits: [
  //       'spade',
  //       'heart',
  //       'club',
  //       'diamond',
  //     ],
  //     cardsInHand: 7,
  //     maxCardValue: 12,
  //     minCardValue: 0,
  //     numDecks: 1,
  //   };

  //   const handTooLarge: Filters = {
  //     suits: [
  //       'spade',
  //     ],
  //     cardsInHand: 5,
  //     maxCardValue: 5,
  //     minCardValue: 5,
  //     numDecks: 1,
  //   };

  //   component.selectedFilters = goodFilter;
  //   component.updateFilterSelections(handTooLarge);

  //   // [TODO] call `dispatchEvent()` ??
  //   // target.dispatchEvent(newEvent('input'));

  //   fixture.detectChanges();
  //   expect(component.selectedFilters.cardsInHand).toEqual(4);

  // });

});
