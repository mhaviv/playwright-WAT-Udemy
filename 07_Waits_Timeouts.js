const { chromium } = require('playwright');
const expect = require('expect');

(async () => {
    const browser = await chromium.launch({ headless:false, slowMo: 50 })
    const context = await browser.newContext()
    context.setDefaultTimeout(45000) // updates the default maximum time for all the methods on all the pages
    const page = await context.newPage()
    page.setDefaultTimeout(45000) // updates the default maximum time for all the methods on the page excepting timeout options

    // Check we are on the right page
    await page.goto('https://react-redux.realworld.io/#/login')
    const title = await page.title()
    expect(title).toBe('Conduit')

    await page.fill('input[type = "email"]', 'qacamp.acad@gmail.com')
    await page.press('input[type = "email"]', 'Tab')
    await page.type('input[type = "password"]', 'test12345')
    await page.click('form >> "Sign in"', {timeout: 45000}) // update default timeout of 30 seconds to 45 seconds

    // await page.waitForTimeout(5000) // Static wait (not recommended since it makes tests flaky since you never know if it'll finish loading by 5 seconds)
    // await page.waitForSelector('.ion-compose') // Waiting for element to become visible
    // await Promise.all([
    //     page.waitForNavigation(), // will resolve when the page navigates to the new url
    //     await page.click('form >> "Sign in"')
    // ])

    const [newPage]  = await Promise.all([
        context.waitForEvent('page') // Wait for tab to open
        page.click('a[target="_blank"]') // Opens a new tab
    ])

    await page.waitForLoadState() // wait until the page is fully loaded

    await browser.close()
}) ()