import { Ng2FinalPage } from './app.po';

describe('ng2-final App', function() {
  let page: Ng2FinalPage;

  beforeEach(() => {
    page = new Ng2FinalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
