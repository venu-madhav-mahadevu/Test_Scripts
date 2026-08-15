import { test, expect } from '@playwright/test';

test('Navigate to Dell homepage', async ({ page }) => {
  await page.goto('https://www.dell.com/en-us');
  await expect(page).toHaveURL(/dell\.com/);
});

test('Search for products', async ({ page }) => {
  await page.goto('https://www.dell.com/en-us');
  const searchBox = page.getByRole('combobox', { name: 'Search Dell' });
  await searchBox.click();
  await searchBox.fill('laptops');
  await page.keyboard.press('Enter');
  await page.waitForURL(/search/);
  await expect(page).toHaveURL(/search/);
});

test('Navigate to Sitemap', async ({ page }) => {
  await page.goto('https://www.dell.com/en-us/lp/sitemap');
  await expect(page).toHaveURL(/sitemap/);
});

test('Open search dropdown', async ({ page }) => {
  await page.goto('https://www.dell.com/en-us');
  const searchCombobox = page.getByRole('combobox', { name: 'Search Dell' });
  await searchCombobox.click();
  await expect(searchCombobox).toBeFocused();
});

test('Browse products by category', async ({ page }) => {
  await page.goto('https://www.dell.com/en-us');
  const categoryLink = page.locator('a[href*="products"]').first();
  if (await categoryLink.isVisible()) {
    await categoryLink.click();
    await expect(page).toHaveURL(/products/);
  }
});

test('Check page title', async ({ page }) => {
  await page.goto('https://www.dell.com/en-us');
  const title = await page.title();
  expect(title).toContain('Dell');
});

test('Verify navigation menu exists', async ({ page }) => {
  await page.goto('https://www.dell.com/en-us');
  const navMenu = page.locator('nav, [role="navigation"]').first();
  await expect(navMenu).toBeVisible();
});

test('Check page title_test', async ({ page }) => {
  await page.goto('https://www.dell.com/en-us');
  const title = await page.title();
  expect(title).toContain('Dell');
});