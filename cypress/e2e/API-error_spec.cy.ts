describe("API Error Handling", () => {
  it("Should display an error if the Dictionary API Call fails", () => {
      cy.intercept('GET', 'https://freebee.fun/cgi-bin/today', {
        fixture: "game.json"
      }).intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/baby', {
        body: {
          "title": "No Definitions Found",
          "message": "Sorry pal, we couldn't find definitions for the word you were looking for.",
          "resolution": "You can try the search again at later time or head to the web instead."
      }
      }).visit('http://localhost:3000/');
      
      cy.get('button').eq(4).click()
        .get('button').eq(5).click()
        .get('button').eq(4).click()
        .get('button').eq(3).click()
        .get('.game-play-button').last().click()

      cy.get('.error-card').should("have.text", "Sorry pal, we couldn't find definitions for the word you were looking for.")
  });

  it('Should Display an error if the path isnt valid', () => {
    cy.visit('http://localhost:3000/badfilepath')
    cy.get('.error-card').should("have.text", "Nothing to see here!")
  })
});