import { test, expect } from '@playwright/test';

const GAME_LOAD_TIMEOUT = 60000;
const DEFAULT_PAGE_PAUSE = 3000;

test('go to game', async ({ page, context }) => {
  await page.goto('https://sandbox.itechhub.io/');
  await page.waitForTimeout(DEFAULT_PAGE_PAUSE);
  const input = await page.getByRole("combobox").all();
  const gameInput = input[2];
  const languageInput = input[6];

  expect(gameInput).toBeDefined();
  await gameInput.click();
  await gameInput.fill('Reliquary Of Ra');
  await page.waitForTimeout(DEFAULT_PAGE_PAUSE);
  await gameInput.click();
  let options = await page.getByRole("option").all();
  const selectedGame = options[0];
  await selectedGame.click()

  expect(languageInput).toBeDefined();
  await languageInput.fill('es');
  await page.waitForTimeout(DEFAULT_PAGE_PAUSE);
  options = await page.getByRole("option").all();
  const selectedLanguage = options[0];
  await selectedLanguage.click()
  
  const createUserButton = await page.getByText("Create user"); 
  const updateUserButton = await page.getByText("Update user").all(); 
  await createUserButton.click();
  await updateUserButton[0].click();
  await page.waitForTimeout(DEFAULT_PAGE_PAUSE);

  const newPageBtn = await page.locator(`button`).all();
  await newPageBtn[5].click()
  await page.waitForTimeout(2000);

  const allPages = context.pages();
  const gamePage = allPages[1];
  await gamePage.waitForTimeout(GAME_LOAD_TIMEOUT);

  await gamePage.mouse.click(700, 630) // continue button click

  await gamePage.waitForTimeout(DEFAULT_PAGE_PAUSE)

  await gamePage.mouse.click(800, 170) // close  tournament popup
  await gamePage.waitForTimeout(DEFAULT_PAGE_PAUSE)

  await gamePage.mouse.click(700, 630) // jackpot popup btn click
  await gamePage.waitForTimeout(DEFAULT_PAGE_PAUSE)

  await gamePage.mouse.click(700, 20) // cheets open
  await gamePage.waitForTimeout(DEFAULT_PAGE_PAUSE)

  expect(gamePage).toBeDefined();
});

