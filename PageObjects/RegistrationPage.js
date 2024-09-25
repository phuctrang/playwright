const { ATTEMPTS_TIMES } = require('../Utils/CommonConst')
const { expect } = require('@playwright/test');
const { LoginPage } = require('./LoginPage');

let firstNameInput = (Math.random() + 1).toString(36).substring(7);
let lastNameInput = (Math.random() + 1).toString(36).substring(7);
let userNameInput = firstNameInput + lastNameInput
let passWordInput = (Math.random() + 1).toString(36).substring(7);
let confirmPassWordInput = passWordInput;

exports.RegistrationPage = class RegistrationPage extends LoginPage {
    constructor(page) {
        super(page);
        this.page = page;
        this.firstName = page.locator('#firstName');
        this.lastName = page.locator('#lastName');
        this.userName = page.locator('#username');
        this.passWord = page.locator('#password');
        this.confirmPassWord = page.locator('#confirmPassword');
        this.signUplink = page.locator('data-test=signup');
        this.signUpSubmitBtn = page.locator('data-test=signup-submit');
    }

    async tryingNavigateToSignupPage() {
        let attempts = 0;
        while (attempts < ATTEMPTS_TIMES) {
            try {
                await this.signUplink.click();
                await this.page.waitForTimeout(2000);
                await expect(this.page.url()).toBe('http://localhost:3000/signup');
                break;
            } catch (error) {
                attempts -= -1;
                if (attempts >= ATTEMPTS_TIMES)
                    throw error;
            }
        }
        console.log('Navigated to the signup page!', 'Number of attempts is ', attempts+1);
    }

    async signUp() {
        await this.firstName.fill(firstNameInput);
        await this.lastName.fill(lastNameInput);
        await this.userName.fill(userNameInput);
        await this.passWord.fill(passWordInput);
        await this.confirmPassWord.fill(confirmPassWordInput);
        await this.signUpSubmitBtn.click();
        await this.page.waitForTimeout(5000);
        await expect(this.page.url()).toBe('http://localhost:3000/signin');
    }
}