import { test, expect } from '@playwright/test';

const baseUrl = process.env.BASE_URL || 'https://www.dell.com/en-us';
const country = process.env.COUNTRY || 'default';

test.describe(`Country check @country [${country}]`, () => {
  test(`${country}: homepage responds successfully`, async ({ page }) => {
    const response = await page.goto(baseUrl);
    expect(response?.status()).toBeLessThan(400);
  });

  test(`${country}: page title contains Dell`, async ({ page }) => {
    await page.goto(baseUrl);
    const title = await page.title();
    expect(title).toContain('Dell');
  });

  test(`${country}: footer is visible`, async ({ page }) => {
    await page.goto(baseUrl);
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
  });
});
