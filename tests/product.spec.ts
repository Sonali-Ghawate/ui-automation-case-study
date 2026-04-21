import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/products.page';

test.describe('[PRODUCT BROWSING]', () => {

  test('Happy Path - products page loads with items', 
  async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    const cards = await productsPage.getProductCards();
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test('Happy Path - search for known product returns results', 
  async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.searchProduct('Blue Top');
    const results = await productsPage.getSearchResults();
    await expect(results.first()).toBeVisible();
  });

  test('Invalid Input - search non-existent product shows no results', 
  async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.searchProduct('XYZPRODUCT999NOTFOUND');
    const cards = await productsPage.getProductCards();
    expect(await cards.count()).toBe(0);
  });

  test('Empty Fields - empty search does not crash page', 
  async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.searchProduct('');
    await expect(page).toHaveURL(/products/);
  });

});