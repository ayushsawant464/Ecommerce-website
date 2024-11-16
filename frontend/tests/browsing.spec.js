import { test, expect } from '@playwright/test';

test.describe('Browsing page tests', { tag: '@unstable' }, () => {

    test('check visibility of browsing page ', async ({
      page,
    }) => {
      await page.goto('http://localhost:3000/');
      await expect(page.getByTestId('navbar-section')).toBeVisible();
      await expect(page.getByTestId('hero-section')).toBeVisible();
      await expect(page.getByTestId('browsing-section')).toBeVisible();
      await expect(page.getByTestId('footer-section')).toBeVisible();
});

    test('check functionality of navbar section', async ({
      page,
    }) => {
      await page.goto('/');
      await expect(page.getByTestId('navbar-section')).toBeVisible();

      await page.getByTestId('login').click();
    
      expect(page.url()).toContain('/login');
        
      await page.goBack();

      expect(page.url()).toBe('http://localhost:3000/');

        await page.getByTestId('register').click();
    
      expect(page.url()).toContain('http://localhost:3000/register');
      
    });

    test('should fail to go to cart page without logging in', async ({
      page,
    }) => {

      await page.goto('http://localhost:3000/');
      
      await page.getByTestId('cart-button').click();
    
      expect(page.url()).toContain('http://localhost:3000/cart');
    
    });

    test('should fail to display logout button', async ({
      page,
    }) => {

      await page.goto('http://localhost:3000/');
      await expect( page.getByTestId('logout')).toBeVisible();

    
    });
    
});