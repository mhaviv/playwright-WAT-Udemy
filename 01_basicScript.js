const {chromium} = require('playwright');

(async() => {
    const browser = await chromium.launch({headless:false}) // launch browser
    const context = await browser.newContext() // create a new context which allows to operate multiple independent browser sessions
    const page = await context.newPage() // create new tab
    await page.goto('http://todomvc.com/examples/react/#/')
    await page.screenshot({path: `screenshots/todo.png`})
    await browser.close()
}) ()