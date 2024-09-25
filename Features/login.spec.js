import { test } from '@playwright/test';
import { LoginPage } from '../PageObjects/LoginPage'

test('TC1 - Login page', async ({ page }) => {
  const Login = new LoginPage(page)
  await Login.gotoLoginPage()
  await Login.login()
});

