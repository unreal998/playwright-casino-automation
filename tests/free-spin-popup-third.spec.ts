import { test, expect, Page } from '@playwright/test';
import { DEFAULT_PAGE_PAUSE, FREE_SPIN_TIMEOUT, GAME_LOAD_TIMEOUT } from '../constants';

async function adminFlow(page: Page, language: string) {
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

  const createUserButton = await page.getByText("Create user"); 
  await createUserButton.click();
  await page.waitForTimeout(DEFAULT_PAGE_PAUSE);

  expect(languageInput).toBeDefined();
  await languageInput.fill(language);
  await page.waitForTimeout(DEFAULT_PAGE_PAUSE);
  options = await page.getByRole("option").all();
  const selectedLanguage = options[0];
  await selectedLanguage.click()
  
  const updateUserButton = await page.getByText("Update user").all(); 
  await updateUserButton[0].click();
  await page.waitForTimeout(DEFAULT_PAGE_PAUSE);

  const newPageBtn = await page.locator(`button`).all();
  await newPageBtn[5].click()
  await page.waitForTimeout(2000);
}

async function gameFlow(gamePage: Page) {
  await gamePage.waitForTimeout(GAME_LOAD_TIMEOUT);

  await gamePage.mouse.click(700, 630) // continue button click

  await gamePage.waitForTimeout(DEFAULT_PAGE_PAUSE)

  await gamePage.mouse.click(800, 170) // close  tournament popup
  await gamePage.waitForTimeout(DEFAULT_PAGE_PAUSE)

  await gamePage.mouse.click(700, 630) // jackpot popup btn click
  await gamePage.waitForTimeout(DEFAULT_PAGE_PAUSE)

  await gamePage.mouse.click(650, 30) // cheets open
  await gamePage.waitForTimeout(DEFAULT_PAGE_PAUSE)

  await gamePage.mouse.click(30, 300) // free spin select
  await gamePage.waitForTimeout(DEFAULT_PAGE_PAUSE)

  await gamePage.mouse.wheel(0 , 20000) // croll to additional free spins

  await gamePage.mouse.click(450, 650) // additional free spin select
  await gamePage.mouse.move(1220, 300) // additional free spin select
  await gamePage.mouse.down()
  await gamePage.mouse.move(1220, -100) // additional free spin select
  await gamePage.mouse.up()

  await gamePage.mouse.click(450, 400) // first additional item free spin select
  await gamePage.mouse.click(350, 250) // first additional icon free spin select

  await gamePage.mouse.click(500, 400) // seccond additional item free spin select
  await gamePage.mouse.click(350, 250) // seccond additional icon free spin select

  await gamePage.mouse.click(650, 400) // third additional item free spin select
  await gamePage.mouse.move(370, 400) // move to the icons scroll
  await gamePage.mouse.down()
  await gamePage.mouse.move(370, 800)
  await gamePage.mouse.up()
  await gamePage.mouse.click(350, 130)

  await gamePage.mouse.click(700, 400) // fourth additional item free spin select
  await gamePage.mouse.move(380, 400) // move to the icons scroll
  await gamePage.mouse.down()
  await gamePage.mouse.move(380, 800) 
  await gamePage.mouse.up()
  await gamePage.mouse.click(350, 130)

  await gamePage.mouse.click(800, 400) // fourth additional item free spin select
  await gamePage.mouse.move(380, 400) // move to the icons scroll
  await gamePage.mouse.down()
  await gamePage.mouse.move(380, 800) 
  await gamePage.mouse.up()
  await gamePage.mouse.click(350, 130)

  await gamePage.mouse.click(900, 400) // fourth additional item free spin select
  await gamePage.mouse.move(380, 400) // move to the icons scroll
  await gamePage.mouse.down()
  await gamePage.mouse.move(380, 800) 
  await gamePage.mouse.up()
  await gamePage.mouse.click(350, 130)

  await gamePage.mouse.click(350, 130)

  await gamePage.mouse.click(350, 300)

  await gamePage.mouse.click(350, 130)

  await gamePage.mouse.click(350, 130)

  await gamePage.mouse.click(350, 130)

  await gamePage.mouse.click(350, 650)

  await gamePage.mouse.click(350, 130)

  await gamePage.mouse.click(350, 300)

  await gamePage.mouse.click(350, 300)
  
  await gamePage.mouse.click(1250, 50) // close

  await gamePage.mouse.click(1200, 600) // spin button

  await gamePage.waitForTimeout(FREE_SPIN_TIMEOUT)

  await gamePage.mouse.click(600, 550) // continue button click

  await gamePage.waitForTimeout(DEFAULT_PAGE_PAUSE)

  await gamePage.mouse.click(1200, 600) // spin button
  await gamePage.waitForTimeout(DEFAULT_PAGE_PAUSE)
  await gamePage.mouse.click(1200, 600) // spin button
  await gamePage.waitForTimeout(DEFAULT_PAGE_PAUSE)
  await gamePage.mouse.click(1200, 600) // spin button
  await gamePage.waitForTimeout(DEFAULT_PAGE_PAUSE)
  await gamePage.mouse.click(1200, 600) // spin button
  await gamePage.waitForTimeout(DEFAULT_PAGE_PAUSE)
  await gamePage.mouse.click(1200, 600) // spin button
  await gamePage.waitForTimeout(DEFAULT_PAGE_PAUSE)
  await gamePage.mouse.click(1200, 600) // spin button
  await gamePage.waitForTimeout(DEFAULT_PAGE_PAUSE)
  await gamePage.mouse.click(1200, 600) // spin button
  await gamePage.waitForTimeout(DEFAULT_PAGE_PAUSE)
  await gamePage.mouse.click(1200, 600) // spin button
  await gamePage.waitForTimeout(DEFAULT_PAGE_PAUSE)

  await gamePage.waitForTimeout(FREE_SPIN_TIMEOUT * 2)
}

const languages = [
  'pt', 'fr', 'ro', 'sr'
]

languages.forEach(item => {
  test(`check game for ${item}`, async ({ page, context }) => {
    await adminFlow(page, item);
  
    const allPages = context.pages();
    const gamePage = allPages[1];
  
    await gameFlow(gamePage);
  
  
    expect(gamePage).toBeDefined();
  });
})
