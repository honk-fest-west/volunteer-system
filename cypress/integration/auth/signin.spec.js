describe('signin', () => {
  beforeEach(() => {
    cy.visit('/#/auth');
  });

  it('should signin with valid credentials', () => {
    cy.get('[data-testid="signin-email"').type('lead@test.com');
    cy.get('[data-testid="signin-password"').type('testtesttest');
    cy.get('[data-testid="signin-submit"').click();
    cy.location('hash').should('eq', '#/system');
  });
});

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
