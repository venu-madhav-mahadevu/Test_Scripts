import { test, expect } from '@playwright/test';

test.describe('Smoke @smoke', () => {
  test('Homepage loads successfully', async ({ page }) => {
    const response = await page.goto('https://www.dell.com/en-us');
    expect(response?.status()).toBeLessThan(400);
  });

  test('Footer is visible', async ({ page }) => {
    await page.goto('https://www.dell.com/en-us');
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
  });

  test('Logo links back to homepage', async ({ page }) => {
    await page.goto('https://www.dell.com/en-us/lp/sitemap');
    const logo = page.locator('a[href*="/en-us"]').first();
    await expect(logo).toBeVisible();
  });

  test('Support page is reachable', async ({ page }) => {
    const response = await page.goto('https://www.dell.com/support');
    expect(response?.status()).toBeLessThan(400);
  });
});
