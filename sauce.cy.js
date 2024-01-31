// 1. Проверка, что все элементы на странице "Products" отображаются корректно.
describe('Saucedemo', () => {
  it('should display all products', () => {
    cy.visit('https://www.saucedemo.com/inventory.html')
    cy.get('.inventory_item').should('have.length', 6)
  })
})


// 2. Проверка, что все элементы на странице "Cart" отображаются корректно.

describe('Saucedemo', () => {
  it('should display all items in cart', () => {
    cy.visit('https://www.saucedemo.com/cart.html')
    cy.get('.cart_item').should('have.length', 2)
  })
})


// 3. Проверка, что поиск работает корректно.


describe('Saucedemo', () => {
  it('should search for items', () => {
    cy.visit('https://www.saucedemo.com/inventory.html')
    cy.get('[data-test=search-box]').type('Sauce Labs Backpack')
    cy.get('.inventory_item').should('have.length', 1)
  })
})


// 4. Проверка, что сортировка работает корректно.

describe('Saucedemo', () => {
  it('should sort items by price', () => {
    cy.visit('https://www.saucedemo.com/inventory.html')
    cy.get('[data-test=product_sort_container]').select('Price (low to high)')
    cy.get('.inventory_item_price').then(($prices) => {
      const prices = $prices.map((_, el) => parseFloat(el.innerText.replace('$', ''))).get()
      expect(prices).to.eql([7.99, 9.99, 15.99, 15.99, 29.99, 49.99])
    })
  })
})


// 5. Проверка, что нельзя добавить товар в корзину без авторизации.

describe('Saucedemo', () => {
  it('should not be able to add items to cart without logging in', () => {
    cy.visit('https://www.saucedemo.com/inventory.html')
    cy.get('.inventory_item').first().find('.btn_primary').click()
    cy.url().should('include', '/login.html')
  })
})


// 6. Проверка, что можно добавить товар в корзину после авторизации.

describe('Saucedemo', () => {
  it('should be able to add items to cart after logging in', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test=username]').type('standard_user')
    cy.get('[data-test=password]').type('secret_sauce')
    cy.get('[data-test=login-button]').click()
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_item').first().find('.btn_primary').click()
    cy.get('.shopping_cart_badge').should('have.text', '1')
  })
})
