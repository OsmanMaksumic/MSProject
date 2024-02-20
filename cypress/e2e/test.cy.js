import loginData from "../fixtures/loginData.json"
import itemsData from "../fixtures/itemsData.json"
import homePage from "./pageObjects/homePage"
import cartPage from "./pageObjects/cartPage"
import homeData from "../fixtures/homePageData.json"

import '../support/utility'

let home = new homePage()
let cart = new cartPage()

describe("SMOKE", function () {



    beforeEach(() => {
        cy.login(loginData.username, loginData.password)
    })

    const socialLinks = require('../fixtures/socialLinks.json');
    const testSocialLink = (element, link) => {
        it(`Verify ${element} link and open it`, function () {
            cy.on('uncaught:exception', (e) => {
                if (e.message.includes('T')) {
                    return false;
                }
            });
            home.verify_social_link(socialLinks.element[element], link);
            cy.wait(1000);
        });
    };

    it("User should be able to open Menu and Close it", function () {
        home.click_menu_button()
    })

    it("Verify footer text", function () {
        home.verify_footer(homeData.footer_text)
        cy.get('#neki_id').type('ovo').click()
    })

    it("Write item names and prices in .txt file", function () {
        home.write_items_and_prices_into_txt_file()
    })

    it("Verify that user is logged in and Logout", function () {
        home.click_menu_button()
        home.verify_sidebar_links() //and logout
    })

    it("Verify Products are displayed on the home page and verify its 6 of them", function () {
        home.verify_products_inside_container()
    })

    it("Add 1 item to cart and verify it inside the cart", function () {
        home.add_backpack_into_cart()
        home.click_on_shopping_cart()
        cart.verify_item_inside_cart(itemsData.backpack_item)
    })

    it("Add all 6 items to cart and remove them from cart", function () {
        home.click_on_each_add_to_cart()
        cart.verify_cart_badge_number()
        home.click_on_shopping_cart()
        cart.remove_each_item_from_cart()
    })

    it("Add 1 item to cart and proceed to checkout", function () {
        home.add_backpack_into_cart()
        home.click_on_shopping_cart()
        cart.click_on_checkout()
        cart.enter_checkout_information(loginData.first_name, loginData.last_name, loginData.zip)
        cart.click_on_continue(itemsData.backpack_item)
        cart.click_on_finish()
        cart.click_on_back_home()
    })

    it("Verify that items are sorted properly (A-Z)", function () {
        home.verify_sorting()
        home.change_sorting('az')
    })

    it("Verify that items are sorted properly (Z-A)", function () {
        home.verify_sorting()
        home.change_sorting('za')
    })

    it("Verify that items are sorted properly (low to high)", function () {
        home.verify_sorting()
        home.change_sorting('lohi')
    })

    it("Verify that items are sorted properly (high to low)", function () {
        home.verify_sorting()
        home.change_sorting('hilo')
    })

    it("Write each item name into .txt file", function () {
        home.write_items_into_txt_file()
        home.read_file()
    })

    it("Read content of itemNames.txt", function () {
        home.read_file()
    })

    Object.keys(socialLinks.element).forEach((elementName) => {
        const link = socialLinks.link[`${elementName}_link`];
        testSocialLink(elementName, link);
    });

    it("Compare item names to JSON file", function () {
        home.compare_item_names_to_json()
    })

    it("Compare item description to JSON file", function () {
        home.compare_item_description_to_json()
    })

    it("Image", function () {
        // Visit the web page where the image is expected to be displayed


        // Wait for the element to be available
        cy.get('#item_4_img_link').children().should('exist');

        // Use cy.get() to select the element that contains the image
        cy.get('#item_4_img_link').children()
            .invoke('attr', 'src')
            .then((src) => {
                // Load the image file from the fixtures folder
                const expectedImagePath = '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg';

                // Compare the image source with the expected relative path
                expect(src).to.equal(expectedImagePath);
          
    });
});



})



