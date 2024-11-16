import { test, expect } from '@playwright/test';

test.describe('Login page tests', { tag: '@unstable' }, () => {

    test('check visibility of login page', async ({
      page,
    }) => {
      await page.goto('http://localhost:3000/login');
      await expect(page.getByTestId('login-page')).toBeVisible();
});

    
    test('check visibility  of cart page after logging in ', async ({
      page,
    }) => {

      await page.goto('http://localhost:3000/login');
      await page.getByTestId('email').locator('input').fill('a@gmail.com');
      await page.getByTestId('password').locator('input').fill('aaaa');
      await page.getByTestId('sign-in').click();
      expect(page.url()).toContain('http://localhost:3000/');
      await page.getByTestId('cart-button').click();
    
      expect(page.url()).toContain('http://localhost:3000/cart');
    });

    
});