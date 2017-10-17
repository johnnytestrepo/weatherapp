import { Weatherapp.LocalPage } from './app.po';

describe('weatherapp.local App', () => {
  let page: Weatherapp.LocalPage;

  beforeEach(() => {
    page = new Weatherapp.LocalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
