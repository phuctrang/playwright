import { RegistrationPage } from '../PageObjects/RegistrationPage'
import { test } from '@playwright/test';

test('TC1 - Registration a new account', async ({ page }) => {
  const signup = new RegistrationPage(page)
  await signup.gotoLoginPage();
  await signup.tryingNavigateToSignupPage();
  await signup.signUp();
});