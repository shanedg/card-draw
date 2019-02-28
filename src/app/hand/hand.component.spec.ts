import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HandComponent } from './hand.component';
import { Filters } from '../filters';
import { Card } from '../card';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a null hand without filters defined', () => {
    const hand = component.currentHand;
    expect(hand.cards).toBeNull();
  });

  it('should not return a null hand with filters defined', () => {
    const defined: Filters = {
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
    component.filters = defined;
    const hand = component.currentHand;
    expect(hand.cards).not.toBeNull();
  });

  /**
   * [todo] more explicit tests around empty hand conditions
   */
  it('should return an empty hand if choosing from 0 decks', () => {
    const noDecks: Filters = {
      suits: [
        'spade',
        'heart',
        'club',
        'diamond',
      ],
      cardsInHand: 7,
      maxCardValue: 12,
      minCardValue: 0,
      numDecks: 0,
    };
    const hand = component.buildHand(noDecks);
    expect(hand).toEqual([]);
  });

  /**
   * [todo] write suite to test for drawing all possible size hands from 1 deck
   */
  it('should return 1 card if choosing 1 card with permissive filters', () => {
    const draw1Card: Filters = {
      suits: [
        'spade',
        'heart',
        'club',
        'diamond',
      ],
      cardsInHand: 1,
      maxCardValue: 12,
      minCardValue: 0,
      numDecks: 1,
    };
    const hand = component.buildHand(draw1Card);
    expect(hand.length).toEqual(1);
  });

  /**
   * [todo] see above
   */
  it('should return 52 cards if choosing 52 cards with permissive filters', () => {
    const entireDeck: Filters = {
      suits: [
        'spade',
        'heart',
        'club',
        'diamond',
      ],
      cardsInHand: 52,
      maxCardValue: 12,
      minCardValue: 0,
      numDecks: 1,
    };
    const hand = component.buildHand(entireDeck);
    expect(hand.length).toEqual(52);
  });

  /**
    * [TODO] write suite to test each suite for cards of only 1 suit when only 1 suit selected
    */
  it('should return cards of 1 suit if only 1 suit is selected', () => {
    const testSuit = 'spade';
    const only1Suit: Filters = {
      suits: [
        testSuit,
      ],
      cardsInHand: 7,
      maxCardValue: 12,
      minCardValue: 0,
      numDecks: 1,
    };

    let passes = true;
    const hand = component.buildHand(only1Suit);
    hand.forEach((card: Card, i: number) => {
      if (card.suit !== testSuit) {
        passes = false;
      }
    });

    expect(passes).toBe(true);
  });

  /**
   * [TODO] test for duplicates
   * 1. within a suit
   * 2. within a deck
   * 3. ceiling for duplicates in multiple decks?
   *
   * write suite to test (1) for each suit
   */

});
