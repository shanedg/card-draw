import { AppPage } from './app.po';
import { protractor } from 'protractor/built/ptor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to card-draw!');
  });

  it('should draw a hand of 7 cards', () => {
    page.navigateTo();
    page.getButton().click();
    expect(page.getHand().count()).toEqual(7);
  });

  it('should draw 0 cards if 0 decks selected', () => {
    page.navigateTo();
    page.getDecksToDraw().sendKeys(protractor.Key.BACK_SPACE, 0);
    page.getButton().click();
    expect(page.getHand().count()).toEqual(0);
  });

});
