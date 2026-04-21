import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/view_cart');
  }

  async getCartItems() {
    return this.page.locator('.cart_description');
  }

  async getCartRows() {
    return this.page.locator('#cart_items tbody tr');
  }

  async isCartEmpty() {
    const rows = await this.getCartRows();
    return (await rows.count()) === 0;
  }
}