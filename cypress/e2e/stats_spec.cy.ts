describe('Stats Page', () => {
  it("should be able to see stats on the current game", () => {
    cy.intercept('GET', 'https://freebee.fun/cgi-bin/today', {
      fixture: "game.json"
    }).intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/baby', {
      fixture: "definition.json"
    }).visit('http://localhost:3000/')

    cy.get('button').eq(4).click()
      .get('button').eq(5).click()
      .get('button').eq(4).click()
      .get('button').eq(3).click()
      .get('.game-play-button').last().click()

    cy.get('.nav-link').last().click()
    cy.get('.stats')
      .get('p').first().should('have.text', "Words Guessed: 1")
      .get('p').last().should('have.text','Total Words Possible: 44')
     
  });
});