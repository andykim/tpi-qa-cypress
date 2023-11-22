describe('Checkout on saucedemo.com', () => {
    const itemName = 'Sauce Labs Onesie';
    const itemPrice = '$7.99';

    it('Checkout process', () =>{

        cy.visit('https://www.saucedemo.com/').then(() => {

            // Login
            cy.get('#user-name').type('standard_user');
            cy.get('#password').type('secret_sauce');
            cy.get('#login-button').click({force: true});

            // Select product
            cy.get('.inventory_item').each(($el) => {
                if ($el.find('.inventory_item_name').text() === itemName) {
                    cy.get($el.find('.btn_inventory')).click();
                }
            });

            // Go to cart
            cy.get('.shopping_cart_link').click();

            // Check cart item info
            if(cy.get('.cart_contents_container').should('be.visible')){
                cy.get('.cart_item').each(($el) => {
                    cy.get($el.find('.inventory_item_name')).should('contain', itemName);
                    cy.get($el.find('.cart_quantity')).should('contain', 1);
                    cy.get($el.find('.inventory_item_price')).should('contain', itemPrice);
                });


                // Go to checkout
                cy.get('.checkout_button').click();
            }

            // Checkout customer info submit
            if(cy.get('.checkout_info_container').should('be.visible')){
                cy.get('#first-name').type('John');
                cy.get('#last-name').type('Doe');
                cy.get('#postal-code').type('12345');
                cy.get('.cart_button').click();
            }

            // Place order submit
            if(cy.get('.checkout_summary_container').should('be.visible')){
                // Check cart item info
                cy.get('.cart_item').each(($el) => {
                    cy.get($el.find('.inventory_item_name')).should('contain', itemName);
                    cy.get($el.find('.cart_quantity')).should('contain', 1);
                    cy.get($el.find('.inventory_item_price')).should('contain', itemPrice);
                });

                // Check order total
                cy.get('.summary_subtotal_label').should('contain', itemPrice);
                cy.get('.summary_tax_label').should('contain', '$0.64');
                cy.get('.summary_total_label').should('contain', '$8.63');

                cy.get('#finish').click();
            }

            // Checkout success
            if(cy.get('.complete-header').should('be.visible')){
                cy.get('.complete-header').should('contain', 'Thank you for your order!');
                cy.get('.complete-text').should('contain', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');

                // Back to home
                cy.get('#back-to-products').click();
            }
        });
    });
});