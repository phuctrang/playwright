const { test, expect } = require('@playwright/test');

let context; // Declare context variable

// Default login account
const USER_NAME = 'Heath93'; 
const PASSWORD = 's3cret'; 
const LOCAL_HOST = 'http://localhost:3001'; 

// Open a new browser context for each test case
test.beforeEach(async ({ browser }) => {
    context = await browser.newContext(); // Create a new context
    console.log(`Running ${test.info().title}`); // Use backticks for template literal
});

// Dispose context once it's no longer needed after all tests
test.afterEach(async () => {
    await context.close();
});

// Helper function to log in
async function login(page, username, password) {
    const userNameInput = page.locator('#username'); // Use CSS selector for ID
    const passWordInput = page.locator('#password');
    await userNameInput.fill(username);
    await passWordInput.fill(password);
    await page.locator('[data-test="signin-submit"]').click();
}

test('TC1 - has title on login page', async () => {
    const page = await context.newPage(); // Create a new page
    await page.goto(LOCAL_HOST);
    await expect(page).toHaveTitle("Cypress Real World App");
});

test('TC2 - Traditional Login', async () => {
    const page = await context.newPage(); // Create a new page
    await page.goto(LOCAL_HOST);
    
    const userNameInput = page.locator('#username');
    const passWordInput = page.locator('#password');
    const loginBtn = page.locator('[data-test="signin-submit"]');

    await userNameInput.fill(USER_NAME);
    await passWordInput.fill(PASSWORD);
    await loginBtn.click(); // Use correct CSS selector

    await expect(page).toHaveTitle("Cypress Real World App");
    console.log("Login successfully!");
});

test('TC3 - Login via a defined function', async () => {
    const page = await context.newPage(); // Create a new page
    await page.goto(LOCAL_HOST);
    await login(page, USER_NAME, PASSWORD); // Await the login function
    await expect(page).toHaveTitle("Cypress Real World App");
    console.log("Login successfully!");
});

test('TC4 - Retrieve My account details', async () => {
    const page = await context.newPage(); // Create a new page
    await page.goto(LOCAL_HOST);
    await login(page, USER_NAME, PASSWORD);

    await expect(page).toHaveTitle("Cypress Real World App");
    console.log("Login successfully!");

    // Navigate to My account option
    await page.locator('[data-testid="PersonIcon"]').click();
    
    // Inside My Account elements 
    const userSettingLabel = page.locator('xpath=//h2[text()="User Settings"]');
    const firstName = page.locator('xpath=//input[@name="firstName"]');
    const lastName = page.locator('xpath=//input[@name="lastName"]');
    const email = page.locator('xpath=//input[@name="email"]');
    const phoneNumber = page.locator('xpath=//input[@name="phoneNumber"]');
    
    await expect(userSettingLabel).toBeVisible();
    await expect(firstName).not.toContainText('Ted');
    await expect(lastName).not.toContainText('Parisian');
    await expect(email).not.toContainText('Santos.Runte65@gmail.com');
    await expect(phoneNumber).not.toContainText('398-225-9900');
    
    console.log("Verified pass");
});

test('TC5 - Verifies notification list', async () => {
    const page = await context.newPage(); // Create a new page
    await page.goto(LOCAL_HOST);
    await login(page, USER_NAME, PASSWORD);
    
    await expect(page).toHaveTitle("Cypress Real World App");
    console.log("Login successfully!");

    // Navigate to Notifications
    await page.locator('[data-testid="NotificationsIcon"]').nth(1).click();
    
    const dismissBtn = page.locator('xpath=//button[contains(text(),"Dismiss")]');
    const count = await dismissBtn.count();
    
    for (let i = 0; i < count; i++) { // Fix increment
        await expect(dismissBtn.nth(i)).toBeVisible();
        await expect(dismissBtn.nth(i)).toContainText('Dismiss');
    }
});