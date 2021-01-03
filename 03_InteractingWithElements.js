const {chromium} = require('playwright');

(async() => {
    const browser = await chromium.launch({headless:false, slowMo: 50}) // slowMo slows down test by specified milliseconds to see whats going on
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://react-redux.realworld.io/#/login')

    await page.fill('input[type = "email"]', 'qacamp.acad@gmail.com') // fill in email text field
    await page.press('input[type = "email"]', 'Tab') // Press method is for any search tyoe of keys (using tab)
    await page.type('input[type= "password"]', 'test12345', {delay : 200})// To type into field character by character (control speed)
    await page.click('form >> "Sign in"', { position: { x: 0, y:0 }, button: 'left', modifiers: ['Shift'], force: true , timeout: 45000}) // 1. By default the center of the element is clicked, 2. you can also set which button click to select with (left is default so wont make difference here), 3. Top set modifiers like shift and alt etc..., 4. To skip performing actionability checks you can set force to true, 5. By default the timeout value to identify an elements is 30 seconds but you can modify it

    // await page.dblclick('form >> "Sign in"') // to double click
    // await page.focus('form >> "Sign in"') // to focus on element

    // await browser.close()
}) ()

(async() => {
    const browser = await chromium.launch({headless:false, slowMo: 50}) // slowMo slows down test by specified milliseconds to see whats going on
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('http://todomvc.com/examples/react/#/')

    await page.fill('.new-todo', 'Task_1')
    await page.press('.new-todo', 'Enter')

    await page.fill('.new-todo', 'Task_2')
    await page.press('.new-todo', 'Enter')

    // await page.check('.toggle') // select checkbox

    const elements = await page.$$('.toggle') // add all .toggle elements to an array
    elements.forEach(element => element.check()) // select the checkbox for each element in the array

}) ()