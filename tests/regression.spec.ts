import { test, expect } from '@playwright/test';

test.describe('Regression @regression', () => {
  test('Search returns results for a known term', async ({ page }) => {
    await page.goto('https://www.dell.com/en-us');
    const searchBox = page.getByRole('combobox', { name: 'Search Dell' });
    await searchBox.click();
    await searchBox.fill('monitor');
    await page.keyboard.press('Enter');
    await page.waitForURL(/search/);
    await expect(page).toHaveURL(/monitor/i);
  });

  test('Search with empty query does not navigate away', async ({ page }) => {
    await page.goto('https://www.dell.com/en-us');
    const searchBox = page.getByRole('combobox', { name: 'Search Dell' });
    await searchBox.click();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/dell\.com\/en-us\/?$/);
  });

  test('Sitemap links point to dell.com domain', async ({ page }) => {
    await page.goto('https://www.dell.com/en-us/lp/sitemap');
    const links = page.locator('a[href^="http"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
    const firstHref = await links.first().getAttribute('href');
    expect(firstHref).toMatch(/dell\.com/);
  });

  test('Navigating back after search preserves homepage state', async ({ page }) => {
    await page.goto('https://www.dell.com/en-us');
    const searchBox = page.getByRole('combobox', { name: 'Search Dell' });
    await searchBox.click();
    await searchBox.fill('laptop');
    await page.keyboard.press('Enter');
    await page.waitForURL(/search/);
    await page.goBack();
    await expect(page).toHaveURL(/dell\.com\/en-us\/?$/);
  });

  test('Page title remains consistent across navigations', async ({ page }) => {
    await page.goto('https://www.dell.com/en-us');
    const homeTitle = await page.title();
    await page.goto('https://www.dell.com/en-us/lp/sitemap');
    const sitemapTitle = await page.title();
    expect(homeTitle).toContain('Dell');
    expect(sitemapTitle).toContain('Dell');
  });
});
