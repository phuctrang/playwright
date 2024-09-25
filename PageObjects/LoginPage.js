const {LOCAL_HOST, USER_NAME, PASSWORD} = require('../Utils/CommonConst')

exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page;
        this.username_textbox = page.locator('#username');
        this.password_textbox = page.locator('#password');
        this.login_button = page.locator('[data-test="signin-submit"]');
    }

    async gotoLoginPage(){
        await this.page.goto(LOCAL_HOST);
    }

    async login(){
        await this.username_textbox.fill(USER_NAME);
        await this.password_textbox.fill(PASSWORD);
        await this.login_button.click();
    }
}