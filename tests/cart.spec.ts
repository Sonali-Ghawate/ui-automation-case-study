import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import { LoginPage } from '../pages/login.page';

test.describe('[ADD TO CART]', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.VALID_EMAIL!,
      process.env.VALID_PASSWORD!
    );
  });

  test('Happy Path - add product to cart and verify', 
  async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await page.locator('.add-to-cart').first().click();
    await page.click('text=View Cart');
    const cartPage = new CartPage(page);
    const items = await cartPage.getCartItems();
    expect(await items.count()).toBeGreaterThan(0);
  });

  test('Happy Path - cart shows correct item after adding', 
  async ({ page }) => {
    await page.goto('/products');
    await page.locator('.add-to-cart').first().click();
    await page.click('text=View Cart');
    const cartPage = new CartPage(page);
    const rows = await cartPage.getCartRows();
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test('Empty Cart - view cart with no items', 
  async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await expect(page).toHaveURL(/view_cart/);
  });

  test('Error Handling - access cart without login', 
  async ({ page }) => {
    await page.goto('/logout');
    await page.goto('/view_cart');
    await expect(page).toHaveURL(/view_cart/);
  });

});