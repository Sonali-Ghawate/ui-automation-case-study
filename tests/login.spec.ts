import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('[LOGIN]', () => {

  test('Happy Path - valid credentials login successfully', 
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.VALID_EMAIL!,
      process.env.VALID_PASSWORD!
    );
    await expect(page).toHaveURL('https://automationexercise.com/');
    await expect(page.locator('a:has-text("Logout")')).toBeVisible();
  });

  test('Invalid Input - wrong password shows error', 
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('test@example.com', 'wrongpassword123');
    const error = await loginPage.getErrorMessage();
    await expect(error).toBeVisible();
  });

  test('Empty Fields - submit with no input shows validation', 
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', '');
    const emailInput = page.locator('[data-qa="login-email"]');
    await expect(emailInput).toBeFocused();
  });

  test('Error Handling - invalid email format is rejected', 
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('not-an-email', 'somepassword');
    const emailInput = page.locator('[data-qa="login-email"]');
    await expect(emailInput).toBeFocused();
  });

});