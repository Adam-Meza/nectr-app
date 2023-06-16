describe("API Error Handling", () => {
  it('Should Display an error if the path isnt valid', () => {
    cy.visit('http://localhost:3000/badfilepath')
    cy.get('.error-card').should("have.text", "Nothing to see here!")
  })

  it('Should display an error if Game API fails', () => {
    cy.intercept('GET', 'https://freebee.fun/cgi-bin/random', {
      statusCode: 500,
      body: {
        error: "Something went wrong"
      } 
    }).visit('http://localhost:3000/')
      .get('.error-card').should('have.text', 'Something went wrong')
  })
});