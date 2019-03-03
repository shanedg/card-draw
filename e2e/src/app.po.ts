import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getDecksToDraw() {
    return element(by.css('app-root app-filters input'));
  }

  getButton() {
    return element(by.css('app-root app-filters button'));
  }

  getHand() {
    return element.all(by.css('app-root app-hand .card-contain .card'));
  }
}
