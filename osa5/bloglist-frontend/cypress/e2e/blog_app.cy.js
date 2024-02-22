describe('Blog ', function() {
  beforeEach(function() {
    // cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // const user = {
    //   name: 'Somebody',
    //   username: 'user2',
    //   password: 'user2'
    // }
    // cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')

    it('Contains login form', function() {
      cy.contains('username')
      cy.contains('password')
    })
  })

  
  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('user2')
      cy.get('input:last').type('user2')
      cy.contains('login').click()
      cy.contains("blogs")
    })
    it('fails with wrong credentials', function() {
      cy.get('input:first').type('user2')
      cy.get('input:last').type('wrong')
      cy.contains('login').click()
    })
  })

    describe('Blog can be created', function() {
      beforeEach(function() {
        cy.contains('login').click()
        cy.get('#username').type('user2')
        cy.get('#password').type('user2')
        cy.get('#login-button').click()
      })

      it('a new blog can be created', function() {
        cy.contains('Create new blog').click()
        cy.contains('cancel')
        cy.get('input').type('a blog created by cypress')
        cy.contains('save').click()
        cy.contains('a blog created by cypress')
      })
    })

    describe('Like', function() {
      beforeEach(function() {
        cy.contains('login').click()
        cy.get('#username').type('user2')
        cy.get('#password').type('user2')
        cy.get('#login-button').click()
      })

      it('can like', function() {
        cy.contains('a blog created by cypress').parent().find('button').click()
        cy.contains('0')
        cy.contains('like').click({force: true})
        cy.reload()
        cy.contains('a blog created by cypress').parent().find('button').click()
        cy.contains('1')
      })
    })

    describe('Delete', function() {
      beforeEach(function() {
        cy.contains('login').click()
        cy.get('#username').type('user2')
        cy.get('#password').type('user2')
        cy.get('#login-button').click()
      })

      it('can delete', function() {
        cy.contains('a blog created by cypress').parent().find('button').click()
        cy.contains('Delete').click({force: true})
      })
    })

    describe('Sort by likes', function() {
      beforeEach(function() {
        cy.contains('login').click()
        cy.get('#username').type('user2')
        cy.get('#password').type('user2')
        cy.get('#login-button').click()
      })

      it('Blogs are sort by likes', function() {
        cy.contains('Create new blog').click()
        cy.get('input').type('a blog created by cypress 1')
        cy.contains('save').click()

        cy.contains('a blog created by cypress 1').parent().find('button').click()
        cy.contains('like').click({force: true})
        cy.reload()

        cy.wait(500)

        cy.contains('Create new blog').click()
        cy.get('input').type('a blog created by cypress 2')
        cy.contains('save').click()

        cy.reload()

        cy.get('.blog').eq(0).should('contain', 'a blog created by cypress 1')
        cy.get('.blog').eq(1).should('contain', 'a blog created by cypress 2')
      })
    })
})