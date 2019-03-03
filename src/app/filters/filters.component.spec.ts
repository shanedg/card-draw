import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatSliderModule,
} from '@angular/material';
import { FiltersComponent } from './filters.component';
import {
  INITIAL_CARDS_FILTER,
  ERROR_MESSAGE_MIN_GT_MAX,
  ERROR_MESSAGE_HAND_NOT_POSSIBLE,
  ERROR_MESSAGE_NO_SUITS,
} from './filters.constants';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatSliderModule,
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

  it('smoke: should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate filter initial state', () => {
    const goodFilter = Object.assign({}, INITIAL_CARDS_FILTER);
    expect(component.filtersSatisfiable(goodFilter)).toBe(true);
  });

  it('side effect: should clear errors when valid', () => {
    const goodFilter = Object.assign({}, INITIAL_CARDS_FILTER);
    component.error = ['no good, try again'];
    component.filtersSatisfiable(goodFilter);
    expect(component.error).toEqual([]);
  });

  it('should invalidate no suits selected', () => {
    const noSuits = Object.assign({}, INITIAL_CARDS_FILTER, {
      suits: [],
    });
    expect(component.filtersSatisfiable(noSuits)).toBe(false);
  });

  it('side effect: should report an error when no suits selected', () => {
    const noSuits = Object.assign({}, INITIAL_CARDS_FILTER, {
      suits: [],
    });
    component.filtersSatisfiable(noSuits);
    expect(component.error).toContain(ERROR_MESSAGE_NO_SUITS);
  });

  it('should invalidate min greater than max', () => {
    const minGreaterThanMax = Object.assign({}, INITIAL_CARDS_FILTER, {
      maxCardValue: 5,
      minCardValue: 6,
    });
    expect(component.filtersSatisfiable(minGreaterThanMax)).toBe(false);
  });

  it('side effect: should report an error when min greater than max', () => {
    const minGreaterThanMax = Object.assign({}, INITIAL_CARDS_FILTER, {
      maxCardValue: 5,
      minCardValue: 6,
    });
    component.filtersSatisfiable(minGreaterThanMax);
    expect(component.error).toContain(ERROR_MESSAGE_MIN_GT_MAX);
  });

  it('should invalidate an empty hand', () => {
    const handEmpty = Object.assign({}, INITIAL_CARDS_FILTER, {
      maxCardValue: 5,
      minCardValue: 6,
      numDecks: 0,
    });
    component.selectedFilters = handEmpty;
    expect(component.calcMaxHandSize(handEmpty)).toBeLessThanOrEqual(0);
  });

  it('should determine when max hand size possible is <= 0', () => {
    const handEmpty = Object.assign({}, INITIAL_CARDS_FILTER, {
      numDecks: 0,
    });
    component.selectedFilters = handEmpty;
    expect(component.calcMaxHandSize(handEmpty)).toBeLessThanOrEqual(0);
  });

  it('side effect: should report an error when max hand size possible is <= 0', () => {
    const handEmpty = Object.assign({}, INITIAL_CARDS_FILTER, {
      numDecks: 0,
    });
    component.selectedFilters = handEmpty;
    component.filtersSatisfiable(handEmpty);
    expect(component.error).toContain(ERROR_MESSAGE_HAND_NOT_POSSIBLE);
  });

});
