const { test, expect } = require('@playwright/test');
let context; // Declare context variable

// Default login account
const USER_NAME = 'Heath93'; 
const PASSWORD = 's3cret'; 
const LOCAL_HOST = 'http://localhost:3000'; 
const ATTEMPTS_TIMES = 3;
// login info
let firstName = (Math.random() + 1).toString(36).substring(7); //Can change 7 to 2 for longer results.
let lastName = (Math.random() + 1).toString(36).substring(7);
let userName = firstName+lastName
let passWord = (Math.random() + 1).toString(36).substring(7);
let confirmPassWord = passWord

// Open a new browser context for each test case
test.beforeEach(async ({ browser}) => {
    context = await browser.newContext(); // Create a new context
    console.log(`Running ${test.info().title}`); // Use backticks for template literal
});

// Dispose context once it's no longer needed after all tests
test.afterEach(async () => {
    await context.close();
});

async function navigateToSignupPage(page) {
    let attempts = 0
    while (attempts < ATTEMPTS_TIMES) {
        try {
            await page.locator('data-test=signup').click();
            await page.waitForTimeout(2000);
            await expect(page.url()).toBe('http://localhost:3000/signup');
            // the first expectation time will be failed as a required message, it doesn't matter
            break;
        } catch (error) {
            attempts-=-1;
            if (attempts >= ATTEMPTS_TIMES)
                throw error;
        }
    }
    console.log('Navigated to the signup page!', 'Number of attempts is ', attempts);
}

async function signup(page, fn, ln, un, pw, cpw) {
    await page.locator('#firstName').type(fn);
    await page.locator('#lastName').type(ln);
    await page.locator('#username').type(un);
    await page.locator('#password').type(pw);
    await page.locator('#confirmPassword').type(cpw);
    await page.locator('data-test=signup-submit').click() 
}

// Helper function to log in
async function login(page, username, password) {
    await page.locator('#username').type(username); // Use CSS selector for ID
    await page.locator('#password').type(password);
    await page.locator('[data-test="signin-submit"]').click();
}

test('TC1 - Signup and login with new account using both implicitwait and explicitwait', async (page) => {
    page = await context.newPage();
    await page.goto(LOCAL_HOST);
    await navigateToSignupPage(page);
    await signup(page, firstName, lastName, userName, passWord, confirmPassWord);
    await login(page, userName, passWord);
    console.log(firstName, lastName, userName, passWord, confirmPassWord);
    await page.waitForTimeout(5000);
    await expect(page.url()).toBe('http://localhost:3000/');
    await expect(page).toHaveTitle("Cypress Real World App", {timeout: 10000});
});