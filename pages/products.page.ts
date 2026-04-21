import { Page } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/products');
  }

  async searchProduct(name: string) {
    await this.page.fill('#search_product', name);
    await this.page.click('#submit_search');
  }

  async getProductCards() {
    return this.page.locator('.product-image-wrapper');
  }

  async getSearchResults() {
    return this.page.locator('.productinfo');
  }

  async addFirstProductToCart() {
    await this.page.locator('.add-to-cart').first().click();
  }
}