class cartPage {


    elements = {
        cart_inventory_item_name: () => cy.get('.inventory_item_name'),
        shopping_cart_badge: () => cy.get('.shopping_cart_badge'),
        remove_from_cart_each: () => cy.get('.btn_secondary'),
        checkout: () => cy.get('#checkout'),
        title: () => cy.get('.title'),

        checkout_first_name: () => cy.get('#first-name'),
        checkout_last_name: () => cy.get('#last-name'),
        checkout_postal_code: () => cy.get('#postal-code'),

        continue_button: () => cy.get('#continue'),
        finish_button: () => cy.get('#finish'),
        back_home_button: () => cy.get('#back-to-products')

    }
 
    verify_item_inside_cart(item) {
        this.elements.cart_inventory_item_name()
            .should('be.visible')
            .should('have.text', item)
    }

    verify_cart_badge_number() {
        let elementCount
        this.elements.remove_from_cart_each()
            .its('length')
            .then((count) => {
                elementCount = count
        this.elements.shopping_cart_badge()
                .should('have.text', elementCount)
            })
    }

    remove_each_item_from_cart() {
        this.elements.remove_from_cart_each()
        .each(($element) => {
            cy.wrap($element).click()
        })
        cy.url()
            .should('include', '/inventory.html')
    }

    click_on_checkout() {
        this.elements.checkout()
            .should('be.visible')
            .click()
        cy.url()
            .should('include', '/checkout-step-one.html')
        this.elements.title()
            .should('have.text', 'Checkout: Your Information')
    }

    enter_checkout_information(name, lastname, zip) {
        this.elements.checkout_first_name()
            .should('be.visible')
            .type(name)
            .should('have.value', name)
        this.elements.checkout_last_name()
            .should('be.visible')
            .type(lastname)
            .should('have.value', lastname)
        this.elements.checkout_postal_code()
            .should('be.visible')
            .type(zip)
            .should('have.value', zip)
    }

    click_on_continue(item) {
        this.elements.continue_button()
            .should('be.visible')
            .click()
        cy.url()
            .should('include', '/checkout-step-two.html')
        this.elements.title()
            .should('be.visible')
            .should('have.text', 'Checkout: Overview')
        this.elements.cart_inventory_item_name()
            .should('be.visible')
            .should('have.text', item)
        
    }

    click_on_finish() {
        this.elements.finish_button()
            .should('be.visible')
            .click()
        cy.url()
            .should('include', '/checkout-complete.html')
        this.elements.title()
            .should('be.visible')
            .should('have.text', 'Checkout: Complete!') 
    }

    click_on_back_home() {
        this.elements.back_home_button()
            .should('be.visible')
            .click()
        cy.url()
            .should('include', '/inventory.html')
        this.elements.title()
            .should('be.visible')
            .should('have.text', 'Products')
    }



   
}

export default cartPage;