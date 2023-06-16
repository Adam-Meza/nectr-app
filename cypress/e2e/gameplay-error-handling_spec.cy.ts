describe("Should properly handle errors", () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://freebee.fun/cgi-bin/random', {
      fixture: "game.json"
    }).intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/baby', {
      fixture: "definition.json"
    })
    .visit('http://localhost:3000/');
  });

  it("Should display an error input is too short", () => {
    cy.get('.boardpiece').eq(4).click()
    .get('.boardpiece').eq(5).click()
    .get('.game-play-button').last().click()
    .get('.error-card').should('have.text','Guesses must be at least 4 letters!' )
  });

  it("Should display an error if the input is invalid", () => {
    cy.get('.boardpiece').eq(4).click()
      .get('.boardpiece').eq(5).click()
      .get('.boardpiece').eq(5).click()
      .get('.boardpiece').eq(1).click()
      .get('.game-play-button').last().click()
      .get('.error-card').should('have.text','Please enter a valid word!' )
  });

  it("Should display an error if the userAlready input that name", () => {
    cy.get('.boardpiece').eq(4).click()
      .get('.boardpiece').eq(5).click()
      .get('.boardpiece').eq(4).click()
      .get('.boardpiece').eq(3).click()
      .get('.game-play-button').last().click()

    cy.get('.boardpiece').eq(4).click()
      .get('.boardpiece').eq(5).click()
      .get('.boardpiece').eq(4).click()
      .get('.boardpiece').eq(3).click()
      .get('.game-play-button').last().click()
      .get('.error-card').should('have.text','You already got that word!' )
  });
});