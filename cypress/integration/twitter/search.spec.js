context('Twitter Search', () => {
  beforeEach(() => {
    cy
      .visit('https://twitter.com/hashtag/cypress')
      .title()
      .should('include', '#cypress hashtag on Twitter')
  });

  it('should have our search in the search input', () => {
    cy
      .get('#search-query')
      .should('have.value', '#cypress')
  });

  it('should let us search for something new', () => {
    cy
      .get('#search-query')
      .clear()
      .type('@Cypress_io')
  });

  it('should let us search for a user and visit their profile', () => {
    cy
      .get('#search-query')
      .clear()
      .type('@Cypress_io');
    
    cy
      .get('div[role="listbox"] a[href="/Cypress_io"]')
      .click();

    cy
      .url()
      .should('contain', 'https://twitter.com/Cypress_io');
  });
});