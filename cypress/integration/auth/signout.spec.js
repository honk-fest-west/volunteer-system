describe('signout', () => {
  beforeEach(() => {
    cy.visit('/#/system');
  });

  it('should signout', () => {
    cy.get('[data-testid="sidebar-account-menu"]').click();
    cy.get('[data-testid="sidebar-account-signout"]').click();
    cy.location('hash').should('eq', '#/auth');
  });
});
