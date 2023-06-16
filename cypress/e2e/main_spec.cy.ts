describe('Main Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://freebee.fun/cgi-bin/random', {
      fixture: "game.json"
    }).intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/baby', {
      fixture: "definition.json"
    })
    .visit('http://localhost:3000/')
  })

  it('Should see the header and game board' , () => {
    cy.get('h1').should('have.text', 'nectr')
      .get('main')
      .get('.piece-container').first().should('have.text', 'NE')
      .get('#center').should('have.text', 'Y')
      .get('.piece-container').last().should('have.text', 'AM')
    
      cy.get('.button-container')
      .get('.game-play-button').first().should('have.text', 'Delete')
      .get('.game-play-button').last().should('have.text', 'Enter')
    })

  it('Should be able to input answer, edit input and see definition', () => {
    cy.get('.boardpiece').eq(4).click()
      .get('.boardpiece').eq(5).click()
      .get('.boardpiece').eq(4).click()
      .get('.boardpiece').eq(3).click()
      .get('input').should('have.value', 'BABY')

    cy.get('.game-play-button').first().click().click()
      .get('input').should('have.value', 'BA')

    cy.get('.boardpiece').eq(4).click()
      .get('.boardpiece').eq(3).click()
      .get('input').should('have.value', 'BABY')
      .get('.game-play-button').last().click()

      .get('.title-box')
      .get('p').first().should('have.text','baby')
      .get('p').eq(1).should('have.text', '/ˈbeɪbi/')
      .get('p').eq(2).should('have.text', 'noun')
      .get('p').eq(3).should('have.text', 'A very young human, particularly from birth to a couple of years old or until walking is fully mastered.')
      .get('p').eq(4).should('have.text', 'verb')
      
    cy.get('.scoreboard')
      .get('.word-card')
      .get('.guess').should('have.text', 'baby')
    })

  it("should be able to randomize the letters", () => {
    cy.get('.boardpiece').should('have.length', 7);
    cy.get('.game-play-button').eq(1).click()
    cy.get('.boardpiece').should('have.length', 7);
  });
})