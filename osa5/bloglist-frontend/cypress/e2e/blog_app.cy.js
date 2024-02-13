describe('Blog ', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', function() {
    cy.contains('username')
    cy.contains('password')
  })
  it('login form can be opened', function() {
    cy.get('input:first').type('user2')
    cy.get('input:last').type('user2')
    cy.contains('login').click()
  })
})