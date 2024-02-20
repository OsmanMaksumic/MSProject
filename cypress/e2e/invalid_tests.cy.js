import loginPage from "./pageObjects/loginPage"

import errorData from "../fixtures/errorsData.json"
import loginData from "../fixtures/loginData.json"


import '../support/utility'

let login = new loginPage()

describe("Errors Tests", function () {



    beforeEach(() => {
        cy.visit('/')
    })

    it("Verify 'locked out' error message", function () {
        login.enter_username(loginData.locked_user)
        login.enter_password(loginData.password)
        login.submit_login()
        login.verify_error(errorData.locked_error)
    })

    it("Verify 'invalid password or username' error message", function () {
        login.enter_username(loginData.username)
        login.enter_password(loginData.invalid_password)
        login.submit_login()
        login.verify_error(errorData.invalid_pw_or_username)
    })

    it("Verify that user is able to close error message", function () {
        login.enter_username(loginData.username)
        login.enter_password(loginData.invalid_password)
        login.submit_login()
        login.verify_error(errorData.invalid_pw_or_username)
        login.close_error()
    })

    it.only("Verify color", function() {
        cy.visit('/')
        login.verify_color_of_login_button()
    })

   


})



