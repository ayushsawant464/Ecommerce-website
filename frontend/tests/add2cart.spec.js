// import { test, expect } from '@playwright/test';

// test.describe('Cart page tests', { tag: '@unstable' }, () => {

//   test.beforeEach(async ({ page }) => {
//     await page.goto('http://localhost:3000/login');
//     await page.getByTestId('email').locator('input').fill('a@gmail.com');
//     await page.getByTestId('password').locator('input').fill('aaaa');
//     await page.getByTestId('sign-in').click();
//     expect(page.url()).toContain('http://localhost:3000/');
//     await page.goto('http://localhost:3000/');
    
//     await page.getByTestId('cart-button').click();
//    await page.goto('http://localhost:3000/cart');
//   });
  
//     test('check visibility of cart page', async ({
//       page,
//     }) => {
      
//       await page.goto('http://localhost:3000/cart');
//       await expect(page.getByTestId('checkout-container')).toBeVisible();
//     });

//     test('check functionality of checkout button', async ({
//       page,
//     }) => {
//       await page.goto('http://localhost:3000/cart');
//       await page.getByTestId('checkout-button').click();
//       await expect(page.getByText('Your card number is incomplete.')).toBeVisible();
    
//     });

// });