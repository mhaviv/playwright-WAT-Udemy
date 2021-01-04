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
    
    // Check we are on create new post page
    await page.click('.ion-compose')
    const url = await page.url() // extracting url
    expect(url).toContain('editor') // asserting it contains editor

    await page.goBack() // Go back to previous page
    await page.waitForTimeout(2000)

    await page.goForward() // Go forward to the page we previously visited
    await page.waitForTimeout(2000)

    await page.reload() // reloads the page

    await browser.close()
}) ()