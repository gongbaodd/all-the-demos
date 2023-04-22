// https://docs.cypress.io/api/introduction/api.html

describe('1-counter', () => {
  it('visit the counter page', () => {
    cy.visit('/1-counter')
    cy.contains('#id', 'Count')
  })
})
