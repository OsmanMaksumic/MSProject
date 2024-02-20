class loginPage {

    elements = {
        username: () => cy.get('#user-name'),
        password: () => cy.get('#password'),
        login_button: () => cy.get('#login-button'),
        error_message_container: () => cy.get('.error-message-container'),
        close_error: () => cy.get('[data-icon="times"]')

    }

    enter_username(username) {
        this.elements.username()
            .should('be.visible')
            .type(username)
            .should('have.value', username)
    }

    enter_password(password) {
        this.elements.password()
            .should('be.visible')
            .type(password)
            .should('have.value', password)
    }

    submit_login() {
        this.elements.login_button()
            .should('be.visible')
            .click()
    }

    verify_error(error) {
        this.elements.error_message_container()
            .should('be.visible')
            .should('have.text', error)
    }

    close_error() {
        this.elements.close_error()
            .should('be.visible')
            .click()
        this.elements.close_error()
            .should('not.exist')
    }

    verify_color_of_login_button() {
        this.elements.login_button()
        .then(($button) => {
            // Get the computed background-color property
            const backgroundColor = $button.css('background-color');
            
            // Convert the hexadecimal color to RGB (assuming it's in #RRGGBB format)
            const hexToRgb = (hex) => {
              const bigint = parseInt(hex.slice(1), 16);
              const r = (bigint >> 16) & 255;
              const g = (bigint >> 8) & 255;
              const b = bigint & 255;
              return `rgb(${r}, ${g}, ${b})`;
            };
        })
    }
}

export default loginPage;