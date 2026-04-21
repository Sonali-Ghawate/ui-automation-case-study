import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.fill('[data-qa="login-email"]', email);
    await this.page.fill('[data-qa="login-password"]', password);
    await this.page.click('[data-qa="login-button"]');
  }

  async getErrorMessage() {
    return this.page.locator('p:has-text("Your email or password is incorrect!")');
  }

  async isLoggedIn() {
    return this.page.locator('a:has-text("Logout")').isVisible();
  }
}