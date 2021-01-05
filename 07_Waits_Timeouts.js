const { chromium } = require('playwright');
const expect = require('expect');

(async () => {
    const browser = await chromium.launch({ headless:false, slowMo: 50 })
    const context = await browser.newContext()
    const page = await context.newPage()

    // Check we are on the right page
    await page.goto('https://react-redux.realworld.io/#/login')
    const title = await page.title()
    expect(title).toBe('Conduit')

    await page.fill('input[type = "email"]', 'qacamp.acad@gmail.com')
    await page.press('input[type = "email"]', 'Tab')
    await page.type('input[type = "password"]', 'test12345')
    await page.click('form >> "Sign in"')

    // await page.waitForTimeout(5000) // Static wait (not recommended since it makes tests flaky since you never know if it'll finish loading by 5 seconds)
    // await page.waitForSelector('.ion-compose') // Waiting for element to become visible
    await Promise.all([
        page.waitForNavigation(),
        await page.click('form >> "Sign in"')
    ])

    await browser.close()
}) ()