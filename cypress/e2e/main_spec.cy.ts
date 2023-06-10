describe('Main Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://freebee.fun/cgi-bin/today', {
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
      .get('.game-play-button').first().should('have.text', 'DELETE')
      .get('.game-play-button').last().should('have.text', 'ENTER')
    })

  it('Should be able to input answer, edit input and see definition', () => {
    cy.get('button').eq(4).click()
      .get('button').eq(5).click()
      .get('button').eq(4).click()
      .get('button').eq(3).click()
      .get('h2').should('have.text', 'BABY')

    cy.get('.game-play-button').first().click().click()
      .get('h2').should('have.text', 'BA')

    cy.get('button').eq(4).click()
      .get('button').eq(3).click()
      .get('h2').should('have.text', 'BABY')
      .get('.game-play-button').last().click()

      .get('.title-box')
      .get('h2').should('have.text', 'baby')
      .get('p').first().should('have.text','/ˈbeɪbi/')
      .get('p').eq(1).should('have.text', 'noun')
      .get('p').eq(2).should('have.text', 'A very young human, particularly from birth to a couple of years old or until walking is fully mastered.')
      .get('p').eq(3).should('have.text', 'verb')
      .get('p').eq(4).should('have.text', 'To coddle; to pamper somebody like an infant.')
      
    cy.get('.scoreboard')
      .get('.word-card')
      .get('h3').should('have.text', 'baby')
    })

  it("should be able to randomize the letters", () => {
    cy.get('.boardpiece').should('have.length', 7);
    cy.get('.game-play-button').eq(1).click()
    cy.get('.boardpiece').should('have.length', 7);
  });
})