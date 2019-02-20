import { TestBed } from '@angular/core/testing';

import { PlayingCardsService } from './playing-cards.service';

describe('PlayingCardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayingCardsService = TestBed.get(PlayingCardsService);
    expect(service).toBeTruthy();
  });
});
