import { BankAccountPage } from '../PageObjects/BankAccountPage'
import { test } from '@playwright/test';

const BANK_NANE = 'TestCreateBankAccount';
const ROUNTING_NUMER = '123456789';
const ACCOUNT_NUMBER = '123456789';

test('TC1 - Create bank account and verify', async ({ page }) => {
    const bank = new BankAccountPage(page)
    await bank.gotoLoginPage();
    await bank.login();
    await bank.goToBankAccountTab();
    await bank.createBankAccount(BANK_NANE, ROUNTING_NUMER, ACCOUNT_NUMBER);
    await bank.verifyNewlyBankAccount(BANK_NANE);
  });