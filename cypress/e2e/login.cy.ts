describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should show validation errors when submitting empty form', () => {
    // Submit empty form
    cy.get('form').submit()

    // Check if error messages are displayed
    cy.contains('Username is required')
    cy.contains('Password is required')

    // Check if inputs have error class
    cy.get('#username').should('have.class', 'error')
    cy.get('#password').should('have.class', 'error')
  })

  it('should successfully log in and redirect to calculator', () => {
    // Fill in login credentials
    cy.get('#username').type('testuser')
    cy.get('#password').type('password123')

    // Intercept console.log to verify data
    cy.window().then(win => {
      cy.spy(win.console, 'log').as('consoleLog')
    })

    // Submit form
    cy.get('form').submit()

    // Verify console.log was called with correct data
    cy.get('@consoleLog').should('be.calledWith', 'Login data:', {
      username: 'testuser',
      password: 'password123'
    })

    // Verify redirection to calculator page
    cy.url().should('include', '/')
    cy.get('.calculator').should('exist')
  })

  it('should maintain field states during form interaction', () => {
    // Type in username
    cy.get('#username').type('testuser')

    // Submit form with missing password
    cy.get('form').submit()

    // Verify username is preserved and password error is shown
    cy.get('#username').should('have.value', 'testuser')
    cy.contains('Password is required')
  })

  it('should clear form when navigating away and back', () => {
    // Fill in some data
    cy.get('#username').type('testuser')
    cy.get('#password').type('password123')

    // Navigate away
    cy.get('a').contains('Calculator').click()

    // Navigate back
    cy.get('a').contains('Login').click()

    // Fields should be empty (form should reset)
    cy.get('#username').should('have.value', '')
    cy.get('#password').should('have.value', '')
  })
})
