describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('navigates through sections', () => {
    // Check home section
    cy.get('#home').should('be.visible');

    // Navigate to About
    cy.get('a[href="#about"]').click();
    cy.get('#about').should('be.visible');

    // Navigate to Projects
    cy.get('a[href="#projects"]').click();
    cy.get('#projects').should('be.visible');

    // Navigate to Contact
    cy.get('a[href="#contact"]').click();
    cy.get('#contact').should('be.visible');
  });

  it('submits contact form', () => {
    cy.get('#contact').scrollIntoView();
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('textarea[name="message"]').type('Test message');
    cy.get('button[type="submit"]').click();
    cy.contains('Message sent successfully').should('be.visible');
  });
});
