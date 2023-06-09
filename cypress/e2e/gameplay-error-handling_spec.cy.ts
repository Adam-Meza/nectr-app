describe("Should properly handle errors", () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://freebee.fun/cgi-bin/today', {
      fixture: "game.json"
    }).intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/baby', {
      fixture: "definition.json"
    })
    .visit('http://localhost:3000/');
  });

  it("Should display an error input is too short", () => {
    cy.get('button').eq(4).click()
    .get('button').eq(5).click()
    .get('.game-play-button').last().click()
    .get('.error-card').should('have.text','Guesses must be at least 4 letters!' )
  });

  it("Should display an error if the input is invalid", () => {
    cy.get('button').eq(4).click()
      .get('button').eq(5).click()
      .get('button').eq(5).click()
      .get('button').eq(1).click()
      .get('.game-play-button').last().click()
      .get('.error-card').should('have.text','Please enter a valid word!' )
  });

  it("Should display an error if the userAlready input that name", () => {
    cy.get('button').eq(4).click()
      .get('button').eq(5).click()
      .get('button').eq(4).click()
      .get('button').eq(3).click()
      .get('.game-play-button').last().click()

    cy.get('button').eq(4).click()
      .get('button').eq(5).click()
      .get('button').eq(4).click()
      .get('button').eq(3).click()
      .get('.game-play-button').last().click()
      .get('.error-card').should('have.text','You already got that word!' )
  });
});