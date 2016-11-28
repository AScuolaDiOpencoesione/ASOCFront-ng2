import { AsocPlatformPage } from './app.po';

describe('asoc-platform App', function() {
  let page: AsocPlatformPage;

  beforeEach(() => {
    page = new AsocPlatformPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
