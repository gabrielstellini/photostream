describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearLocalStorage();
  });

  it('should redirect to photos', () => {
    cy.url().should('include', '/photos');
  });

  it('should open favourites page', () => {
    cy.get('[data-cy=favourites-link]').click();
    cy.url().should('include', '/favourites');
  });
});
