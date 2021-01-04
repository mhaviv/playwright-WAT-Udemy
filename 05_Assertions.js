const {chromium} = require('playwright');
const expect = require('expect'); // When you're writing tests, you often need to check that values meet certain conditions. expect gives you access to a number of "matchers" that let you validate different things.

(async() => {
    const browser = await chromium.launch({headless:false})
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://react-redux.realworld.io/#/login')

    await page.fill('input[type = "email"]', 'qacamp.acad@gmail.com')
    await page.press('input[type = "email"]', 'Tab')
    await page.type('input[type = "password"]', 'test12345')
    await page.click('form >> "Sign in"')

    await page.waitForTimeout(5000) // static wait to get everything to load (not recommended)

    const logoText = await page.$eval('.navbar-brand', el => el.innerText) // requires selector and function. function takes in element and returns elements inner text
    expect(logoText).toBe('conduit') // expects logoText to be 'conduit'
    const logoHref = await page.$eval('.navbar-brand', el => el.href) // $eval identifies a single element
    expect(logoHref).toBeDefined() // Checks if logoHref is defined

    const popularTagsCount = await page.$$eval('.tag-default', el => el.length)
    expect(popularTagsCount).toBeGreaterThanOrEqual(5)
    expect(popularTagsCount).toBeLessThan(30)
    expect(popularTagsCount).toEqual(20)

    const content = await page.textContent('.navbar-brand') // returns full text (in the case here its the same thing as innerText)
    // console.log('content: '+content);

    const text = await page.innerText('.navbar-brand') // returns visible text only
    // console.log('text: '+text);

    const html = await page.innerHTML('.feed-toggle')
    expect(html).toMatch('Your Feed') // Check that it contains Your Feed
    expect(html).toMatch('Global Feed')// Check that it contains Global Feed
    
    const href = await page.getAttribute('.navbar-brand', 'href') // takes in selector and attribute name
    expect(href).not.toMatch('https://react-redux.realworld.io') // Check it does not match the url specified

    await browser.close()
}) ()