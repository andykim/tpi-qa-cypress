describe('My first interaction with web', () => {

    it('Submit form', () =>{
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.visit('https://demoqa.com/automation-practice-form').then(() => {
            cy.get('#firstName').type('Andy');
            cy.get('#subjectsInput').type('Computer Science').type('{enter}');
            cy.get('#hobbiesWrapper [type=checkbox]').each(($el) => {
                if ($el.val() == 2) {
                    cy.get($el).click({force: true});
                }
            });
            cy.get('#react-select-3-input').click({force: true}).type('Uttar Pradesh').type('{enter}');
            cy.get('#submit').click({force: true});
        });
    });
});