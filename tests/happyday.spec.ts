import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.locator('.square').nth(0).fill('C');
  await page.locator('.square').nth(1).fill('L');
  await page.locator('.square').nth(2).fill('A');
  await page.locator('.square').nth(3).fill('K');
  await page.locator('.square').nth(4).fill('H');
  await page.locator('.square').nth(5).fill('O');
  await page.locator('.square').nth(6).fill('N');
  await page.locator('.square').nth(7).fill('E');
  await page.locator('.square').nth(8).fill('R');
  await page.locator('.square').nth(9).fill('Y');
  await page.locator('.square').nth(10).fill('P');
  await page.locator('.square').nth(11).fill('I');
  await page.locator('.square').nth(12).fill('D');

  await page.locator('.button').nth(0).click();
  await page.locator('.button').nth(0).click();
  await page.locator('.button').nth(1).click();
  await page.locator('.button').nth(1).click();
  await page.locator('.button').nth(2).click();
  await page.locator('.button').nth(2).click();
  await page.locator('.button').nth(3).click();
  await page.locator('.button').nth(3).click();
  await page.locator('.button').nth(4).click();
  await page.locator('.button').nth(5).click();
  await page.locator('.button').nth(6).click();
  await page.locator('.button').nth(7).click();
  await page.locator('.button').nth(8).click();
  await page.locator('.button').nth(9).click();
  await page.locator('.button').nth(10).click();
  await page.locator('.button').nth(11).click();
  await page.locator('.button').nth(12).click();

  await page.locator('#showWords').click();
  await expect(await page.locator('#countOfResults').innerText()).toEqual('464');
});