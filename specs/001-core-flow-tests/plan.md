# Technical Plan — UI Automation Suite
## automationexercise.com

## Stack
- Framework: Playwright
- Language: TypeScript
- Pattern: Page Object Model
- Reporter: Playwright HTML Reporter
- Test Data: .env file

## Page Objects
### LoginPage (.github/pages/login.page.ts)
- goto() — navigate to /login
- login(email, password) — fill and submit form
- getErrorMessage() — return error locator

### ProductsPage (.github/pages/products.page.ts)
- goto() — navigate to /products
- searchProduct(name) — fill search and submit
- getProductCards() — return all product locators
- addFirstProductToCart() — click first add to cart

### CartPage (.github/pages/cart.page.ts)
- goto() — navigate to /view_cart
- getCartItems() — return cart item locators
- getCartCount() — return number of items

## Selector Strategy
- Primary: data-qa attributes
- Secondary: id attributes
- Avoid: XPath

## Test Data Strategy
- Valid credentials: stored in .env
- Invalid data: hardcoded in test files
- Known product: "Blue Top"
- Known product name: "Blue Top"
- Known product search term: "Top"

## Folder Structure
pages/
  login.page.ts
  products.page.ts
  cart.page.ts
tests/
  login.spec.ts
  product.spec.ts
  cart.spec.ts
playwright.config.ts
.env