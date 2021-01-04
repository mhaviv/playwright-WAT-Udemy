const {chromium} = require('playwright');

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
    console.log('logoText: '+logoText);
    const logoHref = await page.$eval('.navbar-brand', el => el.href) // $eval identifies a single element
    console.log('logoHref: '+logoHref);

    const popularTagsCount = await page.$$eval('.tag-default', el => el.length)
    console.log('popularTagsCount: '+popularTagsCount); // get number of popular tags

    const content = await page.textContent('.navbar-brand') // returns full text (in the case here its the same thing as innerText)
    console.log('content: '+content);

    const text = await page.innerText('.navbar-brand') // returns visible text only
    console.log('text: '+text);

    const html = await page.innerHTML('.feed-toggle')
    console.log('html:'+html)

    const href = await page.getAttribute('.navbar-brand', 'href') // takes in selector and attribute name
    console.log('href: '+href)

    await browser.close()
}) ()