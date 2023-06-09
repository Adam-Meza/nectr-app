describe("Favorites View", () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://freebee.fun/cgi-bin/today', {
      fixture: "game.json"
    }).intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/baby', {
      fixture: "definition.json"
    })
    .visit('http://localhost:3000/');
  });

  it("Should default to an error message before you favorite a word", () => {
    cy.get('.link').eq(1).click();

    cy.get('.error-card')
      .get('p').should('have.text', 'No Favorites yet!')
  })

  it("Should be able to favorite and unfavorite a card", () => {
    cy.get('button').eq(4).click()
      .get('button').eq(5).click()
      .get('button').eq(4).click()
      .get('button').eq(3).click();

    cy.get('h2').should('have.text', 'BABY')
    .get('.game-play-button').last().click()
  
    cy.get('.favorite-button').click();

    cy.get('.link').eq(1).click();

    cy.get('.title-box')
      .get('h2').should('have.text', 'baby')
      .get('p').first().should('have.text','/ˈbeɪbi/')
      .get('p').eq(1).should('have.text', 'noun')
      .get('p').eq(2).should('have.text', 'A very young human, particularly from birth to a couple of years old or until walking is fully mastered.')
      .get('p').eq(3).should('have.text', 'verb')
      .get('p').eq(4).should('have.text', 'To coddle; to pamper somebody like an infant.')

    cy.get('.link').first().click()
      .get('.unfavorite-button').first().click()

    cy.get('.link').eq(1).click();

    cy.get('.definition').should('not.exist')
  });
});