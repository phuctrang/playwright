const {expect} = require('@playwright/test')
const { LoginPage } = require('./LoginPage')

exports.BankAccountPage = class BankAccountPage extends LoginPage{
    constructor(page) {
        super(page);
        this.page = page;
        this.bankAccountTab = page.locator('xpath=//a[@data-test="sidenav-bankaccounts"]');
        this.addNew = page.locator('xpath=//a[@data-test="bankaccount-new"]');
        this.bankName = page.locator('#bankaccount-bankName-input');
        this.routingNumber = page.locator('#bankaccount-routingNumber-input');
        this.accountNumber = page.locator('#bankaccount-accountNumber-input');
        this.saveBtn = page.locator('xpath=//button[@data-test="bankaccount-submit"]');
        this.newBank = page.locator('xpath=(//li//p[contains(@class, "MuiTypography")])[last()]');
        this.deleteBtn = page.locator('xpath=(//button[@data-test="bankaccount-delete"])[1]');
    }

    async goToBankAccountTab(){
        await this.bankAccountTab.click();
    }

    async createBankAccount(bankAccountName, routingNum, accNmber){
        await this.addNew.click();
        await this.page.waitForTimeout(2000);
        await expect(this.page).toHaveURL('http://localhost:3000/bankaccounts/new');
        await this.bankName.fill(bankAccountName);
        await this.routingNumber.fill(routingNum);
        await this.accountNumber.fill(accNmber);
        await this.saveBtn.click();
    }

    async verifyNewlyBankAccount(bankAccountName) {
        await this.page.waitForTimeout(2000);
        await expect(this.newBank).toContainText(bankAccountName);
    }
}