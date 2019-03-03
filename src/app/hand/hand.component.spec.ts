import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HandComponent } from './hand.component';
import { Filters } from '../filters';
import { Card } from '../card';
import { INITIAL_CARDS_FILTER } from '../filters/filters.constants';

describe('HandComponent', () => {
  let component: HandComponent;
  let fixture: ComponentFixture<HandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('smoke: should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a null hand without filters defined', () => {
    const hand = component.currentHand;
    expect(hand.cards).toBeNull();
  });

  it('should not return a null hand with filters defined', () => {
    const defined: Filters = Object.assign({}, INITIAL_CARDS_FILTER);
    component.filters = defined;
    const hand = component.currentHand;
    expect(hand.cards).not.toBeNull();
  });

  it('should return an empty hand if choosing from 0 decks', () => {
    const noDecks: Filters = Object.assign({}, INITIAL_CARDS_FILTER, {
      numDecks: 0,
    });
    const hand = component.buildHand(noDecks);
    expect(hand).toEqual([]);
  });

  it('should return an empty hand if min > max', () => {
    const noDecks: Filters = Object.assign({}, INITIAL_CARDS_FILTER, {
      maxCardValue: 5,
      minCardValue: 7,
    });
    const hand = component.buildHand(noDecks);
    expect(hand).toEqual([]);
  });

  it('should return x cards if choosing x cards with permissive filters, 0-52', () => {
    for (let i = 0; i <= 52; i++) {
      const drawXCards: Filters = Object.assign(INITIAL_CARDS_FILTER, {
        cardsInHand: i,
      });
      const hand = component.buildHand(drawXCards);
      expect(hand.length).toEqual(i);
    }
  });

  it('should return only 52 cards if choosing more than 52 cards with permissive filters', () => {
    const entireDeckPlus1: Filters = Object.assign({}, INITIAL_CARDS_FILTER, {
      cardsInHand: 53,
    });
    const hand = component.buildHand(entireDeckPlus1);
    expect(hand.length).toEqual(52);
  });

  it('should return only x cards if min and max are equal and x suits are selected', () => {
    const suitCount = INITIAL_CARDS_FILTER.suits.length;

    for (let i = 0; i < suitCount; i++) {
      const tempSuits = INITIAL_CARDS_FILTER.suits.slice(i);
      const minMaxEqual: Filters = Object.assign({}, INITIAL_CARDS_FILTER, {
        maxCardValue: 7,
        minCardValue: 7,
        suits: tempSuits,
      });

      const hand = component.buildHand(minMaxEqual);
      expect(hand.length).toEqual(tempSuits.length);
    }
  });

  it('should return only cards of suit x if only suit x is selected', () => {
    INITIAL_CARDS_FILTER.suits.forEach((suit: string) => {
      const singleSuitAtATime: Filters = Object.assign({}, INITIAL_CARDS_FILTER, {
        suits: [
          suit,
        ],
      });

      let matchesSuit = true;
      const hand = component.buildHand(singleSuitAtATime);
      hand.forEach((card: Card) => {
        if (card.suit !== suit) {
          matchesSuit = false;
        }
      });

      expect(matchesSuit).toBe(true);
    });
  });

  it('should return no duplicates within any suit in a single deck', () => {
    INITIAL_CARDS_FILTER.suits.forEach((suit: string, index: number) => {
      const singleSuitAtATime: Filters = Object.assign({}, INITIAL_CARDS_FILTER, {
        suits: [
          suit,
        ],
      });

      const checked: number[] = [];
      const hand = component.buildHand(singleSuitAtATime);
      let noDuplicates = true;
      hand.forEach((card: Card) => {
        if (checked.indexOf(card.value) === -1) {
          checked.push(card.value);
        } else {
          noDuplicates = false;
        }
      });

      expect(noDuplicates).toBe(true);
    });
  });

  it('should return no duplicates within a deck', () => {
    const allCards: Filters = Object.assign({}, INITIAL_CARDS_FILTER, {
      cardsInHand: 52,
    });

    const checked: string[] = [];
    const hand = component.buildHand(allCards);
    let noDuplicates = true;
    hand.forEach((card: Card) => {
      const cardKey = `${card.suit}:${card.value}`;
      if (checked.indexOf(cardKey) === -1) {
        checked.push(cardKey);
      } else {
        noDuplicates = false;
      }
    });

    expect(noDuplicates).toBe(true);
  });

  it('should return x of a card y within x decks', () => {
    const howManyDecks = 10;
    const oneSuit = 'spade';
    const cardValue = 7;

    const twoDecks: Filters = Object.assign({}, INITIAL_CARDS_FILTER, {
      cardsInHand: howManyDecks,
      maxCardValue: cardValue,
      minCardValue: cardValue,
      numDecks: howManyDecks,
      suits: [
        oneSuit
      ],
    });

    const checked: string[] = [];
    const hand = component.buildHand(twoDecks);
    let numDuplicates = 0;
    hand.forEach((card: Card) => {
      const cardKey = `${card.suit}:${card.value}`;
      if (checked.indexOf(cardKey) === -1) {
        checked.push(cardKey);
      } else {
        numDuplicates++;
      }
    });

    expect(numDuplicates).toEqual(howManyDecks - 1);
  });

});
