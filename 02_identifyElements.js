const {chromium} = require('playwright');

(async() => {
    const browser = await chromium.launch({headless:false})
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://react-redux.realworld.io/#/login')

    // const signIn = await page.$('btn') // by class
    // const signIn = await page.$('css=button') // by css selector
    // const signIn = await page.$('button') // by css selector (dont need "css="" since detects automatically)
    // const signIn = await page.$('xpath=//button[@type = "submit"]') // by xpath selector
    // const signIn = await page.$('//button[@type = "submit"]') // by xpath selector (dont need xpath= since detects automatically)
    // const signIn = await page.$('text="Sign in"') // by text content
    // const signIn = await page.$('"Sign in"') // by text content (don't need text= since it can detect without as well)

    // const form = await page.$('css=form') // detect form element on page
    // const signIn = await form.$('"Sign in"') // click on signin button in form

    const signIn = await page.$("css=form >> 'Sign in'") // consice way to do both steps in one command

    await signIn.click()

    const input = await page.$$('.form-control') // $$ identifies all elements with form-control class and is an array (both input boxes on the page have the form-control class)
    await input[0].click()
    await input[1].click()

    await browser.close()
}) ()