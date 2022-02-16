import { test, expect, Page } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await fillLetters(page, 'CLAKHONERYPID');
  await setStatuses(page, 'YYYYBBBBBBBBB');
  await page.locator('#showWords').click();

  await expect(await page.locator('#countOfResults').innerText()).toEqual('271');
});


test('basic test 2', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await fillLetters(page, 'GREATBONDS');
  await setStatuses(page, 'YBBBBYBBBY');
  await page.locator('#showWords').click();

  await expect(await page.locator('#countOfResults').innerText()).toEqual('135');
});


test('basic test 3', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await fillLetters(page, 'CLEARHONKYCUPID');
  await setStatuses(page, 'GYBYBBBBYBGYBBB');
  await page.locator('#showWords').click();

  await expect(await page.locator('#countOfResults').innerText()).toEqual('12');
});

const fillLetters = async (page: Page, letters: string) => {
  if (letters.length === 0) return;
  const arrLetters = letters.split('');
  for (let index = 0; index < arrLetters.length; index++) {
    await page.locator('.square').nth(index).fill(arrLetters[index]);
  }
}

const setStatuses = async (page: Page, statuses: string) => {
  if (statuses.length === 0) return
  const arrStatuses = statuses.split('');
  for (let index = 0; index < arrStatuses.length; index++) {
    switch (arrStatuses[index]) {
      case 'B':
        await singleClickButton(page, index)
        break;
      case 'Y':
        await doubleClickButton(page, index)
        break;
      case 'G':
        await tripleClickButton(page, index)
        break;
      default:
        break;
    }

  }
}

const singleClickButton = async (page: Page, index: number) => {
  await page.locator('.button').nth(index).click();
}

const doubleClickButton = async (page: Page, index: number) => {
  await page.locator('.button').nth(index).click();
  await page.locator('.button').nth(index).click();
}

const tripleClickButton = async (page: Page, index: number) => {
  await page.locator('.button').nth(index).click();
  await page.locator('.button').nth(index).click();
  await page.locator('.button').nth(index).click();
}

const button = (page: Page, index: number) => {
  return page.locator('.button').nth(index)
}