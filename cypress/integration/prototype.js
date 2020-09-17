/// <reference types="Cypress" />

// fails because the prototypes from two iframes are not the same
it.skip('Verify the prototype of fetch result is the same as Object.prototype',
  { experimentalFetchPolyfill: true }, function () {
  cy.visit('/')
  cy.get('#result').should('have.text', 'true');
})

// this works - we can observe / spy on the network call
// yet the prototype is correct
it('try cy.route2',
  { "experimentalNetworkStubbing": true }, function() {
  cy.route2('/test')
  cy.visit('/')
  cy.get('#result').should('have.text', 'true');
})

// this works too
it('try cy.route', function () {
  cy.server()
  cy.route('/test')
  cy.visit('/')
  cy.get('#result').should('have.text', 'true');
})

it('stub window.fetch', function() {
  cy.visit('/', {
    onBeforeLoad(w) {
      cy.stub(w, 'fetch').resolves({
        json() {
          // make sure the object is constructed
          // using the window under test's objects
          return w.eval('({})')
        }
      })
    }
  })
  cy.get('#result').should('have.text', 'true');
})

it('stub window.fetch with stringified object', function () {
  const myData = {
    foo: 'bar',
    baz: 42
  }
  cy.visit('/', {
    onBeforeLoad(w) {
      cy.stub(w, 'fetch').resolves({
        json() {
          // make sure the object is constructed
          // using the window under test's objects
          return w.eval('(' + JSON.stringify(myData) + ')')
        }
      })
    }
  })
  cy.get('#result').should('have.text', 'true');
})
