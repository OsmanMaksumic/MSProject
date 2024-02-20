const fs = require('fs');
class homePage {

    elements = {

        menu_button: () => cy.get('#react-burger-menu-btn'),
        intventory_sidebar_link_list: () => cy.get('.bm-item-list'),
        logout_button: () => cy.get('#logout_sidebar_link'),
        username: () => cy.get('#user-name'),
        intentory_container: () => cy.get('#inventory_container'),
        inventory_container_items: () => cy.get('.inventory_list'),
        add_to_cart_each: () => cy.get('.btn_primary'),
        add_backpack_to_cart: () => cy.get('#add-to-cart-sauce-labs-backpack'),
        remove_backpack_from_cart: () => cy.get('#remove-sauce-labs-backpack'),
        shopping_cart_container: () => cy.get('#shopping_cart_container'),
        sort_menu: () => cy.get('[data-test="product_sort_container"]'),
        footer_text: () => cy.get('.footer_copy'),
        cart_inventory_item_name: () => cy.get('.inventory_item_name'),
        items: () => cy.get('.inventory_item'),
        item_prices: () => cy.get('.inventory_item_price'),
        item_name_element: () => '.inventory_item_name',
        items_elements: () => '.inventory_item',
        item_prices_element: () => '.inventory_item_price'
    }

    click_menu_button() {
        this.elements.menu_button()
            .should('be.visible')
            .click()
    }

    verify_footer(footer) {
        this.elements.footer_text()
            .scrollIntoView()
            .should('be.visible')
            .should('have.text', footer)
    }

    verify_social_link(test, link) {
        cy.get(test).children()
            .invoke('attr', 'target', '_self');
        cy.get(test).children()
            .scrollIntoView()
            .should('be.visible')
            .should('have.attr', 'href', link)
            .click();
        cy.url()
            .should('equal', link)
    }

    verify_sidebar_links() {
        this.elements.intventory_sidebar_link_list()
            .children()
            .should('have.length', 4)
            .should('be.visible')
        this.elements.logout_button()
            .should('be.visible')
            .click()
        this.elements.username()
            .should('be.visible')
    }

    verify_products_inside_container() {
        this.elements.inventory_container_items().children()
            .should('be.visible')
            .should('have.length', 6)
    }

    add_backpack_into_cart() {
        this.elements.add_backpack_to_cart()
            .should('be.visible')
            .click()
        this.elements.remove_backpack_from_cart()
            .should('be.visible')
            .should('have.text', 'Remove')
    }

    click_on_shopping_cart() {
        this.elements.shopping_cart_container()
            .should('be.visible')
            .click()
        cy.url()
            .should('include', '/cart.html')
    }

    verify_item_inside_cart(item) {
        this.elements.cart_inventory_item_name()
            .should('be.visible')
            .should('have.text', item)
    }

    click_on_each_add_to_cart() {
        this.elements.add_to_cart_each().each(($element) => {
            cy.wrap($element).click()
        })
    }

    verify_sorting() {
        this.elements.cart_inventory_item_name()
            .invoke('text')
            .then((elementsText) => {
                const textArray = elementsText.split('\n').map((text) => text.trim());

                const expectedSortedData = [...textArray].sort();

                expect(textArray).to.deep.equal(expectedSortedData);
            });
    }

    change_sorting(sort) {
        this.elements.sort_menu()
            .select(sort)
    }

    write_items_into_txt_file() {
        this.elements.cart_inventory_item_name().each(($element, index, $list) => {
            const text = Cypress.$($element).text();

            cy.writeFile('cypress/fixtures/itemNames.txt', text + '\n', { flag: index === 0 ? 'w' : 'a+' });
        });
    }

    write_items_and_prices_into_txt_file() {
        this.elements.items().each(($item, index) => {

            const $nameElement = $item.find(this.elements.item_name_element());
            const itemName = Cypress.$($nameElement).text();
            const $priceElement = $item.find(this.elements.item_prices_element());
            const price = Cypress.$($priceElement).text();
            const itemData = `${itemName} - ${price}`;

            cy.writeFile('cypress/fixtures/itemNamesAndPrices.txt', itemData + '\n', { flag: index === 0 ? 'w' : 'a+' });
        });
    }

    read_file() {
        cy.readFile('cypress/fixtures/itemNames.txt')
            .then((fileContent) => {
                cy.log("Content: ", fileContent)
            })
    }

    compare_item_names_to_json() {
        cy.fixture("itemsData.json").then((data) => {
            // Get the elements with the ".inventory_item_name" class
            cy.get(".inventory_item_name").each(($element, index) => {
                // Get the item name for the current element
                const elementName = $element.text().trim();
                cy.log(elementName);

                // Create an array of item names from the JSON data
                const itemNamesArray = Object.values(data.item_names);

                // Get the expected item name from the array using the current index
                const expectedItemName = itemNamesArray[index];

                if (typeof expectedItemName === "undefined") {
                    cy.log(`Item name for element ${elementName} not found in JSON data`);
                } else {
                    // Compare the actual element name to the expected name
                    expect(elementName).to.equal(expectedItemName);
                }
            });
        });
    }

    compare_item_description_to_json() {
        cy.fixture("itemsData.json").then((data) => {
            cy.get(".inventory_item_desc").each(($element, index) => {

                const elementName = $element.text().trim();
                cy.log(elementName);
                const itemNamesArray = Object.values(data.item_description);
                const expectedItemName = itemNamesArray[index];

                if (typeof expectedItemName === "undefined") {
                    cy.log(`Item name for element ${elementName} not found in JSON data`);
                } else {
                    expect(elementName).to.equal(expectedItemName);
                }
            });
        });
    }

}

export default homePage;