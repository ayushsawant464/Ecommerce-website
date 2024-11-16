import { test, expect } from '@playwright/test';

test.describe('products page tests', { tag: '@unstable' }, () => {

    test('check visibility of products page', async ({
      page,
    }) => {
      
      await page.goto('http://localhost:3000/products');
      await expect(page.getByTestId('product-page')).toBeVisible();
    });

    // test('check functionality of Add to Cart button', async ({
    //   page,
    // }) => {
    //     await page.goto('http://localhost:3000/login');
    //     await page.getByTestId('email').locator('input').fill('a@gmail.com');
    //     await page.getByTestId('password').locator('input').fill('aaaa');
    //     await page.getByTestId('sign-in').click();
    //     await expect(page.url()).toContain('http://localhost:3000/');
    //     await page.goto('http://localhost:3000/products');
    //     await page.getByTestId('add-to-cart-button').nth(1).click();
       
    //   await page.goto('http://localhost:3000/cart'); 
    //   await expect(page.getByTestId('checkout-container')).toBeVisible();

    // });

    test('should fail to go to cart page without logging in', async ({
        page,
      }) => {
          await page.goto('http://localhost:3000/products');
          
        await page.getByTestId('add-to-cart-button').first().click();
        expect(page.url()).toContain('http://localhost:3000/cart'); 
        await expect(page.getByTestId('checkout-container')).toBeVisible();

  
      });
   

    
});